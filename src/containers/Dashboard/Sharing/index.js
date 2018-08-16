/**
 * Sharing Tab Navigation Component
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
    HeaderTitle,
    HeaderLeft,
    Icon,
    Text
} from '@components';
import * as utils from '@lib/utils';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '@actions';

import SharingCode from './SharingCode';
import PayoutCode from './PayoutCode';

const { width } = Dimensions.get('window');

const TabNav = createMaterialTopTabNavigator({
    ShareCode: { screen: SharingCode },
    PayoutCode: { screen: PayoutCode },
},{
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
            fontSize: 16,
            fontFamily: 'Microsoft Tai Le',
        },
    },
    showIcon: false,
    tabBarPosition: 'top',
    animationEnabled: true,
    swipeEnabled: true,
});

class SharingTab extends React.Component {

    static navigationOptions = {
        gesturesEnabled: true,
    }

    constructor(props) {
        super(props);
        this.state ={}
    }

    render() {
        const styles = (this.props.nightMode?require('@styles/nightMode/app'):require('@styles/app'));
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
                        <TouchableOpacity>
                            <Icon onPress={() => this.props.navigation.goBack()} style={styles.headerBackIcon} name='angle-left'/>
                        </TouchableOpacity>
                    </HeaderLeft>
                    <HeaderTitle>{utils.getCurrencyUnit(this.props.currency_type)} Share</HeaderTitle>
                </Header>
                <TabNav />
            </View>
        );
    }
}

function mapStateToProps({params}) {
  return {
      nightMode: params.nightMode,
      currency_type: params.currency_type
  };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SharingTab);
