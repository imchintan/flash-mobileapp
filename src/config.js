import { Platform } from 'react-native';

export const  RESOURCE = 'app';
export const  APP_MODE = 'PROD'; // DEV , PROD
export const  APP_VERSION = 2;

let appUrl;

if(APP_MODE == 'PROD')
    appUrl = 'https://mkeys.flashcoin.io';
else
    appUrl = 'https://dev03keys.flashcoin.io';

export const API_URL = appUrl+'/api';
export const PROFILE_URL = appUrl+'/profile/';

export const MOMENT_FORMAT = {
    DATE: 'MMM DD, YYYY',
    DATE_TIME: 'MMM DD, YYYY hh:mm A',
    DATE_TIME_2: 'MMM DD, YYYY hh:mm:ss A',
};

const NETWORK_NAME = 'flashcoin';

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
  }
}

export const CURRENCY_TYPE = {
  FLASH: 1,
  BTC: 2,
};

export const CURRENCY_TYPE_UNIT = {
  1: 'Flash',
  2: 'BTC',
};

export const CURRENCY_TYPE_UNIT_UPCASE = {
  1: 'FLASH',
  2: 'BTC',
};

export const CURRENCY_ICON_URL = {
  1: 'assets/images/flash-icon.png',
  2: 'assets/images/btc-icon.png',
};
