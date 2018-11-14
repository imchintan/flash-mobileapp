import { RESOURCE, APP_VERSION } from '@src/config';

/**
 * Get Fiat Currency exchange rate
 * @param  {Number} auth_version     [description]
 * @param  {String} sessionToken     [description]
 * @param  {String} currencies
 * @return {Promise}
 */
export const getFiatCurrencyExchangeRate = (auth_version, sessionToken, currencies) => {
    return new Promise((resolve,reject) => {
        let params = 'currencies='+currencies
            +'&appversion='+APP_VERSION
            +'&res='+RESOURCE;
        fetch(`https://dev04.flashcoin.io/api/get-currency-value?${params}`,{
            method: 'GET',
            body: null,
            headers: {
               'Content-Type': 'application/json; charset=utf-8',
               'authorization': sessionToken,
               'fl_auth_version': auth_version
            }
        })
        .then(res => res.json())
        .then(json =>resolve(json))
        .catch(e =>{
            console.log(e);
            reject('Something went wrong!')
        });
    });
}
