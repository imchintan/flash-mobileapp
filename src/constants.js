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
};

/**
 * add new currency here
 */
export const CURRENCY_TYPE = {
    FLASH: 1,
    BTC: 2,
    LTC: 3,
    DASH: 4,
};

export const CURRENCY_TYPE_NAME = {
    FLASH: 'FLASH',
    BTC: 'Bitcoin',
    LTC: 'Litecoin',
    DASH: 'DASH',
};

export const CURRENCY_TYPE_UNIT = {
    1: 'Flash',
    2: 'BTC',
    3: 'LTC',
    4: 'DASH',
};

export const CURRENCY_TYPE_UNIT_UPCASE = {
    1: 'FLASH',
    2: 'BTC',
    3: 'LTC',
    4: 'DASH',
};

export const CURRENCY_TYPE_QR_PREFIX = {
    1: 'flashcoin',
    2: 'bitcoin',
    3: 'litecoin',
    4: 'dash',
};

export const CURRENCY_ICON = {
    1: require('@images/app-icon.png'),
    2: require('@images/btc-icon.png'),
    3: require('@images/ltc-icon.png'),
    4: require('@images/dash-icon.png'),
};

//Coinmarketcap currency ID
export const COIN_MARKET_CAP_CURRENCY_ID = {
    FLASH: 1755,
    BTC: 1,
    LTC: 2,
    DASH: 131,
};

//Fiat currency
export const FIAT_CURRENCY = {
    USD: 0,
    AUD: 1,
    BRL: 2,
    CAD: 3,
    CHF: 4,
    CLP: 5,
    CNY: 6,
    CZK: 7,
    DKK: 8,
    EUR: 9,
    GBP: 10,
    HKD: 11,
    HUF: 12,
    IDR: 13,
    ILS: 14,
    INR: 15,
    JPY: 16,
    KRW: 17,
    MXN: 18,
    MYR: 19,
    NOK: 20,
    NZD: 21,
    PHP: 22,
    PKR: 23,
    PLN: 24,
    RUB: 25,
    SEK: 26,
    SGD: 27,
    THB: 28,
    TRY: 29,
    TWD: 30,
    ZAR: 31
};

export const FIAT_CURRENCY_UNIT = {
    0: 'USD',
    1: 'EUR',
    2: 'GBP',
    3: 'JPY',
    4: 'CAD',
    5: 'AUD',
    6: 'CNY',
    7: 'CHF',
    8: 'SEK',
    9: 'NZD',
    10: 'KRW',
    11: 'INR',
    12: 'BRL',
    13: 'CLP',
    14: 'CZK',
    15: 'DKK',
    16: 'HKD',
    17: 'HUF',
    18: 'IDR',
    19: 'ILS',
    20: 'MXN',
    21: 'MYR',
    22: 'NOK',
    23: 'PHP',
    24: 'PKR',
    25: 'PLN',
    26: 'RUB',
    27: 'SGD',
    28: 'THB',
    29: 'TRY',
    30: 'TWD',
    31: 'ZAR'
};

export const FIAT_CURRENCY_NAME = {
    0: 'US Dollar',
    1: 'Euro',
    2: 'British Pound',
    3: 'Japanese Yen',
    4: 'Canadian Dollar',
    5: 'Australian Dollar',
    6: 'Chinese Yuan',
    7: 'Swiss Franc',
    8: 'Swedish Krona',
    9: 'New Zealand Dollar',
    10: 'South Korean Won',
    11: 'Indian Rupee',
    12: 'Brazilian Real',
    13: 'Chilean Peso',
    14: 'Czech Koruna',
    15: 'Danish Krone',
    16: 'Hong Kong Dollar',
    17: 'Hungarian Forint',
    18: 'Indonesian Rupiah',
    19: 'Israeli New Shekel',
    20: 'Mexican Peso',
    21: 'Malaysian Ringgit',
    22: 'Norwegian Krone',
    23: 'Philippine Piso',
    24: 'Pakistani Rupee',
    25: 'Polish Zloty',
    26: 'Russian Ruble',
    27: 'Singapore Dollar',
    28: 'Thai Baht',
    29: 'Turkish Lira',
    30: 'New Taiwan Dollar',
    31: 'South African Rand'
};

export const FIAT_CURRENCY_SYMBOL = {
    0: 'US$',   // US Dollar, USD
    1: '€',     // Euro, EUR
    2: '£',     // British Pound, GBP
    3: '¥',     // Japanese Yen, JPY
    4: 'CA$',   // Canadian Dollar, CAD
    5: 'AU$',   // Australian Dollar, AUD
    6: 'CN¥',   // Chinese Yuan, CNY
    7: 'CHF',   // Swiss Franc, CHF
    8: 'SEK',   // Swedish Krona, SEK
    9: 'NZ$',   // New Zealand Dollar, NZD
    10: 'KR₩',  // South Korean Won, KRW
    11: '₹',    // Indian Rupee, INR
    12: 'R$',   // Brazilian Real, BRL
    13: 'CL$',  // Chilean Peso, CLP
    14: 'Kč',   // Czech Koruna, CZK
    15: 'DKK',  // Danish Krone, DKK
    16: 'HK$',  // Hong Kong Dollar, HKD
    17: 'Ft',   // Hungarian Forint, HUF
    18: 'Rp',   // Indonesian Rupiah, IDR
    19: '₪',    // Israeli New Shekel, ILS
    20: 'MX$',  // Mexican Peso, MXN
    21: 'RM',   // Malaysian Ringgit, MYR
    22: 'NOK',  // Norwegian Krone, NOK
    23: '₱',    // Philippine Piso, PHP
    24: '₨',    // Pakistani Rupee, PKR
    25: 'zł',   // Polish Zloty, PLN
    26: '₽',    // Russian Ruble, RUB
    27: 'SG$',  // Singapore Dollar, SGD
    28: '฿',    // Thai Baht, THB
    29: '₺',    // Turkish Lira, TRY
    30: 'NT$',  // New Taiwan Dollar, TWD
    31: 'R'     // South African Rand, ZAR
};
