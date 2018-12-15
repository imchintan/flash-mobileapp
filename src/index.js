/**
 * App Navigation
 */

import React from 'react';
import {
    View,
    StatusBar,
    AsyncStorage,
    Platform
} from 'react-native';
import {
    createStore,
    applyMiddleware
} from 'redux';
import {
    Provider,
    connect
} from 'react-redux';
import {
    reduxifyNavigator,
    createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import AppNavigator from '@src/AppNavigation';
import reducer from '@reducers';
import notifcationHelper from '@helpers/notifcationHelper';

import firebase from 'react-native-firebase';
import type { RemoteMessage } from 'react-native-firebase';

// import * as config from './config';
// console.log(config);

console.disableYellowBox = true;

// middleware that logs actions
const loggerMiddleware = createLogger({ predicate: () => __DEV__ });

// Note: createReactNavigationReduxMiddleware must be run before createReduxBoundAddListener
const middleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.nav,
);
const App = reduxifyNavigator(AppNavigator, "root");

const mapStateToProps = (state) => ({
    state: state.nav
});

const AppWithNavigationState = connect(mapStateToProps)(App);

const store = createStore(
    reducer,
    applyMiddleware(middleware,thunk,loggerMiddleware),
);

class Root extends React.Component {

    componentDidMount(){
        global.store = store;
        const FCM = firebase.messaging();
        const FCMNotification = firebase.notifications();

        // check permissions
        FCM.hasPermission().then((enabled) => {
            if (enabled) {
                this._setPermission(true);
            } else {
                // request permissions from the user
                FCM.requestPermission().then(()=>{
                    this._setPermission(true);
                }).catch(e=>{
                    console.log(e);
                    this._setPermission(false);
                });
            }
        });

        FCM.getToken().then(fcmToken => {
            if (fcmToken) {
                AsyncStorage.setItem('fcmToken',fcmToken);
            }
        });

        FCM.onTokenRefresh(fcmToken => {
            if (fcmToken) {
                AsyncStorage.setItem('fcmToken',fcmToken);
            }
        });

        FCM.onMessage((message: RemoteMessage) => {
            console.log(message);
        });

        if(Platform.OS == 'android'){
            // Build a channel
            const channel = new firebase.notifications.Android.Channel('flashcoin','flashcoin',
                firebase.notifications.Android.Importance.Default);

            // Create the channel
            FCMNotification.android.createChannel(channel);
        }
        FCMNotification.getInitialNotification().then(notifcation =>
            notifcation && notifcationHelper.actionHandler(notifcation));
        FCMNotification.onNotificationOpened(notifcationHelper.actionHandler);

        FCMNotification.onNotification(notifcationHelper.foregroundNotificationHandler);
    }

    _setPermission(notification_permission){
        AsyncStorage.setItem('notification_permission',notification_permission.toString());
        store.dispatch({
            type: 'SET_NOTIFICATION_PERMISSION',
            payload: {
                notification_permission,
            }
        });
    }

    render() {
        return (
            <View style={{flex:1}}>
                <StatusBar
                    backgroundColor="#000000"
                    barStyle="light-content"
                  />
                <Provider store={store}>
                    <AppWithNavigationState ref={'appNav'} />
                </Provider>
            </View>
        );
    }
}
export default Root;
