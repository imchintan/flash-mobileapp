/**
 * Notification handler class
 */

import {
    Platform
} from 'react-native';
import * as chatActions from '@actions/chat'
import firebase from 'react-native-firebase';

const FCMNotification = firebase.notifications();

export default class Notification {

    /**
     * Notification action handler
     * @param  {Object} sessionToken   User authorization token
     * @return {Void}                  Return success or failed object
     */
    static actionHandler({notification}) {
        return new Promise((resolve,reject) => {
            try {
                if(!notification) throw "Notification not found!";
                if(!global.store) throw "Store not found!";
                let data = notification.data;
                if(!data || Object.values(data).length == 0) throw "Data not found!";
                switch (data.k) {
                    case 'nm':
                        global.store.dispatch({
                            type: 'CHAT_NOTIFICATION_RECEIVED',
                            payload: {
                                chatNotification: JSON.parse(data.c)
                            }
                        })
                        break;
                    default:
                }
            } catch (e) {
                console.log(e);
                reject(e)
            }
        });
    }

    /**
     * Notification action handler
     * @param  {Object} sessionToken   User authorization token
     * @return {Void}                  Return success or failed object
     */
    static foregroundNotificationHandler(notification) {
        return new Promise((resolve,reject) => {
            try {
                if(!notification) throw "Notification not found!";
                if(!global.store) throw "Store not found!";
                let params = global.store.getState().params;
                if(!params.isLoggedIn) throw "User not found!";
                let data = notification.data;
                if(!data || Object.values(data).length == 0) throw "Data not found!";
                switch (data.k) {
                    case 'nm':
                        let chatNotification = JSON.parse(data.c)
                        if(params.chatRoomChannel &&
                            params.chatRoomChannel.id == chatNotification.c)
                            throw "Already in same chatroom!";
                        if(Platform.OS == 'android'){
                            notification
                                .android.setChannelId('flashcoin')
                                .android.setColor('#E0AE27')
                                .android.setAutoCancel(true)
                                .android.setSmallIcon('ic_stat_ic_notification');
                        }
                        FCMNotification.displayNotification(notification);
                        break;
                    default:
                }
            } catch (e) {
                console.log(e);
                // reject(e)
            }
        });
    }

    /**
     * Chat Notification Action handler
     * @return {Void}                  Return success or failed object
     */
    static chatAction() {
        return new Promise((resolve,reject) => {
            try {
                if(!global.store) throw "Store not found!";
                let params = global.store.getState().params;
                if(!params.isLoggedIn) throw "User not found!";
                if(!params.chatNotification)throw "Chat data not found!";

                let goToRoom = () => global.store.dispatch(chatActions.goToChatRoom(params.chatNotification.s,(feedback)=>{
                    if(feedback === true)return;
                    params = global.store.getState().params;
                    if(!params.TradesNavigation) params.DashboardNavigation.navigate('Trades');
                    let cntCB = 0;
                    let timeout = 100;
                    let cb = () => setTimeout(()=>{
                        cntCB++;
                        params = global.store.getState().params;
                        if(params.TradesNavigation)
                            return params.TradesNavigation.navigate('ChatRoom');

                        if(cntCB <= 5){
                            cb();
                        }
                        if(cntCB > 2){
                            timeout = 500;
                        }
                    },timeout);
                    cb();
                },params.chatNotification.c));
                let n=0;
                let _cb = () => {
                    params = global.store.getState().params;
                    if(!params.chatRooms || params.chatRooms.length == 0){
                        n++;
                        if(n == 5){
                            goToRoom();
                        }else if(n > 2){
                            setTimeout(_cb,500);
                        }else{
                            setTimeout(_cb,100);
                        }
                    } else {
                        goToRoom();
                    }
                }
                _cb();
            } catch (e) {
                console.log(e);
                // reject(e)
            }
        });
    }
}
