import * as constants from '@src/constants';

/**
 * Get Coin Market Cap Detail
 */
export const getCoinMarketCapDetailFLASH = () => {
    return new Promise((resolve,reject) => {
        fetch('https://api.coinmarketcap.com/v1/ticker/flash/?convert=LTC')
        .then(res => res.json())
        .then(json =>{
            let price = {};
            price['flash'] = 1;
            price['btc']   = Number(json[0].price_btc);
            price['usd']   = Number(json[0].price_usd);
            price['ltc']   = Number(json[0].price_ltc);
            resolve(price);
        })
        .catch(e =>{
            console.log(e);
            reject('Something went wrong!')
        });
    });
}

export const getCoinMarketCapDetailLTC = () => {
    return new Promise((resolve,reject) => {
        fetch('https://api.coinmarketcap.com/v1/ticker/litecoin/?convert=FLASH')
        .then(res => res.json())
        .then(json =>{
            let price = {};
            price['flash'] = Number(json[0].price_flash);
            price['btc']   = Number(json[0].price_btc);
            price['usd']   = Number(json[0].price_usd);
            price['ltc']   = 1;
            resolve(price);
        })
        .catch(e =>{
            console.log(e);
            reject('Something went wrong!')
        });
    });
}

export const getCoinMarketCapDetaiDASH = () => {
    return new Promise((resolve,reject) => {
        fetch('https://api.coinmarketcap.com/v1/ticker/dash/?convert=FLASH')
        .then(res => res.json())
        .then(json =>{
            let price = {};
            price['flash'] = Number(json[0].price_flash);
            price['btc']   = Number(json[0].price_btc);
            price['usd']   = Number(json[0].price_usd);
            price['ltc']   = 1;
            resolve(price);
        })
        .catch(e =>{
            console.log(e);
            reject('Something went wrong!')
        });
    });
}

export const getCoinMarketCapDetailBTC = () => {
    return new Promise((resolve,reject) => {
        fetch('https://api.coinmarketcap.com/v1/ticker/bitcoin/?convert=FLASH')
        .then(res => res.json())
        .then(json =>{
            let price = {};
            price['flash'] = Number(json[0].price_flash);
            price['btc']   = 1;
            price['usd']   = Number(json[0].price_usd);
            fetch('https://api.coinmarketcap.com/v1/ticker/bitcoin/?convert=LTC')
            .then(res => res.json())
            .then(json =>{
                price['ltc'] = Number(json[0].price_ltc);
                resolve(price);
            })
            .catch(e =>{
                console.log(e);
                reject('Something went wrong!')
            });
        })
        .catch(e =>{
            console.log(e);
            reject('Something went wrong!')
        });
    });
}


export const getCoinMarketCapDetail = (currency_type, fiat_currency) => {
    return new Promise((resolve,reject) => {
        let currencyId  = constants.COIN_MARKET_CAP_CURRENCY_ID[constants.CURRENCY_TYPE_UNIT_UPCASE[currency_type]];
        fetch('https://api.coinmarketcap.com/v2/ticker/' + currencyId +
            '/?convert='+constants.FIAT_CURRENCY_UNIT[fiat_currency])
        .then(res => res.json())
        .then(json =>{
            if(json.data)
                resolve(json.data);
            else
                reject('Data not found!')
        })
        .catch(e =>{
            reject('Something went wrong!')
        });
    });
}
