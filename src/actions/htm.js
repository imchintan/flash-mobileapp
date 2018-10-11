import {
    AsyncStorage
} from 'react-native';
import * as types from '@actions/types';
import * as apis from '@flashAPIs';
import * as utils from '@lib/utils';
import * as constants from '@src/constants';

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

export const updateHTMProfile = (data,goBack) => {
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
                goBack();
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

export const getHTMDetail = (username, cb=null, htm=null) => {
    return (dispatch,getState) => {
        dispatch({
            type: types.LOADING_START,
            payload: {
                htm,
                exchange: constants.COIN_GECKO_EXCHANGES[0]
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
                d.htm_profile.isOnline =  (d.htm_profile.last_seen_at >
                    (new Date().getTime() - (2 * 60 * 1000))); // 2 mints
                d.htm_profile.isFavorite = ((params.favorite_htms || [])
                    .findIndex(htm=>htm.username == d.htm_profile.username) != -1)

                let chatRoom = (params.chatRoom || null);
                if(params.chatRooms){
                    let chatRooms = params.chatRooms.filter(ch=> ch.m
                        && ch.m.includes(d.htm_profile.username));
                    if(chatRooms.length)
                        chatRoom = chatRooms[0];
                }
                dispatch({
                    type: types.GET_HTM_DETAIL,
                    payload: {
                        loading: false,
                        htm: d.htm_profile,
                        htm_feedbacks: [],
                        chatRoom
                    }
                });
                dispatch(getHTMFeedbacks());
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
            let n = 0;
            htmLocationIntRef = setInterval(()=>{
                let params = getState().params;
                if(params.location_permission){
                    dispatch({ type: types.GET_HTM_LOCATION });
                    n++;
                    if(n%5 == 0 || !params.position)
                        dispatch(getCurrentPosition(true));
                    else
                        dispatch(updateHTMLocation(params.position.latitude,
                            params.position.longitude));
                }
            },(1 * 60 * 1000)) // every mint
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
                    location_error_code: e.code,
                }
            });
        });
    }
}

export const findNearByHTMs = (filter={}, loading = false) => {
    return (dispatch,getState) => {
        let payload = { htms: [] };
        if(loading) dispatch({
            type: types.LOADING_START,
            payload
        });
        let params = getState().params;
        let position = params.position;
        let _filter = {};
        if(!!filter.apply){
            _filter.onlineOnly = filter.onlineOnly;
            _filter.currency_types = Object.values(filter.currency_types)
                    .map(currency => currency.currency_type);

            if(filter.buy_sell_at_from > -30){
                if(filter.want_to == 1 || filter.want_to == 0)
                    _filter.buy_at_from = filter.buy_sell_at_from;
                if(filter.want_to == 2 || filter.want_to == 0)
                _filter.sell_at_from = filter.buy_sell_at_from;
            }

            if(filter.buy_sell_at_to < 30){
                if(filter.want_to == 1 || filter.want_to == 0)
                    _filter.buy_at_to = filter.buy_sell_at_to;
                if(filter.want_to == 2 || filter.want_to == 0)
                    _filter.sell_at_to = filter.buy_sell_at_to;
            }

            if(filter.upto_distance < 1000)
                _filter.upto_distance = filter.upto_distance;
        }

        apis.findNearByHTMs(params.profile.auth_version, params.profile.sessionToken,
            position.latitude, position.longitude, params.htmProfile.show_distance_in,
            _filter).then((d)=>{
            if(typeof filter.apply !== 'undefined')
                payload.htmFilter = filter;
            if(d.rc == 1){
                payload.htms = d.htms.map(htm=>{
                    htm.isOnline = (htm.last_seen_at >
                    (new Date().getTime() - (2 * 60 * 1000))); // 2 mints
                    if(params.chatRooms){
                        let chatRooms = params.chatRooms.filter(ch=> ch.m
                            && ch.m.includes(htm.username));
                        if(chatRooms.length)
                            htm.isOnline = chatRooms[0].os[htm.username];
                    }
                    return htm;
                });
            }
            dispatch({
                type: types.FIND_NEAR_BY_HTMS,
                payload
            });
            if(loading)setTimeout(()=>dispatch({type: types.LOADING_END}),1000);
        }).catch(e=>{
            console.log(e);
            dispatch({ type: types.FIND_NEAR_BY_HTMS });
            if(loading)setTimeout(()=>dispatch({type: types.LOADING_END}),1000);
        })
    }
}

export const addTrustedHTM = () => {
    return (dispatch,getState) => {
        dispatch({ type: types.LOADING_START });
        let params = getState().params;
        apis.addTrustedHTM(params.profile.auth_version,
            params.profile.sessionToken, params.htm.username).then((d)=>{
            if(d.rc !== 1){
                Toast.errorTop(d.reason);
                dispatch({
                    type: types.ADD_TRUSTED_HTM,
                    payload: { loading: false }
                });
            }else{
                Toast.successTop(params.htm.display_name + " marked as trusted!");
                let htm = params.htm;
                htm.is_trustworthy = true;
                dispatch({
                    type: types.ADD_TRUSTED_HTM,
                    payload: {
                        htm,
                        loading: false
                    }
                });
            }
        }).catch(e=>{
            console.log(e);
            Toast.errorTop(e.message);
            dispatch({
                type: types.ADD_TRUSTED_HTM,
                payload: { loading: false }
            });
        })
    }
}

