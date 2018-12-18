import {
    AsyncStorage
} from 'react-native';
import * as constants from '@src/constants';
import * as apis from '@flashAPIs';
import * as utils from '@lib/utils';
import * as types from '@actions/types';
import * as txns from '@actions/transactions';
import * as reqs from '@actions/request';
import * as send from '@actions/send';
import * as htm from '@actions/htm';
import * as chat from '@actions/chat';
import * as sharing from '@actions/sharing';
import * as exchanges from '@actions/exchanges';
import * as wagering from '@actions/wagering';
import { _logout } from '@actions/navigation';
import Chat from '@helpers/chatHelper';
import notifcationHelper from '@helpers/notifcationHelper';

export const preAction = () => {
    return (dispatch,getState) => {
        dispatch(chat.getChatMessages(true));
    }
}

export const postAction = () => {
    return (dispatch,getState) => {
        dispatch(chat.getChatRooms());
        notifcationHelper.chatAction();
    }
}

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
                constants.SOUND.ERROR.play();
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
                d.balance = Number(d.balance);
                d.sbalance = Number(d.sbalance);
                AsyncStorage.setItem('balance',JSON.stringify(d.balance));
                dispatch({
                    type: types.GET_BALANCE,
                    payload: {
                        balance:d.balance,
                        ubalance:d.ubalance,
                        sbalance:d.sbalance,
                        balanceLoader: false,
                        infoMsg: refresh?('Updated Balance: '+
                        (params.currency_type === constants.CURRENCY_TYPE.FLASH?
                        utils.flashNFormatter(utils.satoshiToFlash(d.balance).toFixed(10)):utils.flashNFormatter(d.balance.toFixed(8)))
                        + ' '+ utils.getCurrencyUnitUpcase( params.currency_type)):null
                    }
                });
                dispatch(getFiatCurrencyRate());
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

