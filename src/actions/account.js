import {
    AsyncStorage
} from 'react-native';
import moment from 'moment-timezone';
import * as types from '@actions/types';
import apis from '@flashAPIs';
import * as utils from '@lib/utils';
import * as constants from '@src/constants';
import { _logout } from '@actions/navigation';
import { getActiveWallet } from '@actions/send';
import * as txns from '@actions/transactions';
import * as reqs from '@actions/request';

export const getBalance = (refresh = false) => {
    return (dispatch,getState) => {
        let params = getState().params;
        if(!!params.balanceLoader) return;
        dispatch({
            type: types.LOADING,
            payload: {
                balanceLoader: true,
            }
        });
        apis.getBalance(params.profile.auth_version, params.profile.sessionToken, params.currency_type).then((d)=>{
            if(d.rc == 3){
                dispatch({
                    type: types.GET_BALANCE,
                    payload: {
                        errorMsg:d.reason,
                        balanceLoader: false,
                    }
                });
                setTimeout(()=>_logout(dispatch),500);
            }else if(d.rc !== 1){
                dispatch({
                    type: types.GET_BALANCE,
                    payload: {
                        errorMsg:d.reason,
                        balanceLoader: false,
                    }
                });
            }else{
                AsyncStorage.setItem('balance',JSON.stringify(d.balance));
                dispatch({
                    type: types.GET_BALANCE,
                    payload: {
                        balance:d.balance,
                        ubalance:d.ubalance,
                        balanceLoader: false,
                        infoMsg: refresh?('Updated Balance: '+
                        (params.currency_type === constants.CURRENCY_TYPE.FLASH?
                        utils.flashNFormatter(utils.satoshiToFlash(d.balance).toFixed(10)):utils.flashNFormatter(d.balance.toFixed(8)))
                        + ' '+ utils.getCurrencyUnitUpcase( params.currency_type)):null
                    }
                });
                dispatch(getCoinMarketCapDetail());
            }
        }).catch(e=>{
            dispatch({
                type: types.GET_BALANCE,
                payload: {
                    errorMsg: e.message,
                    balanceLoader: false,
                }
            });
        })
    }
}

export const getProfile = () => {
    return (dispatch,getState) => {
        let params = getState().params;
        apis.getProfile(params.profile.auth_version, params.profile.sessionToken).then((d)=>{
            if(d.rc == 1){
                AsyncStorage.mergeItem('user',JSON.stringify(d.profile));
                dispatch({
                    type: types.GET_PROFILE,
                    payload: {
                        loading:false,
                        profile:{...params.profile,...d.profile}
                    }
                });
                setTimeout(()=>dispatch(getWalletsByEmail()),500);
            }else if(d.rc == 3){
                dispatch({
                    type: types.CUSTOM_ACTION,
                    payload: {
                        loading:false,
                        errorMsg:d.reason,
                    }
                });
                setTimeout(()=>_logout(dispatch),500);
            }else{
                dispatch({
                    type: types.GET_PROFILE,
                    payload: {
                        errorMsg:d.reason,
                        loading:false
                    }
                });
            }
            dispatch(txns.getRecentTransactions());
        }).catch(e=>{
            dispatch({
                type: types.GET_PROFILE,
                payload: {
                    errorMsg: e.message,
                    loading:false
                }
            });
        })
    }
}

export const updateProfile = (data) => {
    return (dispatch,getState) => {
        dispatch({ type: types.LOADING_START });
        let params = getState().params;
        apis.updateProfile(params.profile.auth_version, params.profile.sessionToken, data).then((d)=>{
            if(d.rc == 1){
                let profile = {...params.profile,...d.profile};
                AsyncStorage.mergeItem('user',JSON.stringify(profile));
                dispatch({
                    type: types.UPDATE_PROFILE,
                    payload: {
                        loading:false,
                        profile
                    }
                });
            }else if(d.rc == 3){
                dispatch({
                    type: types.UPDATE_PROFILE,
                    payload: {
                        loading:false,
                        errorMsg:d.reason,
                    }
                });
                setTimeout(()=>_logout(dispatch),500);
            }else{
                dispatch({
                    type: types.UPDATE_PROFILE,
                    payload: {
                        errorMsg:d.reason,
                        loading:false
                    }
                });
            }
        }).catch(e=>{
            dispatch({
                type: types.UPDATE_PROFILE,
                payload: {
                    errorMsg: e.message,
                    loading:false
                }
            });
        })
    }
}

