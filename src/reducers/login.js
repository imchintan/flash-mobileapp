import * as types from '@actions/types';

const initialState = { isLoggedIn: false };

const login = (state = initialState, action) => {
    console.log(state, action);
    switch (action.type) {
        case types.LOGIN_SUCCESS:
            return { ...state, isLoggedIn: true, ...action.payload || {}};

        case types.LOGIN_FAILED:
            return { ...state, isLoggedIn: false, ...action.payload || {}};

        case types.LOGOUT:
            return { ...state, isLoggedIn: false };

        case types.SIGNUP_SUCCESS:
            return { ...state, isLoggedIn: true };

        default:
            return state;
    }
};

export default login;
