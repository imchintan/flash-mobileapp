import { API_URL, RESOURCE, APP_VERSION } from './config';

/**
 * Get user balance
 * @param  {String} sessionToken     [description]
 * @param  {String} currency_type    [description]
 * @return {Promise}                 [description]
 */
export const getBalance = (sessionToken='', currency_type = 1) => {
    return new Promise((resolve,reject) => {
        let params = 'currency_type='+currency_type
            +'&appversion='+APP_VERSION
            +'&res='+RESOURCE;
        fetch(API_URL+'/balance?'+params,{
            method: 'GET',
            body: null,
            headers: {
               'Content-Type': 'application/json; charset=utf-8',
               'authorization': sessionToken
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
 * @param  {String} sessionToken     [description]
 * @return {Promise}                 [description]
 */
export const getProfile = (sessionToken='') => {
    return new Promise((resolve,reject) => {
        let params = 'appversion='+APP_VERSION
            +'&res='+RESOURCE;
        fetch(API_URL+'/profile?'+params,{
            method: 'GET',
            body: null,
            headers: {
               'Content-Type': 'application/json; charset=utf-8',
               'authorization': sessionToken
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
 * @param  {String} sessionToken     [description]
 * @return {Promise}                 [description]
 */
export const getMyWallets = (sessionToken='') => {
    return new Promise((resolve,reject) => {
        let params = 'appversion='+APP_VERSION
            +'&res='+RESOURCE;
        fetch(API_URL+'/my-wallets?'+params,{
            method: 'GET',
            body: null,
            headers: {
               'Content-Type': 'application/json; charset=utf-8',
               'authorization': sessionToken
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
