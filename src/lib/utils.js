import { Dimensions, Platform } from 'react-native';
import { APP_MODE, API_URL } from '@src/config';
import * as constants from '@src/constants';
import Big from 'big.js';
import _tmp from 'moment-timezone';
import moment from 'moment-timezone';
import { keccak256 } from 'js-sha3';
import Wallet, { Address } from './wallet';
import Premium from 'Premium';
import nacl from 'tweetnacl';

const { height, width } = Dimensions.get('window');

export const publicIP = async endpoint => {
  const response = await fetch(endpoint || 'https://api.ipify.org');
  const ip = response.text();
  return ip;
};

export const getLocation = async endpoint => {
  const response = await fetch(endpoint || API_URL+'/check-location');
  return response.json();
};

export const getCurrentPosition=(enableHighAccuracy=true)=>{
    return new Promise((resolve,reject) => {
        navigator.geolocation.getCurrentPosition(
            (position) => resolve(position),
            (error) => {
                if(enableHighAccuracy)
                    getCurrentPosition(false)
                    .then(position=>resolve(position))
                    .catch(error=>reject(error));
                else
                    reject(error);
            },
            {enableHighAccuracy, timeout: 10000, maximumAge: 3000}
        );
    });
};

export const FontSize = (size) => {
    if(width <= 320)
        size *= 0.85;
    return size;
}

export const isIphoneX = () => {
    return (
        // This has to be iOS duh
        Platform.OS === 'ios' &&

        // Accounting for the height in either orientation
        (height === 812 || width === 812)
    );
}

export const buildURLQuery = (d) => Object.keys(d).filter(k => d[k] !== null)
    .map((k) => [k, d[k]].map(encodeURIComponent).join("=")).join("&");

export const decryptPassphraseV2 = (email, wallets, password, userKey) => {
    let nonce = 'nnfyPFFbK7NdGtf73uGwt+CsS6mHAmAq';
    let casPubKey = 'vjPu6e8nhoxfLNxmNzNxXYr++1onlC1XuAt3VdxLISQ=';
    let box = null;
    let originMessage = null;
    let privKeyHex = Premium.xaesDecrypt(password, userKey.encryptedPrivKey);
    let privKeyBase64 = hexToBase64(privKeyHex);

    let keyPair = nacl.box.keyPair.fromSecretKey(decodeBase64(privKeyBase64));

    if (!keyPair) {
        return;
    }

    let decryptedWallets = wallets.map(w => {
        box = decodeBase64(w.passphrase);
        originMessage = nacl.box.open(
            box,
            decodeBase64(nonce),
            decodeBase64(casPubKey),
            keyPair.secretKey
        );
        w.pure_passphrase = strFromUtf8Ab(originMessage);
        w.email = email;
        return new Wallet().openWallet(w);
    });

    return decryptedWallets;
}

export const decryptPassphraseV2ByWallet = (email, wallet, password, userKey) => {
    let nonce = 'nnfyPFFbK7NdGtf73uGwt+CsS6mHAmAq';
    let casPubKey = 'vjPu6e8nhoxfLNxmNzNxXYr++1onlC1XuAt3VdxLISQ=';
    let box = null;
    let originMessage = null;
    let privKeyHex = Premium.xaesDecrypt(password, userKey.encryptedPrivKey);
    let privKeyBase64 = hexToBase64(privKeyHex);

    let keyPair = nacl.box.keyPair.fromSecretKey(decodeBase64(privKeyBase64));

    if (!keyPair) {
        return;
    }

    box = decodeBase64(wallet.passphrase);
    originMessage = nacl.box.open(
        box,
        decodeBase64(nonce),
        decodeBase64(casPubKey),
        keyPair.secretKey
    );
    wallet.pure_passphrase = strFromUtf8Ab(originMessage);
    wallet.email = email;
    return new Wallet().openWallet(wallet);

}

export const utcDateToLocal = (str) => {
    return moment(str)
        .local()
        .format('MMM DD YYYY hh:mm A');
}

export const satoshiToFlash = (num) => {
    if (num == undefined || num === '') return;
    return parseFloat(new Big(num).div(10000000000).toString());
}

export const satoshiToBtc = (num) => {
    if (num == undefined || num === '') return;
    return parseFloat(new Big(num).div(100000000).toString());
}

