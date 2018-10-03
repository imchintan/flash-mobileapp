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
    reduxifyNavigator,
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
const App = reduxifyNavigator(AppNavigator, "root");

const mapStateToProps = (state) => ({
    state: state.nav
});

const AppWithNavigationState = connect(mapStateToProps)(App);

const store = createStore(
    reducer,
    applyMiddleware(loggerMiddleware,middleware,thunk),
);

class Root extends React.Component {

    componentDidMount(){
        PushNotification.checkPermissions((res)=>{
            if(!res.alert){
                PushNotificationIOS.requestPermissions(['alert', 'badge', 'sound'])
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
