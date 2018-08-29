import {
    AsyncStorage
} from 'react-native';
import * as types from '@actions/types';
import apis from '@flashAPIs';
import * as utils from '@lib/utils';

const Toast =  require('@components/Toast');

var htmLocationIntRef = null; // Set time interval reference

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
                dispatch(getCurrentPosition());
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
                dispatch(htmLocationThread((d.htm_profile.is_active)));

            }
        }).catch(e=>{
            console.log(e);
            Toast.errorTop(e.message);
            dispatch({ type: types.GET_HTM_PROFILE });
        })
    }
}

export const getHTMDetail = (username, cb=null) => {
    return (dispatch,getState) => {
        dispatch({
            type: types.LOADING_START,
            payload: {
                htm: null
            }
        });
        let params = getState().params;
        apis.getHTMDetail(params.profile.auth_version,
            params.profile.sessionToken, username).then((d)=>{
            if(d.rc !== 1){
                Toast.errorTop(d.reason);
                dispatch({
                    type: types.GET_HTM_DETAIL,
                    payload: { loading: false }
                });
            }else{
                dispatch({
                    type: types.GET_HTM_DETAIL,
                    payload: {
                        loading: false,
                        htm: d.htm_profile
                    }
                });
                if(cb)cb();
            }
        }).catch(e=>{
            console.log(e);
            Toast.errorTop(e.message);
            dispatch({
                type: types.GET_HTM_DETAIL,
                payload: { loading: false }
            });
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

export const htmLocationThread = (start=0) => {
    return (dispatch,getState) => {
        if(start == 1){
            if(htmLocationIntRef != null) return;
            dispatch(getCurrentPosition(true));
            htmLocationIntRef = setInterval(()=>{
                let location_permission = getState().params.location_permission;
                if(location_permission){
                    dispatch({ type: types.GET_HTM_LOCATION });
                    dispatch(getCurrentPosition(true));
                }
            },(2 * 60 * 1000)) // 2 mints
            dispatch({ type: types.START_HTM_LOCATION_THREAD });
        }else{
            if(htmLocationIntRef == null) return;
            clearInterval(htmLocationIntRef);
            htmLocationIntRef=null;
            dispatch({ type: types.STOP_HTM_LOCATION_THREAD });
        }
    }
}

export const updateHTMLocation = (lat, long) => {
    return (dispatch,getState) => {
        let params = getState().params;
        apis.updateHTMLocation(params.profile.auth_version,
            params.profile.sessionToken, lat, long).then((d)=>{
            console.log(d);
            dispatch({ type: types.UPDATE_HTM_LOCATION });
        }).catch(e=>{
            console.log(e);
            dispatch({ type: types.UPDATE_HTM_LOCATION });
        })
    }
}

export const getCurrentPosition = (update=false) => {
    return (dispatch,getState) => {
        utils.getCurrentPosition().then(async pos => {
            let position = {
                accuracy: pos.coords.accuracy,
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude,
            }
            if(update)
                dispatch(updateHTMLocation(position.latitude,position.longitude));
            
            dispatch({
                type: types.SET_POSITION,
                payload:{
                    location_permission: true,
                    location_error_code: 0,
                    position
                }
            });

            let params = getState().params;
            if(!params.htms) dispatch(findNearByHTMs());

        }).catch(e=>{
            dispatch({
                type: types.SET_POSITION,
                payload:{
                    location_permission: (e.code > 1),
                    location_error_code: e.code
                }
            });
        });
    }
}

export const findNearByHTMs = (filter={}, loading = false) => {
    return (dispatch,getState) => {
        if(loading) dispatch({ type: types.LOADING_START });
        let params = getState().params;
        let position = params.position;
        let payload = {};
        if(loading) payload.loading = false;
        apis.findNearByHTMs(params.profile.auth_version, params.profile.sessionToken,
            position.latitude, position.longitude, params.htmProfile.show_distance_in,
            filter).then((d)=>{
            if(d.rc == 1){
                payload.htms = d.htms;
            }
            dispatch({
                type: types.FIND_NEAR_BY_HTMS,
                payload
            });
        }).catch(e=>{
            console.log(e);
            dispatch({
                type: types.FIND_NEAR_BY_HTMS,
                payload
            });
        })
    }
}