export const removeTrustedHTM = () => {
    return (dispatch,getState) => {
        dispatch({ type: types.LOADING_START });
        let params = getState().params;
        apis.removeTrustedHTM(params.profile.auth_version,
            params.profile.sessionToken, params.htm.username).then((d)=>{
            if(d.rc !== 1){
                Toast.errorTop(d.reason);
                dispatch({
                    type: types.REMOVE_TRUSTED_HTM,
                    payload: { loading: false }
                });
            }else{
                Toast.successTop(params.htm.display_name + " marked as not trusted!");
                let htm = params.htm;
                htm.is_trustworthy = false;
                dispatch({
                    type: types.REMOVE_TRUSTED_HTM,
                    payload: {
                        htm,
                        loading: false
                    }
                });
            }
        }).catch(e=>{
            Toast.errorTop(e.message);
            dispatch({
                type: types.REMOVE_TRUSTED_HTM,
                payload: { loading: false }
            });
        })
    }
}

export const addFavoriteHTM = () => {
    return (dispatch,getState) => {
        dispatch({ type: types.LOADING_START });
        let params = getState().params;
        apis.addFavoriteHTM(params.profile.auth_version,
            params.profile.sessionToken, params.htm.username).then((d)=>{
            if(d.rc !== 1){
                Toast.errorTop(d.reason);
                dispatch({
                    type: types.ADD_FAVORITE_HTM,
                    payload: { loading: false }
                });
            }else{
                Toast.successTop("Successfully added to favorite list.");
                let favorite_htms = [params.htm].concat(params.favorite_htms || []);
                let htm = params.htm;
                htm.isFavorite = true;
                dispatch({
                    type: types.ADD_FAVORITE_HTM,
                    payload: {
                        htm,
                        favorite_htms,
                        loading: false
                    }
                });
            }
        }).catch(e=>{
            Toast.errorTop(e.message);
            dispatch({
                type: types.ADD_FAVORITE_HTM,
                payload: { loading: false }
            });
        })
    }
}

export const removeFavoriteHTM = () => {
    return (dispatch,getState) => {
        dispatch({ type: types.LOADING_START });
        let params = getState().params;
        apis.removeFavoriteHTM(params.profile.auth_version,
            params.profile.sessionToken, params.htm.username).then((d)=>{
            if(d.rc !== 1){
                Toast.errorTop(d.reason);
                dispatch({
                    type: types.REMOVE_FAVORITE_HTM,
                    payload: { loading: false }
                });
            }else{
                Toast.successTop("Successfully removed from favorite list.");
                let favorite_htms = (params.favorite_htms || [])
                    .filter(htm=>params.htm.username !== htm.username);
                let htm = params.htm;
                htm.isFavorite = false;
                dispatch({
                    type: types.REMOVE_FAVORITE_HTM,
                    payload: {
                        htm,
                        favorite_htms,
                        loading: false
                    }
                });
            }
        }).catch(e=>{
            Toast.errorTop(e.message);
            dispatch({
                type: types.REMOVE_FAVORITE_HTM,
                payload: { loading: false }
            });
        })
    }
}

export const getFavoriteHTMs = () => {
    return (dispatch,getState) => {
        dispatch({ type: types.LOADING_START });
        let params = getState().params;
        apis.getFavoriteHTMs(params.profile.auth_version, params.profile.sessionToken)
            .then((d)=>{
            if(d.rc !== 1){
                Toast.errorTop(d.reason);
                dispatch({
                    type: types.GET_FAVORITE_HTMS,
                    payload: { loading: false }
                });
            }else{
                let favorite_htms = d.htms.map(htm=>{
                    htm.isOnline = false;
                    if(params.chatRooms){
                        let chatRooms = params.chatRooms.filter(ch=> ch.m
                            && ch.m.includes(htm.username));
                        if(chatRooms.length)
                            htm.isOnline = chatRooms[0].os[htm.username];
                    }
                    return htm;
                });
                dispatch({
                    type: types.GET_FAVORITE_HTMS,
                    payload: {
                        favorite_htms,
                        loading: false
                    }
                });
            }
        }).catch(e=>{
            Toast.errorTop(e.message);
            dispatch({
                type: types.GET_FAVORITE_HTMS,
                payload: { loading: false }
            });
        })
    }
}

export const getHTMFeedbacks = () => {
    return (dispatch,getState) => {
        dispatch({ type: types.LOADING_START });
        let params = getState().params;
        apis.getHTMFeedbacks(params.profile.auth_version,
            params.profile.sessionToken, params.htm.username).then((d)=>{
            if(d.rc !== 1){
                Toast.errorTop(d.reason);
                dispatch({
                    type: types.GET_HTM_FEEDBACKS,
                    payload: { loading: false }
                });
            }else{
                dispatch({
                    type: types.GET_HTM_FEEDBACKS,
                    payload: {
                        htm_feedbacks: d.feedbacks,
                        loading: false
                    }
                });
            }
        }).catch(e=>{
            Toast.errorTop(e.message);
            dispatch({
                type: types.GET_HTM_FEEDBACKS,
                payload: { loading: false }
            });
        })
    }
}
