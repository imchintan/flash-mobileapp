import {
    AsyncStorage
} from 'react-native';
import * as types from '@actions/types'
import apis from '@flashAPIs'
import { _logout } from '@actions/navigation'

export const getBalance = (refresh = false) => {
    return (dispatch,getState) => {
        let params = getState().params;
        apis.getBalance(params.profile.sessionToken,params.currencyType).then((d)=>{
            if(d.rc == 3){
                dispatch({
                    type: types.GET_BALANCE,
                    payload: {
                        errorMsg:d.reason,
                    }
                });
                setTimeout(()=>_logout(dispatch),500);
            }else if(d.rc == 2){
                dispatch({
                    type: types.GET_BALANCE,
                    payload: {
                        errorMsg:d.reason,
                    }
                });
            }else{
                AsyncStorage.setItem('balance',JSON.stringify(d.balance));
                dispatch({
                    type: types.GET_BALANCE,
                    payload: {
                        balance:d.balance,
                        successMsg: refresh?('Updated Balance: '+d.balance):null
                    }
                });
            }
        }).catch(e=>{
            dispatch({
                type: types.GET_BALANCE,
                payload: {
                    errorMsg: e.message,
                }
            });
        })
    }
}

export const getProfile = () => {
    return (dispatch,getState) => {
        let params = getState().params;
        dispatch({ type: types.LOADING_START });
        apis.getProfile(params.profile.sessionToken).then((d)=>{
            if(d.rc == 2){
                dispatch({
                    type: types.GET_PROFILE,
                    payload: {
                        errorMsg:d.reason,
                        loading:false
                    }
                });
            }else{
                AsyncStorage.mergeItem('user',JSON.stringify(d.profile));
                dispatch({
                    type: types.GET_PROFILE,
                    payload: {
                        loading:false,
                        profile:{...params.profile,...d.profile}
                    }
                });
            }
        }).catch(e=>{
            dispatch({
                type: types.GET_PROFILE,
                payload: {
                    errorMsg: e.message,
                    loading:false
                }
            });
        })
    }
}

export const getMyWallets = () => {
    return (dispatch,getState) => {
        let params = getState().params;
        dispatch({ type: types.LOADING_START });
        apis.getMyWallets(params.profile.sessionToken).then((d)=>{
            if(d.rc == 2){
                dispatch({
                    type: types.GET_MY_WALLETS,
                    payload: {
                        errorMsg:d.reason,
                    }
                });
            }else{
                AsyncStorage.setItem('my_wallets',JSON.stringify(d.my_wallets));
                dispatch({
                    type: types.GET_MY_WALLETS,
                    payload: {
                        my_wallets:d.my_wallets
                    }
                });
            }
        }).catch(e=>{
            dispatch({
                type: types.GET_MY_WALLETS,
                payload: {
                    errorMsg: e.message,
                }
            });
        })
    }
}
