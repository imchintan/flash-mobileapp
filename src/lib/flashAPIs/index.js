import login from './login';
import * as account from './account';
import * as transactions from './transactions';
import * as coinmarketcap from './coinmarketcap';

module.exports = {
    login,
    ...account,
    ...transactions,
    ...coinmarketcap,
}
