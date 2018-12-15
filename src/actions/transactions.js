import * as types from '@actions/types'
import * as apis from '@flashAPIs';
import { _logout } from '@actions/navigation';

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
        dispatch(getSharingInTransactions());
        dispatch(getSharingOutTransactions());
        dispatch(getSharingUsageTransactions());
    }
}

export const getRecentTransactions = () => {
    return (dispatch,getState) => {
        let params = getState().params;
        apis.getTransactions(params.profile.auth_version, params.profile.sessionToken,
            params.currency_type, params.profile.created_ts).then((d)=>{
            if(d.rc !== 1){
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
            dispatch({ type: types.LOADING, payload:{refreshingHome:false} });
        }).catch(e=>{
            dispatch({
                type: types.GET_RECENT_TRANSACTIONS,
                payload: {
                    errorMsg: e.message,
                }
            });
            dispatch({ type: types.LOADING, payload:{refreshingHome:false} });
        })
    }
}

export const getAllTransactions = (start=0, reset=false) => {
    return (dispatch,getState) => {
        if(reset)
            dispatch({
                type: types.CUSTOM_ACTION,
                payload: {
                    allTxns_loading: true,
                    allTxns_retrieve: true,
                    allTxns_total: 0
                }
            });
        else
            dispatch({
                type: types.CUSTOM_ACTION,
                payload: {
                    allTxns_retrieve: true,
                }
            });
        let params = getState().params;
        let date_from = params.date_from.format('YYYY-MM-DDT00:00:00.000\\Z');
        let date_to = params.date_to.format('YYYY-MM-DDT23:59:59.000\\Z');
        apis.getTransactions(params.profile.auth_version, params.profile.sessionToken,
            params.currency_type, date_from, date_to, 0, start).then((d)=>{
            if(d.rc !== 1){
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
                        txns:d.txns,
                        reset
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

export const getSentTransactions = (start=0,reset=false) => {
    return (dispatch,getState) => {
        if(reset)
            dispatch({
                type: types.CUSTOM_ACTION,
                payload: {
                    sentTxns_loading: true,
                    sentTxns_retrieve: true,
                    sentTxns_total: 0
                }
            });
        else
            dispatch({
                type: types.CUSTOM_ACTION,
                payload: {
                    sentTxns_retrieve: true,
                }
            });
        let params = getState().params;
        let date_from = params.date_from.format('YYYY-MM-DDT00:00:00.000\\Z');
        let date_to = params.date_to.format('YYYY-MM-DDT23:59:59.000\\Z');
        apis.getTransactions(params.profile.auth_version, params.profile.sessionToken,
            params.currency_type, date_from, date_to, 1, start).then((d)=>{
            if(d.rc !== 1){
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
                        txns:d.txns,
                        reset
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

export const getReceivedTransactions = (start=0, reset=false) => {
    return (dispatch,getState) => {
        if(reset)
            dispatch({
                type: types.CUSTOM_ACTION,
                payload: {
                    receivedTxns_loading: true,
                    receivedTxns_retrieve: true,
                    receivedTxns_total: 0
                }
            });
        else
            dispatch({
                type: types.CUSTOM_ACTION,
                payload: {
                    receivedTxns_retrieve: true,
                }
            });
        let params = getState().params;
        let date_from = params.date_from.format('YYYY-MM-DDT00:00:00.000\\Z');
        let date_to = params.date_to.format('YYYY-MM-DDT23:59:59.000\\Z');
        apis.getTransactions(params.profile.auth_version, params.profile.sessionToken,
            params.currency_type, date_from, date_to, 2, start).then((d)=>{
            if(d.rc !== 1){
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
                        txns:d.txns,
                        reset
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

export const getSharingInTransactions = (start=0, reset=false) => {
    return (dispatch,getState) => {
        if(reset)
            dispatch({
                type: types.CUSTOM_ACTION,
                payload: {
                    sharingInTxns_loading: true,
                    sharingInTxns_retrieve: true,
                    sharingInTxns_total: 0
                }
            });
        else
            dispatch({
                type: types.CUSTOM_ACTION,
                payload: {
                    sharingInTxns_retrieve: true,
                }
            });
        let params = getState().params;
        let date_from = params.date_from.format('YYYY-MM-DDT00:00:00.000\\Z');
        let date_to = params.date_to.format('YYYY-MM-DDT23:59:59.000\\Z');
        apis.getTransactions(params.profile.auth_version, params.profile.sessionToken,
            params.currency_type, date_from, date_to, 3, start).then((d)=>{
            if(d.rc !== 1){
                dispatch({
                    type: types.GET_SHARING_IN_TRANSACTIONS,
                    payload: {
                        errorMsg:d.reason,
                    }
                });
            }else{
                dispatch({
                    type: types.GET_SHARING_IN_TRANSACTIONS,
                    payload: {
                        total_txns:d.total_txns,
                        txns:d.txns,
                        reset
                    }
                });
            }
        }).catch(e=>{
            dispatch({
                type: types.GET_SHARING_IN_TRANSACTIONS,
                payload: {
                    errorMsg: e.message,
                }
            });
        })
    }
}

export const getSharingOutTransactions = (start=0, reset=false) => {
    return (dispatch,getState) => {
        if(reset)
            dispatch({
                type: types.CUSTOM_ACTION,
                payload: {
                    sharingOutTxns_loading: true,
                    sharingOutTxns_retrieve: true,
                    sharingOutTxns_total: 0
                }
            });
        else
            dispatch({
                type: types.CUSTOM_ACTION,
                payload: {
                    sharingOutTxns_retrieve: true,
                }
            });
        let params = getState().params;
        let date_from = params.date_from.format('YYYY-MM-DDT00:00:00.000\\Z');
        let date_to = params.date_to.format('YYYY-MM-DDT23:59:59.000\\Z');
        apis.getTransactions(params.profile.auth_version, params.profile.sessionToken,
            params.currency_type, date_from, date_to, 4, start).then((d)=>{
            if(d.rc !== 1){
                dispatch({
                    type: types.GET_SHARING_OUT_TRANSACTIONS,
                    payload: {
                        errorMsg:d.reason,
                    }
                });
            }else{
                dispatch({
                    type: types.GET_SHARING_OUT_TRANSACTIONS,
                    payload: {
                        total_txns:d.total_txns,
                        txns:d.txns,
                        reset
                    }
                });
            }
        }).catch(e=>{
            dispatch({
                type: types.GET_SHARING_OUT_TRANSACTIONS,
                payload: {
                    errorMsg: e.message,
                }
            });
        })
    }
}

export const getSharingUsageTransactions = (start=0, reset=false) => {
    return (dispatch,getState) => {
        if(reset)
            dispatch({
                type: types.CUSTOM_ACTION,
                payload: {
                    sharingUsageTxns_loading: true,
                    sharingUsageTxns_retrieve: true,
                    sharingUsageTxns_total: 0,
                    sharingUsageTxns_total_sharing_fee: 0
                }
            });
        else
            dispatch({
                type: types.CUSTOM_ACTION,
                payload: {
                    sharingUsageTxns_retrieve: true,
                }
            });
        let params = getState().params;
        let date_from = params.date_from.format('YYYY-MM-DDT00:00:00.000\\Z');
        let date_to = params.date_to.format('YYYY-MM-DDT23:59:59.000\\Z');
        apis.getTransactions(params.profile.auth_version, params.profile.sessionToken,
            params.currency_type, date_from, date_to, 5, start).then((d)=>{
            if(d.rc !== 1){
                dispatch({
                    type: types.GET_SHARING_USAGE_TRANSACTIONS,
                    payload: {
                        errorMsg:d.reason,
                    }
                });
            }else{
                dispatch({
                    type: types.GET_SHARING_USAGE_TRANSACTIONS,
                    payload: {
                        total_txns:d.total_txns,
                        total_sharing_fee:d.total_sharing_fee,
                        txns:d.txns,
                        reset
                    }
                });
            }
        }).catch(e=>{
            dispatch({
                type: types.GET_SHARING_USAGE_TRANSACTIONS,
                payload: {
                    errorMsg: e.message,
                }
            });
        })
    }
}

export const getTransactionDetail = (transaction_id) => {
    return (dispatch,getState) => {
        dispatch({
            type: types.CUSTOM_ACTION,
            payload: {
                txnLoader: true,
                txnDetail: null
            }
        });
        let params = getState().params;
        apis.getTransactionDetail(params.profile.auth_version, params.profile.sessionToken,
            transaction_id, params.currency_type).then((d)=>{
            if(d.rc == 3){
                dispatch({
                    type: types.GET_TRANSACTION_DETAIL,
                    payload: {
                        errorMsg:d.reason,
                        txnLoader: false,
                    }
                });
                setTimeout(()=>_logout(dispatch),500);
            }else if(d.rc !== 1){
                dispatch({
                    type: types.GET_TRANSACTION_DETAIL,
                    payload: {
                        errorMsg:d.reason,
                        txnLoader: false,
                    }
                });
            }else{
                dispatch({
                    type: types.GET_TRANSACTION_DETAIL,
                    payload: {
                        txnDetail:d.transaction,
                        txnLoader: false,
                    }
                });
            }
        }).catch(e=>{
            dispatch({
                type: types.GET_TRANSACTION_DETAIL,
                payload: {
                    errorMsg: e.message,
                    txnLoader: false,
                }
            });
        })
    }
}

export const getSharingTransactionDetail = (transaction_id) => {
    return (dispatch,getState) => {
        dispatch({
            type: types.CUSTOM_ACTION,
            payload: {
                txnLoader: true,
                txnDetail: null
            }
        });
        let params = getState().params;
        apis.getSharingTransactionDetail(params.profile.auth_version, params.profile.sessionToken,
            transaction_id, params.currency_type).then((d)=>{
            if(d.rc == 3){
                dispatch({
                    type: types.GET_SHARING_TRANSACTION_DETAIL,
                    payload: {
                        errorMsg:d.reason,
                        txnLoader: false,
                    }
                });
                setTimeout(()=>_logout(dispatch),500);
            }else if(d.rc !== 1){
                dispatch({
                    type: types.GET_SHARING_TRANSACTION_DETAIL,
                    payload: {
                        errorMsg:d.reason,
                        txnLoader: false,
                    }
                });
            }else{
                dispatch({
                    type: types.GET_SHARING_TRANSACTION_DETAIL,
                    payload: {
                        txnDetail:d.transactions,
                        txnLoader: false,
                    }
                });
            }
        }).catch(e=>{
            dispatch({
                type: types.GET_SHARING_TRANSACTION_DETAIL,
                payload: {
                    errorMsg: e.message,
                    txnLoader: false,
                }
            });
        })
    }
}

export const setBcMedianTxSize = (currency_type=null) => {
    return (dispatch,getState) => {
        let params = getState().params;
        apis.bcMedianTxSize(params.profile.auth_version, params.profile.sessionToken,
            currency_type || params.currency_type).then((d)=>{
            if(d.rc !== 1){
                dispatch({
                    type: types.SET_BC_MEDIAN_TX_SIZE,
                    payload: {
                        errorMsg:d.reason,
                    }
                });
            }else{
                payload = {};
                payload[`${currency_type?'trade_':''}bcMedianTxSize`] = d.median_tx_size;
                dispatch({
                    type: types.SET_BC_MEDIAN_TX_SIZE,
                    payload
                });
            }
        }).catch(e=>{
            dispatch({
                type: types.SET_BC_MEDIAN_TX_SIZE,
                payload: {
                    errorMsg: e.message,
                }
            });
        })
    }
}

export const setThresholdAmount = (currency_type=null) => {
    return (dispatch,getState) => {
        let params = getState().params;
        apis.thresholdAmount(params.profile.auth_version, params.profile.sessionToken,
            currency_type || params.currency_type).then((d)=>{
            if(d.rc !== 1){
                dispatch({
                    type: types.SET_THRESHOLD_AMOUNT,
                    payload: {
                        errorMsg:d.reason,
                    }
                });
            }else{
                payload = {};
                payload[`${currency_type?'trade_':''}thresholdAmount`] = d.threshold_amount;
                dispatch({
                    type: types.SET_THRESHOLD_AMOUNT,
                    payload
                });
            }
        }).catch(e=>{
            dispatch({
                type: types.SET_THRESHOLD_AMOUNT,
                payload: {
                    errorMsg: e.message,
                }
            });
        })
    }
}

export const setSatoshiPerByte = (currency_type=null) => {
    return (dispatch,getState) => {
        let params = getState().params;
        apis.getSatoshiPerByte(currency_type || params.currency_type)
        .then((satoshiPerByte)=>{
            let payload = {};
            payload[`${currency_type?'trade_':''}satoshiPerByte`] = satoshiPerByte;
            dispatch({
                type: types.SET_SATOSHI_PER_BYTE,
                payload
            });
        }).catch(e=>{
            dispatch({
                type: types.SET_SATOSHI_PER_BYTE,
                payload: {
                    errorMsg: e.message,
                }
            });
        })
    }
}

export const setFixedTxnFee = (currency_type=null) => {
    return (dispatch,getState) => {
        let params = getState().params;
        apis.fixedTxnFee(params.profile.auth_version, params.profile.sessionToken,
            currency_type || params.currency_type).then((d)=>{
            if(d.rc == 1){
                let payload = {};
                payload[`${currency_type?'trade_':''}fixedTxnFee`] = d.fixed_txn_fee;
                dispatch({
                    type: types.SET_FIXED_TXN_FEE,
                    payload
                });
            }
        }).catch(e=>{
            dispatch({
                type: types.SET_FIXED_TXN_FEE,
                payload: {
                    errorMsg: e.message,
                }
            });
        })
    }
}

export const setEtherGasValues = (currency_type=null) => {
    return (dispatch,getState) => {
        let params = getState().params;
        apis.getEtherGasValues(params.profile.auth_version, params.profile.sessionToken,
            currency_type || params.currency_type).then((d)=>{
            if(d.rc == 1 && d.gas_price && d.gas_limit){
                let payload = {};
                payload[`${currency_type?'trade_':''}satoshiPerByte`] = parseInt(d.gas_price);
                payload[`${currency_type?'trade_':''}bcMedianTxSize`] = parseInt(d.gas_limit);
                dispatch({
                    type: types.SET_ETHER_GAS_VALUES,
                    payload
                });
            }
        }).catch(e=>{
            dispatch({
                type: types.SET_ETHER_GAS_VALUES,
                payload: {
                    errorMsg: e.message,
                }
            });
        })
    }
}
