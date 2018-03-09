import * as NavigationActions from '@actions/navigation'
import * as AccountActions from '@actions/account'
import * as TransactionsActions from '@actions/transactions'

export const ActionCreators = Object.assign({},
    NavigationActions,
    AccountActions,
    TransactionsActions
);
