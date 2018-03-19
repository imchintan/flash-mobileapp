import { NETWORKS } from './config';
import { Address } from './wallet';

export const name = (n) => {
    let regEX = /^[a-zA-Z .]*$/;
    if(!n){
        return {success:false,message:'Name is required!'};
    }
    if(n && !regEX.test(n)){
        return {success:false,message:'Name contains only character!'};
    }
    return {success:true, message:''};
}

export const email = (e) => {
    let regEX = /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/;
    if(!e){
        return {success:false,message:'Email address is required!'};
    }

    if(!regEX.test(e)){
      return {success:false,message:'Invalid email address!'};
    }
    return {success:true, message:''};
}

export const phone = (c) => {
    let regEX = /^[0-9+-]*$/;
    if( c && !regEX.test(c)){
      return {success:false,message:'Contact number contains only number!'};
    }
    return {success:true, message:''};
}

export const amount = (amt,dec=8) => {
    if(!amt || isNaN(amt)){
         return {success:false,message:'Invalid amount!'};
    }

    let [d1,d2] = amt.toString().split('.');
    if(!!d2 && d2.length > dec)
        amt = (Math.floor(Number(amt*Math.pow(10,dec)))/Math.pow(10,dec)).toString();
    else
        amt = Number(amt).toString();

    return {success:true, message:'', amount: amt};
}

export function flashAddress(value) {
    try {
        let address = Address.fromBase58Check(value);
        if (address.version === NETWORKS.FLASH.pubKeyHash ||
            address.version === NETWORKS.FLASH.scriptHash ) {
            return {success:true,message:''};
        } else {
            return {success:false,message:'Invalid address!'};
        }
    } catch (e) {
        return {success:false,message:'Invalid address!'};
    }
}
