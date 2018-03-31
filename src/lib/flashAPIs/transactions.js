import { API_URL, RESOURCE, APP_VERSION } from '@src/config';
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
export const getTransactions = (auth_version, sessionToken='', currency_type = 1,
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
