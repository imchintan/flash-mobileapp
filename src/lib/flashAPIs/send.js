import { API_URL, RESOURCE, APP_VERSION } from '@lib/config';
import moment from 'moment-timezone';

/**
 * Create raw transaction
 * @param  {Number} auth_version        [description]
 * @param  {String} [sessionToken='']   [description]
 * @param  {Number} [currency_type=1]   [description]
 * @param  {Number} [amount=0]          [description]
 * @param  {String} [publicAddress='']  [description]
 * @param  {String} [message='']        [description]
 * @return {Promise}                    [description]
 */
export const rawTransaction = (auth_version, sessionToken='',
    currency_type = 1, amount=0, publicAddress='', message='') => {
    return new Promise((resolve,reject) => {
        fetch(API_URL+'/raw-transaction',{
            method: 'POST',
            body: JSON.stringify({
                currency_type,
                amount,
                message,
                publicAddress,
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
// {"rc":1,"transaction":{"txid":"2d9e7b5488202a27c122f3f7ec9b6516f162cbfa0de09f771232ad45d27b4fc4",
// "rawtx":"010000000197741ecdfe1a32c2b7519122ac6bed417d87683ea09079fd20747d53f8c5b1b80100000000ffffffff0200e40b54020000001976a914546fa44e90344312fab95f8109425e73ae8ddf5788ac0054b781270000001976a9147b862fda105e1495b93a375552d47f4d2780395a88ac00000000"}}

/**
 * Add transaction
 * @param {Number} auth_version                 [description]
 * @param {String} [sessionToken='']            [description]
 * @param {Number} [currency_type=1]            [description]
 * @param {Number} [amount=0]                   [description]
 * @param {String} [ip='']                      [description]
 * @param {String} [memo='']                    [description]
 * @param {String} [receiver_bare_uid='']       [description]
 * @param {String} [receiver_id='']             [description]
 * @param {String} [receiver_public_address=''] [description]
 * @param {String} [transaction_hex='']         [description]
 * @param {String} [transaction_id='']          [description]
 */
export const addTransaction = (auth_version, sessionToken='', currency_type = 1,
    amount=0, ip='', memo='', receiver_bare_uid='', receiver_id='',
    receiver_public_address='', transaction_hex='', transaction_id= '') => {
    return new Promise((resolve,reject) => {
        fetch(API_URL+'/add-transaction',{
            method: 'POST',
            body: JSON.stringify({
                currency_type,
                amount,
                ip,
                memo,
                receiver_bare_uid,
                receiver_id,
                receiver_public_address,
                transaction_hex,
                transaction_id,
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
// {"rc":1,"id":25609}

/**
 * Add roster
 * @param {Number} auth_version      [description]
 * @param {String} [sessionToken=''] [description]
 * @param {String} [bare_uid='']     [description]
 */
export const addRoster = (auth_version, sessionToken='', bare_uid = '') => {
    return new Promise((resolve,reject) => {
        fetch(API_URL+'/roster-add',{
            method: 'POST',
            body: JSON.stringify({
                bare_uid,
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
//{"rc":1,"is_new":0}

/**
 * Get Roster
 * @param  {[type]} auth_version      [description]
 * @param  {String} [sessionToken=''] [description]
 * @param  {Number} [recv_size=0]     [description]
 * @param  {Number} [recv_start=-1]   [description]
 * @param  {Number} [sent_size=0]     [description]
 * @param  {Number} [sent_start=-1]   [description]
 * @param  {Number} [subs_size=10]    [description]
 * @param  {Number} [subs_start=0]    [description]
 * @return {[type]}                   [description]
 */
export const getRoster = (auth_version, sessionToken='', recv_size = 0,
    recv_start=-1, sent_size=0, sent_start=-1, subs_size=10, subs_start=0) => {
    return new Promise((resolve,reject) => {
        fetch(API_URL+'/get-roster',{
            method: 'POST',
            body: JSON.stringify({
                recv_size,
                recv_start,
                sent_size,
                sent_start,
                subs_size,
                subs_start,
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
// {"criteria":{"subs_start":0,"subs_size":10,"sent_start":-1,"sent_size":5,
// "recv_start":-1,"recv_size":0,"blkd_start":0,"blkd_size":5},"rc":1,
// "roster":{"total_subs":3,"subs":[{"bare_uid":"ashwini_chourasia_vns_gmail_com",
// "pres":{"res":"web","state":null}},{"bare_uid":"maulikvora59_1_gmail_com",
// "pres":{"res":"web","state":null}},{"bare_uid":"maulikvora59_2_gmail_com",
// "pres":{"res":"web","state":null}}],"total_sent":0,"sent":[],"total_recv":1,
// "recv":[],"total_blkd":0,"blkd":[]}}

/**
 * get transaction by id
 * @param {Number} auth_version                 [description]
 * @param {String} [sessionToken='']            [description]
 * @param {Number} [currency_type=1]            [description]
 * @param {Number} [amount=0]                   [description]
 * @param {String} [ip='']                      [description]
 * @param {String} [memo='']                    [description]
 * @param {String} [receiver_bare_uid='']       [description]
 * @param {String} [receiver_id='']             [description]
 * @param {String} [receiver_public_address=''] [description]
 * @param {String} [transaction_hex='']         [description]
 * @param {String} [transaction_id='']          [description]
 */
export const transactionById = (auth_version, sessionToken='', currency_type = 1,
    amount=0, ip='', memo='', receiver_bare_uid='', receiver_id='',
    receiver_public_address='', transaction_hex='', transaction_id= '') => {
    return new Promise((resolve,reject) => {
        let params = {
            currency_type,
            amount,
            ip,
            memo,
            receiver_bare_uid,
            receiver_id,
            receiver_public_address,
            transaction_hex,
            transaction_id,
            appversion:APP_VERSION,
            res:RESOURCE,
        }
        fetch(API_URL+'/transaction-by-id?'+Object.keys(params).reduce((a,k)=>{a.push(k+'='+encodeURIComponent(params[k]));return a},[]).join('&'),{
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
// {"rc":1,"txn":{"id":25609,"sender_id":"maulikvora59_3_gmail_com",
// "receiver_id":"maulikvora59_2_gmail_com","amount":1,"currency_type":1,
// "status":0,"processing_duration":0}}
