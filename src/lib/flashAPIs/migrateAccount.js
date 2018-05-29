import { API_URL, RESOURCE, APP_VERSION } from '@src/config';

export const migrateAccount = (auth_version=4, sessionToken='', params) => {
    return new Promise((resolve,reject) => {
        fetch(API_URL+'/migrateAccountV1ToV2',{
            method: 'POST',
            body: JSON.stringify({
                ...params,
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

export const migrateFlashWallet = (auth_version=4, sessionToken='', params) => {
    return new Promise((resolve,reject) => {
        fetch(API_URL+'/migrateFlashWallet',{
            method: 'POST',
            body: JSON.stringify({
                ...params,
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
