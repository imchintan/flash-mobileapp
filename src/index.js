/**
 * App Navigation
 */

import React from 'react';
import {
    View,
    StatusBar,
    PushNotificationIOS
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
    addNavigationHelpers,
} from 'react-navigation';
import {
    createReduxBoundAddListener,
    createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';
import PushNotification from 'react-native-push-notification';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import AppNavigator from '@src/AppNavigation';
import reducer from '@reducers'

console.disableYellowBox = true;

// middleware that logs actions
const loggerMiddleware = createLogger({ predicate: () => __DEV__ });

// Note: createReactNavigationReduxMiddleware must be run before createReduxBoundAddListener
const middleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.nav,
);
const addListener = createReduxBoundAddListener("root");

class App extends React.Component {

    componentDidMount(){
        PushNotification.configure({
            // (optional) Called when Token is generated (iOS and Android)
            // onRegister: function(token) {
            //     console.log( 'TOKEN:', token );
            // },

            // (required) Called when a remote or local notification is opened or received
            // onNotification: function(notification) {
            //     console.log( 'NOTIFICATION:', notification );
            //
            //     // process the notification
            //
            //     // required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
            //     notification.finish(PushNotificationIOS.FetchResult.NewData);
            // },

            // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
            // senderID: "YOUR GCM SENDER ID",

            // IOS ONLY (optional): default: all - Permissions to register.
            // permissions: {
            //     alert: true,
            //     badge: true,
            //     sound: true
            // },

            // Should the initial notification be popped automatically
            // default: true
            // popInitialNotification: true,

            /**
              * (optional) default: true
              * - Specified if permissions (ios) and token (android and ios) will requested or not,
              * - if not, you must call PushNotificationsHandler.requestPermissions() later
              */
            // requestPermissions: true,
        });
    }
    render() {
        return (
            <View style={{flex:1}}>
                <StatusBar
                    backgroundColor="#000000"
                    barStyle="light-content"
                  />
                <AppNavigator navigation={addNavigationHelpers({
                    dispatch: this.props.dispatch,
                    state: this.props.nav,
                    addListener,
                })} />
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    nav: state.nav
});

const AppWithNavigationState = connect(mapStateToProps)(App);

const store = createStore(
    reducer,
    applyMiddleware(loggerMiddleware,middleware,thunk),
);

class Root extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <AppWithNavigationState />
            </Provider>
        );
    }
}
export default Root;
