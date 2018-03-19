/**
 * Send Tab Navigation Component
 */

import React from 'react';

import { StackNavigator } from 'react-navigation';
import ScanQR from './ScanQR';
import Send from './Send';

const routes = {
    ScanQR: {
        screen: ScanQR,
    },
    Send: {
        screen: Send,
    },
};

const routeConfig = {
    initialRouteName: 'ScanQR',
    headerMode: 'none'
};

const ScanNavigation = StackNavigator(routes,routeConfig);

const EnhancedComponent = class extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            scan: true,
        };
    }

    render() {
        return <ScanNavigation ref={nav => { this.navigator = nav; }}
                    onNavigationStateChange={(prevState, currentState) => {
                        this.setState({scan: (currentState.routes[currentState.index].routeName == 'ScanQR')});
                    }}
                    screenProps={{scan: this.state.scan && this.props.screenProps.scan}} />
    }
 }
export default EnhancedComponent;
