import {
    AsyncStorage
} from 'react-native';
import * as types from '@actions/types'
import apis from '@flashAPIs'
import moment from 'moment-timezone';

export const addMoneyRequest = (amount=0, bare_uid='', to='', note='') => {
    return (dispatch,getState) => {
        dispatch({ type: types.LOADING_START });
        let params = getState().params;
        apis.addMoneyRequest(params.profile.auth_version, params.profile.sessionToken,
            params.currencyType, amount, bare_uid, to, note).then((d)=>{
            if(d.rc == 2){
                dispatch({
                    type: types.ADD_MONEY_REQUEST,
                    payload: {
                        errorMsg:d.reason,
                        loading: false
                    }
                });
            }else{
                dispatch({
                    type: types.ADD_MONEY_REQUEST,
                    payload: {
                        successMsg: 'Request sent successfully',
                        loading: false
                    }
                });
                dispatch(rosterOperation(1,bare_uid));
                dispatch(updateRequestReportDate(params.pending_date_from,params.pending_date_to));
            }
        }).catch(e=>{
            dispatch({
                type: types.ADD_MONEY_REQUEST,
                payload: {
                    errorMsg: e.message,
                    loading: false
                }
            });
        })
    }
}

export const markCancelledMoneyRequests = (request_id=0, receiver_bare_uid='') => {
    return (dispatch,getState) => {
        dispatch({ type: types.LOADING_START });
        let params = getState().params;
        apis.markCancelledMoneyRequests(params.profile.auth_version, params.profile.sessionToken,
            params.currencyType, request_id, receiver_bare_uid).then((d)=>{
            if(d.rc == 2){
                dispatch({
                    type: types.MARK_CANCELLED_MONEY_REQUESTS,
                    payload: {
                        errorMsg:d.reason,
                        loading: false,
                    }
                });
            }else{
                dispatch({
                    type: types.MARK_CANCELLED_MONEY_REQUESTS,
                    payload: {
                        successMsg: 'Request cancelled successfully',
                        loading: false,
                    }
                });
                dispatch(updateRequestReportDate(params.pending_date_from,params.pending_date_to));
            }
        }).catch(e=>{
            dispatch({
                type: types.MARK_CANCELLED_MONEY_REQUESTS,
                payload: {
                    errorMsg: e.message,
                    loading: false,
                }
            });
        })
    }
}

export const rosterOperation = (op=1, to='') => {
    return (dispatch,getState) => {
        let params = getState().params;
        apis.rosterOperation(params.profile.auth_version,
            params.profile.sessionToken, op, to).then((d)=>{
            if(d.rc == 2){
                dispatch({
                    type: types.ROSTER_OPERATION,
                    payload: {
                        errorMsg:d.reason,
                    }
                });
            }else{
                dispatch({
                    type: types.ROSTER_OPERATION,
                    payload: {}
                });
            }
        }).catch(e=>{
            dispatch({
                type: types.ROSTER_OPERATION,
                payload: {
                    errorMsg: e.message,
                }
            });
        })
    }
}

export const updateRequestReportDate = (pending_date_from, pending_date_to) => {
    return (dispatch,getState) => {
        dispatch({
            type: types.UPDATE_REQUEST_REPORT_DATE,
            payload: {
                pending_date_from,
                pending_date_to,
            }
        });
        dispatch({
            type: types.RESET_REQUESTS,
            payload: {
                pending_date_from,
                pending_date_to,
            }
        });
        dispatch(getIncomingRequests());
        dispatch(getOutgoingRequests());
    }
}


export const getIncomingRequests = (start=0) => {
    return (dispatch,getState) => {
        let params = getState().params;
        let date_from = params.pending_date_from.format('YYYY-MM-DDTHH:mm:00.000\\Z');
        let date_to = params.pending_date_to.format('YYYY-MM-DDTHH:mm:00.000\\Z');
        apis.getRequests(params.profile.auth_version, params.profile.sessionToken,
            params.currencyType, date_from, date_to, 2, start).then((d)=>{
            if(d.rc == 2){
                dispatch({
                    type: types.GET_INCOMING_REQUESTS,
                    payload: {
                        errorMsg:d.reason,
                    }
                });
            }else{
                dispatch({
                    type: types.GET_INCOMING_REQUESTS,
                    payload: {
                        total_reqs:d.total_money_reqs,
                        reqs:d.money_requests
                    }
                });
            }
        }).catch(e=>{
            dispatch({
                type: types.GET_INCOMING_REQUESTS,
                payload: {
                    errorMsg: e.message,
                }
            });
        })
    }
}

export const getOutgoingRequests = (start=0) => {
    return (dispatch,getState) => {
        let params = getState().params;
        let date_from = params.pending_date_from.format('YYYY-MM-DDTHH:mm:00.000\\Z');
        let date_to = params.pending_date_to.format('YYYY-MM-DDTHH:mm:00.000\\Z');
        apis.getRequests(params.profile.auth_version, params.profile.sessionToken,
            params.currencyType, date_from, date_to, 1, start).then((d)=>{
            if(d.rc == 2){
                dispatch({
                    type: types.GET_OUTGOING_REQUESTS,
                    payload: {
                        errorMsg:d.reason,
                    }
                });
            }else{
                dispatch({
                    type: types.GET_OUTGOING_REQUESTS,
                    payload: {
                        total_reqs:d.total_money_reqs,
                        reqs:d.money_requests
                    }
                });
            }
        }).catch(e=>{
            dispatch({
                type: types.GET_OUTGOING_REQUESTS,
                payload: {
                    errorMsg: e.message,
                }
            });
        })
    }
}
