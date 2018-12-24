import {
    AsyncStorage,
    Platform
} from 'react-native';
import firebase from 'react-native-firebase';
import * as constants from '@src/constants';
import * as apis from '@flashAPIs';
import * as types from '@actions/types';
import * as reqs from '@actions/request';
import * as txns from '@actions/transactions';
import * as account from '@actions/account';

export const getMessages = () => {
    return (dispatch,getState) => {
        let params = getState().params;
        let date_from = params.last_message_datetime;
        apis.getMessages(params.profile.auth_version, params.profile.sessionToken, date_from).then((d)=>{
            if(d.rc == 1 && d.messages && d.messages.length > 0){
                d.messages.forEach(msg=>{
                    let last_message_datetime = new Date(msg.created_ts).getTime()
                    if(date_from < last_message_datetime){
                        date_from = last_message_datetime;
                        dispatch({
                            type: types.GET_MESSAGES,
                            payload: {
                                last_message_datetime
                            }
                        });
                        AsyncStorage.setItem('last_message_datetime',last_message_datetime.toString())
                    }

                    let message = JSON.parse(msg.message_content);
                    switch (msg.message_type) {
                        case constants.KEYS_ADD_MONEY_REQ_RECV:
                            onBeRequested(dispatch, message);
                            break;
                        case constants.KEYS_ADD_TXN_LOG_RECV:
                            onTxAdded(dispatch, message, params);
                            break;
                        case constants.KEYS_MARK_MONEY_REQ_RECV:
                            onRequestStateChanged(dispatch, message);
                            break;
                        default:
                            break;
                    }
                });
            }
        }).catch(e=>console.log(e))
    }
}


export const onBeRequested = (dispatch, message) => {
    dispatch(reqs.getIncomingRequests(0,true));
    dispatch(reqs.getOutgoingRequests(0,true));
    let currencyType = message.currency ? parseInt(message.currency) : constants.CURRENCY_TYPE.FLASH;
    let currency_name = constants.CURRENCY_TYPE_UNIT_UPCASE[currencyType];
    let infoMsg = `${message.email_sender} sent you a request for ${message.amount} ${currency_name}`;
    // PushNotification.localNotification({
    //     message: infoMsg,
    // })
    createLocalNotification('FLASH',infoMsg);
}

export const onTxAdded = (dispatch, message, params) => {
    let currencyType = message.currency_type ? parseInt(message.currency_type) : constants.CURRENCY_TYPE.FLASH;
    dispatch(account.getBalanceV2(currencyType,(params.currency_type == currencyType)));
    if(params.currency_type == currencyType){
        dispatch(txns.getRecentTransactions());
        dispatch(txns.getAllTransactions(0, true));
        dispatch(txns.getSentTransactions(0, true));
        dispatch(txns.getReceivedTransactions(0, true));
    }
    if(message.sender_email != params.profile.email){
        let currency_name = constants.CURRENCY_TYPE_UNIT_UPCASE[currencyType];
        let infoMsg = `${message.sender_email} sent you ${message.amount} ${currency_name}`;
        constants.SOUND.RECEIVE.play();
        // PushNotification.localNotification({
        //     message: infoMsg,
        //     playSound: false,
        // })
        createLocalNotification('FLASH',infoMsg);
    }
}

export const onRequestStateChanged = (dispatch, message) => {
    dispatch(reqs.getIncomingRequests(0,true));
    dispatch(reqs.getOutgoingRequests(0,true));
    let infoMsg = null;
    let playSound = true;
    switch (message.status) {
        case 1:
            infoMsg = 'One request of yours has been paid';
            playSound=false;
            constants.SOUND.RECEIVE.play();
            break;
        case 2:
            infoMsg = 'One request of yours has been rejected';
            break;
        case 3:
            infoMsg = 'A request sent to you has been cancelled';
            break;
        default:
            break;
    }
    if(infoMsg)
        createLocalNotification('FLASH',infoMsg);
        // PushNotification.localNotification({
        //     message: infoMsg,
        //     playSound
        // })

}

const createLocalNotification = (title, body) => {
    let notification = new firebase.notifications.Notification()
      .setNotificationId('flashcoin'+new Date().getTime())
      // .setTitle(title)
      .setBody(body);
      if(Platform.OS == 'android'){
          notification
              .android.setChannelId('flashcoin')
              .android.setColor('#E0AE27')
              .android.setAutoCancel(true)
              .android.setSmallIcon('ic_stat_ic_notification');
      }

    firebase.notifications().displayNotification(notification)
}
