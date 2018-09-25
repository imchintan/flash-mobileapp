/**
 *  Application configuration
 */
export const  RESOURCE = 'app';
export const  APP_MODE = 'DEV'; // DEV , PROD
export const  APP_VERSION = '1.9.4-rc.0';

let appUrl;
let chatUrl;

if(APP_MODE == 'PROD'){
    appUrl = 'https://mkeys.flashcoin.io';
    chatUrl = 'https://chat.flashcoin.io';
} else{
    appUrl = 'https://dev03keys.flashcoin.io';
    chatUrl = 'https://chatdev.flashcoin.io';
}
export const API_URL = appUrl+'/api';
export const PROFILE_URL = appUrl+'/profile/';
export const CHAT_URL = chatUrl;
export const CHAT_API_URL = chatUrl+'/api';
