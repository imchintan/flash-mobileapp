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
        fetch(CHAT_API_URL+`/get-rooms?${params}`,{
            method: 'GET',
            body: null,
            headers: {
               'Content-Type': 'application/json; charset=utf-8',
               'authorization': sessionToken,
               'fl_auth_version': auth_version
            },
        })
        .then(res =>res.json())
        .then(json => resolve(json))
        .catch(e =>{
            console.log(e);
            reject('Something went wrong!')
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
        fetch(CHAT_API_URL+`/mark-as-read?${params}`,{
            method: 'GET',
            body: null,
            headers: {
               'Content-Type': 'application/json; charset=utf-8',
               'authorization': sessionToken,
               'fl_auth_version': auth_version
            },
        })
        .then(res =>res.json())
        .then(json => resolve(json))
        .catch(e =>{
            console.log(e);
            reject('Something went wrong!')
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
        .then(res =>res.json())
        .then(json => resolve(json))
        .catch(e =>{
            console.log(e);
            reject('Something went wrong!')
        });
    });
}

/**
 * Send Chat Message
 * @param  {Number} auth_version             API authentication version
 * @param  {String} sessionToken             User authorization token
 * @param  {String} c                        Channel ID
 * @param  {String} r                        Room ID
 * @param  {String} txt                      Text message
 * @param  {String} lt                       Location latitude
 * @param  {String} ln                       Location longitude
 * @return {Object}                          Return API response
 */
export const sendChatMessage = (auth_version, sessionToken, c, r, txt, lt=null, ln=null) => {
    return new Promise((resolve,reject) => {
        fetch(CHAT_API_URL+'/send-message',{
            method: 'POST',
            body: JSON.stringify({
                c,
                r,
                txt,
                lt,
                ln,
                appversion:APP_VERSION,
                res:RESOURCE,
            }),
            headers: {
               'Content-Type': 'application/json; charset=utf-8',
               'authorization': sessionToken,
               'fl_auth_version': auth_version
            },
        })
        .then(res =>res.json())
        .then(json => resolve(json))
        .catch(e =>{
            console.log(e);
            reject('Something went wrong!')
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
        fetch(CHAT_API_URL+`/get-messages?${params}`,{
            method: 'GET',
            body: null,
            headers: {
               'Content-Type': 'application/json; charset=utf-8',
               'authorization': sessionToken,
               'fl_auth_version': auth_version
            },
        })
        .then(res =>res.json())
        .then(json => resolve(json))
        .catch(e =>{
            console.log(e);
            reject('Something went wrong!')
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
        .then(res =>res.json())
        .then(json => resolve(json))
        .catch(e =>{
            console.log(e);
            reject('Something went wrong!')
        });
    });
}
