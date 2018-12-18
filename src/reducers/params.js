import moment from 'moment-timezone';
import _ from 'lodash';
import * as types from '@actions/types';
import * as constants from '@src/constants';

const initialState = {
    isLoggedIn: false,
    balance: 0,
    ubalance: 0,
    fiat_balance: 0,
    fiat_per_value: 0,
    total_fiat_balance: 0,
    nightMode: false,
    sbalance: 0,
    balances: [
        {color: '#191714', amt:0, uamt:0, amt2:0, per_value:0, currency_type: constants.CURRENCY_TYPE.FLASH}, // Flash
        {color: '#343434', amt:0, uamt:0, amt2:0, per_value:0, currency_type: constants.CURRENCY_TYPE.BTC}, // BTC
        {color: '#565656', amt:0, uamt:0, amt2:0, per_value:0, currency_type: constants.CURRENCY_TYPE.ETH}, // ETH
        {color: '#787878', amt:0, uamt:0, amt2:0, per_value:0, currency_type: constants.CURRENCY_TYPE.LTC}, // LTC
        {color: '#989898', amt:0, uamt:0, amt2:0, per_value:0, currency_type: constants.CURRENCY_TYPE.DASH}, // DASH
    ],
    max_fees:{
        1: 0.001,
        2: 0.0001,
        3: 0.001,
        4: 0.00009,
        5: 0.0001
    },
    threshold_values:{
        1: 1,
        2: 0.00000546,
        3: 0.000294,
        4: 0.00000546,
        5: 0.0001,
    },
    loading: false,
    bcMedianTxSize: 250,
    satoshiPerByte: 20,
    thresholdAmount: 0.00001,
    fixedTxnFee: 0.00002,  //This we will get from API call for DASH
    currency_type: constants.CURRENCY_TYPE.FLASH,
    fiat_currency: constants.FIAT_CURRENCY.USD,
    date_from: moment().add(-1, 'months').add(-1, 'days'),
    date_to: moment(),
    pending_date_from: moment().add(-1, 'months').add(-1, 'days'),
    pending_date_to: moment(),
    last_message_datetime: new Date().getTime(),
};

