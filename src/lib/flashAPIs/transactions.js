import { API_URL, RESOURCE, APP_VERSION } from '@src/config';
import { CURRENCY_TYPE } from '@src/constants';
import moment from 'moment-timezone';

/**
 * Get user transactions
 * @param  {Number} auth_version      [description]
 * @param  {String} [sessionToken=''] [description]
 * @param  {Number} [currency_type=1] [description]
 * @param  {String} [date_from='']    [description]
 * @param  {String} [date_to='']      [description]
 * @param  {Number} [type=0]          [description]
 * @param  {Number} [start=0]         [description]
 * @param  {String} [order='desc']    [description]
 * @param  {Number} [size=10]         [description]
 * @return {Promise}                  [description]
 */
export const getTransactions = (auth_version, sessionToken='', currency_type = CURRENCY_TYPE.FLASH,
    _date_from=moment().add(-1, 'months').add(-1, 'days').format('YYYY-MM-DDT00:00:00.000\\Z') ,
    _date_to=moment().format('YYYY-MM-DDT23:59:59.000\\Z'),
    type= 0, start=0, order='desc', size=10) => {
    return new Promise((resolve,reject) => {
        let date_from = moment(_date_from).utc().format('YYYY-MM-DDTHH:mm:00.000\\Z');
        let date_to = moment(_date_to).utc().format('YYYY-MM-DDTHH:mm:00.000\\Z');
        fetch(API_URL+'/get-transactions',{
            method: 'POST',
            body: JSON.stringify({
                currency_type,
                date_from,
                date_to,
                order,
                size,
                start,
                type,
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
 * Get transaction detail
 * @param  {Number} auth_version      [description]
 * @param  {String} [sessionToken=''] [description]
 * @param  {String} [transaction_id]  [description]
 * @param  {Number} [currency_type=1] [description]
 * @return {Promise}                  [description]
 */
export const getTransactionDetail = (auth_version, sessionToken='',
    transaction_id, currency_type = CURRENCY_TYPE.FLASH) => {
    return new Promise((resolve,reject) => {

        fetch(API_URL+'/transaction-detail?transaction_id='+transaction_id+
            '&currency_type='+currency_type+'&appversion='+APP_VERSION
            +'&res='+RESOURCE,{
            method: 'GET',
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
 * Get sharing transaction detail
 * @param  {Number} auth_version      [description]
 * @param  {String} [sessionToken=''] [description]
 * @param  {String} [transaction_id]  [description]
 * @param  {Number} [currency_type=1] [description]
 * @return {Promise}                  [description]
 */
export const getSharingTransactionDetail = (auth_version, sessionToken='',
    transaction_id, currency_type = CURRENCY_TYPE.FLASH) => {
    return new Promise((resolve,reject) => {

        fetch(API_URL+'/sharing-transaction-detail?transaction_id='+transaction_id+
            '&currency_type='+currency_type+'&appversion='+APP_VERSION
            +'&res='+RESOURCE,{
            method: 'GET',
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
 *  Get SatoshiPerByte
 * @return {Promise}      [description]
 */
export const getSatoshiPerByte = (currency_type = CURRENCY_TYPE.BTC) => {
    return new Promise((resolve,reject) => {
        let url;
        switch (currency_type) {
            case CURRENCY_TYPE.LTC:
                url= 'https://api.blockcypher.com/v1/ltc/main';
                break;
            case CURRENCY_TYPE.DASH:
                url= 'https://api.blockcypher.com/v1/dash/main';
                break;
            case CURRENCY_TYPE.BTC:
            default:
                url= 'https://bitcoinfees.earn.com/api/v1/fees/recommended';
                break;
        }
        fetch(url,{
            method: 'GET',
            headers: {
               'Content-Type': 'application/json; charset=utf-8',
            },
        })
        .then(res => res.json())
        .then(json =>{
            if(currency_type == CURRENCY_TYPE.BTC)
                resolve(json.fastestFee)
            else
                resolve(json.high_fee_per_kb)
        })
        .catch(e =>{
            console.log(e);
            reject('Something went wrong!')
        });
    });
}

/**
 *  Get bc median transaction size
 * @param  {Number} auth_version      [description]
 * @param  {String} [sessionToken=''] [description]
 * @param  {Number} [currency_type=2] [description]
 * @return {Promise}                  [description]
 */
export const bcMedianTxSize = (auth_version, sessionToken='', currency_type = CURRENCY_TYPE.BTC) => {
    return new Promise((resolve,reject) => {
        fetch(API_URL+'/bc-median-tx-size?currency_type='+currency_type,{
            method: 'GET',
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
 *  Get threshold amount
 * @param  {Number} auth_version      [description]
 * @param  {String} [sessionToken=''] [description]
 * @param  {Number} [currency_type=2] [description]
 * @return {Promise}                  [description]
 */
export const thresholdAmount = (auth_version, sessionToken='', currency_type = CURRENCY_TYPE.BTC) => {
    return new Promise((resolve,reject) => {
        fetch(API_URL+'/threshold-amount?currency_type='+currency_type,{
            method: 'GET',
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
 *  Get fixed transaction fees
 * @param  {Number} auth_version      [description]
 * @param  {String} [sessionToken=''] [description]
 * @param  {Number} [currency_type=2] [description]
 * @return {Promise}                  [description]
 */
export const fixedTxnFee = (auth_version, sessionToken='', currency_type = CURRENCY_TYPE.DASH) => {
    return new Promise((resolve,reject) => {
        fetch(API_URL+'/fixed-txn-fee?currency_type='+currency_type,{
            method: 'GET',
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
 *  Get ether gas values
 * @param  {Number} auth_version      [description]
 * @param  {String} [sessionToken=''] [description]
 * @param  {Number} [currency_type=2] [description]
 * @return {Promise}                  [description]
 */
export const getEtherGasValues = (auth_version, sessionToken='', currency_type = CURRENCY_TYPE.ETH) => {
    return new Promise((resolve,reject) => {
        fetch(API_URL+'/gas-values?currency_type='+currency_type,{
            method: 'GET',
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
