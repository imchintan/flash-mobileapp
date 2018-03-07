import { Platform } from 'react-native';

let APP_VERSION = 1;
let API_URL = 'https://dev03keys.flashcoin.io/api';
// if(Platform.OS !== 'ios'){
//     API_URL = 'https://dev03keys.flashcoin.io';
// }
module.exports = {
    API_URL,
    APP_VERSION
}
