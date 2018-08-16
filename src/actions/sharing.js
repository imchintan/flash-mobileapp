import * as types from '@actions/types'
import apis from '@flashAPIs'
import * as utils from '@lib/utils';

export const addPayoutCode = (sharing_code='') => {
    return (dispatch,getState) => {
        dispatch({ type: types.LOADING_START });
        let params = getState().params;
        apis.addPayoutCode(params.profile.auth_version, params.profile.sessionToken,
            params.currency_type, sharing_code).then((d)=>{
            if(d.rc !== 1){
                dispatch({
                    type: types.ADD_PAYOUT_CODE,
                    payload: {
                        errorMsg:d.reason,
                        loading: false
                    }
                });
            }else{
                dispatch({
                    type: types.ADD_PAYOUT_CODE,
                    payload: {
                        successMsg: 'Your Payout code is added succesfully',
                        payout_code: sharing_code,
                        loading: false
                    }
                });
                dispatch(getPayoutCode());
            }
        }).catch(e=>{
            dispatch({
                type: types.ADD_PAYOUT_CODE,
                payload: {
                    errorMsg: e.message,
                    loading: false
                }
            });
        })
    }
}

export const removePayoutCode = () => {
    return (dispatch,getState) => {
        dispatch({ type: types.LOADING_START });
        let params = getState().params;
        apis.removePayoutCode(params.profile.auth_version, params.profile.sessionToken,
            params.currency_type).then((d)=>{
            if(d.rc !== 1){
                dispatch({
                    type: types.REMOVE_PAYOUT_CODE,
                    payload: {
                        errorMsg:d.reason,
                        loading: false
                    }
                });
            }else{
                dispatch({
                    type: types.REMOVE_PAYOUT_CODE,
                    payload: {
                        successMsg: 'Your Payout code is removed succesfully',
                        payout_code: '',
                        loading: false
                    }
                });
                dispatch(getPayoutCode());
            }
        }).catch(e=>{
            dispatch({
                type: types.REMOVE_PAYOUT_CODE,
                payload: {
                    errorMsg: e.message,
                    loading: false
                }
            });
        })
    }
}

export const getPayoutCode = () => {
    return (dispatch,getState) => {
        let params = getState().params;
        apis.getPayoutCode(params.profile.auth_version, params.profile.sessionToken,
            params.currency_type).then((d)=>{
            if(d.rc !== 1){
                dispatch({
                    type: types.GET_PAYOUT_CODE,
                    payload: {
                        errorMsg:d.reason,
                    }
                });
            }else{
                dispatch({
                    type: types.GET_PAYOUT_CODE,
                    payload: {
                        payout_code: d.payout_code,
                        payout_code_is_locked: d.payout_code_is_locked,
                        payout_sharing_fee: d.payout_sharing_fee,
                    }
                });
            }
        }).catch(e=>{
            dispatch({
                type: types.GET_PAYOUT_CODE,
                payload: {
                    errorMsg: e.message
                }
            });
        })
    }
}

export const getPayoutInfo = () => {
    return (dispatch,getState) => {
        let params = getState().params;
        apis.getPayoutInfo(params.profile.auth_version, params.profile.sessionToken,
            params.currency_type).then((d)=>{
            if(d.rc !== 1){
                dispatch({
                    type: types.GET_PAYOUT_INFO,
                    payload: {
                        // errorMsg:d.reason,
                    }
                });
            }else{
                dispatch({
                    type: types.GET_PAYOUT_INFO,
                    payload: {
                        payout_info: d.payout_info,
                    }
                });
            }
        }).catch(e=>{
            dispatch({
                type: types.GET_PAYOUT_INFO,
                payload: {
                    // errorMsg: e.message
                }
            });
        })
    }
}

export const getSharingCode = () => {
    return (dispatch,getState) => {
        let params = getState().params;
        apis.getSharingCode(params.profile.auth_version, params.profile.sessionToken,
            params.currency_type).then((d)=>{
            if(d.rc !== 1){
                dispatch({
                    type: types.GET_SHARING_CODE,
                    payload: {
                        errorMsg:d.reason,
                    }
                });
            }else{
                dispatch({
                    type: types.GET_SHARING_CODE,
                    payload: {
                        sharing_code: d.sharing_code
                    }
                });
            }
        }).catch(e=>{
            dispatch({
                type: types.GET_SHARING_CODE,
                payload: {
                    errorMsg: e.message
                }
            });
        })
    }
}

export const generateSharingCode = (sharing_fee, data) => {
    return async(dispatch,getState) => {
        let params = getState().params;
        dispatch({ type: types.LOADING_START });
        let sharing_code, isAvailable = false;
        while (!isAvailable) {
            sharing_code = utils.getSixCharString();
            await apis.isSharingCodeAvailable(params.profile.auth_version, params.profile.sessionToken,
                params.currency_type, sharing_code).then((d)=>{
                    isAvailable = (d.rc === 1)
                }).catch(e=>console.log(e));
        }

        apis.addSharingCode(params.profile.auth_version, params.profile.sessionToken,
            params.currency_type, sharing_code, sharing_fee, data).then((d)=>{
            if(d.rc !== 1){
                dispatch({ type: types.LOADING_END });
                dispatch({
                    type: types.ADD_SHARING_CODE,
                    payload: {
                        errorMsg:d.reason,
                    }
                });
            }else{
                dispatch(getSharingCode());
                setTimeout(()=>{
                    dispatch({
                        type: types.ADD_SHARING_CODE,
                        payload: {
                            successMsg: 'Your sharing code is generated succesfully',
                        }
                    });
                    dispatch({ type: types.LOADING_END })
                },1000);
            }
        }).catch(e=>{
            dispatch({ type: types.LOADING_END });
            dispatch({
                type: types.ADD_SHARING_CODE,
                payload: {
                    errorMsg: e.message
                }
            });
        })
    }
}

export const updateSharingCode = (sharing_code, sharing_fee, data) => {
    return (dispatch,getState) => {
        let params = getState().params;
        dispatch({ type: types.LOADING_START });
        apis.updateSharingCode(params.profile.auth_version, params.profile.sessionToken,
            params.currency_type, sharing_code, sharing_fee, data).then((d)=>{
            if(d.rc !== 1){
                dispatch({ type: types.LOADING_END });
                dispatch({
                    type: types.UPDATE_SHARING_CODE,
                    payload: {
                        errorMsg:d.reason,
                    }
                });
            }else{
                dispatch(getSharingCode());
                setTimeout(()=>{
                    dispatch({
                        type: types.UPDATE_SHARING_CODE,
                        payload: {
                            successMsg: 'Details updated succesfully',
                        }
                    });
                    dispatch({ type: types.LOADING_END })
                },1000);
            }
        }).catch(e=>{
            dispatch({ type: types.LOADING_END });
            dispatch({
                type: types.UPDATE_SHARING_CODE,
                payload: {
                    errorMsg: e.message
                }
            });
        })
    }
}
