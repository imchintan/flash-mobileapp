import { API_URL, RESOURCE, APP_VERSION } from '@src/config';
import * as utils from '@lib/utils';

/**
 * Setup HTM profile
 * @param  {Number} auth_version             API authentication version
 * @param  {String} sessionToken             User authorization token
 * @param  {Object} Data                     HTM profile data
 *   ⮑ @param  {String} display_name        Profile display name
 *      @param  {String} email               Email address (optional)
 *      @param  {String} country             HTM Profile country
 *      @param  {Number} buy_at              the percentage more or less than current spot price for buying
 *      @param  {Number} sell_at             the percentage more or less than current spot price for selling
 *      @param  {Number} show_profile_pic    Show profile picture in HTM Profile
 *      @param  {String} show_distance_in    Show distance in Miles / Kms
 *      @param  {Object} currency_types      Array of currency object in include currency_type, buy_at and sell_at
 * @return {Object}                          Return API response
 */
export const setupHTMProfile = (auth_version, sessionToken, data) => {
    return new Promise((resolve,reject) => {
        fetch(API_URL+'/setup-htm-profile',{
            method: 'POST',
            body: JSON.stringify({
                ...data,
                appversion:APP_VERSION,
                res:RESOURCE,
            }),
            headers: {
               'Content-Type': 'application/json; charset=utf-8',
               'authorization': sessionToken,
               'fl_auth_version': auth_version
            },
        })
        .then(res =>res.json())
        .then(json => resolve(json))
        .catch(e =>{
            console.log(e);
            reject({message:'Something went wrong!'})
        });
    });
}

/**
 * Update HTM profile
 * @param  {Number} auth_version             API authentication version
 * @param  {String} sessionToken             User authorization token
 * @param  {Object} Data                     HTM profile data
 *   ⮑ @param  {String} display_name        Profile display name
 *      @param  {String} email               Email address (optional)
 *      @param  {String} country             HTM Profile country
 *      @param  {Number} buy_at              the percentage more or less than current spot price for buying
 *      @param  {Number} sell_at             the percentage more or less than current spot price for selling
 *      @param  {Number} show_profile_pic    Show profile picture in HTM Profile
 *      @param  {String} show_distance_in    Show distance in Miles / Kms
 *      @param  {Object} currency_types      Array of currency object in include currency_type, buy_at and sell_at
 * @return {Object}                          Return API response
 */
export const updateHTMProfile = (auth_version, sessionToken, data) => {
    return new Promise((resolve,reject) => {
        fetch(API_URL+'/update-htm-profile',{
            method: 'POST',
            body: JSON.stringify({
                ...data,
                appversion:APP_VERSION,
                res:RESOURCE,
            }),
            headers: {
               'Content-Type': 'application/json; charset=utf-8',
               'authorization': sessionToken,
               'fl_auth_version': auth_version
            },
        })
        .then(res =>res.json())
        .then(json => resolve(json))
        .catch(e =>{
            console.log(e);
            reject({message:'Something went wrong!'})
        });
    });
}

/**
 * Get HTM profile
 * @param  {Number} auth_version    API authentication version
 * @param  {String} sessionToken    User authorization token
 * @return {Object}                 Return API response
 */
export const getHTMProfile = (auth_version, sessionToken) => {
    return new Promise((resolve,reject) => {
        let params=utils.buildURLQuery({
            res         :RESOURCE,
            appversion  :APP_VERSION,
        });
        fetch(API_URL+`/get-htm-profile?${params}`,{
            method: 'GET',
            body: null,
            headers: {
               'Content-Type': 'application/json; charset=utf-8',
               'authorization': sessionToken,
               'fl_auth_version': auth_version
            },
        })
        .then(res => res.json())
        .then(json => resolve(json))
        .catch(e =>{
            console.log(e);
            reject({message:'Something went wrong!'})
        });
    });
}

/**
 * Update HTM Location
 * @param  {Number} auth_version    API authentication version
 * @param  {String} sessionToken    User authorization token
 * @param  {Number} lat             HTM location latitude
 * @param  {Number} long            HTM location longitude
 * @return {Object}                 Return API response
 */
export const updateHTMLocation = (auth_version, sessionToken, lat, long) => {
    return new Promise((resolve,reject) => {
        fetch(API_URL+'/update-htm-location',{
            method: 'POST',
            body: JSON.stringify({
                lat,
                long,
                appversion:APP_VERSION,
                res:RESOURCE,
            }),
            headers: {
               'Content-Type': 'application/json; charset=utf-8',
               'authorization': sessionToken,
               'fl_auth_version': auth_version
            },
        })
        .then(res =>res.json())
        .then(json => resolve(json))
        .catch(e =>{
            console.log(e);
            reject({message:'Something went wrong!'})
        });
    });
}

