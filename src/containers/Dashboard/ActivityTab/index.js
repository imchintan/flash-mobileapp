/**
 * Main Dashboard Tab Navigation Component
 */

import React from 'react';
import {
    View,
    Text,
    Platform
} from 'react-native';
import {
    TabNavigator,
    TabBarTop,
    NavigationActions
} from 'react-navigation';
import {
    Header,
    HeaderRight,
    Icon,
    Calendar
} from '@components';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '@actions';
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
            backgroundColor: '#14A6EE',
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

class ActivityTab extends React.Component {
    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);
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

    render() {
        let customI18n = {
           'text': {
             'save': 'Confirm',
           },
           'date': 'MMM DD, YYYY'  // date format
         };
        let color = {
            mainColor: '#00AFFD',
            subColor: '#f0f0f0'
        };
        return (
            <View style={{
                flex: 1,
                ...Platform.select({
                    ios: {
                        paddingTop: 77,
                    },
                    android: {
                        paddingTop: 55
                    },
                }),
            }}>
               <Header>
                    <Text style={{
                        alignSelf: 'center',
                        width: '100%',
                        textAlign: 'center',
                        fontSize: 16,
                        fontWeight: '600',
                        color: '#FFF',
                    }}>
                        {moment(this.props.date_from).format('MMM DD, YYYY')} - {moment(this.props.date_to).format('MMM DD, YYYY')}  <Icon onPress={this.openCalendar} name='calendar'/>
                    </Text>
                    <HeaderRight>
                         <Icon
                             onPress={this.refresh}
                             style={{
                                 fontSize: 20,
                                 fontWeight: '600',
                                 color: '#FFF'
                             }}
                            name='refresh'
                        />
                    </HeaderRight>
               </Header>
               <TabNav screenProps={{
                   date_from:this.props.date_from,
                   date_to:this.props.date_to
               }} />
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
      date_from: params.date_from,
      date_to: params.date_to,
      minDate: moment(params.profile.created_ts).format('YYYYMM01000000'),
      maxDate: moment().format('YYYYMMDD235959')
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivityTab);
