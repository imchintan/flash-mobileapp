import {
    AsyncStorage
} from 'react-native';
import moment from 'moment-timezone';
import * as types from '@actions/types'
import apis from '@flashAPIs'
import Wallet from '@lib/wallet'
import * as utils from '@lib/utils'
import Premium from 'Premium';

import { getCoinMarketCapDetail, getProfile } from '@actions/account';

export const init = () => {
    return async (dispatch,getState) => {
        utils.publicIP().then(ip => {
            dispatch({ type: types.SET_PUBLIC_IP, ip });
        });
        dispatch(getCoinMarketCapDetail());
        dispatch({ type: types.LOADING_START });
        let user = await AsyncStorage.getItem('user');
        if(user){
            let payload = {
                profile:JSON.parse(user),
            };

            let balance = await AsyncStorage.getItem('balance');
            if(balance){
                payload.balance = JSON.parse(balance)
            }
            let last_message_datetime = await AsyncStorage.getItem('last_message_datetime');
            if(last_message_datetime){
                payload.last_message_datetime = Number(last_message_datetime);
            }
            dispatch({
                type: types.LOGIN_SUCCESS,
                payload
            });
            dispatch(getProfile());
            dispatch(getMyWallets(payload.profile));
        }else{
            dispatch({ type: types.LOADING_END });
        }
    }
}

export const forgotPassword = (email) => {
    return (dispatch,getState) => {
        dispatch({ type: types.LOADING_START });
        apis.forgotPassword(email).then((d)=>{
            if(d.rc == 1){
                dispatch({
                    type: types.FORGOT_PASSWORD,
                    payload: {
                        successMsg: "We sent you an email with a link to reset your password.\n\nPlease check your email inbox/spam folder.",
                        loading:false
                    }
                });
            }else{
                dispatch({
                    type: types.FORGOT_PASSWORD,
                    payload: {
                        errorMsg:d.reason,
                        loading:false
                    }
                });
            }

        }).catch(e=>{
            dispatch({
                type: types.FORGOT_PASSWORD,
                payload: {
                    errorMsg: e.message,
                    loading:false
                }
            });
        })
    }
}

export const login = (email,password) => {
    return (dispatch,getState) => {
        dispatch({ type: types.LOADING_START });
        apis.login(email,password).then((d)=>{
            if(d.rc == 1){
                if(!d.profile.totp_enabled)AsyncStorage.setItem('user',JSON.stringify(d.profile));
                dispatch({
                    type: (!d.profile.totp_enabled)?types.LOGIN_SUCCESS:types.VERIFY_2FA,
                    payload: {
                        profile:d.profile,
                        password:(!d.profile.totp_enabled)?null:password,
                        loading:(!d.profile.totp_enabled),
                    }
                });
                if(!d.profile.totp_enabled){
                    dispatch(getProfile());
                    dispatch(getMyWallets(d.profile,password));
                }
            }else{
                let errorMsg = d.reason;
                if(d.status !== 'ACCOUNT_LOCKED'){
                    if(d.failed_count && d.failed_count >= 3){
                        let attmpt_count = '4th';
                        if(d.failed_count == 3)
                            attmpt_count = '3rd';

                        errorMsg = 'Email or password is not correct. This is your '+d.failed_count+
                        ' failed attempt. After 5 failed attempts, your account will be locked.';

                    }else{
                        errorMsg = 'Email or password is not correct';
                    }
                }
                dispatch({
                    type: types.LOGIN_FAILED,
                    payload: {
                        errorMsg,
                        loading:false
                    }
                });
            }
        }).catch(e=>{
            dispatch({
                type: types.LOGIN_FAILED,
                payload: {
                    errorMsg: e.message,
                    loading:false
                }
            });
        })
    }
}

export const check2FA = (code) =>{
    return (dispatch,getState) => {
        dispatch({ type: types.LOADING_START });
        let params = getState().params;
        apis.check2FA(params.profile.auth_version, params.profile.idToken,code)
        .then((d)=>{
            if(d.rc == 1){
                let profile = {...params.profile,...d.profile};
                let password = params.password;
                AsyncStorage.setItem('user',JSON.stringify(profile));
                dispatch({
                    type: types.VERIFY_2FA_SUCCESS,
                    payload: {
                        profile,
                        password:null,
                    }
                });
                dispatch(getProfile());
                dispatch(getMyWallets(profile,password));
            }else{
                dispatch({
                    type: types.VERIFY_2FA_FAILED,
                    payload: {
                        errorMsg:d.reason,
                        loading:false,
                    }
                });
            }
        }).catch(e=>{
            dispatch({
                type: types.VERIFY_2FA_FAILED,
                payload: {
                    errorMsg: e.message,
                    loading:false,
                }
            });
        })
    }
}

