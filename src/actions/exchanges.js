import * as types from '@actions/types';
import * as apis from '@flashAPIs';
import * as constants from '@src/constants';

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
