
//action
export const INIT = 'INIT';
export const CUSTOM_ACTION = 'CUSTOM_ACTION';
export const LOGOUT = 'LOGOUT';

export const LOADING = 'LOADING';
export const LOADING_START = 'LOADING_START';
export const LOADING_END = 'LOADING_END';

export const FORGOT_PASSWORD = 'FORGOT_PASSWORD';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILED = 'SIGNUP_FAILED';
export const RESET_MESSAGES = 'RESET_MESSAGES';
export const SET_PUBLIC_IP = 'SET_PUBLIC_IP';
export const SET_LOCATION = 'SET_LOCATION';
export const SET_POSITION = 'SET_POSITION';
export const CHANGE_CURRENCY = 'CHANGE_CURRENCY';
export const CHANGE_NIGHT_MODE = 'CHANGE_NIGHT_MODE';

//Pin
export const CREATE_PIN = 'CREATE_PIN';
export const UPDATE_PIN = 'UPDATE_PIN';
export const ENETER_PIN = 'ENETER_PIN';
export const ENABLE_DISABLE_TOUCH_ID = 'ENABLE_DISABLE_TOUCH_ID';

//2FA
export const START_2FA = 'START_2FA';
export const RESET_2FA = 'RESET_2FA';
export const CONFIRM_2FA_SUCCESS = 'CONFIRM_2FA_SUCCESS';
export const CONFIRM_2FA_FAILED = 'CONFIRM_2FA_FAILED';
export const VERIFY_2FA = 'VERIFY_2FA';
export const VERIFY_2FA_SUCCESS = 'VERIFY_2FA_SUCCESS';
export const VERIFY_2FA_FAILED = 'VERIFY_2FA_FAILED';
export const TURN_OFF_2FA_SUCCESS = 'TURN_OFF_2FA_SUCCESS';
export const TURN_OFF_2FA_FAILED = 'TURN_OFF_2FA_FAILED';
export const MIGRATE_ACCOUNT = 'MIGRATE_ACCOUNT';
export const MIGRATE_ACCOUNT_FAILED = 'MIGRATE_ACCOUNT_FAILED';
export const MIGRATE_ACCOUNT_SUCCESS = 'MIGRATE_ACCOUNT_SUCCESS';

//Wallet
export const STORE_FOUNTAIN_SECRET = 'STORE_FOUNTAIN_SECRET';

//Transactions
export const GET_TRANSACTION_DETAIL = 'GET_TRANSACTION_DETAIL';
export const GET_ALL_TRANSACTIONS = 'GET_ALL_TRANSACTIONS';
export const GET_RECENT_TRANSACTIONS = 'GET_RECENT_TRANSACTIONS';
export const GET_SENT_TRANSACTIONS = 'GET_SENT_TRANSACTIONS';
export const GET_RECEIVED_TRANSACTIONS = 'GET_RECEIVED_TRANSACTIONS';
export const GET_SHARING_TRANSACTION_DETAIL = 'GET_SHARING_TRANSACTION_DETAIL';
export const GET_SHARING_IN_TRANSACTIONS = 'GET_SHARING_IN_TRANSACTIONS';
export const GET_SHARING_OUT_TRANSACTIONS = 'GET_SHARING_OUT_TRANSACTIONS';
export const GET_SHARING_USAGE_TRANSACTIONS = 'GET_SHARING_USAGE_TRANSACTIONS';

export const RESET_TRANSACTIONS = 'RESET_TRANSACTIONS';
export const UPDATE_TRANSACTION_REPORT_DATE = 'UPDATE_TRANSACTION_REPORT_DATE';
export const SET_BC_MEDIAN_TX_SIZE = 'SET_BC_MEDIAN_TX_SIZE';
export const SET_SATOSHI_PER_BYTE = 'SET_SATOSHI_PER_BYTE';
export const SET_THRESHOLD_AMOUNT = 'SET_THRESHOLD_AMOUNT';
export const SET_FIXED_TXN_FEE = 'SET_FIXED_TXN_FEE';
export const SET_ETHER_GAS_VALUES = 'SET_ETHER_GAS_VALUES';

// Money Request
export const ADD_MONEY_REQUEST = 'ADD_MONEY_REQUEST';
export const GET_INCOMING_REQUESTS = 'GET_INCOMING_REQUESTS';
export const GET_OUTGOING_REQUESTS = 'GET_OUTGOING_REQUESTS';
export const RESET_REQUESTS = 'RESET_REQUESTS';
export const UPDATE_REQUEST_REPORT_DATE = 'UPDATE_REQUEST_REPORT_DATE';

export const ROSTER_OPERATION = 'ROSTER_OPERATION';
export const ADD_ROASTER = 'ADD_ROASTER';
export const MARK_CANCELLED_MONEY_REQUESTS = 'MARK_CANCELLED_MONEY_REQUESTS';
export const MARK_REJECTED_MONEY_REQUESTS = 'MARK_REJECTED_MONEY_REQUESTS';
export const MARK_SENT_MONEY_REQUESTS = 'MARK_SENT_MONEY_REQUESTS';

