import { API_URL, RESOURCE, APP_VERSION } from './config';

/**
 * Get user balance
 * @param  {Number} auth_version     [description]
 * @param  {String} sessionToken     [description]
 * @param  {Number} currency_type    [description]
 * @return {Promise}                 [description]
 */
export const getBalance = (auth_version, sessionToken='', currency_type = 1) => {
    return new Promise((resolve,reject) => {
        let params = 'currency_type='+currency_type
            +'&appversion='+APP_VERSION
            +'&res='+RESOURCE;
        fetch(API_URL+'/balance?'+params,{
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
 * Get user profile
 * @param  {Number} auth_version     [description]
 * @param  {String} sessionToken     [description]
 * @return {Promise}                 [description]
 */
export const getProfile = (auth_version, sessionToken='') => {
    return new Promise((resolve,reject) => {
        let params = 'appversion='+APP_VERSION
            +'&res='+RESOURCE;
        fetch(API_URL+'/profile?'+params,{
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
 * Get user wallet
 * @param  {Number} auth_version     [description]
 * @param  {String} sessionToken     [description]
 * @return {Promise}                 [description]
 */
export const getMyWallets = (auth_version, sessionToken='') => {
    return new Promise((resolve,reject) => {
        let params = 'appversion='+APP_VERSION
            +'&res='+RESOURCE;
        fetch(API_URL+'/my-wallets?'+params,{
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
 * Get user wallet address
 * @param  {Number} auth_version     [description]
 * @param  {String} sessionToken     [description]
 * @param  {Number} currency_type     [description]
 * @return {Promise}                 [description]
 */
export const getWalletsByEmail = (auth_version, sessionToken='', email, currency_type=1, size=1, start=0) => {
    return new Promise((resolve,reject) => {
        fetch(API_URL+'/get-wallets-by-email',{
            method: 'POST',
            body: JSON.stringify({
                email,
                size,
                start,
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
