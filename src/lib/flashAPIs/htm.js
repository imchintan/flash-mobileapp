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
            reject('Something went wrong!')
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
            reject('Something went wrong!')
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
            reject('Something went wrong!')
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
            reject('Something went wrong!')
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
            reject('Something went wrong!')
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
            reject('Something went wrong!')
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
            reject('Something went wrong!')
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
            reject('Something went wrong!')
        });
    });
}