export const changePassword = (data) => {
    return (dispatch,getState) => {
        dispatch({ type: types.LOADING_START });
        let params = getState().params;
        apis.changePassword(params.profile.auth_version, params.profile.idToken, data).then((d)=>{
            if(d.rc == 1){
                let profile = {
                    ...params.profile,
                    privateKey: data.newPrivateKey
                };
                AsyncStorage.mergeItem('user',JSON.stringify(profile));
                dispatch({
                    type: types.CHANGE_PASSWORD,
                    payload: {
                        loading:false,
                        profile,
                        successMsg: 'Your password has been changed successfully!'
                    }
                });
            }else if(d.rc == 3){
                dispatch({
                    type: types.CHANGE_PASSWORD,
                    payload: {
                        loading:false,
                        errorMsg:d.reason,
                    }
                });
                setTimeout(()=>_logout(dispatch),500);
            }else{
                dispatch({
                    type: types.CHANGE_PASSWORD,
                    payload: {
                        errorMsg:d.reason,
                        loading:false
                    }
                });
            }
        }).catch(e=>{
            dispatch({
                type: types.CHANGE_PASSWORD,
                payload: {
                    errorMsg: e.message,
                    loading:false
                }
            });
        })
    }
}

export const sendVerificationSMS = () => {
    return (dispatch,getState) => {
        dispatch({ type: types.LOADING_START });
        let params = getState().params;
        apis.sendVerificationSMS(params.profile.auth_version, params.profile.sessionToken).then((d)=>{
            if(d.rc == 1){
                dispatch({
                    type: types.SEND_VERIFICATION_SMS,
                    payload: {
                        loading:false,
                    }
                });
            }else if(d.rc == 3){
                dispatch({
                    type: types.SEND_VERIFICATION_SMS,
                    payload: {
                        loading:false,
                        errorMsg:d.reason,
                    }
                });
                setTimeout(()=>_logout(dispatch),500);
            }else{
                dispatch({
                    type: types.SEND_VERIFICATION_SMS,
                    payload: {
                        errorMsg:d.reason,
                        loading:false
                    }
                });
            }
        }).catch(e=>{
            dispatch({
                type: types.SEND_VERIFICATION_SMS,
                payload: {
                    errorMsg: e.message,
                    loading:false
                }
            });
        })
    }
}

export const verifyPhone = (smsCode) => {
    return (dispatch,getState) => {
        let params = getState().params;
        apis.verifyPhone(params.profile.auth_version, params.profile.sessionToken, smsCode).then((d)=>{
            if(d.rc == 1){
                let profile = {
                    ...params.profile,
                    phone_verified: 1
                };
                AsyncStorage.mergeItem('user',JSON.stringify(profile));
                dispatch({
                    type: types.VERIFY_PHONE,
                    payload: {
                        profile,
                        successMsg:'Your phone number has been verified!',
                        verifyCodeSuccessMsg:'Your phone number has been verified!',
                    }
                });
            }else if(d.rc == 3){
                dispatch({
                    type: types.VERIFY_PHONE,
                    payload: {
                        verifyCodeErrorMsg:d.reason,
                    }
                });
                setTimeout(()=>_logout(dispatch),500);
            }else{
                dispatch({
                    type: types.VERIFY_PHONE,
                    payload: {
                        verifyCodeErrorMsg:d.reason,
                    }
                });
            }
            setTimeout(()=>dispatch({
                type: types.CUSTOM_ACTION,
                payload:{
                    verifyCodeErrorMsg:null,
                    verifyCodeSuccessMsg:null
                }
            }),500);
        }).catch(e=>{
            dispatch({
                type: types.VERIFY_PHONE,
                payload: {
                    verifyCodeErrorMsg: e.message,
                }
            });
        })
    }
}

export const setRecoveryKeys = (data) => {
    return (dispatch,getState) => {
        dispatch({ type: types.LOADING_START });
        let params = getState().params;
        apis.setRecoveryKeys(params.profile.auth_version, params.profile.idToken, data).then((d)=>{
            if(d.rc == 1){
                dispatch({
                    type: types.SET_RECOVERY_KEYS,
                    payload: {
                        loading:false,
                        successMsg: 'Security questions have been updated successfully',
                        securityQueSuccessMsg: 'Security questions have been updated successfully'
                    }
                });
                setTimeout(()=>dispatch({
                    type: types.CUSTOM_ACTION,
                    payload:{
                        securityQueSuccessMsg:null,
                    }
                }),500);
            }else if(d.rc == 3){
                dispatch({
                    type: types.SET_RECOVERY_KEYS,
                    payload: {
                        loading:false,
                        errorMsg:d.reason,
                    }
                });
                setTimeout(()=>_logout(dispatch),500);
            }else{
                dispatch({
                    type: types.SET_RECOVERY_KEYS,
                    payload: {
                        errorMsg:d.reason,
                        loading:false
                    }
                });
            }
        }).catch(e=>{
            dispatch({
                type: types.SET_RECOVERY_KEYS,
                payload: {
                    errorMsg: e.message,
                    loading:false
                }
            });
        })
    }
}

