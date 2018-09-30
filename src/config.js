/**
 *  Application configuration
 */
export const  RESOURCE = 'app';
export const  APP_MODE = 'PROD'; // DEV , PROD
export const  APP_VERSION = '1.9.4';

let appUrl;

if(APP_MODE == 'PROD')
    appUrl = 'https://mkeys.flashcoin.io';
else
    appUrl = 'https://dev03keys.flashcoin.io';

export const API_URL = appUrl+'/api';
export const PROFILE_URL = appUrl+'/profile/';
