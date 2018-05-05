import {
    AsyncStorage
} from 'react-native';
import * as types from '@actions/types'
import * as constants from '@src/constants';
import apis from '@flashAPIs'
import moment from 'moment-timezone';
import { getBalance } from '@actions/account'
import { updateTransactionReportDate, getRecentTransactions } from '@actions/transactions'
import { updateRequestReportDate, markSentMoneyRequests } from '@actions/request'

export const rawTransaction = (amount=0, custom_fee=0, receiver_public_address='', memo='',
    receiver_bare_uid=null, receiver_id=null, request_id=0) => {
    return (dispatch,getState) => {
        dispatch({ type: types.LOADING_START });
        let params = getState().params;
        apis.rawTransaction(params.profile.auth_version, params.profile.sessionToken,
            params.currency_type, amount, custom_fee, receiver_public_address, memo).then((d)=>{
            if(d.rc == 1){
                dispatch({type: types.RAW_TRANSACTION});
                let wallet = getActiveWallet(params.decryptedWallets, params.currency_type);
                let tx = wallet.signTx(d.transaction.rawtx);
                let ip = params.ip;
                dispatch(addTransaction(amount, ip, memo, receiver_bare_uid, receiver_id,
                    receiver_public_address, tx.toHex(), tx.getId(), request_id));
            }else{
                dispatch({
                    type: types.RAW_TRANSACTION,
                    payload: {
                        errorMsg:d.reason,
                        loading: false
                    }
                });
            }
        }).catch(e=>{
            dispatch({
                type: types.RAW_TRANSACTION,
                payload: {
                    errorMsg: e.message,
                    loading: false
                }
            });
        })
    }
}

export const addTransaction = (amount, ip, memo, receiver_bare_uid, receiver_id,
        receiver_public_address, transaction_hex, transaction_id, request_id) => {
    return (dispatch,getState) => {
        let params = getState().params;
        apis.addTransaction(params.profile.auth_version, params.profile.sessionToken,
            params.currency_type, amount, ip, memo, receiver_bare_uid, receiver_id,
            receiver_public_address, transaction_hex, transaction_id).then((d)=>{
            if(d.rc == 1){
                dispatch({type: types.ADD_TRANSACTION});
                if(receiver_bare_uid) dispatch(addRoster(receiver_bare_uid));
                if(request_id && request_id>0) dispatch(markSentMoneyRequests(request_id, receiver_bare_uid, memo));
                dispatch(transactionById(d.id, 0, amount, ip, memo, receiver_bare_uid, receiver_id,
                    receiver_public_address, transaction_hex, transaction_id));
            }else{
                dispatch({
                    type: types.ADD_TRANSACTION,
                    payload: {
                        errorMsg:d.reason,
                        loading: false
                    }
                });
            }
        }).catch(e=>{
            dispatch({
                type: types.ADD_TRANSACTION,
                payload: {
                    errorMsg: e.message,
                    loading: false
                }
            });
        })
    }
}

export const transactionById = (id, index, amount, ip, memo, receiver_bare_uid,
    receiver_id, receiver_public_address, transaction_hex, transaction_id) => {
    return (dispatch,getState) => {
        let params = getState().params;
        apis.transactionById(params.profile.auth_version, params.profile.sessionToken,
            params.currency_type, amount, ip, memo, receiver_bare_uid, receiver_id,
            receiver_public_address, transaction_hex, transaction_id).then((d)=>{
            if(d.rc !== 1){
                dispatch({
                    type: types.TRANSACTION_BY_ID,
                    payload: {
                        errorMsg:d.reason,
                        loading: false
                    }
                });
            }else{
                if(d.txn.status > 0 || params.currency_type !== constants.CURRENCY_TYPE.FLASH){
                    dispatch({
                        type: types.TRANSACTION_BY_ID,
                        payload: {
                            sendTxnSuccess: d.txn,
                            loading: false
                        }
                    });
                    dispatch(getBalance(true));
                    dispatch(getRecentTransactions());
                    dispatch(updateTransactionReportDate(params.date_from, params.date_to));
                    dispatch(updateRequestReportDate(params.pending_date_from, params.pending_date_to));
                }else if(index === 4){
                    dispatch({
                        type: types.TRANSACTION_BY_ID,
                        payload: {
                            sendTxnSuccess: {
                                amount,
                                currency_type: params.currency_type,
                                id,
                                processing_duration: 2,
                                receiver_id,
                                sender_id: params.profile.username,
                                status: 1,
                            },
                            loading: false
                        }
                    });
                    dispatch(getBalance(true));
                    dispatch(getRecentTransactions());
                    dispatch(updateTransactionReportDate(params.date_from, params.date_to));
                    dispatch(updateRequestReportDate(params.pending_date_from, params.pending_date_to));
                }else{
                    dispatch(transactionById(id,(index+1),amount, ip, memo, receiver_bare_uid, receiver_id,
                        receiver_public_address, transaction_hex, transaction_id));
                }
            }
        }).catch(e=>{
            console.log(e);
            dispatch({
                type: types.TRANSACTION_BY_ID,
                payload: {
                    errorMsg: e.message,
                    loading: false
                }
            });
        })
    }
}

export const addRoster = (bare_uid='') => {
    return (dispatch,getState) => {
        let params = getState().params;
        apis.addRoster(params.profile.auth_version,
            params.profile.sessionToken, bare_uid).then((d)=>{
            if(d.rc !== 1){
                dispatch({
                    type: types.ADD_ROASTER,
                    payload: {
                        errorMsg:d.reason
                    }
                });
            }else{
                dispatch({type: types.ADD_ROASTER});
            }
        }).catch(e=>{
            dispatch({
                type: types.ADD_ROASTER,
                payload: {
                    errorMsg: e.message
                }
            });
        })
    }
}

export const getActiveWallet= (wallets, currency_type) => {
    let currency_wallets = wallets.filter((wallet) => {
      if(parseInt(wallet.currency_type) == currency_type)
        return true;
      else
        return false;
    });
    return currency_wallets[0];
  }