export const getWalletsByEmail = () => {
    return (dispatch,getState) => {
        let params = getState().params;
        apis.getWalletsByEmail(params.profile.auth_version, params.profile.sessionToken,
            params.profile.email, params.currency_type).then((d)=>{
            if(d.rc !== 1){
                dispatch({
                    type: types.GET_WALLET_ADDRESS,
                    payload: {
                        errorMsg:d.reason,
                    }
                });
            }else if(d.results.length > 0){
                let wallet = getActiveWallet(d.results, params.currency_type);
                if(wallet)
                    dispatch({
                        type: types.GET_WALLET_ADDRESS,
                        payload: {
                            wallet_address:wallet.address
                        }
                    });
            }
        }).catch(e=>{
            dispatch({
                type: types.GET_WALLET_ADDRESS,
                payload: {
                    errorMsg: e.message,
                }
            });
        })
    }
}

export const searchWallet = (term, loading=false) => {
    return (dispatch,getState) => {
        if(loading) dispatch({ type: types.LOADING_START });
        let params = getState().params;
        apis.searchWallet(params.profile.auth_version, params.profile.sessionToken,
            params.currency_type, term).then((d)=>{
            if(d.rc !== 1){
                dispatch({
                    type: types.SEARCH_WALLET,
                    payload: {
                        errorMsg:d.reason,
                    }
                });
            }else if(d.total_wallets > 0){
                dispatch({
                    type: types.SEARCH_WALLET,
                    payload: {
                        search_wallet:d.wallets[0],
                    }
                });
            }
            if(loading) dispatch({ type: types.LOADING_END });
        }).catch(e=>{
            console.log(e);
            dispatch({
                type: types.SEARCH_WALLET,
                payload: {
                    errorMsg: e.message,
                }
            });
            if(loading) dispatch({ type: types.LOADING_END });
        })
    }
}

export const changeCurrency = (currency_type) =>{
    return (dispatch,getState) => {
        dispatch({ type: types.LOADING_START });
        dispatch({
            type: types.CHANGE_CURRENCY,
            payload:{
                currency_type,
                balance: 0,
                balance_in_flash: 0,
                balance_in_btc: 0,
                balance_in_ltc: 0,
                balance_in_usd: 0,
                ubalance: 0,
                bcMedianTxSize: 250,
                satoshiPerByte: 20,
                thresholdAmount: 0.00001,
            }
        });
        setTimeout(()=>{
            dispatch(getBalance());
            dispatch(getWalletsByEmail());
            dispatch(txns.getRecentTransactions());
            dispatch(reqs.getIncomingRequests(0,true));
            dispatch(reqs.getOutgoingRequests(0,true));

            if(currency_type !== constants.CURRENCY_TYPE.FLASH){
                dispatch(txns.setThresholdAmount());
                dispatch(txns.setBcMedianTxSize());
                dispatch(txns.setSatoshiPerByte());
            }

            dispatch(txns.getAllTransactions(0,true));
            dispatch(txns.getSentTransactions(0,true));
            dispatch(txns.getReceivedTransactions(0,true));
        },100)
        setTimeout(()=>{
            dispatch({ type: types.LOADING_END });
        },500);
    }
}

export const refreshingHome = () =>{
    return (dispatch,getState) => {
        dispatch({ type: types.LOADING, payload:{refreshingHome:true} });
        dispatch(getBalance());
        dispatch(txns.getRecentTransactions());
    }
}

