import {
    AsyncStorage
} from 'react-native';
import * as types from '@actions/types'
import apis from '@flashAPIs'

export const init = () => {
    return async (dispatch,getState) => {
        dispatch({ type: types.LOADING_START });
        let user = await AsyncStorage.getItem('user');
        if(user){
            let payload = {
                profile:JSON.parse(user),
                loading:false
            };

            let my_wallets = await AsyncStorage.getItem('my_wallets');
            if(my_wallets){
                payload.my_wallets = JSON.parse(my_wallets)
            }

            let balance = await AsyncStorage.getItem('balance');
            if(balance){
                payload.balance = JSON.parse(balance)
            }
            dispatch({
                type: types.LOGIN_SUCCESS,
                payload
            });

        }else{
            dispatch({ type: types.LOADING_END });
        }
    }
}

export const login = (email,password) => {
    return (dispatch,getState) => {
        dispatch({ type: types.LOADING_START });
        apis.login(email,password).then((d)=>{
            if(d.rc == 2){
                dispatch({
                    type: types.LOGIN_FAILED,
                    payload: {
                        errorMsg:d.reason,
                        loading:false
                    }
                });
            }else{
                AsyncStorage.setItem('user',JSON.stringify(d.profile));
                dispatch({
                    type: types.LOGIN_SUCCESS,
                    payload: {
                        profile:d.profile,
                        loading:false
                    }
                });
            }

        }).catch(e=>{
            dispatch({
                type: types.LOGIN_FAILED,
                payload: {
                    errorMsg: e.message,
                    loading:false
                }
            });
        })
    }
}

export const logout = () => {
    return (dispatch,getState) => _logout(dispatch);
}

export const _logout = async(dispatch) => {
    dispatch({ type: types.LOADING_START });
    await AsyncStorage.clear();
    dispatch({ type: types.LOGOUT });
}

export const signupSuccess = () => ({
    type: types.SIGNUP_SUCCESS
});
