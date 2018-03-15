/**
 * Activity Tab Navigation Component
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
import moment from 'moment-timezone';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '@actions';

import IncomingRequests from './IncomingRequests';
import OutgoingRequests from './OutgoingRequests';

const TabNav = TabNavigator({
    Incoming: { screen: IncomingRequests },
    Outgoing: { screen: OutgoingRequests },
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

class PendingTab extends React.Component {
    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);
        this.state ={
            showTab: false // Android issue: Component not load
        }
        this.confirmDate = this.confirmDate.bind(this);
        this.openCalendar = this.openCalendar.bind(this);
    }

    componentDidMount(){
        setTimeout(()=>this.setState({showTab:true}),500);
    }

    confirmDate({startDate, endDate, startMoment, endMoment}) {
        this.props.updateRequestReportDate(startMoment,endMoment)
    }

    openCalendar() {
        this.calendar && this.calendar.open();
    }

    refresh = () => this.props.updateRequestReportDate(this.props.date_from,this.props.date_to)

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
                            color: '#FFF',
                    }}>
                        <Text onPress={this.openCalendar} style={{fontWeight: '600'}}>
                        {moment(this.props.date_from).format('MMM DD, YYYY')} - {moment(this.props.date_to).format('MMM DD, YYYY')}  </Text>
                        <Icon onPress={this.openCalendar} style={{fontSize: 20}} name='calendar'/>
                    </Text>
                    <HeaderRight>
                         <Icon
                            onPress={this.refresh}
                             style={{
                                 fontSize: 20,
                                 color: '#FFF'
                             }}
                            name='refresh'
                        />
                    </HeaderRight>
                </Header>
                {this.state.showTab?<TabNav />:<View />}
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
      date_from: params.pending_date_from,
      date_to: params.pending_date_to,
      minDate: moment(params.profile.created_ts).format('YYYYMM01000000'),
      maxDate: moment().format('YYYYMMDD235959')
  };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PendingTab);