export const getBalanceV2 = (currency_type=constants.CURRENCY_TYPE.FLASH ,refresh = false) => {
    return (dispatch,getState) => {
        let params = getState().params;
        dispatch({
            type: types.LOADING,
            payload: {
                balanceLoader: true,
            }
        });
        apis.getBalance(params.profile.auth_version, params.profile.sessionToken, currency_type).then((d)=>{
            if(d.rc == 3){
                dispatch({
                    type: types.GET_BALANCE,
                    payload: {
                        errorMsg:d.reason,
                        balanceLoader: false,
                    }
                });
                constants.SOUND.ERROR.play();
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
                d.balance = Number(d.balance);
                d.sbalance = Number(d.sbalance);
                params = getState().params;
                let balances = params.balances;
                let idx  =  balances.findIndex(bal => bal.currency_type === currency_type);

                balances[idx].amt = d.balance;
                balances[idx].uamt = d.ubalance;
                balances[idx].amt2 = utils.toOrginalNumber(
                    utils.cryptoToOtherCurrency(d.balance, Number(balances[idx].per_value),
                     (currency_type === constants.CURRENCY_TYPE.FLASH?10:0)));
                AsyncStorage.setItem('balances',JSON.stringify(balances));

                let total_fiat_balance = 0
                balances.map(bal => (total_fiat_balance += bal.amt2));
                let balance = (currency_type == params.currency_type)?balances[idx].amt:params.balance;
                let ubalance = (currency_type == params.currency_type)?balances[idx].uamt:params.ubalance;
                let fiat_balance = (currency_type == params.currency_type)?balances[idx].amt2:params.fiat_balance;
                let fiat_per_value = (currency_type == params.currency_type)?balances[idx].per_value:params.fiat_per_value;
                dispatch({
                    type: types.GET_BALANCE,
                    payload: {
                        balance,
                        ubalance,
                        sbalance:d.sbalance,
                        fiat_balance,
                        fiat_per_value,
                        balances,
                        total_fiat_balance,
                        balanceLoader: false,
                        infoMsg: refresh?('Updated Balance: '+
                        (currency_type === constants.CURRENCY_TYPE.FLASH?
                            utils.flashNFormatter(utils.satoshiToFlash(d.balance).toFixed(10)):
                            utils.flashNFormatter(d.balance.toFixed(8))) + ' ' +
                            utils.getCurrencyUnitUpcase( currency_type)):null
                    }
                });
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

export const getModulesStatus = () => {
    return (dispatch,getState) => {
        let params = getState().params;
        apis.getModulesStatus(params.profile.auth_version, params.profile.sessionToken)
        .then((d)=>{
            if(d.rc == 1){
                dispatch({
                    type: types.GET_MODULES_STATUS,
                    payload: {
                        module_status: d.modules
                    }
                });
            }else{
                dispatch({type: types.GET_MODULES_STATUS});
            }
        }).catch(e=>{
            console.log(e);
            dispatch({type: types.GET_MODULES_STATUS});
        })
    }
}

export const getProfile = () => {
    return (dispatch,getState) => {
        let params = getState().params;
        apis.getProfile(params.profile.auth_version, params.profile.sessionToken).then(async(d)=>{
            if(d.rc == 1){
                let profile = {...params.profile,...d.profile};
                await AsyncStorage.setItem('user',JSON.stringify(profile));
                dispatch({
                    type: types.GET_PROFILE,
                    payload: {
                        loading:false,
                        profile
                    }
                });
                Chat.reconnect(params.profile.auth_version, params.profile.sessionToken)
                .then((con)=>{
                    Chat.addListener('ru',(d)=>{
                        dispatch(chat.updateChatRoom(d))
                    });
                })
                .catch(e=>console.log(e))
                dispatch(htm.getHTMProfile());
                dispatch(txns.getMaxFees());
                dispatch(txns.getThresholdValues());
                dispatch(chat.savePushToken());
                dispatch(chat.getChatRooms());
                dispatch(wagering.getOracleProfileAccessList());
                dispatch(getFiatCurrencyRate());
                dispatch(getModulesStatus());
            }else if(d.rc == 3){
                dispatch({
                    type: types.CUSTOM_ACTION,
                    payload: {
                        loading:false,
                        errorMsg:d.reason,
                    }
                });
                constants.SOUND.ERROR.play();
                setTimeout(()=>_logout(dispatch),500);
            }else{
                dispatch({
                    type: types.GET_PROFILE,
                    payload: {
                        errorMsg:d.reason,
                        loading:false
                    }
                });
                constants.SOUND.ERROR.play();
            }
        }).catch(e=>{
            console.log(e);
            dispatch({
                type: types.GET_PROFILE,
                payload: {
                    errorMsg: e.message,
                    loading:false
                }
            });
            constants.SOUND.ERROR.play();
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
                constants.SOUND.ERROR.play();
                setTimeout(()=>_logout(dispatch),500);
            }else{
                dispatch({
                    type: types.UPDATE_PROFILE,
                    payload: {
                        errorMsg:d.reason,
                        loading:false
                    }
                });
                constants.SOUND.ERROR.play();
            }
        }).catch(e=>{
            dispatch({
                type: types.UPDATE_PROFILE,
                payload: {
                    errorMsg: e.message,
                    loading:false
                }
            });
            constants.SOUND.ERROR.play();
        })
    }
}

export const uploadProfileImage = (data) => {
    return (dispatch,getState) => {
        dispatch({ type: types.LOADING_START });
        let params = getState().params;
        apis.uploadProfileImage(params.profile.auth_version, params.profile.sessionToken, data).then((d)=>{
            if(d.rc == 1){
                let profile = {...params.profile, profile_pic_url : d.token};
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
                constants.SOUND.ERROR.play();
                setTimeout(()=>_logout(dispatch),500);
            }else{
                dispatch({
                    type: types.UPDATE_PROFILE,
                    payload: {
                        errorMsg:d.reason,
                        loading:false
                    }
                });
                constants.SOUND.ERROR.play();
            }
        }).catch(e=>{
            dispatch({
                type: types.UPDATE_PROFILE,
                payload: {
                    errorMsg: e.message,
                    loading:false
                }
            });
            constants.SOUND.ERROR.play();
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
                constants.SOUND.ERROR.play();
                setTimeout(()=>_logout(dispatch),500);
            }else{
                dispatch({
                    type: types.CHANGE_PASSWORD,
                    payload: {
                        errorMsg:d.reason,
                        loading:false
                    }
                });
                constants.SOUND.ERROR.play();
            }
        }).catch(e=>{
            dispatch({
                type: types.CHANGE_PASSWORD,
                payload: {
                    errorMsg: e.message,
                    loading:false
                }
            });
            constants.SOUND.ERROR.play();
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
                constants.SOUND.ERROR.play();
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
            constants.SOUND.ERROR.play();
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
                constants.SOUND.ERROR.play();
                setTimeout(()=>_logout(dispatch),500);
            }else{
                dispatch({
                    type: types.VERIFY_PHONE,
                    payload: {
                        verifyCodeErrorMsg:d.reason,
                    }
                });
                constants.SOUND.ERROR.play();
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
            constants.SOUND.ERROR.play();
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
                constants.SOUND.ERROR.play();
                setTimeout(()=>_logout(dispatch),500);
            }else{
                dispatch({
                    type: types.SET_RECOVERY_KEYS,
                    payload: {
                        errorMsg:d.reason,
                        loading:false
                    }
                });
                constants.SOUND.ERROR.play();
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
                let wallet = send.getActiveWallet(d.results, params.currency_type);
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

export const searchWallet = (term, loading=false, currency_type = null) => {
    return (dispatch,getState) => {
        if(loading) dispatch({ type: types.LOADING_START });
        let params = getState().params;
        apis.searchWallet(params.profile.auth_version, params.profile.sessionToken,
            currency_type || params.currency_type, term).then((d)=>{
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

export const isValidEmailForWallet = (email, profile, currency_type) => {
    return (dispatch,getState) => new Promise((resolve,reject) => {
        apis.searchWallet(profile.auth_version, profile.sessionToken,
            currency_type, email).then((d)=>{
            if(d.rc !== 1){
                reject(d.reason);
            }else if(d.total_wallets > 0){
                resolve(d.wallets[0]);
            }else{
                reject("Wallet not found!!");
            }
        }).catch(e=>reject(e.message))
    })
}

export const changeFiatCurrency = (fiat_currency) =>{
    return (dispatch,getState) => {
        let params = getState().params;
        let balances = params.balances
            .map((bal)=>({...bal,per_value:0,amt2:0}))
        dispatch({
            type: types.CHANGE_CURRENCY,
            payload:{
                fiat_currency,
                balances,
                fiat_balance:0,
                fiat_per_value:0,
                total_fiat_balance:0
            }
        });
        AsyncStorage.setItem('fiat_currency',fiat_currency.toString());
        if(params.profile) dispatch(getFiatCurrencyRate(true));
    }
}

export const changeCurrency = (currency_type) =>{
    return (dispatch,getState) => {
        dispatch({ type: types.LOADING_START });
        let params = getState().params;
        let balances = params.balances;
        let idx  =  balances.findIndex(bal => bal.currency_type === currency_type);
        let decryptedWallet = send.getActiveWallet(params.decryptedWallets, currency_type) || null;
        dispatch({
            type: types.CHANGE_CURRENCY,
            payload:{
                currency_type,
                balance: balances[idx].amt,
                ubalance: balances[idx].uamt,
                fiat_balance: balances[idx].amt2,
                fiat_per_value: balances[idx].per_value,
                bcMedianTxSize: 250,
                satoshiPerByte: 20,
                thresholdAmount: 0.00001,
                fixedTxnFee: 0.00002,
                recentTxns: [],
                totalPending: 0,
                decryptedWallet,
                refreshingHome:true,
                payout_info: null,
                sharing_code: [],
                payout_code: '',
                payout_code_is_locked: 0,
                payout_sharing_fee: 0,
            }
        });
        setTimeout(()=>{
            dispatch(getWalletsByEmail());
            dispatch(sharing.getPayoutCode());
            dispatch(sharing.getSharingCode());
            dispatch(reqs.getIncomingRequests(0,true));
            dispatch(reqs.getOutgoingRequests(0,true));
            dispatch(refreshingHome(false));
            if(currency_type !== constants.CURRENCY_TYPE.FLASH
                && currency_type !== constants.CURRENCY_TYPE.ETH
                && currency_type !== constants.CURRENCY_TYPE.DASH){
                dispatch(txns.setBcMedianTxSize());
                dispatch(txns.setSatoshiPerByte());
            }
            if(currency_type !== constants.CURRENCY_TYPE.FLASH)
                dispatch(txns.setThresholdAmount());

            if(currency_type === constants.CURRENCY_TYPE.FLASH)
                    dispatch(sharing.getPayoutInfo());

            if(currency_type === constants.CURRENCY_TYPE.DASH)
                dispatch(txns.setFixedTxnFee());

            if(currency_type === constants.CURRENCY_TYPE.ETH)
                dispatch(txns.setEtherGasValues());

            dispatch(txns.getAllTransactions(0,true));
            dispatch(txns.getSentTransactions(0,true));
            dispatch(txns.getReceivedTransactions(0,true));
        },100)
        setTimeout(()=>{
            dispatch({ type: types.LOADING_END });
        },500);
    }
}

export const setDevicePIN = (pin, isSet=false) =>{
    return async(dispatch,getState) => {
        await AsyncStorage.setItem('pin',pin.toString());
        if(!isSet){
            dispatch({ type: types.CREATE_PIN, payload:{pin}});
        }else{
            dispatch({ type: types.UPDATE_PIN, payload:{pin}});
        }

    }
}

export const setTouchID = (isEnableTouchID=false) =>{
    return async(dispatch,getState) => {
        await AsyncStorage.setItem('isEnableTouchID',isEnableTouchID.toString());
        dispatch({ type: types.ENABLE_DISABLE_TOUCH_ID, payload:{isEnableTouchID}});

    }
}

export const refreshingHome = (refresh=true) =>{
    return (dispatch,getState) => {
        dispatch({ type: types.LOADING, payload:{refreshingHome:true} });
        dispatch(getBalanceV2(getState().params.currency_type,refresh));
        dispatch(txns.getRecentTransactions());
    }
}

export const getFiatCurrencyRate = (loading=false) =>{
    return (dispatch,getState) => {
        if(loading)
            dispatch({
                type: types.CUSTOM_ACTION,
                payload: {balanceLoader:true}
            })

        const cb = (fiat_currency) => {
            if(loading) dispatch({
                type: types.CUSTOM_ACTION,
                payload: {balanceLoader:true}
            })
            let coinGeckoids = Object.values(constants.COIN_GECKO_CURRENCY_IDS).join(',');
            apis.getFiatCurrencyRateV2(coinGeckoids,fiat_currency).then((d)=>{
                if(!d){
                    if(loading) dispatch({
                        type: types.CUSTOM_ACTION,
                        payload: {balanceLoader:false}
                    })
                    return;
                }
                let params = getState().params;
                let balances = params.balances;
                let fiat_balance = params.fiat_balance;
                let fiat_per_value = params.fiat_per_value;
                balances.map((bal,idx) => {
                    bal.per_usd = d[constants.COIN_GECKO_CURRENCY_IDS[bal.currency_type]].usd;
                    bal.per_btc = d[constants.COIN_GECKO_CURRENCY_IDS[bal.currency_type]].btc;
                    let per_value = bal.per_usd;
                    if(fiat_currency !== constants.FIAT_CURRENCY.USD){
                        if(!!d[constants.COIN_GECKO_CURRENCY_IDS[bal.currency_type]][fiat_currency])
                            per_value = d[constants.COIN_GECKO_CURRENCY_IDS[bal.currency_type]][fiat_currency];
                        else per_value *= (params.fiat_per_usd || 0);
                    }
                    per_value = Number(per_value.toFixed(4));
                    let balance = (params.currency_type == bal.currency_type)?
                        params.balance:bal.amt;

                    bal.amt2 = utils.toOrginalNumber(
                        utils.cryptoToOtherCurrency(balance, Number(per_value),
                         (bal.currency_type === constants.CURRENCY_TYPE.FLASH?10:0)));
                    bal.per_value = per_value;

                    balances[idx] = bal;
                    if(bal.currency_type == params.currency_type){
                        fiat_balance = bal.amt2;
                        fiat_per_value = bal.per_value;
                    }
                });
                let total_fiat_balance = 0;
                balances.map(bal => (total_fiat_balance += bal.amt2));
                let payload = {
                    balances,
                    fiat_balance,
                    fiat_per_value,
                    total_fiat_balance
                }
                if(loading)
                    payload.balanceLoader = false;

                dispatch({
                    type: types.GET_COIN_MARKET_CAP_VALUE,
                    payload
                });

            }).catch(e=>{
                console.log(e)
                if(loading)
                    dispatch({
                        type: types.CUSTOM_ACTION,
                        payload: {balanceLoader:false}
                    })
            });
        }
        let fiat_currency = getState().params.fiat_currency;
        if(fiat_currency !== constants.FIAT_CURRENCY.USD)
            dispatch(exchanges.getFiatExchangeRates(()=>cb(fiat_currency)));
        else
            cb(fiat_currency);
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
                constants.SOUND.ERROR.play();
            }
        }).catch(e=>{
            dispatch({
                type: types.START_2FA,
                payload: {
                    errorMsg: e.message,
                    loading:false,
                }
            });
            constants.SOUND.ERROR.play();
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
                constants.SOUND.ERROR.play();
            }
        }).catch(e=>{
            dispatch({
                type: types.TURN_OFF_2FA_FAILED,
                payload: {
                    errorMsg: e.message,
                    loading:false,
                }
            });
            constants.SOUND.ERROR.play();
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
                constants.SOUND.ERROR.play();
            }
        }).catch(e=>{
            dispatch({
                type: types.CONFIRM_2FA_FAILED,
                payload: {
                    errorMsg: e.message,
                    loading:false,
                }
            });
            constants.SOUND.ERROR.play();
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
