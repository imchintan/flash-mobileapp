import "node-libs-react-native/globals";
import './shim' // make sure to use es6 import and not require()
import { AppRegistry } from 'react-native';
import App from '@src';

AppRegistry.registerComponent('flash', () => App);