export const getCoinMarketCapDetail = () =>{
    return (dispatch,getState) => {
        let params = getState().params;
        if(!params.balance)
            params.balance = 0;

        if(params.currency_type === constants.CURRENCY_TYPE.BTC)
            apis.getCoinMarketCapDetailBTC().then((d)=>{
                if(!d) return;
                AsyncStorage.setItem('coinmarketcapValue',JSON.stringify(d));
                dispatch({
                    type: types.GET_COIN_MARKET_CAP_VALUE,
                    payload: {
                        balance_in_flash:utils.btcToOtherCurrency(params.balance, Number(d.flash)),
                        balance_in_btc:utils.btcToOtherCurrency(params.balance, Number(d.btc)),
                        balance_in_ltc:utils.btcToOtherCurrency(params.balance, Number(d.ltc)),
                        balance_in_usd:utils.btcToOtherCurrency(params.balance, Number(d.usd)),
                    }
                });
            }).catch(e=>{});
        else if(params.currency_type === constants.CURRENCY_TYPE.LTC)
            apis.getCoinMarketCapDetailLTC().then((d)=>{
                if(!d) return;
                AsyncStorage.setItem('coinmarketcapValue',JSON.stringify(d));
                dispatch({
                    type: types.GET_COIN_MARKET_CAP_VALUE,
                    payload: {
                        balance_in_flash:utils.ltcToOtherCurrency(params.balance, Number(d.flash)),
                        balance_in_btc:utils.ltcToOtherCurrency(params.balance, Number(d.btc)),
                        balance_in_ltc:utils.ltcToOtherCurrency(params.balance, Number(d.ltc)),
                        balance_in_usd:utils.ltcToOtherCurrency(params.balance, Number(d.usd)),
                    }
                });
            }).catch(e=>{});
        else
            apis.getCoinMarketCapDetailFLASH().then((d)=>{
                if(!d) return;
                AsyncStorage.setItem('coinmarketcapValue',JSON.stringify(d));
                dispatch({
                    type: types.GET_COIN_MARKET_CAP_VALUE,
                    payload: {
                        balance_in_flash:utils.flashToOtherCurrency(params.balance, Number(d.flash)),
                        balance_in_btc:utils.flashToOtherCurrency(params.balance, Number(d.btc)),
                        balance_in_ltc:utils.flashToOtherCurrency(params.balance, Number(d.ltc)),
                        balance_in_usd:utils.flashToOtherCurrency(params.balance, Number(d.usd)),
                    }
                });
            }).catch(e=>{});
    }
}

export const start2FA = () =>{
    return (dispatch,getState) => {
        dispatch({ type: types.LOADING_START });
        let params = getState().params;
        apis.start2FA(params.profile.auth_version, params.profile.sessionToken)
        .then((d)=>{
            if(d.rc == 1){
                let otpUri = decodeURIComponent(d.info.otpUri);
                let recovery_obj_2fa = {
                    otpUri,
                    totp_key: otpUri.split('secret=')[1].substring(0, 16)
                }
                dispatch({
                    type: types.START_2FA,
                    payload: {
                        recovery_obj_2fa,
                        loading:false,
                    }
                });
            }else{
                dispatch({
                    type: types.START_2FA,
                    payload: {
                        errorMsg:d.reason,
                        loading:false,
                    }
                });
            }
        }).catch(e=>{
            dispatch({
                type: types.START_2FA,
                payload: {
                    errorMsg: e.message,
                    loading:false,
                }
            });
        })
    }
}

export const turnOff2FA = () =>{
    return (dispatch,getState) => {
        dispatch({ type: types.LOADING_START });
        let params = getState().params;
        apis.turnOff2FA(params.profile.auth_version, params.profile.sessionToken)
        .then((d)=>{
            if(d.rc == 1){
                dispatch({type: types.TURN_OFF_2FA_SUCCESS});
            }else{
                dispatch({
                    type: types.TURN_OFF_2FA_FAILED,
                    payload: {
                        errorMsg:d.reason,
                        loading:false,
                    }
                });
            }
        }).catch(e=>{
            dispatch({
                type: types.TURN_OFF_2FA_FAILED,
                payload: {
                    errorMsg: e.message,
                    loading:false,
                }
            });
        })
    }
}

export const confirm2FA = (code) =>{
    return (dispatch,getState) => {
        dispatch({ type: types.LOADING_START });
        let params = getState().params;
        apis.confirm2FA(params.profile.auth_version, params.profile.sessionToken,
             code).then((d)=>{
            if(d.rc == 1){
                dispatch({type: types.CONFIRM_2FA_SUCCESS});
            }else{
                dispatch({
                    type: types.CONFIRM_2FA_FAILED,
                    payload: {
                        errorMsg:d.reason,
                        loading:false,
                    }
                });
            }
        }).catch(e=>{
            dispatch({
                type: types.CONFIRM_2FA_FAILED,
                payload: {
                    errorMsg: e.message,
                    loading:false,
                }
            });
        })
    }
}

export const reset2FA = () => ({type: types.RESET_2FA})

export const showQR = () => ({
    type: types.SHOW_QR,
    payload: {
        show_qr: true,
    }
})

export const hideQR = () => ({
    type: types.HIDE_QR,
    payload: {
        show_qr: false,
    }
})
