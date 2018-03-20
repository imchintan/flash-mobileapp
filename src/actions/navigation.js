import {
    AsyncStorage
} from 'react-native';
import * as types from '@actions/types'
import apis from '@flashAPIs'
import Wallet from '@lib/wallet'
import * as utils from '@lib/utils'

export const init = () => {
    return async (dispatch,getState) => {
        dispatch({ type: types.LOADING_START });
        let user = await AsyncStorage.getItem('user');
        if(user){
            let payload = {
                profile:JSON.parse(user),
                loading:false
            };

            let my_wallets = await AsyncStorage.getItem('my_wallets');
            if(my_wallets){
                payload.my_wallets = JSON.parse(my_wallets)
            }

            let decryptedWallets = await AsyncStorage.getItem('decryptedWallets');
            if(decryptedWallets){
                let _decryptedWallets = JSON.parse(decryptedWallets);
                payload.decryptedWallets = _decryptedWallets.map(a=>new Wallet(a.accounts,a.currency_type));
            }

            let balance = await AsyncStorage.getItem('balance');
            if(balance){
                payload.balance = JSON.parse(balance)
            }
            dispatch({
                type: types.LOGIN_SUCCESS,
                payload
            });

        }else{
            dispatch({ type: types.LOADING_END });
        }
        utils.publicIP().then(ip => {
            dispatch({ type: types.SET_PUBLIC_IP, ip });
        });
    }
}

export const login = (email,password) => {
    return (dispatch,getState) => {
        dispatch({ type: types.LOADING_START });
        apis.login(email,password).then((d)=>{
            if(d.rc == 1){
                AsyncStorage.setItem('user',JSON.stringify(d.profile));
                dispatch({
                    type: types.LOGIN_SUCCESS,
                    payload: {
                        profile:d.profile,
                        loading:false
                    }
                });
                dispatch(getMyWallets(d.profile,password));
            }else{
                dispatch({
                    type: types.LOGIN_FAILED,
                    payload: {
                        errorMsg:d.reason,
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

export const getMyWallets = (profile,password) => {
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
                AsyncStorage.setItem('my_wallets',JSON.stringify(d.my_wallets));
                dispatch({
                    type: types.GET_MY_WALLETS,
                    payload: {
                        my_wallets:d.my_wallets
                    }
                });
                decryptWallets(dispatch, profile, d.my_wallets, profile.auth_version, 'Maulik123');
            }
        }).catch(e=>{
            console.log(e.stack);
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

export const logout = () => {
    return (dispatch,getState) => _logout(dispatch);
}

export const _logout = async(dispatch) => {
    dispatch({ type: types.LOADING_START });
    await AsyncStorage.clear();
    dispatch({ type: types.LOGOUT });
}

export const signupSuccess = () => ({
    type: types.SIGNUP_SUCCESS
});

export const resetMessages = () => ({
    type: types.RESET_MESSAGES
});



export const decryptWallets = (dispatch, profile, wallets, auth_version, password) => {
    let userKey = {
          idToken: profile.idToken,
          encryptedPrivKey: profile.privateKey,
          publicKey: profile.publicKey,
    };
    decryptedWallets = null;
    if (auth_version === 3) {
        decryptedWallets = decryptPassphraseV1(wallets, userKey);
    } else {
        if (password) {
            decryptedWallets = decryptPassphraseV2(profile.email, wallets, password, userKey);
        } else {
            // Store CAS version 2 account wallet
            // Only decrypt wallet if user send money
            decryptedWallets = wallets;
        }
    }
    AsyncStorage.setItem('decryptedWallets',JSON.stringify(decryptedWallets));
    dispatch({
        type: types.STORE_FOUNTAIN_SECRET,
        payload: {
            decryptedWallets
        }
    });
}

/**
 * Decrypt CAS version 1 account wallet
 *
 * 1. Get the secrete key from server
 * 2. Using secrete key to decrypt wallet passphrase
 */
export const decryptPassphraseV1 = (wallets, userKey) => {
    return wallets;
    // api.getWalletSecret(userKey.idToken).then((resp) => {
    //     if (resp.rc === 1) {
    //         let decryptedWallets = wallets.map(w => {
    //             let str = utils.b64DecodeUnicode(w.passphrase);
    //             w.pure_passphrase = Premium.xaesDecrypt(resp.wallet.secret, str);
    //             w.email = profile.email;
    //             return new Wallet().openWallet(w);
    //         });
    //         dispatch({
    //             type: types.STORE_FOUNTAIN_SECRET,
    //             payload: {
    //                 decryptedWallets
    //             }
    //         });
    //     }
    // }).catch(e=>{
    //     console.log(e);
    //     // dispatch({
    //     //     type: types.STORE_FOUNTAIN_SECRET,
    //     //     payload: {
    //     //         decryptWallets: wallets
    //     //     }
    //     // });
    // })
}

/**
 * Decrypt CAS version 2 account wallet
 *
 * Using password to decrypt wallet passphrase
 */
export const decryptPassphraseV2 = (email, wallets, password, userKey) => {
    return utils.decryptPassphraseV2(
        email,
        wallets,
        password,
        userKey
    );
}
