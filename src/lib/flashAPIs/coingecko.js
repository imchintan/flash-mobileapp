/**
 * Get CoinGecko Exchange Rates By Id
 */
export const getCoinGeckoExchangesByID = (id) => {
    return new Promise((resolve,reject) => {
        fetch(`https://api.coingecko.com/api/v3/exchanges/${id}`)
        .then(res => res.json())
        .then(json =>resolve(json.tickers))
        .catch(e =>{
            console.log(e);
            reject('Something went wrong!')
        });
    });
}

/**
* Get Fiat Currency Rate
*/
export const getFiatCurrencyRate = (currency) => {
   return new Promise((resolve,reject) => {
       let params = 'localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false';
       fetch(`https://api.coingecko.com/api/v3/coins/${currency}?${params}`)
       .then(res => res.json())
       .then(json =>{
           resolve(json.market_data.current_price.usd);
       })
        .catch(e =>{
            console.log(e);
            reject('Something went wrong!')
        });
    });
}

/**
* Get Fiat Currency Rate V2
*/
export const getFiatCurrencyRateV2 = (currencies,fiat_currency=null) => {
   return new Promise((resolve,reject) => {
       fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${currencies}&vs_currencies=usd,btc${
           fiat_currency && fiat_currency!=='usd'?(','+fiat_currency):''}`)
       .then(res => res.json())
       .then(json =>resolve(json))
        .catch(e =>{
            console.log(e);
            reject('Something went wrong!')
        });
    });
}
