import { API_URL, RESOURCE, APP_VERSION } from '@src/config';

/**
 * Add Payout Code
 * @param {Number} auth_version      [description]
 * @param {String} [sessionToken=''] [description]
 * @param {Number} [currency_type=1] [description]
 * @param {String} [sharing_code=''] [description]
 * @return {Promise}                 [description]
 */
export const addPayoutCode = (auth_version, sessionToken='',
    currency_type = 1, sharing_code='') => {
    return new Promise((resolve,reject) => {
        fetch(API_URL+'/add-payout-code',{
            method: 'post',
            body: JSON.stringify({
                sharing_code,
                currency_type,
                appversion:APP_VERSION,
                res:RESOURCE,
            }),
            headers: {
               'Content-Type': 'application/json; charset=utf-8',
               'authorization': sessionToken,
               'fl_auth_version': auth_version
            },
        })
        .then(async res =>{
            let _res = await res.text();
            if(_res.toLowerCase().indexOf("session") == -1){
                return JSON.parse(_res);
            }else{
                return {rc:3,reason:_res};
            }
        })
        .then(json => resolve(json))
        .catch(e =>{
            console.log(e);
            reject('Something went wrong!')
        });
    });
}

/**
 * Remove Payout Code
 * @param  {Number} auth_version      [description]
 * @param  {String} [sessionToken=''] [description]
 * @param  {Number} [currency_type=1] [description]
 * @return {Promise}                   [description]
 */
export const removePayoutCode = (auth_version, sessionToken='', currency_type = 1) => {
    return new Promise((resolve,reject) => {
        fetch(API_URL+'/remove-payout-code?currency_type='+currency_type
            +'&appversion='+APP_VERSION+'&res='+RESOURCE,{
            method: 'GET',
            body: null,
            headers: {
               'Content-Type': 'application/json; charset=utf-8',
               'authorization': sessionToken,
               'fl_auth_version': auth_version
            },
        })
        .then(async res =>{
            let _res = await res.text();
            if(_res.toLowerCase().indexOf("session") == -1){
                return JSON.parse(_res);
            }else{
                return {rc:3,reason:_res};
            }
        })
        .then(json => resolve(json))
        .catch(e =>{
            console.log(e);
            reject('Something went wrong!')
        });
    });
}

/**
 * Get Payout Code
 * @param  {Number} auth_version      [description]
 * @param  {String} [sessionToken=''] [description]
 * @param  {Number} [currency_type=1] [description]
 * @return {Promise}                   [description]
 */
export const getPayoutCode = (auth_version, sessionToken='', currency_type = 1) => {
    return new Promise((resolve,reject) => {
        fetch(API_URL+'/get-payout-code?currency_type='+currency_type
            +'&appversion='+APP_VERSION+'&res='+RESOURCE,{
            method: 'GET',
            body: null,
            headers: {
               'Content-Type': 'application/json; charset=utf-8',
               'authorization': sessionToken,
               'fl_auth_version': auth_version
            },
        })
        .then(async res =>{
            let _res = await res.text();
            if(_res.toLowerCase().indexOf("session") == -1){
                return JSON.parse(_res);
            }else{
                return {rc:3,reason:_res};
            }
        })
        .then(json => resolve(json))
        .catch(e =>{
            console.log(e);
            reject('Something went wrong!')
        });
    });
}

/**
 * Get Payout Info
 * @param  {Number} auth_version      [description]
 * @param  {String} [sessionToken=''] [description]
 * @param  {Number} [currency_type=1] [description]
 * @return {Promise}                   [description]
 */
export const getPayoutInfo = (auth_version, sessionToken='', currency_type = 1) => {
    return new Promise((resolve,reject) => {
        fetch(API_URL+'/get-payout-info?currency_type='+currency_type
            +'&appversion='+APP_VERSION+'&res='+RESOURCE,{
            method: 'GET',
            body: null,
            headers: {
               'Content-Type': 'application/json; charset=utf-8',
               'authorization': sessionToken,
               'fl_auth_version': auth_version
            },
        })
        .then(async res =>{
            let _res = await res.text();
            if(_res.toLowerCase().indexOf("session") == -1){
                return JSON.parse(_res);
            }else{
                return {rc:3,reason:_res};
            }
        })
        .then(json => resolve(json))
        .catch(e =>{
            console.log(e);
            reject('Something went wrong!')
        });
    });
}

//GYP4AH