export const getMyWallets = (profile,password=null) => {
    return (dispatch,getState) => {
        apis.getMyWallets(profile.auth_version, profile.sessionToken).then((d)=>{
            if(d.rc !== 1){
                dispatch({
                    type: types.GET_MY_WALLETS,
                    payload: {
                        errorMsg:d.reason,
                    }
                });
            }else{
                dispatch({
                    type: types.GET_MY_WALLETS,
                    payload: {
                        my_wallets:d.my_wallets
                    }
                });
                if(password || profile.auth_version == 3) dispatch(decryptWallets(password));
            }
        }).catch(e=>{
            dispatch({
                type: types.GET_MY_WALLETS,
                payload: {
                    errorMsg: e.message,
                    stack: e.stack,
                }
            });
        })
    }
}

export const decryptWallets = (password) => {
    return (dispatch,getState) => {
        try {
            dispatch({ type: types.LOADING_START });
            let params = getState().params;
            let profile = params.profile;
            let auth_version = params.profile.auth_version;
            let wallets = params.my_wallets;
            let userKey = {
                  idToken: profile.idToken,
                  encryptedPrivKey: profile.privateKey,
                  publicKey: profile.publicKey,
            };
            decryptedWallets = null;
            if (auth_version === 3) {
                decryptPassphraseV1(profile.email, wallets, userKey).then(decryptedWallets => {
                    dispatch({
                        type: types.STORE_FOUNTAIN_SECRET,
                        payload: {
                            decryptedWallets,
                            loading: false,
                        }
                    });
                }).catch(e=>{
                    dispatch({
                        type: types.STORE_FOUNTAIN_SECRET,
                        payload: {
                            errorMsg: e.message,
                            loading: false,
                        }
                    });
                });
            } else {
                if (password) {
                    decryptedWallets = decryptPassphraseV2(profile.email, wallets, userKey, password);
                } else {
                    // Store CAS version 2 account wallet
                    // Only decrypt wallet if user send money
                    decryptedWallets = wallets;
                }
                dispatch({
                    type: types.STORE_FOUNTAIN_SECRET,
                    payload: {
                        decryptedWallets,
                        loading: false,
                    }
                });
            }
        } catch (e) {
            dispatch({
                type: types.STORE_FOUNTAIN_SECRET,
                payload: {
                    errorMsg: 'Please check your password!',
                    loading: false,
                }
            });
        }
    }
}

export const logout = () => {
    return (dispatch,getState) => _logout(dispatch);
}

export const _logout = async(dispatch) => {
    dispatch({ type: types.LOADING_START });
    await AsyncStorage.clear();
    dispatch({ type: types.LOGOUT });
    dispatch(getCoinMarketCapDetail());
}

export const signupSuccess = () => ({
    type: types.SIGNUP_SUCCESS
});

export const resetMessages = () => ({
    type: types.RESET_MESSAGES
});

/**
 * Decrypt CAS version 1 account wallet
 *
 * 1. Get the secrete key from server
 * 2. Using secrete key to decrypt wallet passphrase
 */
export const decryptPassphraseV1 = (email, wallets, userKey) => {
    return new Promise((resolve,reject) => {
        apis.walletSecret(userKey.idToken).then((resp) => {
            if (resp.rc === 1) {
                let decryptedWallets = wallets.map(w => {
                    let str = utils.b64DecodeUnicode(w.passphrase);
                    w.pure_passphrase = Premium.xaesDecrypt(resp.wallet.secret, str);
                    w.email = email;
                    return new Wallet().openWallet(w);
                });
                resolve(decryptedWallets);
            }else{
                reject(resp.reason);
            }
        }).catch(e=>reject(e))
    });
}

/**
 * Decrypt CAS version 2 account wallet
 *
 * Using password to decrypt wallet passphrase
 */
export const decryptPassphraseV2 = (email, wallets, userKey, password) => {
    return utils.decryptPassphraseV2(
        email,
        wallets,
        password,
        userKey
    );
}