export const litoshiToLtc = (num) => {
    if (num == undefined || num === '') return;
    return parseFloat(new Big(num).div(100000000).toString());
}

export const duffToDash = (num) => {
    if (num == undefined || num === '') return;
    return parseFloat(new Big(num).div(100000000).toString());
}

export const weiToEth = (num) => {
  if (num == undefined || num === '') return;
  return parseFloat(new Big(num).div(1000000000000000000).toString());
}

export const localizeFlash = (num, digits=8) => {
    if (num == undefined || num === '') return;
    return parseFloat(num).toLocaleString('en',{maximumFractionDigits:digits});
}

export const cryptoToOtherCurrency = (value,othCur, p=0) => {
    if (value == undefined || value === '') return;
    if (othCur == undefined || othCur === '') return;
    return parseFloat(new Big(value).times(othCur).div(Math.pow(10,p)).toString())
        .toFixed(3).toLocaleString('en',{maximumFractionDigits:3});
}

export const otherCurrencyToCrypto = (value,othCur) => {
    if (value == undefined || value === '') return;
    if (othCur == undefined || othCur === '') return;
    return parseFloat(new Big(value).div(othCur).toString())
        .toLocaleString('en',{maximumFractionDigits:8});
}

export const flashToOtherCurrency = (flash,othCur) => {
    if (flash == undefined || flash === '') return;
    if (othCur == undefined || othCur === '') return;
    return parseFloat(new Big(flash).times(othCur).div(10000000000).toString())
        .toLocaleString('en',{maximumFractionDigits:8});
}

export const btcToOtherCurrency = (btc,othCur) => {
    if (btc == undefined || btc === '') return;
    if (othCur == undefined || othCur === '') return;
    return parseFloat(new Big(btc).times(othCur).toString())
        .toLocaleString('en',{maximumFractionDigits:8});
}

export const ltcToOtherCurrency = (ltc,othCur) => {
    if (ltc == undefined || ltc === '') return;
    if (othCur == undefined || othCur === '') return;
    return parseFloat(new Big(ltc).times(othCur).toString())
        .toLocaleString('en',{maximumFractionDigits:8});
}

export const dashToOtherCurrency = (dash,othCur) => {
    if (dash == undefined || dash === '') return;
    if (othCur == undefined || othCur === '') return;
    return parseFloat(new Big(dash).times(othCur).toString())
        .toLocaleString('en',{maximumFractionDigits:8});
}

export const flashNFormatter = (num, digits, minVal = 10000) => {
    if (num == undefined || num === '') return 0.00;
    num = parseFloat(num);
    if(num <= minVal)
        return localizeFlash(num.toFixed(8),8);
    let si = [
        { value: 1, symbol: "" },
        { value: 1E3, symbol: "K" },
        { value: 1E6, symbol: "M" },
        { value: 1E9, symbol: "G" },
        { value: 1E12, symbol: "T" },
        { value: 1E15, symbol: "P" },
        { value: 1E18, symbol: "E" }
    ];
    let rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    for (var i = si.length - 1; i > 0; i--) {
        if (num >= si[i].value) break;
    }
    return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
}

export const flashToSatoshi = (num) => {
    if (num == undefined || num === '') return;
    return parseInt(new Big(num).times(10000000000).toString(), 10);
}

export const ethToWei = (num) => {
  if (num == undefined || num === '') return;
  return parseInt(new Big(num).times(1000000000000000000).toString(), 10);
}

export const calcFee = (amount, currency_type=constants.CURRENCY_TYPE.FLASH, bcMedianTxSize, fastestFee, fixedTxnFee) => {
    switch (currency_type) {
        case constants.CURRENCY_TYPE.BTC:
            let satoshis = bcMedianTxSize * fastestFee;
            return satoshiToBtc(satoshis);
            break;
        case constants.CURRENCY_TYPE.LTC:
            fastestFee = new Big(fastestFee).div(1024); //Converting fee rate in per byte
            let litoshis = bcMedianTxSize * fastestFee;
            return litoshiToLtc(litoshis.toFixed(0));
            break;
        case constants.CURRENCY_TYPE.DASH:
            return fixedTxnFee ;
            break;
        case constants.CURRENCY_TYPE.ETH:
              let wei = bcMedianTxSize * fastestFee;
              return weiToEth(wei);
              break;
        case constants.CURRENCY_TYPE.FLASH:
        default:
            return 0.001; // default fee for web-wallet transaction
            break;
        // Below Code will be used for calculating fee dynamically
        /*fastestFee = new Big(fastestFee).div(1024);
        console.log(bcMedianTxSize, fastestFee);
        let duff = bcMedianTxSize * fastestFee;
        console.log(duff);
        return duffToDash(duff.toFixed(0));  */
    }
}

