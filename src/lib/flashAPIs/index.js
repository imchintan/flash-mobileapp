import * as login from './login';
import * as account from './account';
import * as transactions from './transactions';
import * as send from './send';
import * as request from './request';
import * as coinmarketcap from './coinmarketcap';

module.exports = {
    ...login,
    ...account,
    ...send,
    ...request,
    ...transactions,
    ...coinmarketcap,
}
