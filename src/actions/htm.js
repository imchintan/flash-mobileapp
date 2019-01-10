import {
    AsyncStorage
} from 'react-native';
import {
    FToast as Toast
} from '@components';
import * as types from '@actions/types';
import * as chat from '@actions/chat';
import * as apis from '@flashAPIs';
import * as utils from '@lib/utils';
import * as constants from '@src/constants';
import _ from 'lodash';

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
                if(data.show_on_map == 1 && data.show_live_location == 1){
                    dispatch(getCurrentPosition());
                }
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
            let parmas = getState().params;
            if(parmas.htmProfile && parmas.htmProfile.show_on_map == 1 &&
                parmas.htmProfile.show_live_location == 1){
                dispatch(getCurrentPosition(false));
            }
            let n = 0;
            htmLocationIntRef = setInterval(()=>{
                params = getState().params;
                if(params.location_permission){
                    dispatch({ type: types.GET_HTM_LOCATION });
                    n++;
                    if(n%5 == 0 || !params.position){
                        if(parmas.htmProfile && parmas.htmProfile.show_on_map == 1 &&
                            parmas.htmProfile.show_live_location == 1)
                                dispatch(getCurrentPosition(false));
                        if(params.location && params.location.latitude)
                            dispatch(updateHTMLocation(params.location.latitude,
                                params.location.longitude));
                    }
                    else
                        dispatch(updateHTMLocation(params.position.latitude,
                            params.position.longitude));
                }else{
                    dispatch(updateHTMLocation(null,null));
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
        if(!params.profile) return;
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
        let position = params.position || params.location;
        let _filter = {};
        if(!!filter.apply){
            _filter.onlineOnly = filter.onlineOnly;
            _filter.currency_types = Object.values(filter.currency_types)
                    .map(currency => currency.currency_type);
            _filter.fiat_currency_codes = filter.fiat_currency_codes;

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
                            htm.isOnline = chatRooms[0].os && chatRooms[0].os[htm.username];
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
                            htm.isOnline = chatRooms[0].os && chatRooms[0].os[htm.username];
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

export const getHTMFeedbacks = (htm=true) => {
    return (dispatch,getState) => {
        dispatch({ type: types.LOADING_START });
        let params = getState().params;
        apis.getHTMFeedbacks(params.profile.auth_version,
            params.profile.sessionToken, htm?params.htm.username:
            params.htmProfile.username).then((d)=>{
            let payload = { loading: false};
            if(d.rc !== 1){
                Toast.errorTop(d.reason);
                dispatch({
                    type: types.GET_HTM_FEEDBACKS,
                    payload
                });
            }else{
                if(htm)
                    payload.htm_feedbacks = d.feedbacks;
                else
                    payload.feedbacks = d.feedbacks;
                dispatch({
                    type: types.GET_HTM_FEEDBACKS,
                    payload
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

//************* Advertisement *********//

export const addHTMAd = (data, goBack) => {
    return (dispatch,getState) => {
        dispatch({ type: types.LOADING_START });
        let params = getState().params;
        apis.addHTMAd(params.profile.auth_version,
            params.profile.sessionToken, data).then((d)=>{
            if(d.rc !== 1){
                Toast.errorTop(d.reason);
                dispatch({
                    type: types.ADD_HTM_TRADE_AD,
                    payload: { loading: false }
                });
            }else{
                Toast.successTop("Your trade ad created succesfully.")
                dispatch({
                    type: types.ADD_HTM_TRADE_AD,
                    payload: {
                        loading: false,
                        htmAdCreateOrEdit: false,
                    }
                });
                dispatch(getHTMAds(0,true));
                goBack();
            }
        }).catch(e=>{
            Toast.errorTop(e.message);
            dispatch({
                type: types.ADD_HTM_TRADE_AD,
                payload: { loading: false }
            });
        })
    }
}

export const editHTMAd = (ad, cb) => {
    return (dispatch,getState) => {
        dispatch({
            type: types.EDIT_HTM_TRADE_AD,
            payload: {
                htmAd: ad,
                htmAdCreateOrEdit: true,
            }
        });
        cb();
    }
}

export const updateHTMAd = (id, data, goBack) => {
    return (dispatch,getState) => {
        dispatch({ type: types.LOADING_START });
        let params = getState().params;
        apis.updateHTMAd(params.profile.auth_version,
            params.profile.sessionToken, id, data).then((d)=>{
            if(d.rc !== 1){
                Toast.errorTop(d.reason);
                dispatch({
                    type: types.UPADTE_HTM_TRADE_AD,
                    payload: { loading: false }
                });
            }else{
                Toast.successTop("Your trade ad updated succesfully.")
                dispatch({
                    type: types.UPADTE_HTM_TRADE_AD,
                    payload: {
                        loading: false,
                        htmAdCreateOrEdit: false,
                    }
                });
                dispatch(getHTMAds(0,true));
                goBack();
            }
        }).catch(e=>{
            Toast.errorTop(e.message);
            dispatch({
                type: types.UPADTE_HTM_TRADE_AD,
                payload: { loading: false }
            });
        })
    }
}

export const deleteHTMAd = (id, goBack) => {
    return (dispatch,getState) => {
        dispatch({ type: types.LOADING_START });
        let params = getState().params;
        apis.deleteHTMAd(params.profile.auth_version,
            params.profile.sessionToken, id).then((d)=>{
            if(d.rc !== 1){
                Toast.errorTop(d.reason);
                dispatch({
                    type: types.REMOVE_HTM_TRADE_AD,
                    payload: { loading: false }
                });
            }else{
                Toast.successTop("Your trade ad removed succesfully.")
                dispatch({
                    type: types.REMOVE_HTM_TRADE_AD,
                    payload: {
                        loading: false,
                        htmAdCreateOrEdit: false,
                    }
                });
                dispatch(getHTMAds(0,true));
                goBack();
            }
        }).catch(e=>{
            Toast.errorTop(e.message);
            dispatch({
                type: types.REMOVE_HTM_TRADE_AD,
                payload: { loading: false }
            });
        })
    }
}

export const getHTMAds = (start=0,reset=false) => {
    return (dispatch,getState) => {
        dispatch({ type: types.LOADING_START });
        let params = getState().params;
        let htmMyAdsReq = (params.htmMyAdsReq !== false || reset);
        if(!htmMyAdsReq) return dispatch({
            type: types.MY_HTM_TRADE_ADS,
            payload: { loading: false }
        });
        let htmMyAds = reset?[]:params.htmMyAds;
        apis.getHTMAds(params.profile.auth_version, params.profile.sessionToken,start)
            .then((d)=>{
            if(d.rc !== 1){
                Toast.errorTop(d.reason);
                dispatch({
                    type: types.MY_HTM_TRADE_ADS,
                    payload: { loading: false }
                });
            }else{
                htmMyAds = _.uniqBy(_.concat(htmMyAds || [],d.htm_ads),'id');
                htmMyAds.sort((ad1,ad2)=>ad1.id>ad2.id?-1:1);
                dispatch({
                    type: types.MY_HTM_TRADE_ADS,
                    payload: {
                        htmMyAds,
                        htmMyAdsReq: (d.htm_ads.length > 0),
                        loading: false,
                    }
                });
            }
        }).catch(e=>{
            Toast.errorTop(e.message);
            dispatch({
                type: types.MY_HTM_TRADE_ADS,
                payload: { loading: false }
            });
        })
    }
}

export const findHTMAdsFilterApply = (filter) => {
    return (dispatch,getState) => {
        dispatch({
            type: types.FIND_HTM_TRADE_ADS_FILTER_APPLY,
            payload:{ htmAdsFilter: filter }
        });
        dispatch(findHTMAds(0,true));
    }
}

export const findHTMAds = (start=0,reset=false) => {
    return (dispatch,getState) => {
        dispatch({ type: types.LOADING_START });
        let params = getState().params;
        let filter = params.htmAdsFilter || {};
        let htmAdsReq = (params.htmAdsReq !== false || reset);
        if(!htmAdsReq) return ;
        let htmAds = reset?[]:params.htmAds;
        let _filter = {
            buy:  filter.buy?filter.buy.currency_type:0,
            sell:  filter.sell?filter.sell.currency_type:0,
            sort_by:  filter.sort_by,
        }
        if(filter.buy_amount > 0) _filter.buy_amount = filter.buy_amount;
        apis.findHTMAds(params.profile.auth_version, params.profile.sessionToken,
            _filter, start).then((d)=>{
            if(d.rc !== 1){
                Toast.errorTop(d.reason);
                dispatch({
                    type: types.FIND_HTM_TRADE_ADS,
                    payload: { loading: false }
                });
            }else{
                htmAds = _.uniqBy(_.concat(htmAds || [],d.htm_ads),'id');
                htmAds.sort((ad1,ad2)=>ad1.id>ad2.id?-1:1);
                dispatch({
                    type: types.FIND_HTM_TRADE_ADS,
                    payload: {
                        htmAds,
                        htmAdsReq: (d.htm_ads.length > 0),
                        loading: false,
                    }
                });
            }
        }).catch(e=>{
            Toast.errorTop(e.message);
            dispatch({
                type: types.FIND_HTM_TRADE_ADS,
                payload: { loading: false }
            });
        })
    }
}

export const getHTMTrade = (trade_id, loading=false) => {
    return (dispatch,getState) => {
        let params = getState().params;
        let payload = {};
        if(loading)dispatch({ type: types.LOADING_START });
        if(loading) payload.loading = false;
        apis.getHTMTrade(params.profile.auth_version,
            params.profile.sessionToken, trade_id).then((d)=>{
            if(d.rc !== 1){
                Toast.errorTop(d.reason);
                dispatch({
                    type: types.GET_HTM_TRADE,
                    payload
                });
            }else{
                payload.htm_trade = d.htm_trade;
                dispatch({
                    type: types.GET_HTM_TRADE,
                    payload
                });
            }
        }).catch(e=>{
            Toast.errorTop(e.message);
            dispatch({
                type: types.GET_HTM_TRADE,
                payload
            });
        })
    }
}

export const getActiveHTMTrade = (ad_id,cb=null) => {
    return (dispatch,getState) => {
        dispatch({ type: types.LOADING_START });
        let params = getState().params;
        apis.getActiveHTMTrade(params.profile.auth_version,
            params.profile.sessionToken, ad_id).then((d)=>{
            if(d.rc !== 1){
                Toast.errorTop(d.reason);
                dispatch({
                    type: types.GET_ACTIVE_HTM_TRADE,
                    payload: { loading: false }
                });
            }else{
                dispatch({
                    type: types.GET_ACTIVE_HTM_TRADE,
                    payload: {
                        loading: false,
                        forcePayment: false,
                        isLoadAllPreviousMesages: false,
                        chatMessages:[],
                        htm_trade: null,
                        channelFeedbacks:null,
                        chatRoom:null,
                        chatRoomChannel:null
                    }
                });
                if(cb) cb(d.htm_trade || null);
            }
        }).catch(e=>{
            Toast.errorTop(e.message);
            dispatch({
                type: types.GET_ACTIVE_HTM_TRADE,
                payload: { loading: false }
            });
        })
    }
}

export const openTrade = (htm_trade,cb=null) => {
    return (dispatch,getState) => {
        dispatch({ type: types.LOADING_START });
        let params = getState().params;
        let payload = { loading: false };
        let chatRooms =  params.chatRooms;
        let chatRoomIdx = chatRooms.findIndex(r => r._id == htm_trade.room_id);
        if(chatRoomIdx !== -1){
            let chatRoom = chatRooms[chatRoomIdx];
            let chatRoomChannelIdx = chatRoom.c.findIndex(ch=> ch.id == htm_trade.channel_id);
            if(chatRoomChannelIdx !== -1){
                let chatRoomChannel = chatRoom.c[chatRoomChannelIdx];
                payload = {
                    loading: false,
                    isLoadAllPreviousMesages: false,
                    forcePayment: false,
                    chatMessages:[],
                    htm_trade: null,
                    channelFeedbacks:null,
                    chatRoom,
                    chatRoomChannel
                }
                if(cb)cb();
                return dispatch({
                    type: types.OPEN_HTM_TRADE,
                    payload
                });
            }
        }
        apis.getRoom(params.profile.auth_version, params.profile.sessionToken,
            htm_trade.channel_id).then((d)=>{
            if(d.rc !== 1){
                Toast.errorTop(d.reason);
                dispatch({
                    type: types.OPEN_HTM_TRADE,
                    payload: { loading: false }
                });
            }else{
                if(d.total_rooms > 0){
                    let chatRoom = d.rooms[0];
                    let chatRoomChannelIdx = chatRoom.c.findIndex(ch=> ch.id == htm_trade.channel_id);
                    if(chatRoomChannelIdx !== -1){
                        let chatRoomChannel = chatRoom.c[chatRoomChannelIdx];
                        payload = {
                            loading: false,
                            forcePayment: false,
                            isLoadAllPreviousMesages: false,
                            chatMessages:[],
                            htm_trade: null,
                            channelFeedbacks:null,
                            chatRoom,
                            chatRoomChannel
                        }
                        if(cb)cb();
                        return dispatch({
                            type: types.OPEN_HTM_TRADE,
                            payload
                        });
                    }else{
                        Toast.errorTop("Something went wrong!!");
                        dispatch({
                            type: types.OPEN_HTM_TRADE,
                            payload: { loading: false }
                        });
                    }
                }else{
                    Toast.errorTop("Something went wrong!!");
                    dispatch({
                        type: types.OPEN_HTM_TRADE,
                        payload: { loading: false }
                    });
                }
            }
        }).catch(e=>{
            console.log(e);
            Toast.errorTop(e.message);
            dispatch({
                type: types.OPEN_HTM_TRADE,
                payload: { loading: false }
            });
        })
    }
}

export const addHTMTrade = (data, message, cb=null) => {
    return (dispatch,getState) => {
        dispatch({ type: types.LOADING_START });
        let params = getState().params;
        apis.addHTMTrade(params.profile.auth_version,
            params.profile.sessionToken, data).then((d)=>{
            if(d.rc !== 1){
                Toast.errorTop(d.reason);
                dispatch({
                    type: types.ADD_HTM_TRADE,
                    payload: { loading: false }
                });
            }else{
                let chatRooms =  params.chatRooms;
                let chatRoom = d.room;
                let chatRoomIdx = chatRooms.findIndex(r => r._id == chatRoom._id);
                if(chatRoomIdx == -1){
                    chatRooms.push(chatRoom);
                }else{
                    chatRooms[chatRoomIdx] = chatRoom;
                }

                let chatRoomChannel = chatRoom.c.filter(ch=> ch.a && ch.ai == data.ad_id)[0];
                dispatch({
                    type: types.ADD_HTM_TRADE,
                    payload: {
                        loading: false,
                        forcePayment: false,
                        isLoadAllPreviousMesages: false,
                        chatMessages:[],
                        htm_trade: null,
                        channelFeedbacks:null,
                        chatRoom,
                        chatRoomChannel,
                        search_wallet: null,
                        trade_bcMedianTxSize: 250,
                        trade_satoshiPerByte: 20,
                        trade_thresholdAmount: 0.00001,
                        trade_fixedTxnFee: 0.00002,
                        trade_decryptedWallet: null,
                    }
                });
                dispatch(chat.sendChatMessage(message));
                if(cb)cb();
            }
        }).catch(e=>{
            Toast.errorTop(e.message);
            dispatch({
                type: types.ADD_HTM_TRADE,
                payload: { loading: false }
            });
        })
    }
}

export const cancelHTMTrade = (msg,cb=null) => {
    return (dispatch,getState) => {
        dispatch({ type: types.LOADING_START });
        let params = getState().params;
        apis.cancelHTMTrade(params.profile.auth_version,
            params.profile.sessionToken, params.htm_trade.id, msg).then((d)=>{
            if(d.rc !== 1){
                Toast.errorTop(d.reason);
                dispatch({
                    type: types.CANCEL_HTM_TRADE,
                    payload: { loading: false }
                });
                if(cb)cb(false);
            }else{
                dispatch({
                    type: types.CANCEL_HTM_TRADE,
                    payload: {
                        loading: false,
                    }
                });
                dispatch(getHTMTrade(params.htm_trade.id));
                if(cb)cb(true);
            }
        }).catch(e=>{
            Toast.errorTop(e.message);
            dispatch({
                type: types.CANCEL_HTM_TRADE,
                payload: { loading: false }
            });
            if(cb)cb(false);
        })
    }
}

export const rejectHTMTrade = (msg,cb=null) => {
    return (dispatch,getState) => {
        dispatch({ type: types.LOADING_START });
        let params = getState().params;
        apis.rejectHTMTrade(params.profile.auth_version,
            params.profile.sessionToken, params.htm_trade.id, msg).then((d)=>{
            if(d.rc !== 1){
                Toast.errorTop(d.reason);
                dispatch({
                    type: types.REJECT_HTM_TRADE,
                    payload: { loading: false }
                });
                if(cb)cb(false);
            }else{
                dispatch({
                    type: types.REJECT_HTM_TRADE,
                    payload: {
                        loading: false,
                    }
                });
                dispatch(getHTMTrade(params.htm_trade.id));
                if(cb)cb(true);
            }
        }).catch(e=>{
            Toast.errorTop(e.message);
            dispatch({
                type: types.REJECT_HTM_TRADE,
                payload: { loading: false }
            });
            if(cb)cb(false);
        })
    }
}

export const acceptHTMTrade = () => {
    return (dispatch,getState) => {
        dispatch({ type: types.LOADING_START });
        let params = getState().params;
        apis.acceptHTMTrade(params.profile.auth_version,
            params.profile.sessionToken, params.htm_trade.id).then((d)=>{
            if(d.rc !== 1){
                Toast.errorTop(d.reason);
                dispatch({
                    type: types.ACCEPT_HTM_TRADE,
                    payload: { loading: false }
                });
            }else{
                dispatch({
                    type: types.ACCEPT_HTM_TRADE,
                    payload: {
                        loading: false,
                    }
                });
                dispatch(getHTMTrade(params.htm_trade.id));
            }
        }).catch(e=>{
            Toast.errorTop(e.message);
            dispatch({
                type: types.ACCEPT_HTM_TRADE,
                payload: { loading: false }
            });
        })
    }
}