export const calcSharingFee = (amount, currency_type=constants.CURRENCY_TYPE.FLASH,
        sharingFeePercentage, fixed_to) => {
    if (!fixed_to) fixed_to = 2;
    switch (currency_type) {
        case constants.CURRENCY_TYPE.BTC:
        case constants.CURRENCY_TYPE.LTC:
        case constants.CURRENCY_TYPE.ETH:
        case constants.CURRENCY_TYPE.DASH:
            return 0;
            break;
        case constants.CURRENCY_TYPE.FLASH:
        default:
            let sharing_fee = 0.0;
            if (amount != '' && sharingFeePercentage != 0) {
                sharing_fee = (sharingFeePercentage / 100) * amount;
                sharing_fee = sharing_fee.toFixed(parseInt(fixed_to));
            }
            return sharing_fee;
            break;
    }
}

export const formatCurrency = (amount, currency_type=constants.CURRENCY_TYPE.FLASH) => {
    switch (currency_type) {
        case constants.CURRENCY_TYPE.BTC:
            return `${amount} BTC`;
            break;
        case constants.CURRENCY_TYPE.LTC:
            return `${amount} LTC`;
            break;
        case constants.CURRENCY_TYPE.DASH:
            return `${amount} DASH`;
            break;
        case constants.CURRENCY_TYPE.ETH:
            return `${amount} ETH`;
            break;
        case constants.CURRENCY_TYPE.FLASH:
        default:
            return `${amount} Flash`;
            break;
    }
}

export const getDisplayDate = (date, toTimeZone) => {
    if (toTimeZone && _tmp.tz.zone(toTimeZone) != null)
        return _tmp(date)
            .tz(toTimeZone)
            .format(constants.MOMENT_FORMAT.DATE);
    return _tmp(date)
        .local()
        .format(constants.MOMENT_FORMAT.DATE);
}

export const getDisplayDateTime = (date, toTimeZone) => {
    if (toTimeZone && _tmp.tz.zone(toTimeZone) != null)
        return _tmp(date)
            .tz(toTimeZone)
            .format(constants.MOMENT_FORMAT.DATE_TIME_2);
    return _tmp(date)
        .local()
        .format(constants.MOMENT_FORMAT.DATE_TIME_2);
}

