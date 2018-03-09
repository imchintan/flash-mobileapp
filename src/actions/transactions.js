import {
    AsyncStorage
} from 'react-native';
import * as types from '@actions/types'
import apis from '@flashAPIs'
import moment from 'moment';

export const updateTransactionReportDate = (date_from,date_to) => {
    return (dispatch,getState) => {
        dispatch({
            type: types.UPDATE_TRANSACTION_REPORT_DATE,
            payload: {
                date_from,
                date_to,
            }
        });
        dispatch({
            type: types.RESET_TRANSACTIONS,
            payload: {
                date_from,
                date_to,
            }
        });
        dispatch(getAllTransactions());
        dispatch(getSentTransactions());
        dispatch(getReceivedTransactions());
    }
}

export const getRecentTransactions = () => {
    return (dispatch,getState) => {
        let params = getState().params;
        apis.getTransactions(params.profile.sessionToken,params.currencyType,params.profile.created_ts).then((d)=>{
            if(d.rc == 2){
                dispatch({
                    type: types.GET_RECENT_TRANSACTIONS,
                    payload: {
                        errorMsg:d.reason,
                    }
                });
            }else{
                dispatch({
                    type: types.GET_RECENT_TRANSACTIONS,
                    payload: {
                        total_txns:d.total_txns,
                        txns:d.txns
                    }
                });
            }
        }).catch(e=>{
            dispatch({
                type: types.GET_RECENT_TRANSACTIONS,
                payload: {
                    errorMsg: e.message,
                }
            });
        })
    }
}

export const getAllTransactions = (start=0) => {
    return (dispatch,getState) => {
        let params = getState().params;
        let date_from = params.date_from.format('YYYY-MM-DDTHH:mm:00.000\\Z');
        let date_to = params.date_to.format('YYYY-MM-DDTHH:mm:00.000\\Z');
        apis.getTransactions(params.profile.sessionToken,params.currencyType,date_from,date_to,0,start).then((d)=>{
            if(d.rc == 2){
                dispatch({
                    type: types.GET_ALL_TRANSACTIONS,
                    payload: {
                        errorMsg:d.reason,
                    }
                });
            }else{
                dispatch({
                    type: types.GET_ALL_TRANSACTIONS,
                    payload: {
                        total_txns:d.total_txns,
                        txns:d.txns
                    }
                });
            }
        }).catch(e=>{
            dispatch({
                type: types.GET_ALL_TRANSACTIONS,
                payload: {
                    errorMsg: e.message,
                }
            });
        })
    }
}

export const getSentTransactions = (start=0) => {
    return (dispatch,getState) => {
        let params = getState().params;
        let date_from = params.date_from.format('YYYY-MM-DDTHH:mm:00.000\\Z');
        let date_to = params.date_to.format('YYYY-MM-DDTHH:mm:00.000\\Z');
        apis.getTransactions(params.profile.sessionToken,params.currencyType,date_from,date_to,1,start).then((d)=>{
            if(d.rc == 2){
                dispatch({
                    type: types.GET_SENT_TRANSACTIONS,
                    payload: {
                        errorMsg:d.reason,
                    }
                });
            }else{
                dispatch({
                    type: types.GET_SENT_TRANSACTIONS,
                    payload: {
                        total_txns:d.total_txns,
                        txns:d.txns
                    }
                });
            }
        }).catch(e=>{
            dispatch({
                type: types.GET_SENT_TRANSACTIONS,
                payload: {
                    errorMsg: e.message,
                }
            });
        })
    }
}

export const getReceivedTransactions = (start=0) => {
    return (dispatch,getState) => {
        let params = getState().params;
        let date_from = params.date_from.format('YYYY-MM-DDTHH:mm:00.000\\Z');
        let date_to = params.date_to.format('YYYY-MM-DDTHH:mm:00.000\\Z');
        apis.getTransactions(params.profile.sessionToken,params.currencyType,date_from,date_to,2,start).then((d)=>{
            if(d.rc == 2){
                dispatch({
                    type: types.GET_RECEIVED_TRANSACTIONS,
                    payload: {
                        errorMsg:d.reason,
                    }
                });
            }else{
                dispatch({
                    type: types.GET_RECEIVED_TRANSACTIONS,
                    payload: {
                        total_txns:d.total_txns,
                        txns:d.txns
                    }
                });
            }
        }).catch(e=>{
            dispatch({
                type: types.GET_RECEIVED_TRANSACTIONS,
                payload: {
                    errorMsg: e.message,
                }
            });
        })
    }
}
