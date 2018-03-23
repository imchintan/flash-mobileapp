import {
    AsyncStorage
} from 'react-native';
import * as types from '@actions/types';
import apis from '@flashAPIs';
import { satoshiToFlash, flashToUSD, flashToBTC } from '@lib/utils';
import { _logout } from '@actions/navigation';
import { getActiveWallet } from '@actions/send';

export const getBalance = (refresh = false) => {
    return (dispatch,getState) => {
        let params = getState().params;
        apis.getBalance(params.profile.auth_version, params.profile.sessionToken, params.currency_type).then((d)=>{
            if(d.rc == 3){
                dispatch({
                    type: types.GET_BALANCE,
                    payload: {
                        errorMsg:d.reason,
                    }
                });
                setTimeout(()=>_logout(dispatch),500);
            }else if(d.rc !== 1){
                dispatch({
                    type: types.GET_BALANCE,
                    payload: {
                        errorMsg:d.reason,
                    }
                });
            }else{
                AsyncStorage.setItem('balance',JSON.stringify(d.balance));
                dispatch({
                    type: types.GET_BALANCE,
                    payload: {
                        balance:d.balance,
                        successMsg: refresh?('Updated Balance: '+satoshiToFlash(d.balance)+ ' FLASH'):null
                    }
                });
                dispatch(getCoinMarketCapDetail());
                if(refresh){
                    dispatch({
                        type: types.GET_BALANCE,
                        payload: {
                            successMsg: null
                        }
                    });
                }
            }
        }).catch(e=>{
            dispatch({
                type: types.GET_BALANCE,
                payload: {
                    errorMsg: e.message,
                }
            });
        })
    }
}

export const getProfile = () => {
    return (dispatch,getState) => {
        let params = getState().params;
        apis.getProfile(params.profile.auth_version, params.profile.sessionToken).then((d)=>{
            if(d.rc !== 1){
                dispatch({
                    type: types.GET_PROFILE,
                    payload: {
                        errorMsg:d.reason,
                        loading:false
                    }
                });
            }else{
                AsyncStorage.mergeItem('user',JSON.stringify(d.profile));
                dispatch({
                    type: types.GET_PROFILE,
                    payload: {
                        loading:false,
                        profile:{...params.profile,...d.profile}
                    }
                });
                dispatch(getWalletsByEmail());
            }
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

export const getCoinMarketCapDetail = () =>{
    return (dispatch,getState) => {
        let params = getState().params;
        if(!params.balance)
            params.balance = 0;
        AsyncStorage.getItem('coinmarketcapValue',(err,succ)=>{
            if(err || !succ) return;
            let d = JSON.parse(succ);
            dispatch({
                type: types.GET_COIN_MARKET_CAP_VALUE,
                payload: {
                    balance_in_btc:flashToBTC(params.balance, Number(d.price_btc)),
                    balance_in_usd:flashToUSD(params.balance, Number(d.price_usd)),
                }
            });
        });
        apis.getCoinMarketCapDetail().then((d)=>{
            if(!(d && d.constructor === Array && d.length > 0)) return;
            AsyncStorage.setItem('coinmarketcapValue',JSON.stringify(d[0]));
            dispatch({
                type: types.GET_COIN_MARKET_CAP_VALUE,
                payload: {
                    balance_in_btc:flashToBTC(params.balance, Number(d[0].price_btc)),
                    balance_in_usd:flashToUSD(params.balance, Number(d[0].price_usd)),
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
