/**
 * Send Tab Navigation Component
 */

import React from 'react';

import { StackNavigator } from 'react-navigation';
import ScanQR from '@containers/Dashboard/SendTab/ScanQR';
import Send from '@containers/Dashboard/SendTab/Send';

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

export default class ScanTab extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ScanNavigation ref={nav => { this.navigator = nav; }}
                screenProps={{
                    // user: this.props.screenProps.user,
                    // logout: this.props.screenProps.logout,
            }}/>
        );
    }
}
