import {
    AsyncStorage
} from 'react-native';
import * as types from '@actions/types';
import apis from '@flashAPIs';

const Toast =  require('@components/Toast');

export const setupHTMProfile = (data, goBack) => {
    return (dispatch,getState) => {
        dispatch({ type: types.LOADING_START });
        let params = getState().params;
        apis.setupHTMProfile(params.profile.auth_version,
            params.profile.sessionToken, data).then((d)=>{
            if(d.rc !== 1){
                Toast.errorTop(d.reason);
                dispatch({
                    type: types.SETUP_HTM_PROFILE,
                    payload: { loading: false }
                });
            }else{
                Toast.successTop("Your HTM profile setup succesfully.")
                dispatch({
                    type: types.SETUP_HTM_PROFILE,
                    payload: { loading: false }
                });
                dispatch(getHTMProfile());
                goBack();
            }
        }).catch(e=>{
            Toast.errorTop(e.message);
            dispatch({
                type: types.SETUP_HTM_PROFILE,
                payload: { loading: false }
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
                Toast.errorTop(d.reason);
                dispatch({
                    type: types.UPDATE_HTM_PROFILE,
                    payload: { loading: false }
                });
            }else{
                Toast.successTop("Your HTM profile updated succesfully.")
                dispatch({
                    type: types.UPDATE_HTM_PROFILE,
                    payload: { loading: false }
                });
                dispatch(getHTMProfile());
            }
        }).catch(e=>{
            Toast.errorTop(e.message);
            dispatch({
                type: types.UPDATE_HTM_PROFILE,
                payload: { loading: false }
            });
        })
    }
}

export const getHTMProfile = () => {
    return (dispatch,getState) => {
        let params = getState().params;
        apis.getHTMProfile(params.profile.auth_version,
            params.profile.sessionToken).then((d)=>{
            if(d.rc !== 1){
                // Toast.errorTop(d.reason);
                dispatch({ type: types.GET_HTM_PROFILE });
            }else{
                dispatch({
                    type: types.GET_HTM_PROFILE,
                    payload: { htmProfile: d.htm_profile }
                });
                AsyncStorage.setItem('htmProfile', JSON.stringify(d.htm_profile));
            }
        }).catch(e=>{
            console.log(e);
            Toast.errorTop(e.message);
            dispatch({ type: types.GET_HTM_PROFILE });
        })
    }
}

export const enableHTMProfile = () => {
    return (dispatch,getState) => {
        dispatch({ type: types.LOADING_START });
        let params = getState().params;
        apis.enableHTMProfile(params.profile.auth_version,
            params.profile.sessionToken).then((d)=>{
            if(d.rc !== 1){
                Toast.errorTop(d.reason);
                dispatch({
                    type: types.ENABLE_HTM_PROFILE,
                    payload: { loading: false }
                });
            }else{
                params.htmProfile.is_active = 1;
                Toast.successTop("Your HTM profile activate succesfully.")
                dispatch({
                    type: types.ENABLE_HTM_PROFILE,
                    payload: {
                        htmProfile: params.htmProfile,
                        loading: false
                    }
                });
                dispatch(getHTMProfile());
            }
        }).catch(e=>{
            Toast.errorTop(e.message);
            dispatch({
                type: types.ENABLE_HTM_PROFILE,
                payload: { loading: false }
            });
        })
    }
}

export const disableHTMProfile = (cb=null) => {
    return (dispatch,getState) => {
        dispatch({ type: types.LOADING_START });
        let params = getState().params;
        apis.disableHTMProfile(params.profile.auth_version,
            params.profile.sessionToken).then((d)=>{
            if(d.rc !== 1){
                Toast.errorTop(d.reason);
                dispatch({
                    type: types.DISABLE_HTM_PROFILE,
                    payload: { loading: false }
                });
            }else{
                params.htmProfile.is_active = 0;
                Toast.successTop("Your HTM profile deactivate succesfully.")
                dispatch({
                    type: types.DISABLE_HTM_PROFILE,
                    payload: {
                        htmProfile: params.htmProfile,
                        loading: false
                    }
                });
                dispatch(getHTMProfile());
                if(cb) cb();
            }
        }).catch(e=>{
            Toast.errorTop(e.message);
            dispatch({
                type: types.DISABLE_HTM_PROFILE,
                payload: { loading: false }
            });
        })
    }
}
