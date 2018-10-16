/**
 *  Application configuration
 */
import { appMode, appVersion, chatUrl, appUrl, appSecret } from 'react-native-dotenv'
export const RESOURCE = 'app';
export const APP_MODE = appMode; // DEV , PROD
export const APP_VERSION = appVersion;
export const API_URL = appUrl+'/api';
export const PROFILE_URL = appUrl+'/profile/';
export const CHAT_URL = chatUrl;
export const CHAT_API_URL = chatUrl+'/api';
export const APP_SECRET = appSecret;