/**
 * Get HTM Detail
 * @param  {Number} auth_version    API authentication version
 * @param  {String} sessionToken    User authorization token
 * @param  {String} username        HTM profile user name
 * @return {Object}                 Return API response
 */
export const getHTMDetail = (auth_version, sessionToken, username) => {
    return new Promise((resolve,reject) => {
        let params=utils.buildURLQuery({
            username,
            res         :RESOURCE,
            appversion  :APP_VERSION,
        });
        fetch(API_URL+`/get-htm-detail?${params}`,{
            method: 'GET',
            body: null,
            headers: {
               'Content-Type': 'application/json; charset=utf-8',
               'authorization': sessionToken,
               'fl_auth_version': auth_version
            },
        })
        .then(res =>res.json())
        .then(json => resolve(json))
        .catch(e =>{
            console.log(e);
            reject({message:'Something went wrong!'})
        });
    });
}

/**
 * Disable HTM Profile
 * @param  {Number} auth_version    API authentication version
 * @param  {String} sessionToken    User authorization token
 * @return {Object}                 Return API response
 */
export const disableHTMProfile = (auth_version, sessionToken) => {
    return new Promise((resolve,reject) => {
        let params=utils.buildURLQuery({
            res         :RESOURCE,
            appversion  :APP_VERSION,
        });
        fetch(API_URL+`/disable-htm-profile?${params}`,{
            method: 'GET',
            body: null,
            headers: {
               'Content-Type': 'application/json; charset=utf-8',
               'authorization': sessionToken,
               'fl_auth_version': auth_version
            },
        })
        .then(res =>res.json())
        .then(json => resolve(json))
        .catch(e =>{
            console.log(e);
            reject({message:'Something went wrong!'})
        });
    });
}

/**
 * Enable HTM Profile
 * @param  {Number} auth_version    API authentication version
 * @param  {String} sessionToken    User authorization token
 * @return {Object}                 Return API response
 */
export const enableHTMProfile = (auth_version, sessionToken) => {
    return new Promise((resolve,reject) => {
        let params=utils.buildURLQuery({
            res         :RESOURCE,
            appversion  :APP_VERSION,
        });
        fetch(API_URL+`/enable-htm-profile?${params}`,{
            method: 'GET',
            body: null,
            headers: {
               'Content-Type': 'application/json; charset=utf-8',
               'authorization': sessionToken,
               'fl_auth_version': auth_version
            },
        })
        .then(res =>res.json())
        .then(json => resolve(json))
        .catch(e =>{
            console.log(e);
            reject({message:'Something went wrong!'})
        });
    });
}

/**
 * Find Nearby HTMs
 * @param  {Number}  auth_version       API authentication version
 * @param  {String}  sessionToken       User authorization token
 * @param  {Number}  lat                HTM location latitude
 * @param  {Number}  long               HTM location longitude
 * @param  {String}  show_distance_in   Show distance in Miles / Kms
 * @param  {Object}  filter             HTM filter
 *   ⮑ @param  {Number}  upto_distance      Cover distance from current location
 *      @param  {Boolean} onlineOnly         Get only online HTMs (default: false)
 *      @param  {Number}  buy_at_from        the filter of buying percentage at from
 *      @param  {Number}  buy_at_to          the filter of buying percentage at to
 *      @param  {Number}  sell_at_from       the filter of selling percentage at from
 *      @param  {Number}  sell_at_to         the filter of selling percentage at to
 *      @param  {Array}   currency_types     Array of currency type like [1,2,3]
 * @return {Object}                     Return API response
 */
export const findNearByHTMs = (auth_version, sessionToken, lat, long,
    show_distance_in, filter) => {
    return new Promise((resolve,reject) => {
        fetch(API_URL+`/nearby-htms`,{
            method: 'POST',
            body: JSON.stringify({
                lat,
                long,
                show_distance_in,
                ...filter,
                appversion:APP_VERSION,
                res:RESOURCE,
            }),
            headers: {
               'Content-Type': 'application/json; charset=utf-8',
               'authorization': sessionToken,
               'fl_auth_version': auth_version
            },
        })
        .then(res => res.json())
        .then(json => resolve(json))
        .catch(e =>{
            console.log(e);
            reject({message:'Something went wrong!'})
        });
    });
}

