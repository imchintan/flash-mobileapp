import * as types from '@actions/types';
import * as apis from '@flashAPIs';
import * as constants from '@src/constants';

const Toast =  require('@components/Toast');

export const getFiatExchangeRates = (cb=null) => {
    return (dispatch,getState) => {
        dispatch({ type: types.LOADING_START });
        let params = getState().params;
        let fiat_currency = constants.FIAT_CURRENCY_UNIT[params.fiat_currency].toLowerCase();
        apis.getKwayisiExchangeRates(fiat_currency).then((d)=>{
            let fiat_per_usd = d.rate;
            dispatch({
                type: types.GET_FIAT_CURRENCY_EXCHANGE_RATES,
                payload: {
                    fiat_per_usd,
                    loading: false
                }
            });
            if(cb)cb();
        }).catch(e=>{
            console.log(e);
            dispatch({
                type: types.GET_FIAT_CURRENCY_EXCHANGE_RATES,
                payload: { loading: false }
            });
        })
    }
}

export const getCoinGeckoExchangeRates = () => {
    return (dispatch,getState) => {
        dispatch({ type: types.LOADING_START });
        let params = getState().params;
        let fiat_currency = constants.FIAT_CURRENCY_UNIT[params.fiat_currency].toLowerCase();
        apis.getCoinGeckoExchangeRates().then((d)=>{
            let fiat_per_usd =  Number((d[fiat_currency].value / d['usd'].value).toFixed(3));
            dispatch({
                type: types.GET_COIN_GECKO_EXCHANGE_RATES,
                payload: {
                    fiat_per_usd,
                    loading: false
                }
            });
        }).catch(e=>{
            Toast.errorTop(e.message);
            dispatch({
                type: types.GET_COIN_GECKO_EXCHANGE_RATES,
                payload: { loading: false }
            });
        })
    }
}

export const getCoinGeckoExchangesByID = (exchange) => {
    return (dispatch,getState) => {
        dispatch({ type: types.LOADING_START });
        if(exchange.ID === 'coinmarketcap'){
            return dispatch({
                type: types.GET_COIN_GECKO_EXCHANGE_RATES_BY_ID,
                payload: {
                    exchange,
                    exchange_rates:null,
                    loading: false
                }
            });
        }
        let params = getState().params;
        let fiat_per_usd = params.fiat_per_usd || 0;
        apis.getCoinGeckoExchangesByID(exchange.ID).then((d)=>{
            let exchange_rates = [];
            params.balances.map(currency=>{
                let currency_type = currency.currency_type;
                let per_value = 0 ;

                if(currency_type !== constants.CURRENCY_TYPE.BTC){
                    let base = constants.CURRENCY_TYPE_UNIT_UPCASE[currency_type];
                    let idx = d.findIndex(c=> c.base == base);
                    if(idx > -1)
                        per_value = Number((fiat_per_usd * Number(d[idx]
                                .converted_last['usd'])).toFixed(3));
                }else{
                    per_value = Number((fiat_per_usd * Number(d[0].converted_last['usd'])
                        / Number(d[0].converted_last['btc'])
                        ).toFixed(3));
                }

                exchange_rates.push({
                    currency_type,
                    per_value
                })
            })
            // exchange_rates = exchange_rates.sort((a,b)=>((a.currency_type < b.currency_type? 1:-1) + (a.per_value > 0?-1:0)));
            dispatch({
                type: types.GET_COIN_GECKO_EXCHANGE_RATES_BY_ID,
                payload: {
                    exchange,
                    exchange_rates,
                    loading: false
                }
            });
        }).catch(e=>{
            console.log(e);
            Toast.errorTop(e.message);
            dispatch({
                type: types.GET_COIN_GECKO_EXCHANGE_RATES_BY_ID,
                payload: { loading: false }
            });
        })
    }
}
