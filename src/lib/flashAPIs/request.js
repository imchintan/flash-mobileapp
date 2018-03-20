import { API_URL, RESOURCE, APP_VERSION } from '@lib/config';
import moment from 'moment-timezone';

//add-money-request
//get-requests

/**
 * Add Money Request
 * @param {Number} auth_version      [description]
 * @param {String} [sessionToken=''] [description]
 * @param {Number} [currency_type=1] [description]
 * @param {Number} [amount=0]        [description]
 * @param {String} [bare_uid='']     [description]
 * @param {String} [to='']           [description]
 * @param {String} [note='']         [description]
 */
export const addMoneyRequest = (auth_version, sessionToken='',
    currency_type = 1, amount=0, bare_uid='', to='', note='') => {
    return new Promise((resolve,reject) => {
        fetch(API_URL+'/add-money-request',{
            method: 'POST',
            body: JSON.stringify({
                currency_type,
                amount,
                note,
                bare_uid,
                to,
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
 * Mark Cancelled Money Requests
 * @param  {Number} auth_version           [description]
 * @param  {String} [sessionToken='']      [description]
 * @param  {Number} [currency_type=1]      [description]
 * @param  {Number} [request_id=0]         [description]
 * @param  {String} [receiver_bare_uid=''] [description]
 * @return {Promise}                        [description]
 */
export const markCancelledMoneyRequests = (auth_version, sessionToken='',
    currency_type = 1, request_id=0, receiver_bare_uid='') => {
    return new Promise((resolve,reject) => {
        fetch(API_URL+'/mark-cancelled-money-requests',{
            method: 'POST',
            body: JSON.stringify({
                currency_type,
                request_id,
                receiver_bare_uid,
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
 * Mark Rejected Money Requests
 * @param  {Number} auth_version           [description]
 * @param  {String} [sessionToken='']      [description]
 * @param  {Number} [currency_type=1]      [description]
 * @param  {Number} [request_id=0]         [description]
 * @param  {String} [sender_bare_uid='']   [description]
 * @param  {String} [note_processing='']   [description]
 * @return {Promise}                       [description]
 */
export const markRejectedMoneyRequests = (auth_version, sessionToken='',
    currency_type = 1, request_id=0, sender_bare_uid='', note_processing='') => {
    return new Promise((resolve,reject) => {
        fetch(API_URL+'/mark-rejected-money-requests',{
            method: 'POST',
            body: JSON.stringify({
                currency_type,
                request_id,
                sender_bare_uid,
                note_processing,
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
 * Mark Sent Money Requests
 * @param  {Number} auth_version           [description]
 * @param  {String} [sessionToken='']      [description]
 * @param  {Number} [currency_type=1]      [description]
 * @param  {Number} [request_id=0]         [description]
 * @param  {String} [sender_bare_uid='']   [description]
 * @param  {String} [note_processing='']   [description]
 * @return {Promise}                       [description]
 */
export const markSentMoneyRequests = (auth_version, sessionToken='',
    currency_type = 1, request_id=0, sender_bare_uid='', note_processing='') => {
    return new Promise((resolve,reject) => {
        fetch(API_URL+'/mark-sent-money-requests',{
            method: 'POST',
            body: JSON.stringify({
                currency_type,
                request_id,
                sender_bare_uid,
                note_processing,
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
 * Get user transactions request
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
export const getRequests = (auth_version, sessionToken='', currency_type = 1,
    date_from=moment().add(-1, 'months').add(-1, 'days').format('YYYY-MM-DDTHH:mm:00.000\\Z') ,
    date_to=moment().format('YYYY-MM-DDTHH:mm:00.000\\Z'),
    type= 0, start=0, order='desc', size=10) => {
    return new Promise((resolve,reject) => {
        fetch(API_URL+'/get-requests',{
            method: 'POST',
            body: JSON.stringify({
                currency_type,
                date_from,
                date_to,
                order,
                size,
                start,
                status:[0],
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
 * Roster Operation
 * @param  {Number} auth_version      [description]
 * @param  {String} [sessionToken=''] [description]
 * @param  {Number} [op=1]            [description]
 * @param  {String} [to='']           [description]
 * @return {Promise}                   [description]
 */
export const rosterOperation = (auth_version, sessionToken='', op = 1, to='') => {
    return new Promise((resolve,reject) => {
        fetch(API_URL+'/roster-operation',{
            method: 'POST',
            body: JSON.stringify({
                op,
                to,
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
