/**
 * Get CoinGecko Exchange Rates for Fiat Currency
 */
export const getCoinGeckoExchangeRates = () => {
    return new Promise((resolve,reject) => {
        fetch('https://api.coingecko.com/api/v3/exchange_rates')
        .then(res => res.json())
        .then(json =>resolve(json.rates))
        .catch(e =>{
            console.log(e);
            reject('Something went wrong!')
        });
    });
}

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
