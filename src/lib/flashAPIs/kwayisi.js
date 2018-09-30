/**
 * Get Kwayisi Exchange Rates for Fiat Currency
 */
export const getKwayisiExchangeRates = (currency) => {
    return new Promise((resolve,reject) => {
        fetch(`https://dev.kwayisi.org/apis/forex/usd/${currency}`)
        .then(res => res.json())
        .then(json =>resolve(json))
        .catch(e =>{
            console.log(e);
            reject('Something went wrong!')
        });
    });
}
