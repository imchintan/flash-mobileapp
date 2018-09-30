const Sound = require('react-native-sound');

// Enable playback in silence mode
Sound.setCategory('Playback');

//KEYS OPERATIONS RECV
export const KEYS_ADD_MONEY_REQ_RECV = 1714;
export const KEYS_ADD_TXN_LOG_RECV = 1711;
export const KEYS_MARK_MONEY_REQ_RECV = 1719;

export const MOMENT_FORMAT = {
    DATE: 'MMM DD, YYYY',
    DATE_TIME: 'MMM DD, YYYY hh:mm A',
    DATE_TIME_2: 'MMM DD, YYYY hh:mm:ss A',
};

export const NETWORKS = {
  FLASH: {
    messagePrefix: '\x18Flashcoin Signed Message:\n',
    bip32: {
      public: 0x0488b21e,
      private: 0x0488ade4,
    },
    pubKeyHash: 0x44,
    scriptHash: 0x82,
    wif: 0xc4,
    dustThreshold: 546,
  },
  BTC: {
    messagePrefix: '\x18Bitcoin Coin Signed Message:\n',
    bip32: {
      public: 0x0488b21e,
      private: 0x0488ade4
    },
    pubKeyHash: 0x00,
    scriptHash: 0x05,
    wif: 0x80,
    dustThreshold: 546,
  },
  BTC_TESTNET: {
    messagePrefix: '\x18Bitcoin Coin Signed Message:\n',
    bip32: {
      public: 0x043587cf,
      private: 0x04358394
    },
    pubKeyHash: 0x6f,
    scriptHash: 0xc4,
    wif: 0xef,
    dustThreshold: 546,
  },
  LTC: {
    messagePrefix: '\x18Litecoin Coin Signed Message:\n',
    bip32: {
      public: 0x019da462,
      private: 0x019d9cfe,
    },
    pubKeyHash: 0x30,
    scriptHash: 0x32,
    wif: 0xb0,
    dustThreshold: 546,
  },
  LTC_TESTNET: {
    messagePrefix: '\x18Litecoin Coin Signed Message:\n',
    bip32: {
      public: 0x0436f6e1,
      private: 0x0436ef7d,
    },
    pubKeyHash: 0x6f,
    scriptHash: 0x3a,
    wif: 0xef,
    dustThreshold: 546,
  },
  DASH: {
    messagePrefix: '\x18Dash Coin Signed Message:\n',
    bip32: {
        public: 0x0488b21e,
        private: 0x0488ade4
    },
    pubKeyHash: 0x4c,
    scriptHash: 0x10,
    wif: 0xcc,
    dustThreshold: 546,
  },
  DASH_TESTNET: {
    messagePrefix: '\x18Dash Coin Signed Message:\n',
    bip32: {
        public: 0x043587cf,
        private: 0x04358394
    },
    pubKeyHash: 0x8c,
    scriptHash: 0x13,
    wif: 0xef,
    dustThreshold: 546
  },
  ETH: {
    chainId: 1,
  },
  ETH_TESTNET: {
    chainId: 4
  },
};

/**
 * add new currency here
 */
export const CURRENCY_TYPE = {
    FLASH: 1,
    BTC: 2,
    LTC: 3,
    DASH: 4,
    ETH: 5,
};

export const CURRENCY_TYPE_NAME = {
    FLASH: 'FLASH',
    BTC: 'Bitcoin',
    LTC: 'Litecoin',
    DASH: 'DASH',
    ETH: 'Ethereum',
};

export const CURRENCY_TYPE_UNIT = {
    1: 'Flash',
    2: 'BTC',
    3: 'LTC',
    4: 'DASH',
    5: 'ETH',
};

export const CURRENCY_TYPE_UNIT_UPCASE = {
    1: 'FLASH',
    2: 'BTC',
    3: 'LTC',
    4: 'DASH',
    5: 'ETH',
};