/**
 * Submit Feedback
 * @param  {Number} auth_version             API authentication version
 * @param  {String} sessionToken             User authorization token
 * @param  {String} feedback_to_username     Feedback for...
 * @param  {String} channel_id               Channel ID
 * @param  {Object} data                     Feedback
 *   ⮑ @param  {Boolean} is_txn_success          Transaction successfull or not
 *      @param  {Boolean} is_trustworthy          Is this person trust worthy?
 *      @param  {Array} currency_traded           Currency tranded in
 *      @param  {String} prof_rating              Profile rating
 *      @param  {String} comments                 Addtional comments
 * @return {Object}                          Return API response
 */
export const submitFeedback = (auth_version, sessionToken, feedback_to_username,
    channel_id, data) => {
    return new Promise((resolve,reject) => {
        fetch(API_URL+'/add-htm-feedback',{
            method: 'POST',
            body: JSON.stringify({
                feedback_to_username,
                channel_id,
                ...data,
                appversion:APP_VERSION,
                res:RESOURCE,
            }),
            headers: {
               'Content-Type': 'application/json; charset=utf-8',
               'authorization': sessionToken,
               'fl_auth_version': auth_version
            },
        })
        .then(res => res.json())
        .then(json => resolve(json))
        .catch(e =>{
            console.log(e);
            reject({message:'Something went wrong!'})
        });
    });
}

/**
 * Get HTM Channel Feedback
 * @param  {Number} auth_version             API authentication version
 * @param  {String} sessionToken             User authorization token
 * @param  {String} channel_id               Channel Id
 * @return {Object}                          Return API response
 */
export const getHTMChannelFeedback = (auth_version, sessionToken, channel_id) => {
    return new Promise((resolve,reject) => {
        let params=utils.buildURLQuery({
            channel_id,
            res         :RESOURCE,
            appversion  :APP_VERSION,
        });
        fetch(API_URL+`/get-htm-channel-feedback?${params}`,{
            method: 'GET',
            body: null,
            headers: {
               'Content-Type': 'application/json; charset=utf-8',
               'authorization': sessionToken,
               'fl_auth_version': auth_version
            },
        })
        .then(res => res.json())
        .then(json => resolve(json))
        .catch(e =>{
            console.log(e);
            reject({message:'Something went wrong!'})
        });
    });
}

/**
 * Add Favorite HTM
 * @param  {Number} auth_version             API authentication version
 * @param  {String} sessionToken             User authorization token
 * @param  {String} favorite_username        Favorite HTM username
 * @return {Object}                          Return API response
 */
export const addFavoriteHTM = (auth_version, sessionToken, favorite_username) => {
    return new Promise((resolve,reject) => {
        fetch(API_URL+'/add-favorite-htm',{
            method: 'POST',
            body: JSON.stringify({
                favorite_username,
                appversion:APP_VERSION,
                res:RESOURCE,
            }),
            headers: {
               'Content-Type': 'application/json; charset=utf-8',
               'authorization': sessionToken,
               'fl_auth_version': auth_version
            },
        })
        .then(res => res.json())
        .then(json => resolve(json))
        .catch(e =>{
            console.log(e);
            reject({message:'Something went wrong!'})
        });
    });
}

/**
 * Delete Favorite HTM
 * @param  {Number} auth_version             API authentication version
 * @param  {String} sessionToken             User authorization token
 * @param  {String} favorite_username        Favorite HTM username
 * @return {Object}                          Return API response
 */
export const removeFavoriteHTM = (auth_version, sessionToken, favorite_username) => {
    return new Promise((resolve,reject) => {
        fetch(API_URL+'/remove-favorite-htm',{
            method: 'POST',
            body: JSON.stringify({
                favorite_username,
                appversion:APP_VERSION,
                res:RESOURCE,
            }),
            headers: {
               'Content-Type': 'application/json; charset=utf-8',
               'authorization': sessionToken,
               'fl_auth_version': auth_version
            },
        })
        .then(res => res.json())
        .then(json => resolve(json))
        .catch(e =>{
            console.log(e);
            reject({message:'Something went wrong!'})
        });
    });
}

/**
 * Get Favorite HTMs
 * @param  {Number} auth_version             API authentication version
 * @param  {String} sessionToken             User authorization token
 * @return {Object}                          Return API response
 */
