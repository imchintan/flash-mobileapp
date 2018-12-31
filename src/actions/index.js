import * as NavigationActions from '@actions/navigation'
import * as AccountActions from '@actions/account'
import * as TransactionsActions from '@actions/transactions'
import * as RequestActions from '@actions/request'
import * as SendActions from '@actions/send'
import * as MessagesActions from '@actions/messages'
import * as SharingActions from '@actions/sharing'
import * as HTMActions from '@actions/htm'
import * as ExchangesActions from '@actions/exchanges'
import * as ChatActions from '@actions/chat'
import * as WageringActions from '@actions/wagering'

export const ActionCreators = Object.assign({},
    NavigationActions,
    AccountActions,
    TransactionsActions,
    RequestActions,
    SendActions,
    MessagesActions,
    SharingActions,
    HTMActions,
    ExchangesActions,
    ChatActions,
    WageringActions
);
