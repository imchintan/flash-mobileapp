import bitcoin from 'bitcoinjs-lib'
import bip39 from 'bip39';
import base58check from 'bs58check';
import hdkey from 'hdkey';
import ethTx from 'ethereumjs-tx';
import { APP_MODE } from '@src/config';
import { CURRENCY_TYPE, NETWORKS } from '@src/constants';

export default class Wallet {
    accounts = null;
    addrNode = null;
    currency_type = null;
    pure_passphrase = null;

    constructor(accounts=null, currency_type=null) {
        this.accounts = accounts;
        this.currency_type = currency_type;
    }

    getCryptoNetwork(currency_type) {
        let network;
        var currency_type = parseInt(currency_type);
        switch (currency_type) {
            case CURRENCY_TYPE.BTC:
                if (APP_MODE == 'PROD')
                    network = NETWORKS.BTC;
                else
                    network = NETWORKS.BTC_TESTNET;
                break;
            case CURRENCY_TYPE.LTC:
                if (APP_MODE == 'PROD')
                    network = NETWORKS.LTC;
                else
                    network = NETWORKS.LTC_TESTNET;
                break;
            case CURRENCY_TYPE.DASH:
                if (APP_MODE == 'PROD')
                    network = NETWORKS.DASH;
                else
                    network = NETWORKS.DASH_TESTNET;
                break;
            case CURRENCY_TYPE.ETH:
                if (APP_MODE == 'PROD')
                    network = NETWORKS.ETH;
                else
                    network = NETWORKS.ETH_TESTNET;
                break;
            case CURRENCY_TYPE.FLASH:
            default:
                network = NETWORKS.FLASH;
                break;
        }
        return network;
    }

    openWallet(wdata, return_passphrase) {
        let mnemonic = wdata.pure_passphrase;
        let valid = bip39.validateMnemonic(mnemonic);

        if (!valid) {
            return;
        }

        if(wdata.currency_type != CURRENCY_TYPE.ETH) {
            let seed = bip39.mnemonicToSeedHex(mnemonic);
            let accountZero = bitcoin.HDNode
                .fromSeedHex(seed, this.getCryptoNetwork(wdata.currency_type))
                .deriveHardened(0);

            this.accounts = {
                externalAccount: accountZero.derive(0),
                internalAccount: accountZero.derive(1),
            };
        } else {
            let seed = bip39.mnemonicToSeed(mnemonic);
            let root = hdkey.fromMasterSeed(seed);
            this.addrNode = root.derive("m/44'/60'/0'/0/0");
        }
        this.currency_type = wdata.currency_type;
        if(return_passphrase)
            this.pure_passphrase = wdata.pure_passphrase;

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

    signEtherBasedTx(rawTx, currency_type) {
        let network = this.getCryptoNetwork(currency_type);
        rawTx.chainId = network.chainId;
        let tx = new ethTx(rawTx);

        //Signing the transaction with the correct private key
        tx.sign(this.addrNode._privateKey);
        return tx;
    }
}

export class Address {
    hash=null;
    version=null;

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