export const getFavoriteHTMs = (auth_version, sessionToken) => {
    return new Promise((resolve,reject) => {
        let params=utils.buildURLQuery({
            res         :RESOURCE,
            appversion  :APP_VERSION,
        });
        fetch(API_URL+`/get-favorite-htms?${params}`,{
            method: 'GET',
            body: null,
            headers: {
               'Content-Type': 'application/json; charset=utf-8',
               'authorization': sessionToken,
               'fl_auth_version': auth_version
            },
        })
        .then(res => res.json())
        .then(json => resolve(json))
        .catch(e =>{
            console.log(e);
            reject({message:'Something went wrong!'})
        });
    });
}

/**
 * Get HTM Feedbacks
 * @param  {Number} auth_version             API authentication version
 * @param  {String} sessionToken             User authorization token
 * @param  {String} username                 HTM profile username
 * @return {Object}                          Return API response
 */
export const getHTMFeedbacks = (auth_version, sessionToken, username) => {
    return new Promise((resolve,reject) => {
        let params=utils.buildURLQuery({
            username,
            res         :RESOURCE,
            appversion  :APP_VERSION,
        });
        fetch(API_URL+`/get-htm-feedbacks?${params}`,{
            method: 'GET',
            body: null,
            headers: {
               'Content-Type': 'application/json; charset=utf-8',
               'authorization': sessionToken,
               'fl_auth_version': auth_version
            },
        })
        .then(res => res.json())
        .then(json => resolve(json))
        .catch(e =>{
            console.log(e);
            reject({message:'Something went wrong!'})
        });
    });
}

/**
 * Add Trusted HTM
 * @param  {Number} auth_version             API authentication version
 * @param  {String} sessionToken             User authorization token
 * @param  {String} trusted_username         Trusted HTM username
 * @return {Object}                          Return API response
 */
export const addTrustedHTM = (auth_version, sessionToken, trusted_username) => {
    return new Promise((resolve,reject) => {
        fetch(API_URL+'/add-trusted-htm',{
            method: 'POST',
            body: JSON.stringify({
                trusted_username,
                appversion:APP_VERSION,
                res:RESOURCE,
            }),
            headers: {
               'Content-Type': 'application/json; charset=utf-8',
               'authorization': sessionToken,
               'fl_auth_version': auth_version
            },
        })
        .then(res => res.json())
        .then(json => resolve(json))
        .catch(e =>{
            console.log(e);
            reject({message:'Something went wrong!'})
        });
    });
}

/**
 * Remove Trusted HTM
 * @param  {Number} auth_version             API authentication version
 * @param  {String} sessionToken             User authorization token
 * @param  {String} trusted_username         Trusted HTM username
 * @return {Object}                          Return API response
 */
export const removeTrustedHTM = (auth_version, sessionToken, trusted_username) => {
    return new Promise((resolve,reject) => {
        fetch(API_URL+'/remove-trusted-htm',{
            method: 'POST',
            body: JSON.stringify({
                trusted_username,
                appversion:APP_VERSION,
                res:RESOURCE,
            }),
            headers: {
               'Content-Type': 'application/json; charset=utf-8',
               'authorization': sessionToken,
               'fl_auth_version': auth_version
            },
        })
        .then(res => res.json())
        .then(json => resolve(json))
        .catch(e =>{
            console.log(e);
            reject({message:'Something went wrong!'})
        });
    });
}

/**
 * Get HTM Trade for Ad
 * @param  {Number} auth_version             API authentication version
 * @param  {String} sessionToken             User authorization token
 * @param  {Number} trade_id                 HTM Trade ID
 * @return {Object}                          Return API response
 */
export const getHTMTrade = (auth_version, sessionToken, trade_id) => {
    return new Promise((resolve,reject) => {
        let params=utils.buildURLQuery({
            trade_id,
            res         :RESOURCE,
            appversion  :APP_VERSION,
        });
        fetch(API_URL+`/get-htm-trade?${params}`,{
            method: 'GET',
            body: null,
            headers: {
               'Content-Type': 'application/json; charset=utf-8',
               'authorization': sessionToken,
               'fl_auth_version': auth_version
            },
        })
        .then(res => res.json())
        .then(json => resolve(json))
        .catch(e =>{
            console.log(e);
            reject({message:'Something went wrong!'})
        });
    });
}

/**
 * Get Active HTM Trade for Ad
 * @param  {Number} auth_version             API authentication version
 * @param  {String} sessionToken             User authorization token
 * @param  {Number} ad_id                    HTM profile username
 * @return {Object}                          Return API response
 */