//Home
export const GET_BALANCE = 'GET_BALANCE';
export const GET_COIN_MARKET_CAP_VALUE = 'GET_COIN_MARKET_CAP_VALUE';
export const GET_MY_WALLETS = 'GET_MY_WALLETS';
export const GET_WALLET_ADDRESS = 'GET_WALLET_ADDRESS';
export const SHOW_QR = 'SHOW_QR';
export const HIDE_QR = 'HIDE_QR';
export const GET_PROFILE = 'GET_PROFILE';
export const UPDATE_PROFILE = 'UPDATE_PROFILE';
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
export const SEND_VERIFICATION_SMS = 'SEND_VERIFICATION_SMS';
export const VERIFY_PHONE = 'VERIFY_PHONE';
export const SET_RECOVERY_KEYS = 'SET_RECOVERY_KEYS';

// Navigation
export const NAVIGATE_DASHBOARD = 'NAVIGATE_DASHBOARD';
export const NAVIGATE_BACK = 'NAVIGATE_BACK';


// Send/Request Payment
export const SEARCH_WALLET = 'SEARCH_WALLET';
export const RAW_TRANSACTION = 'RAW_TRANSACTION';
export const ADD_TRANSACTION = 'ADD_TRANSACTION';
export const TRANSACTION_BY_ID = 'TRANSACTION_BY_ID';

//Messages
export const GET_MESSAGES = 'GET_MESSAGES';

//Sharing
export const GET_PAYOUT_INFO = 'GET_PAYOUT_INFO';
export const GET_PAYOUT_CODE = 'GET_PAYOUT_CODE';
export const ADD_PAYOUT_CODE = 'ADD_PAYOUT_CODE';
export const REMOVE_PAYOUT_CODE = 'REMOVE_PAYOUT_CODE';

export const GET_SHARING_CODE = 'GET_SHARING_CODE';
export const ADD_SHARING_CODE = 'ADD_SHARING_CODE';
export const UPDATE_SHARING_CODE = 'UPDATE_SHARING_CODE';

//HTM
export const SETUP_HTM_PROFILE = 'SETUP_HTM_PROFILE';
export const GET_HTM_PROFILE = 'GET_HTM_PROFILE';
export const UPDATE_HTM_PROFILE = 'UPDATE_HTM_PROFILE';
export const UPDATE_HTM_LOCATION = 'UPDATE_HTM_LOCATION';
export const ENABLE_HTM_PROFILE = 'ENABLE_HTM_PROFILE';
export const DISABLE_HTM_PROFILE = 'DISABLE_HTM_PROFILE';

export const START_HTM_LOCATION_THREAD = 'START_HTM_LOCATION_THREAD';
export const STOP_HTM_LOCATION_THREAD = 'STOP_HTM_LOCATION_THREAD';
export const GET_HTM_LOCATION = 'GET_HTM_LOCATION';

export const FIND_NEAR_BY_HTMS = 'FIND_NEAR_BY_HTMS';
export const GET_HTM_DETAIL = 'GET_HTM_DETAIL';

export const GET_CHAT_ROOMS = 'GET_CHAT_ROOMS';
export const CREATE_CHAT_CHANNEL = 'CREATE_CHAT_CHANNEL';
export const MARK_AS_READ = 'MARK_AS_READ';
export const GET_CHAT_MESSAGES = 'GET_CHAT_MSSEGES';
export const SEND_CHAT_MESSAGE = 'SEND_CHAT_MESSAGE';
export const RECEIVE_CHAT_MESSAGE = 'RECEIVE_CHAT_MESSAGE';
export const UPDATE_CHAT_ROOM = 'UPDATE_CHAT_ROOM';
export const SELECT_CHAT_ROOM = 'SELECT_CHAT_ROOM';
export const SELECT_CHAT_ROOM_CHANNEL = 'SELECT_CHAT_ROOM_CHANNEL';
export const GO_TO_CHAT_ROOM = 'GO_TO_CHAT_ROOM';
export const SUBMIT_FEEDBACK = 'SUBMIT_FEEDBACK';
export const UPDATE_CHAT_ROOM_MEMBER_DETAIL = 'UPDATE_CHAT_ROOM_MEMBER_DETAIL';

//Exchanges
export const GET_FIAT_CURRENCY_EXCHANGE_RATES = 'GET_FIAT_CURRENCY_EXCHANGE_RATES';
export const GET_COIN_GECKO_EXCHANGE_RATES = 'GET_COIN_GECKO_EXCHANGE_RATES';
export const GET_COIN_GECKO_EXCHANGE_RATES_BY_ID = 'GET_COIN_GECKO_EXCHANGE_RATES_BY_ID';
