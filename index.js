import "node-libs-react-native/globals";
import './shim' // make sure to use es6 import and not require()
import { AppRegistry } from 'react-native';
import App from '@src';
import bgMessaging from '@src/bgMessaging';

AppRegistry.registerComponent('flash', () => App);
// New task registration
AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => bgMessaging); // <-- Add this line