export const getActiveHTMTrade = (auth_version, sessionToken, ad_id) => {
    return new Promise((resolve,reject) => {
        let params=utils.buildURLQuery({
            ad_id,
            res         :RESOURCE,
            appversion  :APP_VERSION,
        });
        fetch(API_URL+`/get-active-htm-trade?${params}`,{
            method: 'GET',
            body: null,
            headers: {
               'Content-Type': 'application/json; charset=utf-8',
               'authorization': sessionToken,
               'fl_auth_version': auth_version
            },
        })
        .then(res => res.json())
        .then(json => resolve(json))
        .catch(e =>{
            console.log(e);
            reject({message:'Something went wrong!'})
        });
    });
}

/**
 * Add HTM Trade Channel
 * @param  {Number} auth_version             API authentication version
 * @param  {String} sessionToken             User authorization token
 * @param  {Object} data                     HTM Trade object
 *   ⮑ @param  {Number} ad_id               Trade Ad ID
 *      @param  {Number} base_amount         Buy amount
 *      @param  {Number} to_amount           Sell amount
 *      @param  {Number} rate                Conversion rate 1 base currency = ? to currency
 *      @param  {String} receiver_name       Receiver display name
 *      @param  {String} receiver_dp         Receiver Profile Picture
 *      @param  {String} sender_name         Sender display name
 *      @param  {String} sender_dp           Sender Profile Picture
 * @return {Object}                          Return API response
 */
export const addHTMTrade = (auth_version, sessionToken, data) => {
    return new Promise((resolve,reject) => {
        fetch(API_URL+'/add-htm-trade',{
            method: 'POST',
            body: JSON.stringify({
                ...data,
                appversion:APP_VERSION,
                res:RESOURCE,
            }),
            headers: {
               'Content-Type': 'application/json; charset=utf-8',
               'authorization': sessionToken,
               'fl_auth_version': auth_version
            },
        })
        .then(res => res.json())
        .then(json => resolve(json))
        .catch(e =>{
            console.log(e);
            reject({message:'Something went wrong!'})
        });
    });
}

/**
 * Cancel HTM Trade
 * @param  {Number} auth_version             API authentication version
 * @param  {String} sessionToken             User authorization token
 * @param  {Number} trade_id                 HTM Trade ID
 * @param  {String} comment                  Reason
 * @return {Object}                          Return API response
 */
export const cancelHTMTrade = (auth_version, sessionToken, trade_id, comment) => {
    return new Promise((resolve,reject) => {
        fetch(API_URL+'/cancel-htm-trade',{
            method: 'POST',
            body: JSON.stringify({
                trade_id,
                comment,
                appversion:APP_VERSION,
                res:RESOURCE,
            }),
            headers: {
               'Content-Type': 'application/json; charset=utf-8',
               'authorization': sessionToken,
               'fl_auth_version': auth_version
            },
        })
        .then(res => res.json())
        .then(json => resolve(json))
        .catch(e =>{
            console.log(e);
            reject({message:'Something went wrong!'})
        });
    });
}

/**
 * Accept HTM Trade
 * @param  {Number} auth_version             API authentication version
 * @param  {String} sessionToken             User authorization token
 * @param  {Number} trade_id                 HTM Trade ID
 * @return {Object}                          Return API response
 */
export const acceptHTMTrade = (auth_version, sessionToken, trade_id) => {
    return new Promise((resolve,reject) => {
        fetch(API_URL+'/accept-htm-trade',{
            method: 'POST',
            body: JSON.stringify({
                trade_id,
                appversion:APP_VERSION,
                res:RESOURCE,
            }),
            headers: {
               'Content-Type': 'application/json; charset=utf-8',
               'authorization': sessionToken,
               'fl_auth_version': auth_version
            },
        })
        .then(res => res.json())
        .then(json => resolve(json))
        .catch(e =>{
            console.log(e);
            reject({message:'Something went wrong!'})
        });
    });
}

/**
 * Reject HTM Trade
 * @param  {Number} auth_version             API authentication version
 * @param  {String} sessionToken             User authorization token
 * @param  {Number} trade_id                 HTM Trade ID
 * @param  {String} comment                  Reason
 * @return {Object}                          Return API response
 */
export const rejectHTMTrade = (auth_version, sessionToken, trade_id, comment) => {
    return new Promise((resolve,reject) => {
        fetch(API_URL+'/reject-htm-trade',{
            method: 'POST',
            body: JSON.stringify({
                trade_id,
                comment,
                appversion:APP_VERSION,
                res:RESOURCE,
            }),
            headers: {
               'Content-Type': 'application/json; charset=utf-8',
               'authorization': sessionToken,
               'fl_auth_version': auth_version
            },
        })
        .then(res => res.json())
        .then(json => resolve(json))
        .catch(e =>{
            console.log(e);
            reject({message:'Something went wrong!'})
        });
    });
}
