/**
 *  Dashboard Tab Navigation Component
 */

import React from 'react';
import {
    View,
    Image,
    Platform,
} from 'react-native';
import {
    Loader,
    Toast
} from '@components'
import {
    TabNavigator,
    TabBarBottom,
    NavigationActions
} from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '@actions';
import HomeNavigation from '@containers/Dashboard/Home';
import SendTab from '@containers/Dashboard/SendTab';
import ActivityTab from '@containers/Dashboard/ActivityTab';
import PendingTab from '@containers/Dashboard/PendingTab';
import RequestTab from '@containers/Dashboard/RequestTab';


const Dashboard = TabNavigator({
    Home: { screen: HomeNavigation },
    Activity: { screen: ActivityTab },
    Send: { screen: SendTab },
    Request: { screen: RequestTab },
    Pending: { screen: PendingTab },
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
                case 'Pending':
                    source = focused?require('@images/pending-icon-blue.png'):require('@images/pending-icon-black.png');
                    break;
                case 'Request':
                    source = focused?require('@images/request-icon-blue.png'):require('@images/request-icon-black.png');
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
            height: 60,
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
            paddingTop: 5,
            borderLeftWidth: 0.25,
            borderRightWidth: 0.25,
            borderColor: '#D6DCDA',
            width: '100%',
            height: '100%'
        },
        labelStyle:{
            fontSize: 12,
            paddingBottom: 7,
        },
    },
    tabBarPosition: 'bottom',
    tabBarComponent: TabBarBottom,
    animationEnabled: true,
    swipeEnabled: false,
});

const EnhancedComponent = class extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            scan: false,
        };
    }
    componentWillReceiveProps(nextProps){
        if(nextProps){
            if(nextProps.errorMsg){
                Toast.errorTop(nextProps.errorMsg);
                this.props.resetMessages();
            }
            if(nextProps.successMsg){
                Toast.successTop(nextProps.successMsg);
                this.props.resetMessages();
            }
        }
    }

    render() {
        return(
            <View style={{flex:1}}>
                <Dashboard ref={nav => { this.navigator = nav; }}
                    onNavigationStateChange={(prevState, currentState) => {
                        this.setState({scan: (currentState.routes[currentState.index].routeName == 'Send')});
                    }}
                    screenProps={{scan: this.state.scan}} />
                <Loader show={this.props.loading} />
            </View>
        )
    }
}

function mapStateToProps({params}) {
    return {
        loading: params.loading,
        isLoggedIn: params.isLoggedIn,
        errorMsg: params.errorMsg || null,
        successMsg: params.successMsg || null,
        txn: {},
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EnhancedComponent);
