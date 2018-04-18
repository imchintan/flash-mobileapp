/**
 * Get Coin Market Cap Detail
 */
export const getCoinMarketCapDetail = () => {
    return new Promise((resolve,reject) => {
        fetch('https://api.coinmarketcap.com/v1/ticker/flash')
        .then(res => res.json())
        .then(json => resolve(json))
        .catch(e =>{
            console.log(e);
            reject('Something went wrong!')
        });
    });
}
