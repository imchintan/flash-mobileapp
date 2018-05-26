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
    1: 'AUD',
    2: 'BRL',
    3: 'CAD',
    4: 'CHF',
    5: 'CLP',
    6: 'CNY',
    7: 'CZK',
    8: 'DKK',
    9: 'EUR',
    10: 'GBP',
    11: 'HKD',
    12: 'HUF',
    13: 'IDR',
    14: 'ILS',
    15: 'INR',
    16: 'JPY',
    17: 'KRW',
    18: 'MXN',
    19: 'MYR',
    20: 'NOK',
    21: 'NZD',
    22: 'PHP',
    23: 'PKR',
    24: 'PLN',
    25: 'RUB',
    26: 'SEK',
    27: 'SGD',
    28: 'THB',
    29: 'TRY',
    30: 'TWD',
    31: 'ZAR'
};

export const FIAT_CURRENCY_NAME = {
    0: 'US Dollar',
    1: 'Australian Dollar',
    2: 'Brazilian Real',
    3: 'Canadian Dollar',
    4: 'Swiss Franc',
    5: 'Chilean Peso',
    6: 'Chinese Yuan',
    7: 'Czech Koruna',
    8: 'Danish Krone',
    9: 'Euro',
    10: 'British Pound',
    11: 'Hong Kong Dollar',
    12: 'Hungarian Forint',
    13: 'Indonesian Rupiah',
    14: 'Israeli New Shekel',
    15: 'Indian Rupee',
    16: 'Japanese Yen',
    17: 'South Korean Won',
    18: 'Mexican Peso',
    19: 'Malaysian Ringgit',
    20: 'Norwegian Krone',
    21: 'New Zealand Dollar',
    22: 'Philippine Piso',
    23: 'Pakistani Rupee',
    24: 'Polish Zloty',
    25: 'Russian Ruble',
    26: 'Swedish Krona',
    27: 'Singapore Dollar',
    28: 'Thai Baht',
    29: 'Turkish Lira',
    30: 'New Taiwan Dollar',
    31: 'South African Rand'
};

export const FIAT_CURRENCY_SYMBOL = {
    0: '$',
    1: '$',
    2: 'R$',
    3: '$',
    4: 'CHF',
    5: '$',
    6: '¥',
    7: 'Kč',
    8: 'kr',
    9: '€',
    10: '£',
    11: '$',
    12: 'Ft',
    13: 'Rp',
    14: '₪',
    15: '₹',
    16: '¥',
    17: '₩',
    18: '$',
    19: 'RM',
    20: 'kr',
    21: '$',
    22: '₱',
    23: '₨',
    24: 'zł',
    25: '₽',
    26: 'kr',
    27: '$',
    28: '฿',
    29: '₺',
    30: 'NT$',
    31: 'R'
};
