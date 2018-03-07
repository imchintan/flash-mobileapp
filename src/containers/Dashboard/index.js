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
import {
    TabNavigator,
    TabBarBottom,
    NavigationActions
} from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '@actions';
import Home from '@containers/Dashboard/Home';
import SendTab from '@containers/Dashboard/SendTab';
import ActivityTab from '@containers/Dashboard/ActivityTab';


const TabNav = TabNavigator({
    Home: { screen: Home },
    Send: { screen: SendTab },
    Activity: { screen: ActivityTab },
    'My Account': { screen: Home },
},{
    navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) => {
            const { routeName } = navigation.state;
            let source = '';
            switch (routeName) {
                case 'Home':
                    source = focused?require('@images/home-icon-blue.png'):require('@images/home-icon-black.png');
                    break;
                case 'Send':
                    source = focused?require('@images/send-icon-blue.png'):require('@images/send-icon-black.png');
                    break;
                case 'Activity':
                    source = focused?require('@images/activity-icon-blue.png'):require('@images/activity-icon-black.png');
                    break;
                case 'My Account':
                    source = focused?require('@images/user-profile-icon-blue.png'):require('@images/user-profile-icon-black.png');
                    break;
                default:

            }
            return <Image style={{width:20,height:20}} source={source}/>
        },
    }),
    tabBarOptions: {
        activeTintColor: '#00AFFD',
        inactiveTintColor: '#333333',
        activeBackgroundColor: '#FAFBFB',
        style: {
            backgroundColor: '#FFFFFF',
            borderTopWidth: 0,
            ...Platform.select({
                ios: {
                    shadowColor: 'rgba(0,0,0,0.15)',
                    shadowOffset: { height: -3, width: 2 },
                    shadowOpacity: 0.15,
                },
                android: {
                    elevation: 10,
                },
            }),
        },
        tabStyle:{
            paddingVertical: 2,
            borderLeftWidth: 0.25,
            borderRightWidth: 0.25,
            borderColor: '#D6DCDA',
            width: '100%',
            height: '100%'
        },
        labelStyle:{
            fontSize: 12,
        },
    },
    tabBarPosition: 'bottom',
    tabBarComponent: TabBarBottom,
    animationEnabled: true,
    swipeEnabled: false,
});

class MainScreen extends React.Component {
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
                <TabNav ref={nav => { this.navigator = nav; }}
                    onNavigationStateChange={(prevState, currentState) => {
                    }}
                    screenProps={{
                        // user: this.props.navigation.state.params,
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

function mapStateToProps(state) {
  return {
    isLoggedIn: state.isLoggedIn,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
