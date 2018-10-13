/**
 *  Application configuration
 */
export const  RESOURCE = 'app';
export const  APP_MODE = 'DEV'; // DEV , PROD
export const  APP_VERSION = '1.9.5-rc.4';

let appUrl;
let chatUrl;
let appSecret;

if(APP_MODE == 'PROD'){
    appUrl = 'https://mkeys.flashcoin.io';
    chatUrl = 'https://chat.flashcoin.io';
    appSecret = '12p]l+Or^}ZT8m_p[qC~';
} else{
    appUrl = 'https://dev03keys.flashcoin.io';
    chatUrl = 'https://chatdev.flashcoin.io';
    appSecret = 'p]l+Or^}ZT8m_p[qC~';
}
export const API_URL = appUrl+'/api';
export const PROFILE_URL = appUrl+'/profile/';
export const CHAT_URL = chatUrl;
export const CHAT_API_URL = chatUrl+'/api';
export const APP_SECRET = appSecret;
