import { API_URL, RESOURCE, APP_VERSION } from '@src/config';

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
 * Get user wallet secret
 * @param  {String} authorization     [description]
 * @return {Promise}                 [description]
 */
export const walletSecret = (authorization='') => {
    return new Promise((resolve,reject) => {
        let params = 'appversion='+APP_VERSION
            +'&res='+RESOURCE;
        fetch(API_URL+'/wallet-secret?'+params,{
            method: 'GET',
            body: null,
            headers: {
               'Content-Type': 'application/json; charset=utf-8',
               'authorization': authorization,
               'fl_auth_version': 3
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

/**
 * Search User Wallet
 * @param  {Number} auth_version      [description]
 * @param  {String} [sessionToken=''] [description]
 * @param  {Number} [currency_type=1] [description]
 * @param  {Number} [term=0]          [description]
 * @param  {Number} [start=0]         [description]
 * @param  {Number} [size=10]         [description]
 * @return {Promise}                  [description]
 */
export const searchWallet = (auth_version, sessionToken='',
    currency_type = 1, term, start=0, size=1) => {
    return new Promise((resolve,reject) => {
        fetch(API_URL+'/search-wallet',{
            method: 'POST',
            body: JSON.stringify({
                currency_type,
                term,
                size,
                start,
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
 * Start 2FA
 * @param  {Number} auth_version      [description]
 * @param  {String} [sessionToken=''] [description]
 * @return {Promise}                  [description]
 */
export const start2FA = (auth_version, sessionToken='') => {
    return new Promise((resolve,reject) => {
        fetch(API_URL+'/start-2fa-code',{
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
 * Turn off 2FA
 * @param  {Number} auth_version      [description]
 * @param  {String} [sessionToken=''] [description]
 * @return {Promise}                  [description]
 */
export const turnOff2FA = (auth_version, sessionToken='') => {
    return new Promise((resolve,reject) => {
        fetch(API_URL+'/turn-off-2fa',{
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
 * Confirm 2FA
 * @param  {Number} auth_version      [description]
 * @param  {String} [sessionToken=''] [description]
 * @param  {String} code              [description]
 * @return {Promise}                  [description]
 */
export const confirm2FA = (auth_version, sessionToken, code) => {
    return new Promise((resolve,reject) => {
        fetch(API_URL+'/confirm-2fa-code',{
            method: 'POST',
            body: JSON.stringify({
                code,
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
 * Check 2FA
 * @param  {Number} auth_version      [description]
 * @param  {String} [idToken='']      [description]
 * @param  {String} code              [description]
 * @return {Promise}                  [description]
 */
export const check2FA = (auth_version, idToken, code) => {
    return new Promise((resolve,reject) => {
        fetch(API_URL+'/check-2fa-code',{
            method: 'POST',
            body: JSON.stringify({
                idToken,
                code,
                appversion:APP_VERSION,
                res:RESOURCE,
            }),
            headers: {
               'Content-Type': 'application/json; charset=utf-8',
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
