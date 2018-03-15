import {
    AsyncStorage
} from 'react-native';
import * as types from '@actions/types'
import apis from '@flashAPIs'
import { satoshiToFlash, flashToUSD, flashToBTC } from '@lib/commonFN';
import { _logout } from '@actions/navigation'

export const getBalance = (refresh = false) => {
    return (dispatch,getState) => {
        let params = getState().params;
        apis.getBalance(params.profile.auth_version, params.profile.sessionToken, params.currencyType).then((d)=>{
            if(d.rc == 3){
                dispatch({
                    type: types.GET_BALANCE,
                    payload: {
                        errorMsg:d.reason,
                    }
                });
                setTimeout(()=>_logout(dispatch),500);
            }else if(d.rc == 2){
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
            if(d.rc == 2){
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

export const getMyWallets = () => {
    return (dispatch,getState) => {
        let params = getState().params;
        apis.getMyWallets(params.profile.auth_version, params.profile.sessionToken).then((d)=>{
            if(d.rc == 2){
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
            }
        }).catch(e=>{
            dispatch({
                type: types.GET_MY_WALLETS,
                payload: {
                    errorMsg: e.message,
                }
            });
        })
    }
}

export const getWalletsByEmail = () => {
    return (dispatch,getState) => {
        let params = getState().params;
        apis.getWalletsByEmail(params.profile.auth_version, params.profile.sessionToken,
            params.profile.email, params.currencyType).then((d)=>{
            if(d.rc == 2){
                dispatch({
                    type: types.GET_WALLET_ADDRESS,
                    payload: {
                        errorMsg:d.reason,
                    }
                });
            }else if(d.results.length > 0){
                AsyncStorage.setItem('my_wallets',JSON.stringify(d.my_wallets));
                dispatch({
                    type: types.GET_WALLET_ADDRESS,
                    payload: {
                        wallet_address:d.results[0].address
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

export const searchWallet = (term) => {
    return (dispatch,getState) => {
        let params = getState().params;
        apis.searchWallet(params.profile.auth_version, params.profile.sessionToken,
            params.currencyType, term).then((d)=>{
                console.log(d);
            if(d.rc == 2){
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
        }).catch(e=>{
            console.log(e);
            dispatch({
                type: types.SEARCH_WALLET,
                payload: {
                    errorMsg: e.message,
                }
            });
        })
    }
}

export const getCoinMarketCapDetail = () =>{
    return (dispatch,getState) => {
        let params = getState().params;
        if(!params.balance) return;
        AsyncStorage.getItem('coinmarketcapValue',(err,succ)=>{
            if(!succ) return;
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
