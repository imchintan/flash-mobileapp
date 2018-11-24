import {
    AsyncStorage
} from 'react-native';
import * as types from '@actions/types'
import * as send from '@actions/send';
import * as account from '@actions/account';
import * as constants from '@src/constants';
import apis from '@flashAPIs'

const Toast =  require('@components/Toast');

export const wageringInit = () => {
    return (dispatch,getState) => {
        let params = getState().params;
        let balances = params.balances;
        let currency_type = constants.CURRENCY_TYPE.FLASH;
        let idx  =  balances.findIndex(bal => bal.currency_type === currency_type);
        let decryptedWallet = send.getActiveWallet(params.decryptedWallets, currency_type) || null;
        dispatch({
            type: types.WAGERING_INIT,
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
        account.getBalance();
    }
}

export const getOracleEvents = () => {
    return (dispatch,getState) => {
        dispatch({ type: types.LOADING_START });
        let params = getState().params;
        apis.getOracleEvents(params.profile.auth_version, params.profile.sessionToken)
            .then((d)=>{
            if(d.rc !== 1){
                dispatch({
                    type: types.GET_ORACLE_EVENTS,
                    payload: { loading: false }
                });
            }else{
                dispatch({
                    type: types.GET_ORACLE_EVENTS,
                    payload: {
                        oracleEvents: d.events,
                        loading: false
                    }
                });
            }
        }).catch(e=>{
            console.log(e);
            dispatch({
                type: types.GET_ORACLE_EVENTS,
                payload: { loading: false }
            });
        })
    }
}

export const getOracleEvent = () => {
    return (dispatch,getState) => {
        dispatch({ type: types.LOADING_START });
        let params = getState().params;
        let oracleEvent = params.oracleEvent;
        apis.getOracleEvent(params.profile.auth_version, params.profile.sessionToken, oracleEvent.id)
            .then((d)=>{
            if(d.rc !== 1){
                dispatch({
                    type: types.GET_ORACLE_EVENT,
                    payload: { loading: false }
                });
            }else{
                dispatch({
                    type: types.GET_ORACLE_EVENT,
                    payload: {
                        oracleEvent: {
                            ...oracleEvent,
                            ...d.event
                        },
                        loading: false
                    }
                });
            }
        }).catch(e=>{
            console.log(e);
            dispatch({
                type: types.GET_ORACLE_EVENT,
                payload: { loading: false }
            });
        })
    }
}

export const setupOracleProfile = (data, goBack) => {
    return (dispatch,getState) => {
        dispatch({ type: types.LOADING_START });
        let params = getState().params;
        apis.setupOracleProfile(params.profile.auth_version,
            params.profile.sessionToken, data).then((d)=>{
            if(d.rc !== 1){
                Toast.errorTop(d.reason);
                dispatch({
                    type: types.SETUP_ORACLE_PROFILE,
                    payload: { loading: false }
                });
            }else{
                Toast.successTop("Wagering Profile setup successfully.")
                dispatch({
                    type: types.SETUP_ORACLE_PROFILE,
                    payload: { loading: false }
                });
                dispatch(getOracleProfile());
                goBack();
            }
        }).catch(e=>{
            Toast.errorTop(e.message);
            dispatch({
                type: types.SETUP_ORACLE_PROFILE,
                payload: { loading: false }
            });
        })
    }
}

export const updateOracleProfile = (data,goBack) => {
    return (dispatch,getState) => {
        dispatch({ type: types.LOADING_START });
        let params = getState().params;
        apis.updateOracleProfile(params.profile.auth_version, params.profile.sessionToken,
            data).then((d)=>{
            if(d.rc !== 1){
                Toast.errorTop(d.reason);
                dispatch({
                    type: types.UPDATE_ORACLE_PROFILE,
                    payload: { loading: false }
                });
            }else{
                Toast.successTop("Wagering Profile updated successfully")
                dispatch({
                    type: types.UPDATE_ORACLE_PROFILE,
                    payload: { loading: false }
                });
                dispatch(getOracleProfile());
                goBack();
            }
        }).catch(e=>{
            Toast.errorTop(e.message);
            dispatch({
                type: types.UPDATE_ORACLE_PROFILE,
                payload: { loading: false }
            });
        })
    }
}

export const getOracleProfile = () => {
    return (dispatch,getState) => {
        let params = getState().params;
        apis.getOracleProfile(params.profile.auth_version,
            params.profile.sessionToken).then((d)=>{
            if(d.rc !== 1){
                // Toast.errorTop(d.reason);
                dispatch({ type: types.GET_ORACLE_PROFILE });
            }else{
                dispatch({
                    type: types.GET_ORACLE_PROFILE,
                    payload: { oracleProfile: d.profile }
                });
                AsyncStorage.setItem('oracleProfile', JSON.stringify(d.profile));
            }
        }).catch(e=>{
            console.log(e);
            Toast.errorTop(e.message);
            dispatch({ type: types.GET_ORACLE_PROFILE });
        })
    }
}

export const enableOracleProfile = () => {
    return (dispatch,getState) => {
        dispatch({ type: types.LOADING_START });
        let params = getState().params;
        apis.enableOracleProfile(params.profile.auth_version,
            params.profile.sessionToken).then((d)=>{
            if(d.rc !== 1){
                Toast.errorTop(d.reason);
                dispatch({
                    type: types.ENABLE_ORACLE_PROFILE,
                    payload: { loading: false }
                });
            }else{
                params.oracleProfile.is_active = 1;
                Toast.successTop("Your wagering profile activate successfully.")
                dispatch({
                    type: types.ENABLE_ORACLE_PROFILE,
                    payload: {
                        oracleProfile: params.oracleProfile,
                        loading: false
                    }
                });
                // dispatch(getOracleProfile());
            }
        }).catch(e=>{
            Toast.errorTop(e.message);
            dispatch({
                type: types.ENABLE_ORACLE_PROFILE,
                payload: { loading: false }
            });
        })
    }
}

export const disableOracleProfile = (cb=null) => {
    return (dispatch,getState) => {
        dispatch({ type: types.LOADING_START });
        let params = getState().params;
        apis.disableOracleProfile(params.profile.auth_version,
            params.profile.sessionToken).then((d)=>{
            if(d.rc !== 1){
                Toast.errorTop(d.reason);
                dispatch({
                    type: types.DISABLE_ORACLE_PROFILE,
                    payload: { loading: false }
                });
            }else{
                params.oracleProfile.is_active = 0;
                Toast.successTop("Your wagering profile deactivate successfully.")
                dispatch({
                    type: types.DISABLE_ORACLE_PROFILE,
                    payload: {
                        oracleProfile: params.oracleProfile,
                        loading: false
                    }
                });
                // dispatch(getOracleProfile());
                if(cb) cb();
            }
        }).catch(e=>{
            Toast.errorTop(e.message);
            dispatch({
                type: types.DISABLE_ORACLE_PROFILE,
                payload: { loading: false }
            });
        })
    }
}

export const addOracleEvent = (data, goBack) => {
    return (dispatch,getState) => {
        dispatch({ type: types.LOADING_START });
        let params = getState().params;
        apis.addOracleEvent(params.profile.auth_version,
            params.profile.sessionToken, data).then((d)=>{
            if(d.rc !== 1){
                Toast.errorTop(d.reason);
                dispatch({
                    type: types.CREATE_ORACLE_EVENT,
                    payload: { loading: false }
                });
            }else{
                Toast.successTop("Event created successfully.")
                dispatch({
                    type: types.CREATE_ORACLE_EVENT,
                    payload: { loading: false }
                });
                dispatch(getMyOracleEvents());
                goBack();
            }
        }).catch(e=>{
            Toast.errorTop(e.message);
            dispatch({
                type: types.CREATE_ORACLE_EVENT,
                payload: { loading: false }
            });
        })
    }
}

export const updateOracleEvent = (id, data) => {
    return (dispatch,getState) => {
        dispatch({ type: types.LOADING_START });
        let params = getState().params;
        apis.updateOracleEvent(params.profile.auth_version,
            params.profile.sessionToken, id, data).then((d)=>{
            if(d.rc !== 1){
                Toast.errorTop(d.reason);
                dispatch({
                    type: types.UPDATE_ORACLE_EVENT,
                    payload: { loading: false }
                });
            }else{
                Toast.successTop("Event updated successfully")
                dispatch({
                    type: types.UPDATE_ORACLE_EVENT,
                    payload: { loading: false }
                });
                dispatch(getMyOracleEvents());
                dispatch(getOracleEvent());
            }
        }).catch(e=>{
            Toast.errorTop(e.message);
            dispatch({
                type: types.UPDATE_ORACLE_EVENT,
                payload: { loading: false }
            });
        })
    }
}

export const getMyOracleEvents = (refresh=false) => {
    return (dispatch,getState) => {
        if(refresh) dispatch({ type: types.LOADING_START });
        let params = getState().params;
        let payload = refresh?{loading:false}:{}
        apis.getMyOracleEvents(params.profile.auth_version, params.profile.sessionToken)
            .then((d)=>{
            if(d.rc !== 1){
                dispatch({
                    type: types.GET_MY_ORACLE_EVENTS,
                    payload
                });
            }else{
                let myOracleEvents =  d.events;
                let currnt_time = new Date().getTime();
                myOracleEvents.sort((e1,e2) =>{
                    if(e1.status == e2.status){
                        if(currnt_time < e1.expires_on_ts && currnt_time < e2.expires_on_ts){
                            if(e1.expires_on_ts < e2.expires_on_ts) return -1;
                            else return 1;
                        } else if(currnt_time < e1.expires_on_ts) {
                            return -1;
                        } else if(currnt_time < e2.expires_on_ts) {
                            return 1;
                        } else if(e1.ends_on_ts < e2.ends_on_ts){
                            return 1;
                        } else{
                            return -1;
                        }
                    } else if(e1.status == constants.ORACLE_EVENT.CANCELLED_OR_ABANDONED){
                        return 1;
                    } else {
                        return -1;
                    }

                })
                payload.myOracleEvents = myOracleEvents;
                dispatch({
                    type: types.GET_MY_ORACLE_EVENTS,
                    payload
                });
            }
        }).catch(e=>{
            console.log(e);
            dispatch({
                type: types.GET_MY_ORACLE_EVENTS,
                payload
            });
        })
    }
}

export const declareOracleEventResult = (id, result, winner, cancel_reason) => {
    return (dispatch,getState) => {
        dispatch({ type: types.LOADING_START });
        let params = getState().params;
        apis.declareOracleEventResult(params.profile.auth_version,
            params.profile.sessionToken, id, { result, winner, cancel_reason }).then((d)=>{
            if(d.rc !== 1){
                Toast.errorTop(d.reason);
                dispatch({
                    type: types.DECLARE_ORACLE_EVENT_RESULT,
                    payload: { loading: false }
                });
            }else{
                if(result == 1)
                    Toast.successTop("Winner declared successfully.");
                else if(result == 2)
                    Toast.successTop("Event declared as Tie successfully.");
                else if(result == 3)
                    Toast.successTop("Event cancelled successfully.");

                dispatch({
                    type: types.DECLARE_ORACLE_EVENT_RESULT,
                    payload: { loading: false }
                });
                dispatch(getMyOracleEvents());
                dispatch(getOracleEvent());
            }
        }).catch(e=>{
            Toast.errorTop(e.message);
            dispatch({
                type: types.DECLARE_ORACLE_EVENT_RESULT,
                payload: { loading: false }
            });
        })
    }
}

export const getMyActiveOracleEvents = (refresh=false) => {
    return (dispatch,getState) => {
        if(refresh) dispatch({ type: types.LOADING_START });
        let params = getState().params;
        let payload = refresh?{loading:false}:{};
        apis.getMyActiveOracleEvents(params.profile.auth_version, params.profile.sessionToken)
            .then((d)=>{
            if(d.rc !== 1){
                dispatch({
                    type: types.GET_MY_ACTIVE_ORACLE_EVENTS,
                    payload
                });
            }else{
                let activeOracleEvents =  d.events;
                let currnt_time = new Date().getTime();
                activeOracleEvents.sort((e1,e2) =>{
                    if(e1.status == e2.status){
                        if(currnt_time < e1.expires_on_ts && currnt_time < e2.expires_on_ts){
                            if(e1.expires_on_ts < e2.expires_on_ts) return -1;
                            else return 1;
                        } else if(currnt_time < e1.expires_on_ts) {
                            return -1;
                        } else if(currnt_time < e2.expires_on_ts) {
                            return 1;
                        } else if(e1.ends_on_ts < e2.ends_on_ts){
                            return 1;
                        } else{
                            return -1;
                        }
                    } else if(e1.status == constants.ORACLE_EVENT.CANCELLED_OR_ABANDONED){
                        return 1;
                    } else if(e2.status == constants.ORACLE_EVENT.CANCELLED_OR_ABANDONED){
                        return -1;
                    } else if(e1.status !== constants.ORACLE_EVENT.ACTIVE_WAITING_FOR_RESULT){
                        return 1;
                    } else {
                        return -1;
                    }

                })
                payload.activeOracleEvents = activeOracleEvents;
                dispatch({
                    type: types.GET_MY_ACTIVE_ORACLE_EVENTS,
                    payload
                });
            }
        }).catch(e=>{
            console.log(e);
            dispatch({
                type: types.GET_MY_ACTIVE_ORACLE_EVENTS,
                payload
            });
        })
    }
}

export const addOracleWager = (event_id, receiver_address, p, amount) => {
    return (dispatch,getState) => {
        dispatch({ type: types.LOADING_START });
        let params = getState().params;
        let signed_tx = '';
        apis.rawTransaction(params.profile.auth_version, params.profile.sessionToken,
            constants.CURRENCY_TYPE.FLASH, amount, 0, receiver_address, null).then((d)=>{
            if(d.rc == 1){
                let wallet = params.decryptedWallet;
                let tx = wallet.signTx(d.transaction.rawtx);
                apis.addOracleWager(params.profile.auth_version, params.profile.sessionToken,
                    event_id, p, amount, tx.toHex(), tx.getId()).then((d)=>{
                    dispatch({
                        type: types.ADD_ORACLE_WAGER,
                        payload: { loading: false }
                    });
                    if(d.rc !== 1){
                        Toast.errorTop(d.reason)
                    }else{
                        dispatch(getOracleEvent());
                        dispatch(getMyActiveOracleEvents());
                        dispatch(getOracleEvents());
                        dispatch(account.getBalance(true));
                        Toast.successTop("Wager added successfully.")
                    }
                }).catch(e=>{
                    console.log(e);
                    dispatch({
                        type: types.ADD_ORACLE_WAGER,
                        payload: { loading: false }
                    });
                })
            }else{
                Toast.errorTop(d.reason)
                dispatch({
                    type: types.ADD_ORACLE_WAGER,
                    payload: { loading: false }
                });
            }
        }).catch(e=>{
            console.log(e);
            Toast.errorTop("Something went wrong, please try again!")
            dispatch({
                type: types.ADD_ORACLE_WAGER,
                payload: { loading: false }
            });
        });
    }
}

export const viewWagerEventDetail = (event, cb) => {
    return (dispatch,getState) => {
        dispatch({
            type: types.VIEW_ORACLE_EVENT,
            payload: {
                oracleEvent:event
            }
         });
        if(cb)cb();
    }
}
