import * as types from '@actions/types'
import * as apis from '@flashAPIs';

export const addMoneyRequest = (amount=0, bare_uid='', to='', note='') => {
    return (dispatch,getState) => {
        dispatch({ type: types.LOADING_START });
        let params = getState().params;
        apis.addMoneyRequest(params.profile.auth_version, params.profile.sessionToken,
            params.currency_type, amount, bare_uid, to, note).then((d)=>{
            if(d.rc !== 1){
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
            params.currency_type, request_id, receiver_bare_uid).then((d)=>{
            if(d.rc !== 1){
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

export const markRejectedMoneyRequests = (request_id, sender_bare_uid, note_processing='') => {
    return (dispatch,getState) => {
        dispatch({ type: types.LOADING_START });
        let params = getState().params;
        apis.markRejectedMoneyRequests(params.profile.auth_version, params.profile.sessionToken,
            params.currency_type, request_id, sender_bare_uid, note_processing).then((d)=>{
            if(d.rc == 1){
                dispatch({
                    type: types.MARK_REJECTED_MONEY_REQUESTS,
                    payload: {
                        successMsg: 'You have rejected a request.',
                        loading: false,
                    }
                });
                dispatch(updateRequestReportDate(params.pending_date_from,params.pending_date_to));
            }else{
                dispatch({
                    type: types.MARK_REJECTED_MONEY_REQUESTS,
                    payload: {
                        errorMsg:d.reason,
                        loading: false,
                    }
                });
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

export const markSentMoneyRequests = (request_id, sender_bare_uid, note_processing='') => {
    return (dispatch,getState) => {
        let params = getState().params;
        apis.markSentMoneyRequests(params.profile.auth_version, params.profile.sessionToken,
            params.currency_type, request_id, sender_bare_uid, note_processing).then((d)=>{
            if(d.rc == 1){
                dispatch({
                    type: types.MARK_SENT_MONEY_REQUESTS,
                    payload: {
                        successMsg: 'You paid a request.',
                    }
                });
                dispatch(updateRequestReportDate(params.pending_date_from,params.pending_date_to));
            }else{
                dispatch({
                    type: types.MARK_SENT_MONEY_REQUESTS,
                    payload: {
                        errorMsg:d.reason,
                    }
                });
            }
        }).catch(e=>{
            dispatch({
                type: types.MARK_CANCELLED_MONEY_REQUESTS,
                payload: {
                    errorMsg: e.message,
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
            if(d.rc !== 1){
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


export const getIncomingRequests = (start=0, reset=false) => {
    return (dispatch,getState) => {
        if(reset)
            dispatch({
                type: types.CUSTOM_ACTION,
                payload: {
                    inReqs_loading: true
                }
            });
        let params = getState().params;
        let date_from = params.pending_date_from.format('YYYY-MM-DDT00:00:00.000\\Z');
        let date_to = params.pending_date_to.format('YYYY-MM-DDT23:59:59.000\\Z');
        apis.getRequests(params.profile.auth_version, params.profile.sessionToken,
            params.currency_type, date_from, date_to, 2, start).then((d)=>{
            if(d.rc !== 1){
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
                        reqs:d.money_requests,
                        reset
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

export const getOutgoingRequests = (start=0, reset=false) => {
    return (dispatch,getState) => {
        if(reset)
            dispatch({
                type: types.CUSTOM_ACTION,
                payload: {
                    outReqs_loading: true
                }
            });
        let params = getState().params;
        let date_from = params.pending_date_from.format('YYYY-MM-DDT00:00:00.000\\Z');
        let date_to = params.pending_date_to.format('YYYY-MM-DDT23:59:59.000\\Z');
        apis.getRequests(params.profile.auth_version, params.profile.sessionToken,
            params.currency_type, date_from, date_to, 1, start).then((d)=>{
            if(d.rc !== 1){
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
                        reqs:d.money_requests,
                        reset
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
