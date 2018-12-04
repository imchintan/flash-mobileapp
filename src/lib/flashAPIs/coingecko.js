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
