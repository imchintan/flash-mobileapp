import { API_URL, RESOURCE, APP_VERSION } from '@src/config';

/**
 * Check sharing code is available or not
 * @param {Number} auth_version      [description]
 * @param {String} [sessionToken=''] [description]
 * @param {Number} [currency_type=1] [description]
 * @param {String} [sharing_code=''] [description]
 * @return {Promise}                 [description]
 */
export const isSharingCodeAvailable = (auth_version, sessionToken='',
    currency_type = 1, sharing_code='') => {
    return new Promise((resolve,reject) => {
        fetch(API_URL+'/is-sharing-code-available?sharing_code='+sharing_code
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
 * Add Sharing Code
 * @param {Number} auth_version      [description]
 * @param {String} [sessionToken=''] [description]
 * @param {Number} [currency_type=1] [description]
 * @param {String} [sharing_code=''] [description]
 * @param {Number} [sharing_fee=0]   [description]
 * @param {Object} [data]            [description]
 * @return {Promise}                 [description]
 */
export const addSharingCode = (auth_version, sessionToken='',
    currency_type = 1, sharing_code='', sharing_fee=0, data) => {
    return new Promise((resolve,reject) => {
        fetch(API_URL+'/add-sharing-code',{
            method: 'POST',
            body: JSON.stringify({
                sharing_code,
                sharing_fee,
                ...data.reduce((b,c)=>({...b,...c})),
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
 * Update Sharing Code
 * @param {Number} auth_version      [description]
 * @param {String} [sessionToken=''] [description]
 * @param {Number} [currency_type=1] [description]
 * @param {String} [sharing_code=''] [description]
 * @param {Number} [sharing_fee=0]   [description]
 * @param {Object} [data]            [description]
 * @return {Promise}                 [description]
 */
export const updateSharingCode = (auth_version, sessionToken='',
    currency_type = 1, sharing_code='', sharing_fee=0, data) => {
    return new Promise((resolve,reject) => {
        fetch(API_URL+'/update-sharing-code',{
            method: 'POST',
            body: JSON.stringify({
                sharing_code,
                sharing_fee,
                ...data.reduce((b,c)=>({...b,...c})),
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
 * Get Sharing Code
 * @param {Number} auth_version      [description]
 * @param {String} [sessionToken=''] [description]
 * @param {Number} [currency_type=1] [description]
 * @return {Promise}                 [description]
 */
export const getSharingCode = (auth_version, sessionToken='', currency_type = 1) => {
    return new Promise((resolve,reject) => {
        fetch(API_URL+'/get-sharing-code?appversion='+APP_VERSION+'&res='+RESOURCE,{
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
