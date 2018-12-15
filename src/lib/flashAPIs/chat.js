import { Platform } from 'react-native';
import { CHAT_API_URL, RESOURCE, APP_VERSION } from '@src/config';
import * as utils from '@lib/utils';

/**
 * Get chat rooms
 * @param  {Number} auth_version             API authentication version
 * @param  {String} sessionToken             User authorization token
 * @return {Object}                          Return API response
 */
export const getRooms = (auth_version, sessionToken) => {
    return new Promise((resolve,reject) => {
        let params=utils.buildURLQuery({
            res         :RESOURCE,
            appversion  :APP_VERSION,
        });
        let _res='';
        fetch(CHAT_API_URL+`/get-rooms?${params}`,{
            method: 'GET',
            body: null,
            headers: {
               'Content-Type': 'application/json; charset=utf-8',
               'authorization': sessionToken,
               'fl_auth_version': auth_version
            },
        })
        .then(res =>res.text())
        .then(res =>{_res=res;return JSON.parse(res);})
        .then(json => resolve(json))
        .catch(e =>{
            console.log(_res,e);
            reject({message:'Something went wrong!'})
        });
    });
}

/**
 * Get chat room
 * @param  {Number} auth_version             API authentication version
 * @param  {String} sessionToken             User authorization token
 * @param  {String} c                        Chat room channel id
 * @return {Object}                          Return API response
 */
export const getRoom = (auth_version, sessionToken, c) => {
    return new Promise((resolve,reject) => {
        let params=utils.buildURLQuery({
            c,
            res         :RESOURCE,
            appversion  :APP_VERSION,
        });
        let _res='';
        fetch(CHAT_API_URL+`/get-rooms?${params}`,{
            method: 'GET',
            body: null,
            headers: {
               'Content-Type': 'application/json; charset=utf-8',
               'authorization': sessionToken,
               'fl_auth_version': auth_version
            },
        })
        .then(res =>res.text())
        .then(res =>{_res=res;return JSON.parse(res);})
        .then(json => resolve(json))
        .catch(e =>{
            console.log(_res,e);
            reject({message:'Something went wrong!'})
        });
    });
}

/**
 * Mark as read room
 * @param  {Number} auth_version             API authentication version
 * @param  {String} sessionToken             User authorization token
 * @param  {String} c                        Channel ID
 * @return {Object}                          Return API response
 */
export const markAsRead = (auth_version, sessionToken, c) => {
    return new Promise((resolve,reject) => {
        let params=utils.buildURLQuery({
            c,
            res         :RESOURCE,
            appversion  :APP_VERSION,
        });
        let _res='';
        fetch(CHAT_API_URL+`/mark-as-read?${params}`,{
            method: 'GET',
            body: null,
            headers: {
               'Content-Type': 'application/json; charset=utf-8',
               'authorization': sessionToken,
               'fl_auth_version': auth_version
            },
        })
        .then(res =>res.text())
        .then(res =>{_res=res;return JSON.parse(res);})
        .then(json => resolve(json))
        .catch(e =>{
            console.log(_res,e);
            reject({message:'Something went wrong!'})
        });
    });
}

/**
 * Create Channel
 * @param  {Number} auth_version             API authentication version
 * @param  {String} sessionToken             User authorization token
 * @param  {String} receiver_username        Reciver user name
 * @param  {String} receiver_name            Reciver user display name
 * @param  {String} receiver_dp              Reciver user profile image
 * @param  {String} sender_name              Sender user display name
 * @param  {String} sender_dp                Sender user profile image
 * @return {Object}                          Return API response
 */
export const createChannel = (auth_version, sessionToken, receiver_username,
    receiver_name, receiver_dp, sender_name, sender_dp) => {
    return new Promise((resolve,reject) => {
        let _res='';
        fetch(CHAT_API_URL+'/create-channel',{
            method: 'POST',
            body: JSON.stringify({
                receiver_username,
                receiver_name,
                receiver_dp,
                sender_name,
                sender_dp,
                appversion:APP_VERSION,
                res:RESOURCE,
            }),
            headers: {
               'Content-Type': 'application/json; charset=utf-8',
               'authorization': sessionToken,
               'fl_auth_version': auth_version
            },
        })
        .then(res =>res.text())
        .then(res =>{_res=res;return JSON.parse(res);})
        .then(json => resolve(json))
        .catch(e =>{
            console.log(_res,e);
            reject({message:'Something went wrong!'})
        });
    });
}

/**
 * Update Room Member Detaill
 * @param  {Number} auth_version             API authentication version
 * @param  {String} sessionToken             User authorization token
 * @param  {String} r                        Room ID
 * @param  {String} receiver_username        Reciver user name
 * @param  {String} receiver_name            Reciver user display name
 * @param  {String} receiver_dp              Reciver user profile image
 * @param  {String} sender_name              Sender user display name
 * @param  {String} sender_dp                Sender user profile image
 * @return {Object}                          Return API response
 */
