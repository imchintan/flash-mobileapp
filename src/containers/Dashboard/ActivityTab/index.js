/**
 * Main Dashboard Tab Navigation Component
 */

import React from 'react';
import {
    View,
    Text,
    Image,
    Platform,
    AsyncStorage,
    BackHandler
} from 'react-native';
import { TabNavigator, TabBarTop, NavigationActions } from 'react-navigation';
import AllTransactions from '@containers/Dashboard/ActivityTab/AllTransactions';
import PaymentReceived from '@containers/Dashboard/ActivityTab/PaymentReceived';
import PaymentSent from '@containers/Dashboard/ActivityTab/PaymentSent';

const TabNav = TabNavigator({
    All: { screen: AllTransactions },
    Received: { screen: PaymentReceived },
    Sent: { screen: PaymentSent },
},{
    navigationOptions: ({ navigation }) => ({
    }),
    tabBarOptions: {
        activeTintColor: '#FFFFFF',
        indicatorStyle:{
            backgroundColor: '#FFFFFF',
            height: 3,
        },
        style: {
            backgroundColor: '#00AFFD',
            ...Platform.select({
                ios: {
                    shadowColor: 'rgba(0,0,0, 0.5)',
                    shadowOffset: { height: 1, width: 0 },
                    shadowOpacity: 0.7,
                },
                android: {
                    elevation: 10,
                },
            }),
        },
        labelStyle: {
            fontWeight: 'bold',
        },
    },
    showIcon: false,
    tabBarComponent: TabBarTop,
    tabBarPosition: 'top',
    animationEnabled: true,
    swipeEnabled: true,
});

export default class MainScreen extends React.Component {
    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount(){
        BackHandler.addEventListener('hardwareBackPress', this.backHandler);
    }

    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', this.backHandler);
    }

    backHandler=()=>{
        return true;
    }

    render() {
        return (
            <View style={{flex: 1}}>
                {Platform.OS === 'ios'?<View style={{
                    width: '100%',
                    height: 22,
                    backgroundColor: '#009DE4',
                }} />:null}
                <TabNav ref={nav => { this.navigator = nav; }}
                    onNavigationStateChange={(prevState, currentState) => {
                    }}
                    screenProps={{
                        logout: () => {
                            // Logout(this.props.navigation.state.params.sessionId);
                            // AsyncStorage.clear();
                            // this.props.navigation.goBack();
                        },
                }} />
            </View>
        );
    }
}
