/**
 * Activity Tab Navigation Component
 */

import React from 'react';
import {
    View,
    Platform,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import {
    createMaterialTopTabNavigator,
} from 'react-navigation';
import {
    Header,
    HeaderRight,
    HeaderLeft,
    Icon,
    Text,
    Calendar
} from '@components';
import moment from 'moment-timezone';
import { getDisplayDate } from '@lib/utils';
import * as constants from '@src/constants';
import { isIphoneX, FontSize } from '@lib/utils'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '@actions';

import AllTransactions from './AllTransactions';
import PaymentReceived from './PaymentReceived';
import PaymentSent from './PaymentSent';
import SharingIn from './SharingIn';
import SharingOut from './SharingOut';
import SharingUsage from './SharingUsage';

const { width } = Dimensions.get('window');

const stackNavigatorConfig = {
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
        tabStyle:{
            width: 140,
        },
        labelStyle: {
            fontSize: FontSize(15),
            marginLeft:0,
            marginRight:0,
        },
        scrollEnabled: true,
    },
    showIcon: false,
    // tabBarComponent: TabBarTop,
    tabBarPosition: 'top',
    animationEnabled: true,
    swipeEnabled: true,
}

class ActivityTab extends React.Component {

    static navigationOptions = {
        gesturesEnabled: true,
    }

    constructor(props) {
        super(props);
        this.state ={}
        this.confirmDate = this.confirmDate.bind(this);
        this.openCalendar = this.openCalendar.bind(this);
    }

    confirmDate({startDate, endDate, startMoment, endMoment}) {
        this.props.updateTransactionReportDate(startMoment,endMoment)
    }

    openCalendar() {
        this.calendar && this.calendar.open();
    }

    refresh = () => this.props.updateTransactionReportDate(this.props.date_from,this.props.date_to)

    tabNav = () => {
        let routeConfigs = {
            All: { screen: AllTransactions },
            Received: { screen: PaymentReceived },
            Sent: { screen: PaymentSent },
        }
        if(this.props.currency_type == constants.CURRENCY_TYPE.FLASH){
            routeConfigs = Object.assign(routeConfigs,{
                SharingIn: { screen: SharingIn },
                SharingOut: { screen: SharingOut }
            });
        }
        if(this.props.sharing_code.length > 0){
            routeConfigs = Object.assign(routeConfigs,{
                SharingUsage: { screen: SharingUsage }
            });
        }

        return createMaterialTopTabNavigator(routeConfigs, stackNavigatorConfig);
    }

    render() {
        const TabNav = this.tabNav();
        const styles = (this.props.nightMode?require('@styles/nightMode/app'):require('@styles/app'));
        let customI18n = {
           'text': {
             'save': 'Confirm',
           },
           'date': constants.MOMENT_FORMAT.DATE  // date format
         };
        let color = {
            mainColor: '#191714',
            subColor: '#E0AE27',
            borderColor: 'rgba(224, 174, 39, 0.5)'
        };
        return (
            <View style={{
                flex: 1,
                ...Platform.select({
                    ios: {
                        paddingTop: isIphoneX()?92:77,
                    },
                    android: {
                        paddingTop: 55
                    },
                }),
            }}>
                <Header>
                    <HeaderLeft>
                        <TouchableOpacity>
                            <Icon onPress={() => this.props.navigation.goBack()} style={styles.headerBackIcon} name='angle-left'/>
                        </TouchableOpacity>
                    </HeaderLeft>
                    <TouchableOpacity style={{
                        paddingHorizontal: 10,
                        justifyContent: 'center',
                        alignSelf: 'center',
                        alignItems: 'center',
                        width: 276,
                        left: (width - 276)/2,
                        height:'100%',
                        position: 'absolute',
                    }} onPress={this.openCalendar}>
                        <Text style={{
                            textAlign: 'center',
                            fontSize: FontSize(18),
                            color: '#FFF',
                        }}>
                            <Text>
                                {getDisplayDate(this.props.date_from)} - {getDisplayDate(this.props.date_to)+'  '}
                            </Text>
                            <Icon style={{fontSize: FontSize(20)}} name='calendar'/>
                        </Text>
                    </TouchableOpacity>
                    <HeaderRight>
                        <TouchableOpacity onPress={this.refresh}>
                            <Icon style={{ fontSize: 22, color: '#FFF'}} name='refresh'/>
                        </TouchableOpacity>
                    </HeaderRight>
                </Header>
                <TabNav />
                <Calendar
                    i18n="en"
                    ref={(calendar) => {this.calendar = calendar;}}
                    customI18n={customI18n}
                    color={color}
                    format="YYYYMMDDhhmmss"
                    minDate={this.props.minDate}
                    maxDate={this.props.maxDate}
                    startDate={this.props.date_from}
                    endDate={this.props.date_to}
                    onConfirm={this.confirmDate}
                />
            </View>
        );
    }
}

function mapStateToProps({params}) {
  return {
      currency_type: params.currency_type,
      sharing_code: params.sharing_code || [],
      date_from: params.date_from,
      date_to: params.date_to,
      minDate: moment(params.profile.created_ts).format('YYYYMMDD000000'),
      maxDate: moment().format('YYYYMMDD235959'),
      nightMode: params.nightMode,
  };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivityTab);