export const updateRoomMemberDetail = (auth_version, sessionToken, r, receiver_username,
    receiver_name, receiver_dp, sender_name, sender_dp) => {
    return new Promise((resolve,reject) => {
        let _res='';
        fetch(CHAT_API_URL+'/update-room-member-detail',{
            method: 'POST',
            body: JSON.stringify({
                r,
                receiver_username,
                receiver_name,
                receiver_dp,
                sender_name,
                sender_dp,
                appversion:APP_VERSION,
                res:RESOURCE,
            }),
            headers: {
               'Content-Type': 'application/json; charset=utf-8',
               'authorization': sessionToken,
               'fl_auth_version': auth_version
            },
        })
        .then(res =>res.text())
        .then(res =>{_res=res;return JSON.parse(res);})
        .then(json => resolve(json))
        .catch(e =>{
            console.log(_res,e);
            reject({message:'Something went wrong!'})
        });
    });
}

/**
 * Send Chat Message
 * @param  {Number} auth_version             API authentication version
 * @param  {String} sessionToken             User authorization token
 * @param  {String} c                        Channel ID
 * @param  {String} r                        Room ID
 * @param  {String} txt                      Encrypted message object
 *   ⮑ @param  {String} text                Text message
 *      @param  {String} location            Location Object
 *        ⮑ @param  {Number} latitude       latitude
 *           @param  {Number} longitude      longitude
 * @return {Object}                          Return API response
 */
export const sendChatMessage = (auth_version, sessionToken, c, r, txt) => {
    return new Promise((resolve,reject) => {
        let _res='';
        fetch(CHAT_API_URL+'/send-message',{
            method: 'POST',
            body: JSON.stringify({
                c,
                r,
                txt,
                appversion:APP_VERSION,
                res:RESOURCE,
            }),
            headers: {
               'Content-Type': 'application/json; charset=utf-8',
               'authorization': sessionToken,
               'fl_auth_version': auth_version
            },
        })
        .then(res =>res.text())
        .then(res =>{_res=res;return JSON.parse(res);})
        .then(json => resolve(json))
        .catch(e =>{
            console.log(_res,e);
            reject({message:'Something went wrong!'})
        });
    });
}

/**
 * Get Message
 * @param  {Number} auth_version             API authentication version
 * @param  {String} sessionToken             User authorization token
 * @param  {String} c                        Channel ID
 * @param  {Number} l                        Limit per API call
 * @param  {Number} p                        Page number
 * @return {Object}                          Return API response
 */
export const getChatMessages = (auth_version, sessionToken, c, l, p=1) => {
    return new Promise((resolve,reject) => {
        let params=utils.buildURLQuery({
            c,
            l,
            p,
            res         :RESOURCE,
            appversion  :APP_VERSION,
        });
        let _res='';
        fetch(CHAT_API_URL+`/get-messages?${params}`,{
            method: 'GET',
            body: null,
            headers: {
               'Content-Type': 'application/json; charset=utf-8',
               'authorization': sessionToken,
               'fl_auth_version': auth_version
            },
        })
        .then(res =>res.text())
        .then(res =>{_res=res;return JSON.parse(res);})
        .then(json => resolve(json))
        .catch(e =>{
            console.log(_res,e);
            reject({message:'Something went wrong!'})
        });
    });
}

/**
 * Add Feedback
 * @param  {Number} auth_version             API authentication version
 * @param  {String} sessionToken             User authorization token
 * @param  {String} c                        Channel ID
 * @param  {String} f                        Transaction successfull or not
 * @return {Object}                          Return API response
 */
export const addFeedback = (auth_version, sessionToken, c, f) => {
    return new Promise((resolve,reject) => {
        fetch(CHAT_API_URL+'/add-feedback',{
            method: 'POST',
            body: JSON.stringify({
                c,
                f,
                appversion:APP_VERSION,
                res:RESOURCE,
            }),
            headers: {
               'Content-Type': 'application/json; charset=utf-8',
               'authorization': sessionToken,
               'fl_auth_version': auth_version
            },
        })
        .then(res =>res.text())
        .then(res =>{_res=res;return JSON.parse(res);})
        .then(json => resolve(json))
        .catch(e =>{
            console.log(_res,e);
            reject({message:'Something went wrong!'})
        });
    });
}

/**
 * Save Push Token
 * @param  {Number} auth_version             API authentication version
 * @param  {String} sessionToken             User authorization token
 * @param  {String} token                    Push notification token
 * @return {Object}                          Return API response
 */
export const savePushToken = (auth_version, sessionToken, t ) => {
    return new Promise((resolve,reject) => {
        let _res='';
        fetch(CHAT_API_URL+'/save-push-token',{
            method: 'POST',
            body: JSON.stringify({
                t,
                o:Platform.OS,
                appversion:APP_VERSION,
                res:RESOURCE,
            }),
            headers: {
               'Content-Type': 'application/json; charset=utf-8',
               'authorization': sessionToken,
               'fl_auth_version': auth_version
            },
        })
        .then(res =>res.text())
        .then(res =>{_res=res;return JSON.parse(res);})
        .then(json => resolve(json))
        .catch(e =>{
            console.log(_res,e);
            reject({message:'Something went wrong!'})
        });
    });
}
