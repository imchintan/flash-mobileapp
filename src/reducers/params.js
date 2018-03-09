import moment from 'moment';
import _ from 'lodash';
import * as types from '@actions/types';

const initialState = {
    isLoggedIn: false,
    loading: false,
    currencyType: 1,
    date_from: moment().add(-1, 'months').add(-1, 'days'),
    date_to: moment(),
};

const login = (state = initialState, action) => {
    switch (action.type) {
        case types.LOADING_START:
            return { ...state, loading: true};

        case types.LOADING_END:
            return { ...state, loading: false};

        case types.LOGIN_SUCCESS:
            return { ...state, isLoggedIn: true, errorMsg: null, ...action.payload || {}};

        case types.LOGIN_FAILED:
            return { ...state, isLoggedIn: false, ...action.payload || {}};

        case types.LOGOUT:
            return initialState;

        case types.SIGNUP_SUCCESS:
            return { ...state, isLoggedIn: true };

        case types.GET_RECENT_TRANSACTIONS:
            let recentTxns = (state.recentTxns || []).concat(action.payload.txns || []);
            return { ...state, recentTxns};

        case types.GET_ALL_TRANSACTIONS:
            let allTxns = _.concat(state.allTxns || [], action.payload.txns);
            _.sortedIndexBy(allTxns,{created_ts: null},'created_ts');
            let allTxns_total = action.payload.total_txns;
            return { ...state, allTxns, allTxns_total};

        case types.GET_SENT_TRANSACTIONS:
            let sentTxns = _.concat(state.sentTxns || [], action.payload.txns);
            _.sortedIndexBy(sentTxns,{created_ts: null},'created_ts');
            let sentTxns_total = action.payload.total_txns;
            return { ...state, sentTxns, sentTxns_total};

        case types.GET_RECEIVED_TRANSACTIONS:
            let receivedTxns = _.concat(state.receivedTxns || [], action.payload.txns);
            _.sortedIndexBy(receivedTxns,{created_ts: null},'created_ts');
            let receivedTxns_total = action.payload.total_txns;
            return { ...state, receivedTxns, receivedTxns_total};

        case types.RESET_TRANSACTIONS:
            return { ...state, allTxns: [], sentTxns: [],  receivedTxns: []};

        case types.UPDATE_TRANSACTION_REPORT_DATE:
            return { ...state, ...action.payload };

        default:
            return { ...state, ...action.payload || {}};
    }
};

export default login;