export const CURRENCY_TYPE_QR_PREFIX = {
    1: 'flashcoin',
    2: 'bitcoin',
    3: 'litecoin',
    4: 'dash',
    5: 'ethereum',
};

export const CURRENCY_ICON = {
    1: require('@images/app-icon.png'),
    2: require('@images/btc-icon.png'),
    3: require('@images/ltc-icon.png'),
    4: require('@images/dash-icon.png'),
    5: require('@images/eth-icon.png'),
};

//Coinmarketcap currency ID
export const COIN_MARKET_CAP_CURRENCY_ID = {
    FLASH: 1755,
    BTC: 1,
    LTC: 2,
    DASH: 131,
    ETH: 1027,
};

//Fiat currency
let fiatCurrency = [
    {
        "UNIT":"USD",
        "NAME":"US Dollar",
        "SYMBOL":"US$",
        "COUNTRY":["IO","GU","MH","FM","MP","PW","PR","TC","US","UM","VG","VI","USAF"]
    },{
        "UNIT":"EUR",
        "NAME":"Euro",
        "SYMBOL":"€",
        "COUNTRY":["AS","AD","AT","BE","FI","FR","GF","TF","DE","GR","GP",
            "IE","IT","LU","MQ","YT","MC","NL","PT","RE","WS","SM","SI","ES",
            "VA","AX","ME","BL","PM"]
    },{
        "UNIT":"GBP",
        "NAME":"British Pound",
        "SYMBOL":"£",
        "COUNTRY":["GS","GB","JE","IM","SH"]
    },{
        "UNIT":"JPY",
        "NAME":"Japanese Yen",
        "SYMBOL":"¥",
        "COUNTRY":["JP"]
    },{
        "UNIT":"CAD",
        "NAME":"Canadian Dollar",
        "SYMBOL":"CA$",
        "COUNTRY":["CA"]
    },{
        "UNIT":"AUD",
        "NAME":"Australian Dollar",
        "SYMBOL":"AU$",
        "COUNTRY":["AU","CX","CC","HM","KI","NR","NF","TV"]
    },{
        "UNIT":"CNY",
        "NAME":"Chinese Yuan",
        "SYMBOL":"CN¥",
        "COUNTRY":["CN"]
    },{
        "UNIT":"CHF",
        "NAME":"Swiss Franc",
        "SYMBOL":"CHF",
        "COUNTRY":["LI","CH"]
    },{
        "UNIT":"SEK",
        "NAME":"Swedish Krona",
        "SYMBOL":"SEK",
        "COUNTRY":["SE"]
    },{
        "UNIT":"NZD",
        "NAME":"New Zealand Dollar",
        "SYMBOL":"NZ$",
        "COUNTRY":["NZ","CK","NU","PN","TK"]
    },{
        "UNIT":"KRW",
        "NAME":"South Korean Won",
        "SYMBOL":"KR₩",
        "COUNTRY":["KR"]
    },{
        "UNIT":"INR",
        "NAME":"Indian Rupee",
        "SYMBOL":"₹",
        "COUNTRY":["IN","BT"]
    },{
        "UNIT":"AED",
        "NAME":"UAE Dirham",
        "SYMBOL":"AED",
        "COUNTRY":["AE"]
    },{
        "UNIT":"BRL",
        "NAME":"Brazilian Real",
        "SYMBOL":"R$",
        "COUNTRY":["BR"]
    },{
        "UNIT":"CLP",
        "NAME":"Chilean Peso",
        "SYMBOL":"CL$",
        "COUNTRY":["CL"]
    },{
        "UNIT":"CZK",
        "NAME":"Czech Koruna",
        "SYMBOL":"Kč",
        "COUNTRY":["CZ"]
    },{
        "UNIT":"DKK",
        "NAME":"Danish Krone",
        "SYMBOL":"DKK",
        "COUNTRY":["DK","FO","GL"]
    },{
        "UNIT":"GHS",
        "NAME":"Ghanaian Cedi",
        "SYMBOL":"GH₵",
        "COUNTRY":["GH"]
    },{
        "UNIT":"HKD",
        "NAME":"Hong Kong Dollar",
        "SYMBOL":"HK$",
        "COUNTRY":["HK"]
    },{
        "UNIT":"HUF",
        "NAME":"Hungarian Forint",
        "SYMBOL":"Ft",
        "COUNTRY":["HU"]
    },{
        "UNIT":"IDR",
        "NAME":"Indonesian Rupiah",
        "SYMBOL":"Rp",
        "COUNTRY":["TP","ID"]
    },{
        "UNIT":"ILS",
        "NAME":"Israeli New Shekel",
        "SYMBOL":"₪",
        "COUNTRY":["IL"]
    },{
        "UNIT":"MXN",
        "NAME":"Mexican Peso",
        "SYMBOL":"MX$",
        "COUNTRY":["MX"]
    },{
        "UNIT":"MYR",
        "NAME":"Malaysian Ringgit",
        "SYMBOL":"RM",
        "COUNTRY":["MY"]
    },{
        "UNIT":"NGN",
        "NAME":"Nigerian naira",
        "SYMBOL":"₦",
        "COUNTRY":["NG"]
    },{
        "UNIT":"NOK",
        "NAME":"Norwegian Krone",
        "SYMBOL":"NOK",
        "COUNTRY":["BV","NO","SJ"]
    },{
        "UNIT":"PHP",
        "NAME":"Philippine Piso",
        "SYMBOL":"₱",
        "COUNTRY":["PH"]
    },{
        "UNIT":"PKR",
        "NAME":"Pakistani Rupee",
        "SYMBOL":"₨",
        "COUNTRY":["PK"]
    },{
        "UNIT":"PLN",
        "NAME":"Polish Zloty",
        "SYMBOL":"zł",
        "COUNTRY":["PL"]
    },{
        "UNIT":"RUB",
        "NAME":"Russian Ruble",
        "SYMBOL":"₽",
        "COUNTRY":["RU"]
    },{
        "UNIT":"SGD",
        "NAME":"Singapore Dollar",
        "SYMBOL":"SG$",
        "COUNTRY":["SG"]
    },{
        "UNIT":"THB",
        "NAME":"Thai Baht",
        "SYMBOL":"฿",
        "COUNTRY":["TH"]
    },{
        "UNIT":"TRY",
        "NAME":"Turkish Lira",
        "SYMBOL":"₺",
        "COUNTRY":["TR"]
    },{
        "UNIT":"TWD",
        "NAME":"New Taiwan Dollar",
        "SYMBOL":"NT$",
        "COUNTRY":["TW"]
    },{
        "UNIT":"ZAR",
        "NAME":"South African Rand",
        "SYMBOL":"R",
        "COUNTRY":["ZA"]
    }
]

export const FIAT_CURRENCY = Object.assign({},...fiatCurrency.map((f,i)=>({[f.UNIT]:i})));
export const FIAT_CURRENCY_UNIT = fiatCurrency.map(f=>f.UNIT);
export const FIAT_CURRENCY_UNIT_BY_COUNTRY = Object.assign({}, ...fiatCurrency
        .map(f=>Object.assign({},...f.COUNTRY.map(c=>({[c]:f.UNIT})))));
export const FIAT_CURRENCY_NAME = fiatCurrency.map(f=>f.NAME);
export const FIAT_CURRENCY_SYMBOL = fiatCurrency.map(f=>f.SYMBOL);

// Sound
export const SOUND = {
    ERROR: new Sound(require('@sounds/error.mp3'), (error) => error && console.log('failed to load the sound', error)),
    SUCCESS: new Sound(require('@sounds/success.mp3'), (error) => error && console.log('failed to load the sound', error)),
    RECEIVE: new Sound(require('@sounds/receive.mp3'), (error) => error && console.log('failed to load the sound', error)),
    SEND: new Sound(require('@sounds/send.mp3'), (error) => error && console.log('failed to load the sound', error)),
}