const login = (state = initialState, action) => {
    switch (action.type) {
        case types.LOADING_START:
            return { ...state, loading: true, ...action.payload || {}};

        case types.LOADING_END:
            return { ...state, loading: false, ...action.payload || {}};

        case types.LOGIN_SUCCESS:
        case types.VERIFY_2FA_SUCCESS:
            return { ...state, isLoggedIn: true, recentTxns_loading: true,
                    last_message_datetime: new Date().getTime(),
                    errorMsg: null, ...action.payload || {}};

        case types.LOGIN_FAILED:
            return { ...state, isLoggedIn: false, ...action.payload || {}};

        case types.LOGOUT:
            return { ...initialState, ...action.payload || {}};

        case types.SIGNUP_SUCCESS:
            return { ...state, isLoggedIn: true };

        case types.GET_PROFILE:
            let created_ts = new Date(action.payload.profile.created_ts).getTime();
            let date_from = state.date_from;
            if(date_from.unix()*1000 < created_ts)
                date_from = moment(created_ts);

            return { ...state, ...action.payload, date_from, pending_date_from: date_from};

        case types.GET_RECENT_TRANSACTIONS:
            let recentTxns = action.payload.txns;
            return { ...state, recentTxns, recentTxns_loading: false};

        case types.GET_ALL_TRANSACTIONS:
            let allTxns = (!action.payload.reset)?
                _.concat(state.allTxns || [], action.payload.txns):action.payload.txns;
            _.sortedIndexBy(allTxns,{created_ts: null},'created_ts');
            let allTxns_total = action.payload.total_txns;
            return { ...state, allTxns, allTxns_total, allTxns_loading: false, allTxns_retrieve: false};

        case types.GET_SENT_TRANSACTIONS:
            let sentTxns = (!action.payload.reset)?
                _.concat(state.sentTxns || [], action.payload.txns):action.payload.txns;
            _.sortedIndexBy(sentTxns,{created_ts: null},'created_ts');
            let sentTxns_total = action.payload.total_txns;
            return { ...state, sentTxns, sentTxns_total, sentTxns_loading: false, sentTxns_retrieve: false};

        case types.GET_RECEIVED_TRANSACTIONS:
            let receivedTxns = (!action.payload.reset)?
                _.concat(state.receivedTxns || [], action.payload.txns):action.payload.txns;
            _.sortedIndexBy(receivedTxns,{created_ts: null},'created_ts');
            let receivedTxns_total = action.payload.total_txns;
            return { ...state, receivedTxns, receivedTxns_total, receivedTxns_loading: false, receivedTxns_retrieve: false};

        case types.GET_SHARING_IN_TRANSACTIONS:
            let sharingInTxns = (!action.payload.reset)?
                _.concat(state.sharingInTxns || [], action.payload.txns):action.payload.txns;
            _.sortedIndexBy(sharingInTxns,{created_ts: null},'created_ts');
            let sharingInTxns_total = action.payload.total_txns;
            return { ...state, sharingInTxns, sharingInTxns_total, sharingInTxns_loading: false, sharingInTxns_retrieve: false};

        case types.GET_SHARING_OUT_TRANSACTIONS:
            let sharingOutTxns = (!action.payload.reset)?
                _.concat(state.sharingOutTxns || [], action.payload.txns):action.payload.txns;
            _.sortedIndexBy(sharingOutTxns,{created_ts: null},'created_ts');
            let sharingOutTxns_total = action.payload.total_txns;
            return { ...state, sharingOutTxns, sharingOutTxns_total, sharingOutTxns_loading: false, sharingOutTxns_retrieve: false};

        case types.GET_SHARING_USAGE_TRANSACTIONS:
            let sharingUsageTxns = (!action.payload.reset)?
                _.concat(state.sharingUsageTxns || [], action.payload.txns):action.payload.txns;
            _.sortedIndexBy(sharingUsageTxns,{created_ts: null},'created_ts');
            let sharingUsageTxns_total = action.payload.total_txns;
            let sharingUsageTxns_total_sharing_fee = action.payload.total_sharing_fee;
            return { ...state, sharingUsageTxns, sharingUsageTxns_total, sharingUsageTxns_total_sharing_fee,
                    sharingUsageTxns_loading: false, sharingOutTxns_retrieve: false};

        case types.RESET_TRANSACTIONS:
            return { ...state, allTxns: [], sentTxns: [],  receivedTxns: [],
                    allTxns_total: 0, sentTxns_total: 0, receivedTxns_total: 0};

        case types.GET_INCOMING_REQUESTS:
            let inReqs = (!action.payload.reset)?
                _.concat(state.inReqs || [], action.payload.reqs): action.payload.reqs;
            _.sortedIndexBy(inReqs,{id: null},'id');
            let inReqs_total = action.payload.total_reqs;
            return { ...state, inReqs, inReqs_total, inReqs_loading:false, totalPending: ((state.outReqs_total || 0)+inReqs_total)};

        case types.GET_OUTGOING_REQUESTS:
            let outReqs = (!action.payload.reset)?
                _.concat(state.outReqs || [], action.payload.reqs):action.payload.reqs;
            _.sortedIndexBy(outReqs,{id: null},'id');
            let outReqs_total = action.payload.total_reqs;
            return { ...state, outReqs, outReqs_total, outReqs_loading:false, totalPending: ((state.inReqs_total || 0)+outReqs_total)};

        case types.RESET_REQUESTS:
            return { ...state, inReqs: [], outReqs: [], inReqs_total: 0, outReqs_total: 0, totalPending: 0 };

        case types.RESET_MESSAGES:
            return { ...state, errorMsg: null, successMsg: null, infoMsg: null, sendTxnSuccess: null };

        case types.UPDATE_TRANSACTION_REPORT_DATE:
            return { ...state, ...action.payload, allTxns_loading: true,
                sentTxns_loading: true, receivedTxns_loading: true };

        case types.UPDATE_REQUEST_REPORT_DATE:
            return { ...state, ...action.payload,
                outReqs_loading: true, inReqs_loading: true };

        case types.CONFIRM_2FA_SUCCESS:
            return { ...state, recovery_obj_2fa: null, loading: false,
                profile: {...state.profile, totp_enabled: true},
                successMsg: "Two Phase Authentication has been successfully setup. "+
                "You will now need to enter the Google authenticator code every time you login."};

        case types.TURN_OFF_2FA_SUCCESS:
            return { ...state, recovery_obj_2fa: null, loading: false,
                profile: {...state.profile, totp_enabled: false},
                successMsg:"Two phase authentication has been turn off successfully"};

        case types.RESET_2FA:
            return { ...state, recovery_obj_2fa: null};

        default:
            return { ...state, ...action.payload || {}};
    }
};

export default login;
