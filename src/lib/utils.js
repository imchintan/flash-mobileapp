import { APP_MODE, CURRENCY_TYPE, Address, NETWORKS, MOMENT_FORMAT } from './config';
import _tmp from 'moment-timezone';
import bitcoin from 'bitcoinjs-lib'
import moment from 'moment-timezone';
import Wallet from './wallet';
import Premium from 'Premium';
import nacl from 'tweetnacl';

var Buffer = require('buffer').Buffer;

export const publicIP = async endpoint => {
  const response = await fetch(endpoint || 'https://api.ipify.org');
  const ip = response.text();
  return ip;
};

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

// export function utcDateToLocal(str) {
//   return moment(str)
//     .local()
//     .format('MMM DD YYYY hh:mm A');
// }

export const flashToUSD = (flash,usd) => {
    if (flash == undefined || flash === '') return;
    if (usd == undefined || usd === '') return;
    return (flash*usd/10000000000).toFixed(8);
}

export const flashToBTC = (flash,btc) => {
    if (flash == undefined || flash === '') return;
    if (btc == undefined || btc === '') return;
    return (flash*btc/10000000000).toFixed(8);
}

export const satoshiToFlash = (num) => {
    if (num == undefined || num === '') return;
    return parseFloat(num/10000000000).toString();
}

export const flashToSatoshi = (num) => {
    if (num == undefined || num === '') return;
    return parseInt((Number(num) * 10000000000).toString(), 10);
}

// export function satoshiToBtc(num) {
//   if (num == undefined || num === '') return;
//   return parseFloat(new Big(num).div(100000000).toString());
// }
//
// export function localizeFlash(num) {
//   if (num == undefined || num === '') return;
//   return parseFloat(num).toLocaleString('en',{maximumFractionDigits:8});
// }
//
export const flashNFormatter = (num, digits) => {
    if (num == undefined || num === '') return 0.00;
    num = parseFloat(num);
    if(num <= 10000)
        return num.toLocaleString('en',{maximumFractionDigits:8});
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


export const calcFee = (amount, currency_type=CURRENCY_TYPE.FLASH) => {
    switch (currency_type) {
        case CURRENCY_TYPE.BTC:
            return 0.0005;
            break;
        case CURRENCY_TYPE.FLASH:
        default:
            return 0.001; // default fee for web-wallet transaction
            break;
    }
}

export const formatCurrency = (amount, currency_type=CURRENCY_TYPE.FLASH) => {
    switch (currency_type) {
        case CURRENCY_TYPE.BTC:
            return `${amount} BTC`;
            break;
        case CURRENCY_TYPE.FLASH:
        default:
            return `${amount} Flash`;
            break;
    }
}

export const getDisplayDate = (date, toTimeZone) => {
  if (toTimeZone && _tmp.tz.zone(toTimeZone) != null)
    return _tmp(date)
      .tz(toTimeZone)
      .format(MOMENT_FORMAT.DATE);
  return _tmp(date)
    .local()
    .format(MOMENT_FORMAT.DATE);
}

export const getDisplayDateTime = (date, toTimeZone) => {
  if (toTimeZone && _tmp.tz.zone(toTimeZone) != null)
    return _tmp(date)
      .tz(toTimeZone)
      .format(MOMENT_FORMAT.DATE_TIME_2);
  return _tmp(date)
    .local()
    .format(MOMENT_FORMAT.DATE_TIME_2);
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
    for (i = 0;i < bin.length;++i) {
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
    if (typeof atob === 'undefined') {
        return new Uint8Array(
            Array.prototype.slice.call(new Buffer(s, 'base64'), 0)
        );
    } else {
        let i, d = atob(s), b = new Uint8Array(d.length);
        for (i = 0; i < d.length; i++) b[i] = d.charCodeAt(i);
        return b;
    }
}

export const encodeBase64 = (arr) => {
    if (typeof btoa === 'undefined') {
        return new Buffer(arr).toString('base64');
    } else {
        var i, s = [], len = arr.length;
        for (i = 0; i < len; i++) s.push(String.fromCharCode(arr[i]));
        return btoa(s.join(''));
    }
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
// export const strimString = (s, n) => {
//     if(s){
//         if (s.length > n) {
//             return s.substring(0, n) + '...';
//         } else {
//             return s;
//         }
//     } else {
//         return s;
//     }
// }

// export function isValidCryptoAddress(value) {
//   try {
//     let address = Address.fromBase58Check(value);
//     var network;
//     switch (parseInt(localStorage.getItem('currency_type'))) {
//       case CURRENCY_TYPE.BTC:
//         if (APP_MODE == 'PROD') {
//           network = NETWORKS.BTC;
//         }
//         else
//           network = NETWORKS.BTC_TESTNET;
//         break;
//       case CURRENCY_TYPE.FLASH:
//       default:
//         network = NETWORKS.FLASH;
//         break;
//     }
//     if (
//       address.version === network.pubKeyHash ||
//       address.version === network.scriptHash
//     ) {
//       return true;
//     } else {
//       return false;
//     }
//   } catch (e) {
//     return false;
//   }
// }

// export function filterNumberEdit(event) {
//   let keyCode = event.key;
//   let isValidAmountCharCode =
//     (parseInt(keyCode) >= 0 && parseInt(keyCode) <= 9) ||
//     keyCode == 'Backspace' ||
//     keyCode == 'Tab' ||
//     keyCode == 'Delete' ||
//     keyCode == '.';
//   if (!isValidAmountCharCode) {
//     event.preventDefault ? event.preventDefault() : (event.returnValue = false);
//   } else {
//     event.returnValue = true;
//   }
// }
//
// export function decimalFormat(number, n?, x?) {
//   if (typeof number == 'undefined' || number == 'undefined') return '';
//   //Converback to number format without comma
//   number = toOrginalNumber(number);
//   n = n || 1;
//
//   let arr = number.toString().split('.');
//   let max = 2;
//   if (arr.length > 1 && arr[1].length > max) {
//     max = arr[1].length;
//
//     if (max > 8) {
//       max = 8;
//     }
//   }
//
//   var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
//   return toFixedFloor(parseFloat(number), Math.max(max, ~~n)).replace(
//     new RegExp(re, 'g'),
//     '$&,'
//   );
// }
//
// function toFixedFloor(x, decimal) {
//   var factor = Math.pow(10, decimal);
//   var y = parseInt(new Big(x).times(factor));
//   return (y / factor).toFixed(decimal);
// }
//
// export function toOrginalNumber(Decimalnumber = '') {
//   return Number(Decimalnumber.toString().replace(/,/g, ''));
// }
//
// export function formatAmountInput(amount?) {
//   if (isNaN(amount)) {
//     amount = this.value;
//     amount = toOrginalNumber(amount);
//     if (!isNaN(amount) && amount > 0) {
//       this.value = decimalFormat(amount, 1);
//     }
//   } else {
//     amount = toOrginalNumber(amount);
//     if (!isNaN(amount) && amount > 0) {
//       return decimalFormat(amount, 1);
//     }
//   }
// }
