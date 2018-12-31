import io from 'socket.io-client/dist/socket.io';
import { CHAT_URL, RESOURCE, APP_VERSION } from '@src/config';

/**
 * Chat event handler class
 */

export default class Chat {

    /**
     * Create socket connection for Chat
     * @param  {Number} auth_version   API authentication version
     * @param  {String} sessionToken   User authorization token
     * @return {Void}                  Return success or failed object
     */
    static connect(auth_version, sessionToken) {
        return new Promise((resolve,reject) => {
            try {
                global.socket = io.connect(CHAT_URL, {
                    query       : {
                        token           : sessionToken,
                        auth_version    : auth_version
                    },
                    res         : RESOURCE,
                    appversion  : APP_VERSION,
                });
                resolve(global.socket);
            } catch (e) {
                console.log(e);
                reject(e)
            }
        });
    }

    /**
     * Re-create Socket connection for Chat
     * @param  {Number} auth_version   API authentication version
     * @param  {String} sessionToken   User authorization token
     * @return {Void}                  Return success or failed object
     */
    static reconnect(auth_version, sessionToken) {
        return new Promise((resolve,reject) => {
            try {
                Chat.disconnect().then(()=>{
                    Chat.connect(auth_version, sessionToken)
                    .then(resolve).catch(reject);
                }).catch(reject)
            } catch (e) {
                console.log(e);
                reject(e)
            }
        });
    }

    /**
     * Socket disconnect
     * @return {Void}  On success nothing and on error forword it
     */
    static disconnect() {
        return new Promise((resolve,reject) => {
            try {
                if(global.socket)
                    global.socket.disconnect();

                global.socket = null;
                resolve();
            } catch (e) {
                console.log(e);
                reject(e);
            }
        });
    }

    /**
     * Add listener for various event in chat
     * @param {String} event        Event name like ru - room created ot updated,nm - new message event
     * @param {Function} listener   Event handler
     */
    static addListener(event, listener){
        return new Promise((resolve,reject) => {
            try {
                global.socket.on(event, listener);
                resolve()
            } catch (e) {
                console.log(e);
                reject(e)
            }
        });
    }

    /**
     * remove listener for various event in chat
     * @param {String} event        Event name like ru - room created ot updated,nm - new message event
     * @param {Function} listener   Event handler
     */
    static removeListener(event, listener){
        return new Promise((resolve,reject) => {
            try {
                global.socket.off(event, listener);
                resolve()
            } catch (e) {
                console.log(e);
                reject(e)
            }
        });
    }

}
