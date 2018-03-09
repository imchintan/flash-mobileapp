import login from './login';
import * as account from './account';
import * as transactions from './transactions';

module.exports = {
    login,
    ...account,
    ...transactions,
}
