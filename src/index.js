/**
 * App Navigation
 */

import React from 'react';
import {
    View,
    StatusBar
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
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import AppNavigator from '@src/AppNavigation';
import reducer from '@reducers'

console.disableYellowBox = true;

// middleware that logs actions
const loggerMiddleware = createLogger({ predicate: () => __DEV__  });

// Note: createReactNavigationReduxMiddleware must be run before createReduxBoundAddListener
const middleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.nav,
);
const addListener = createReduxBoundAddListener("root");

class App extends React.Component {  
    render() {
        return (
            <View style={{flex:1}}>
                <StatusBar
                    backgroundColor="#009DE4"
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
