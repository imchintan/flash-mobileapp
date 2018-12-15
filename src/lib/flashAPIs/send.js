import { API_URL, RESOURCE, APP_VERSION } from '@src/config';

/**
 * Create raw transaction
 * @param  {Number} auth_version        [description]
 * @param  {String} [sessionToken='']   [description]
 * @param  {Number} [currency_type=1]   [description]
 * @param  {Number} [amount=0]          [description]
 * @param  {Number} [custom_fee=0]      [description]
 * @param  {String} [publicAddress='']  [description]
 * @param  {String} [message='']        [description]
 * @return {Promise}                    [description]
 */
export const rawTransaction = (auth_version, sessionToken='',
    currency_type = 1, amount=0, custom_fee=0, publicAddress='', message='') => {
    return new Promise((resolve,reject) => {
        fetch(API_URL+'/raw-transaction',{
            method: 'POST',
            body: JSON.stringify({
                currency_type,
                amount,
                custom_fee,
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

/**
 * Create raw transaction Multi
 * @param  {Number} auth_version        [description]
 * @param  {String} [sessionToken='']   [description]
 * @param  {Number} [currency_type=1]   [description]
 * @param  {Array} [toAddresses=[]]     [description]
 * @param  {Number} [custom_fee=0]      [description]
 * @param  {String} [message='']        [description]
 * @return {Promise}                    [description]
 */
export const rawTransactionMulti = (auth_version, sessionToken='',
    currency_type = 1, toAddresses=[], custom_fee=0, message='') => {
    return new Promise((resolve,reject) => {
        fetch(API_URL+'/raw-transaction-multi',{
            method: 'POST',
            body: JSON.stringify({
                currency_type,
                custom_fee,
                message,
                toAddresses,
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
 * Get ETH transaction count
 * @param  {Number} auth_version        [description]
 * @param  {String} [sessionToken='']   [description]
 * @param  {Number} [currency_type=1]   [description]
 * @param  {String} [address='']        [description]
 * @return {Promise}                    [description]
 */
export const getEthTransactionCount = (auth_version, sessionToken='',
    currency_type = 1, address='') => {
    return new Promise((resolve,reject) => {
        fetch(API_URL+'/eth-txn-count?currency_type='+currency_type
                +'&address='+address+"&appversion="+APP_VERSION
                +"&res="+RESOURCE,{
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
 * @param {Number} [trade_id=0]                 [description]
 * @return {Promise}                            [description]
 */
export const addTransaction = (auth_version, sessionToken='', currency_type = 1,
    amount=0, ip='', memo='', receiver_bare_uid='', receiver_id='',
    receiver_public_address='', transaction_hex='', transaction_id= '', trade_id = 0) => {
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
                trade_id,
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
 * Add transaction Multi
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
 * @param {Array} [toAddresses]                 [description]
 * @param {Object} [payout_info]                [description]
 * @param {Object} [trade_id]                   [description]
 * @return {Promise}                            [description]
 */
export const addTransactionMulti = (auth_version, sessionToken='', currency_type = 1,
    amount=0, ip='', memo='', receiver_bare_uid='', receiver_id='',
    receiver_public_address='', transaction_hex='', transaction_id= '',
    toAddresses, payout_info, trade_id = 0) => {
    return new Promise((resolve,reject) => {
        fetch(API_URL+'/add-transaction-multi',{
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
                toAddresses,
                trade_id,
                sharing_fee_percentage: payout_info?payout_info.payout_sharing_fee:0,
                payout_code: payout_info?payout_info.payout_code:null,
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
 * Add roster
 * @param {Number} auth_version      [description]
 * @param {String} [sessionToken=''] [description]
 * @param {String} [bare_uid='']     [description]
 * @return {Promise}                 [description]
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