export const calcPasswordStreng = (password) => {
    if (!password) {
        return;
    }

    // Initial strength
    let strength = 0;

    // If the password length is less than 6, return message.
    if (password.length < 6) {
        return strength;
    }

    // length is ok, lets continue.

    // If length is 8 characters or more, increase strength value
    if (password.length > 7)
        strength += 1;

    // If password contains both lower and uppercase characters, increase strength value
    if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/))
        strength += 1;

    // If it has numbers and characters, increase strength value
    if (password.match(/([a-zA-Z])/) && password.match(/([0-9])/))
        strength += 1;

    // If it has one special character, increase strength value
    if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/))
        strength += 1;

    // If it has two special characters, increase strength value
    if (password.match(/(.*[!,%,&,@,#,$,^,*,?,_,~].*[!,%,&,@,#,$,^,*,?,_,~])/))
        strength += 1;

    return strength;
}

// Base64 to unicode string
export const b64DecodeUnicode = (str) => {
  return decodeURIComponent(
    Array.prototype.map
      .call(atob(str), function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );
}

export const hexToBase64 = (str) => {
  return btoa(
    String.fromCharCode.apply(
      null,
      str
        .replace(/\r|\n/g, '')
        .replace(/([\da-fA-F]{2}) ?/g, '0x$1 ')
        .replace(/ +$/, '')
        .split(' ')
    )
  );
}

export const base64ToHex = (str) => {
    let bin = atob(str.replace(/[ \r\n]+$/, ''));
    let hex = [];
    for (let i = 0;i < bin.length;++i) {
        let tmp = bin.charCodeAt(i).toString(16);
        if (tmp.length === 1) tmp = '0' + tmp;
        hex[hex.length] = tmp;
    }
    return hex.join('');
}

export const strFromUtf8Ab = (ab) => {
    return decodeURIComponent(escape(String.fromCharCode.apply(null, ab)));
}

export const decodeBase64 = (s) => {
    let i, d = atob(s), b = new Uint8Array(d.length);
    for (i = 0; i < d.length; i++) b[i] = d.charCodeAt(i);
    return b;
}

export const encodeBase64 = (arr) => {
    var i, s = [], len = arr.length;
    for (i = 0; i < len; i++) s.push(String.fromCharCode(arr[i]));
    return btoa(s.join(''));
}

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

export const btoa = (input = '')  => {
    let str = input;
    let output = '';
    for (let block = 0, charCode, i = 0, map = chars;
    str.charAt(i | 0) || (map = '=', i % 1);
    output += map.charAt(63 & block >> 8 - i % 1 * 8)) {
        charCode = str.charCodeAt(i += 3/4);
        if (charCode > 0xFF) {
            throw new Error("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
        }
        block = block << 8 | charCode;
    }
    return output;
}

export const atob = (input = '') => {
    let str = input.replace(/=+$/, '');
    let output = '';
    if (str.length % 4 == 1) {
        throw new Error("'atob' failed: The string to be decoded is not correctly encoded.");
    }
    for (let bc = 0, bs = 0, buffer, i = 0;
        buffer = str.charAt(i++);
        ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
        bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
    ) {
        buffer = chars.indexOf(buffer);
    }
    return output;
}

/**
 * Cut string s if s.length > n
 */
export const strimString = (s, n) => {
    if(s){
        if (s.length > n) {
            return s.substring(0, n) + '...';
        } else {
            return s;
        }
    } else {
        return s;
    }
}

export const isValidEmail = (email) => {
    let emailRegex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    let checkEmail = email.toLowerCase().match(emailRegex);
    if (checkEmail === null) return false;
    return true;
}

export const isValidFlashAddress = (value) => {
    try{
        let address = Address.fromBase58Check(value);
        if( address.version === constants.NETWORKS.FLASH.pubKeyHash ||
            address.version === constants.NETWORKS.FLASH.scriptHash ){
            return true;
        }else{
            return false;
        }
    }catch(e){
        return false;
    }
}

export const isValidCryptoAddress = (value, currency_type) => {
    try {
        if(currency_type == constants.CURRENCY_TYPE.ETH){
            return isEtherAddress(value);
        }
        let address = Address.fromBase58Check(value);
        let network;
        switch(currency_type){
            case constants.CURRENCY_TYPE.BTC:
                if(APP_MODE == 'PROD') network = constants.NETWORKS.BTC;
                else network = constants.NETWORKS.BTC_TESTNET;
                break;
            case constants.CURRENCY_TYPE.LTC:
                if(APP_MODE == 'PROD') network = constants.NETWORKS.LTC;
                else network = constants.NETWORKS.LTC_TESTNET;
                break;
            case constants.CURRENCY_TYPE.DASH:
                if (APP_MODE == 'PROD') network = constants.NETWORKS.DASH;
                else network = constants.NETWORKS.DASH_TESTNET;
                break;
            case constants.CURRENCY_TYPE.FLASH:
            default:
                network = constants.NETWORKS.FLASH;
                break;
        }
        if(address.version === network.pubKeyHash ||
            address.version === network.scriptHash){
            return true;
        }else{
            return false;
        }
    } catch (e) {
        return false;
    }
}

/**
 * Checks if the given string is an address
 *
 * @method isAddress
 * @param {String} address the given HEX adress
 * @return {Boolean}
*/
export const isEtherAddress = (address) => {
    if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
        // check if it has the basic requirements of an address
        return false;
    } else if (/^(0x)?[0-9a-f]{40}$/.test(address) || /^(0x)?[0-9A-F]{40}$/.test(address)) {
        // If it's all small caps or all all caps, return true
        return true;
    } else {
        // Otherwise check each case
        return isChecksumAddress(address);
    }
};

/**
 * Checks if the given string is a checksummed address
 *
 * @method isChecksumAddress
 * @param {String} address the given HEX adress
 * @return {Boolean}
*/
export const isChecksumAddress = (address) => {
    // Check each case
    address = address.replace('0x','');
    let addressHash = keccak256(address.toLowerCase());
    for (var i = 0; i < 40; i++ ) {
        // the nth letter should be uppercase if the nth digit of casemap is 1
        if ((parseInt(addressHash[i], 16) > 7 && address[i].toUpperCase() !== address[i])
            || (parseInt(addressHash[i], 16) <= 7 && address[i].toLowerCase() !== address[i])) {
            return false;
        }
    }
    return true;
};

export const decimalFormat = (number, n?, x?) => {
    if (typeof number == 'undefined' || number == 'undefined') return '';
    //Converback to number format without comma
    number = toOrginalNumber(number);
    n = n || 1;

    let arr = number.toString().split('.');
    let max = 2;
    if (arr.length > 1 && arr[1].length > max) {
        max = arr[1].length;
        if (max > 8) max = 8;
    }

    let re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
    return toFixedFloor(parseFloat(number), Math.max(max, ~~n)).replace(
        new RegExp(re, 'g'),
        '$&,'
    );
}

const toFixedFloor = (x, decimal) => {
    let factor = Math.pow(10, decimal);
    let y = parseInt(new Big(x).times(factor));
    return (y / factor).toFixed(decimal);
}

export const toOrginalNumber = (Decimalnumber = '') => {
    return Number(Decimalnumber.toString().replace(/,/g, ''));
}

export const formatAmountInput = (amount?) => {
    if (isNaN(amount)) {
        amount = this.value;
        amount = toOrginalNumber(amount);
        if (!isNaN(amount) && amount > 0) {
            this.value = decimalFormat(amount, 1);
        }
    } else {
        amount = toOrginalNumber(amount);
        if (!isNaN(amount) && amount > 0) {
            return decimalFormat(amount, 1);
        }
    }
}

export const getSecurityQuestion = () => {
    return {
        A: [
            "What is your dream job?",
            "In which city did your parents meet?",
            "What was the name of your elementary school?"
        ],
        B: [
            "What is the first name of your favourite uncle?",
            "Where did you meet your spouse?",
            "What is your eldest cousin's name?"
        ],
        C: [
            "Street name where you grew up?",
            "What is your pet's name?",
            "What was your first job?"
        ],
    };
  // return {
  //   A: [
  //     getText('sc_question_a1'),
  //     getText('sc_question_a2'),
  //     getText('sc_question_a3'),
  //   ],
  //   B: [
  //     getText('sc_question_b1'),
  //     getText('sc_question_b2'),
  //     getText('sc_question_b3'),
  //   ],
  //   C: [
  //     getText('sc_question_c1'),
  //     getText('sc_question_c2'),
  //     getText('sc_question_c3'),
  //   ],
  // };
}

export const getSixCharString = () => {
    let randomText = "";
    let possible = "ABCDEFGHJKLMNPQRSTUVWXYZ123456789";

    for (let i = 0; i < 6; i++)
        randomText += possible.charAt(Math.floor(Math.random() * possible.length));

    return randomText;
}

export const getCurrencyUnitUpcase = (currency_type) => {
    return constants.CURRENCY_TYPE_UNIT_UPCASE[currency_type];
}

export const getCurrencyName = (currency_type) => {
    return constants.CURRENCY_TYPE_NAME[constants.CURRENCY_TYPE_UNIT_UPCASE[currency_type]];
}

export const getCurrencyIcon = (currency_type) => {
    return constants.CURRENCY_ICON[currency_type];
}

export const getCurrencyUnit = (currency_type) => {
    return constants.CURRENCY_TYPE_UNIT[currency_type];
}

export const getCurrencySymbol = (fiat_currency) => {
    return constants.FIAT_CURRENCY_SYMBOL[fiat_currency];
}

export const getFiatCurrencyUnit = (fiat_currency) => {
    return constants.FIAT_CURRENCY_UNIT[fiat_currency];
}
export const getFiatCurrencyByCountry = (country_code) => {
    let fiat_currency_unit = constants.FIAT_CURRENCY_UNIT_BY_COUNTRY[country_code];
    if(fiat_currency_unit) return constants.FIAT_CURRENCY[fiat_currency_unit];
    else return constants.FIAT_CURRENCY.USD;
}
