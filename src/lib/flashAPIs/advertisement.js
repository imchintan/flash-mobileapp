import { API_URL, RESOURCE, APP_VERSION } from '@src/config';
import * as utils from '@lib/utils';

/**
 * Add HTM Trade ad
 * @param  {Number} auth_version    API authentication version
 * @param  {String} sessionToken    User authorization token
 * @param  {Object} data            HTM Ad data
 *   ⮑ @param  {Number} buy        Want to buy currency type
 *      @param  {Number} sell       currency type against buy
 *      @param  {Number} margin     Margin you want over the market price. Use a negative value for buying or selling under the market price
 *      @param  {Number} min        Minimum transaction limit in one trade (Optional)
 *      @param  {Number} max        Maximum transaction limit in one trade (Optional)
 *      @param  {String} terms      Other information you wish to tell about your trade (Optional)
 * @return {Object}                 Return API response
 */
export const addHTMAd = (auth_version, sessionToken, data) => {
    return new Promise((resolve,reject) => {
        fetch(API_URL+'/add-htm-ad',{
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
 * Update HTM Trade ad
 * @param  {Number} auth_version    API authentication version
 * @param  {String} sessionToken    User authorization token
 * @param  {Number} id              Advertisement ID
 * @param  {Object} data            HTM Ad data
 *   ⮑ @param  {Number} buy        Want to buy currency type
 *      @param  {Number} sell       currency type against buy
 *      @param  {Number} margin     Margin you want over the market price. Use a negative value for buying or selling under the market price
 *      @param  {Number} min        Minimum transaction limit in one trade (Optional)
 *      @param  {Number} max        Maximum transaction limit in one trade (Optional)
 *      @param  {String} terms      Other information you wish to tell about your trade (Optional)
 * @return {Object}                 Return API response
 */
export const updateHTMAd = (auth_version, sessionToken, id, data) => {
    return new Promise((resolve,reject) => {
        fetch(API_URL+'/update-htm-ad',{
            method: 'POST',
            body: JSON.stringify({
                id,
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
 * Find HTM Ads
 * @param  {Number} auth_version    API authentication version
 * @param  {String} sessionToken    User authorization token
 * @param  {Number} id              HTM Ad ID
 * @param  {Object} filter          HTM Ads filter
 *   ⮑ @param  {Number} buy        buy currency type
 *      @param  {Number} sell       currency type against buy
 * @param  {number} start           Starting from
 * @param  {number} size            No of records limit
 * @return {Object}                 Return API response
 */
export const findHTMAds = (auth_version, sessionToken, filter, start, size=10) => {
    return new Promise((resolve,reject) => {
        fetch(API_URL+'/find-htm-ads',{
            method: 'POST',
            body: JSON.stringify({
                ...filter,
                start,
                size,
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
 * Get HTM Ads (my ads)
 * @param  {Number} auth_version    API authentication version
 * @param  {String} sessionToken    User authorization token
 * @param  {number} start           Starting from
 * @param  {number} size            No of records limit
 * @return {Object}                 Return API response
 */
export const getHTMAds = (auth_version, sessionToken, start, size=10) => {
    return new Promise((resolve,reject) => {
        let params=utils.buildURLQuery({
            start,
            size,
            res         :RESOURCE,
            appversion  :APP_VERSION,
        });
        fetch(API_URL+`/get-htm-ads?${params}`,{
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
 * Delete HTM Ad
 * @param  {Number} auth_version    API authentication version
 * @param  {String} sessionToken    User authorization token
 * @param  {Number} id              HTM Ad ID
 * @return {Object}                 Return API response
 */
export const deleteHTMAd = (auth_version, sessionToken, id) => {
    return new Promise((resolve,reject) => {
        let params=utils.buildURLQuery({
            id,
            res         :RESOURCE,
            appversion  :APP_VERSION,
        });
        fetch(API_URL+`/delete-htm-ad?${params}`,{
            method: 'DELETE',
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
