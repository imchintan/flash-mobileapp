import * as types from '@actions/types'

export const getBalance = () => ({
    type: types.GET_BALANCE
});

export const getProfile = () => ({
    type: types.GET_PROFILE
});

export const getMyWallets = () => ({
    type: types.GET_MY_WALLETS
});
