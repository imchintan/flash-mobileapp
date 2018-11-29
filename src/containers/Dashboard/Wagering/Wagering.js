/**
 * Wagering Component
 */

import React from 'react';
import {
    View,
    Platform,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';
import {
    createMaterialTopTabNavigator,
} from 'react-navigation';
import {
    Header,
    HeaderTitle,
    HeaderLeft,
    Icon,
    Loader,
} from '@components';
import * as utils from '@lib/utils';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '@actions';

import Events from './Events';
import MyEvents from './MyEvents';
import Profile from './Profile/index';
import * as wm from './WageringModal';

const tabNavigatorConfig = {
    navigationOptions: ({ navigation, screenProps }) => ({
    }),
    tabBarOptions: {
        activeTintColor: '#E0AE27',
        indicatorStyle:{
            backgroundColor: '#E0AE27',
            height: 3,
        },
        style: {
            backgroundColor: '#191714',
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
            fontSize: utils.FontSize(16),
            fontFamily: 'Microsoft Tai Le',
        },
    },
    showIcon: false,
    tabBarPosition: 'top',
    animationEnabled: true,
    swipeEnabled: true,
};

class Wagering extends React.Component {

    static navigationOptions = {
        gesturesEnabled: true,
    }

    constructor(props) {
        super(props);
        this.state ={}
    }

    componentDidMount(){
        this.props.wageringInit();
        this.refreshTime = setInterval(()=>{
            this.props.getOracleEvents(false);
            this.props.getMyActiveOracleEvents();
            this.props.getMyOracleEvents();
        },5000);
    }
    componentWillUnmount(){
        clearInterval(this.refreshTime);
    }

    legalDisclaimer(){
        if(this.state.do_not_show){
            AsyncStorage.setItem('wagerLegalDisclaimer','true');
        }
        this.props.customAction({
            wagerLegalDisclaimer: true
        });
    }

    getTabNav(){
        if(this.tabNav) return this.tabNav;
        let hasMyProifle = (this.props.oracleProfileAccessEmails
            .findIndex(email => email == this.props.profile.email || email == '*') > -1);
        let routeConfigs = {
            'Events': { screen: Events },
            'My Events': { screen: MyEvents }
        }
        if(hasMyProifle){
            routeConfigs = {
                'Events': { screen: Events },
                'My Events': { screen: MyEvents },
                'Oracle Profile': { screen: Profile }
            }
        }
        this.tabNav = createMaterialTopTabNavigator(routeConfigs, tabNavigatorConfig);
        return this.tabNav;
    }

    render() {
        const TabNav = this.getTabNav();
        const styles = (this.props.nightMode?require('@styles/nightMode/wagering'):require('@styles/wagering'));
        return (
            <View style={{
                flex: 1,
                ...Platform.select({
                    ios: {
                        paddingTop: utils.isIphoneX()?92:77,
                    },
                    android: {
                        paddingTop: 55
                    },
                }),
            }}>
                <Header>
                    <HeaderLeft>
                        <TouchableOpacity onPress={() => this.props.screenProps
                            .navigation.goBack()}>
                            <Icon style={styles.headerBackIcon} name='angle-left'/>
                        </TouchableOpacity>
                    </HeaderLeft>
                    <HeaderTitle>Wagering</HeaderTitle>
                </Header>
                <TabNav screenProps={{navigate:this.props.navigation.navigate}}/>
                {wm.legalDisclaimer(this,styles)}
                <Loader style={{
                    ...Platform.select({
                        ios: {
                            top: utils.isIphoneX()?92:77,
                        },
                        android: {
                            top: 55
                        },
                    }),
                }} show={this.props.loading} />
            </View>
        );
    }
}

function mapStateToProps({params}) {
    return {
        loading: params.loading,
        nightMode: params.nightMode,
        profile: params.profile,
        wagerLegalDisclaimer: params.wagerLegalDisclaimer || false,
        oracleProfileAccessEmails: params.oracleProfileAccessEmails || []
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Wagering);
