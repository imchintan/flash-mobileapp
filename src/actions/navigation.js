import * as types from '@actions/types'
import apis from '@flashAPIs'

const login = () => {
    return (dispatch,getState) => {
        console.log(getState());
        apis.login('maulikvora59+3@gmail.com','Maulik123').then((d)=>{
            dispatch({
                type: types.LOGIN_FAILED,
                payload: d
            });
        }).catch(e=>{
            dispatch({
                type: types.LOGIN_FAILED,
                payload: {
                    errorMsg: e.message
                }
            });
        })
    }
}

const logout = () => ({
    type: types.LOGOUT
});

const signupSuccess = () => ({
    type: types.SIGNUP_SUCCESS
});


export {
  login,
  logout,
  signupSuccess
};
