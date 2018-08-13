import {
    AsyncStorage
} from 'react-native';
import * as types from '@actions/types';
import apis from '@flashAPIs';
// import * as utils from '@lib/utils';
// import * as constants from '@src/constants';

export const setupHTMProfile = (display_name, email, country,
    want_to_buy, want_to_sell) => {
    return (dispatch,getState) => {
        dispatch({ type: types.LOADING_START });
        let params = getState().params;
        apis.setupHTMProfile(params.profile.auth_version, params.profile.sessionToken,
            display_name, email, country, want_to_buy, want_to_sell).then((d)=>{
            if(d.rc !== 1){
                dispatch({
                    type: types.SETUP_HTM_PROFILE,
                    payload: {
                        errorMsg:d.reason,
                        loading: false
                    }
                });
            }else{
                dispatch({
                    type: types.SETUP_HTM_PROFILE,
                    payload: {
                        successMsg: 'Your HTM profile setup succesfully',
                        loading: false
                    }
                });
                dispatch(getHTMProfile());
            }
        }).catch(e=>{
            dispatch({
                type: types.SETUP_HTM_PROFILE,
                payload: {
                    errorMsg: e.message,
                    loading: false
                }
            });
        })
    }
}

export const getHTMProfile = () => {
    return (dispatch,getState) => {
        let params = getState().params;
        apis.getHTMProfile(params.profile.auth_version, params.profile.sessionToken).then((d)=>{
            if(d.rc !== 1){
                dispatch({
                    type: types.GET_HTM_PROFILE,
                    payload: {
                        errorMsg:d.reason,
                    }
                });
            }else{
                dispatch({
                    type: types.GET_HTM_PROFILE,
                    payload: {
                        htmProfile: d.data
                    }
                });
                AsyncStorage.setItem('htmProfile', JSON.stringify(d.data));
            }
        }).catch(e=>{
            dispatch({
                type: types.GET_HTM_PROFILE,
                payload: {
                    errorMsg: e.message,
                }
            });
        })
    }
}

export const updateHTMProfile = (data) => {
    return (dispatch,getState) => {
        dispatch({ type: types.LOADING_START });
        let params = getState().params;
        apis.updateHTMProfile(params.profile.auth_version, params.profile.sessionToken,
            data).then((d)=>{
            if(d.rc !== 1){
                dispatch({
                    type: types.UPDATE_HTM_PROFILE,
                    payload: {
                        errorMsg:d.reason,
                        loading: false
                    }
                });
            }else{
                setTimeout(()=>
                dispatch({
                    type: types.UPDATE_HTM_PROFILE,
                    payload: {
                        successMsg: 'Your HTM profile updated succesfully',
                        loading: false
                    }
                }),2000);
                dispatch(getHTMProfile());
            }
        }).catch(e=>{
            dispatch({
                type: types.UPDATE_HTM_PROFILE,
                payload: {
                    errorMsg: e.message,
                    loading: false
                }
            });
        })
    }
}
