import bitcoin from 'bitcoinjs-lib'
import bip39 from 'bip39';
import base58check from 'bs58check';
import { CURRENCY_TYPE, APP_MODE, NETWORKS, NETWORK_NAME } from './config';

export default class Wallet {
    accounts = null;
    currency_type = null;

    constructor(accounts=null, currency_type=null) {
        this.accounts = accounts;
        this.currency_type = currency_type;
    }

    getCryptoNetwork(currency_type) {
        let network;
        var currency_type = parseInt(currency_type);
        switch (currency_type) {
            case CURRENCY_TYPE.BTC:
                if(APP_MODE == 'PROD')
                    network = NETWORKS.BTC;
                else
                    network = NETWORKS.BTC_TESTNET;
                break;
            case CURRENCY_TYPE.FLASH:
            default:
                network = NETWORKS.FLASH;
            break;
        }
        return network;
    }

    openWallet(wdata) {
        let mnemonic = wdata.pure_passphrase;
        let valid = bip39.validateMnemonic(mnemonic);

        if (!valid) {
            return;
        }

        let seed = bip39.mnemonicToSeedHex(mnemonic);
        let accountZero = bitcoin.HDNode
            .fromSeedHex(seed, this.getCryptoNetwork(wdata.currency_type))
            .deriveHardened(0);

        this.accounts = {
            externalAccount: accountZero.derive(0),
            internalAccount: accountZero.derive(1),
        };
        this.currency_type = wdata.currency_type;

        return this;
    }

    signTx(rawTx) {
        let tx = bitcoin.Transaction.fromHex(rawTx);
        let txBuilder = bitcoin.TransactionBuilder.fromTransaction(tx, this.getCryptoNetwork(this.currency_type));
        let keyPair = this.accounts.externalAccount.derive(0).keyPair;
        for (var i = 0; i < tx.ins.length; i++) {
            txBuilder.sign(i, keyPair);
        }
        return txBuilder.build();
    }
}

export class Address {

    constructor(hash, version) {
        this.version = version;
        this.hash = hash;
    }

    static fromBase58Check(string) {
        let payload = base58check.decode(string);
        let version = payload.readUInt8(0);
        let hash = payload.slice(1);

        return new Address(hash, version);
    }
}
