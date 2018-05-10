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
