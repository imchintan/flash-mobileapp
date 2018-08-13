import { API_URL, RESOURCE, APP_VERSION } from '@src/config';
import {
    AsyncStorage
} from 'react-native';

/**
 * Setup HTM profile
 * @param  {Number} auth_version    API authentication version
 * @param  {String} sessionToken    User authorization token
 * @param  {String} display_name    HTM profile display name
 * @param  {String} email           HTM profile email address
 * @param  {String} country         HTM Profile country
 * @param  {Number} want_to_buy     the percentage less than current spot price for buying
 * @param  {Number} want_to_sell    the percentage more than current spot price for selling
 * @return {Object}                 Return API response
 */
export const setupHTMProfile = (auth_version, sessionToken,
    display_name, email, country, want_to_buy, want_to_sell) => {
    return new Promise((resolve,reject) => {
        //**** Tmp setup *****//
        AsyncStorage.setItem('_api_htm_profile', JSON.stringify({
            display_name,
            email,
            country,
            want_to_buy,
            want_to_sell,
            enable: true,
        }));
        return resolve({rc:1})
        //*******************//
        fetch(API_URL+'/setup-htm-profile',{
            method: 'POST',
            body: JSON.stringify({
                display_name,
                email,
                country,
                want_to_buy,
                want_to_sell,
                enable: true,
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
    return new Promise(async(resolve,reject) => {

        //**** Tmp get *****//
        let htmProfile = await AsyncStorage.getItem('_api_htm_profile');
        console.log(htmProfile);
        if(!htmProfile) return resolve({rc:1,data:null});
        return resolve({rc:1,data: JSON.parse(htmProfile)});
        //*******************//

        fetch(API_URL+'/get-htm-profile',{
            method: 'POST',
            body: JSON.stringify({
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
 * @param  {Number} auth_version    API authentication version
 * @param  {String} sessionToken    User authorization token
 * @param  {object} data            change profile params object
 * @return {Object}                 Return API response
 */
export const updateHTMProfile = (auth_version, sessionToken, data) => {
    return new Promise(async(resolve,reject) => {

        //**** Tmp get *****//
        await AsyncStorage.setItem('_api_htm_profile', JSON.stringify(data));
        return resolve({rc:1});
        //*******************//

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
