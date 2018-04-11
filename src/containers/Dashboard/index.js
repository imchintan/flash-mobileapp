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
    Toast,
    Text,
    TabBarBottom,
    BadgeTabIcon
} from '@components'
import {
    TabNavigator,
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
    Pending: { screen: PendingTab }
},{
    navigationOptions: ({ navigation, screenProps }) => ({
        tabBarIcon: ({ focused, tintColor }) => {
            const { routeName } = navigation.state;
            let source = '';
            switch (routeName) {
                case 'Home':
                    source = focused?require('@images/home-icon-royal-yellow.png'):require('@images/home-icon-white.png');
                    break;
                case 'Send':
                    source = focused?require('@images/send-icon-royal-yellow.png'):require('@images/send-icon-white.png');
                    break;
                case 'Activity':
                    source = focused?require('@images/activity-icon-royal-yellow.png'):require('@images/activity-icon-white.png');
                    break;
                case 'Pending':
                    source = focused?require('@images/pending-icon-royal-yellow.png'):require('@images/pending-icon-white.png');
                    if(screenProps.totalPending){
                        return (
                            <View>
                                <Image style={{width:25,height:25, marginTop: 5}} source={source}/>
                                <View style={{
                                    minWidth:26,
                                    height:26,
                                    borderRadius:13,
                                    backgroundColor: focused?'#FFF':'#E0AE27',
                                    position: 'absolute',
                                    right: -15,
                                    top: -4,
                                    paddingHorizontal: 3,
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Text tyle={{
                                        textAlign: 'center',
                                        color:'#000',
                                        fontSize: 16,
                                        fontWeight: '500',
                                    }}>
                                        {screenProps.totalPending < 100? screenProps.totalPending: '99+'}
                                    </Text>
                                </View>
                            </View>
                        )
                    }
                    break;
                case 'Request':
                    source = focused?require('@images/request-icon-royal-yellow.png'):require('@images/request-icon-white.png');
                    break;
                default:

            }
            return <Image style={{width:25,height:25, marginTop: 5}} source={source}/>
        },
    }),
    tabBarOptions: {
        activeTintColor: '#E0AE27',
        inactiveTintColor: '#FFFFFF',
        activeBackgroundColor: '#000000',
        style: {
            backgroundColor: '#191714',
            borderTopWidth: 0,
            height: 70,
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
            fontSize: 14,
            paddingBottom: 7,
            fontFamily: 'Microsoft Tai Le'
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
    componentDidMount(){
        this.props.getBalance();
        this.props.getIncomingRequests(0,true);
        this.props.getOutgoingRequests(0,true);

        if(!this.coinmarketcapValue)
            this.coinmarketcapValue = setInterval(this.props.getCoinMarketCapDetail, 60000);

        if(!this.getMessages)
            this.getMessages = setInterval(this.props.getMessages, 10000);
    }

    componentWillUnmount(){
        clearInterval(this.coinmarketcapValue);
        clearInterval(this.getMessages);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps){
            if(nextProps.errorMsg){
                Toast.errorTop(nextProps.errorMsg);
                this.props.resetMessages();
            }
            if(nextProps.infoMsg){
                Toast.showTop(nextProps.infoMsg);
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
                    screenProps={{scan: this.state.scan, totalPending: this.props.totalPending}} />
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
        infoMsg: params.infoMsg || null,
        totalPending: params.totalPending || 0,
        txn: {},
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EnhancedComponent);
