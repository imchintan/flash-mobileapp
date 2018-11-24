/**
 * Wagering Component
 */

import React from 'react';
import {
    View,
    Platform,
    TouchableOpacity,
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
import { isIphoneX, FontSize } from '@lib/utils';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '@actions';

import Events from './Events';
import MyEvents from './MyEvents';
import Profile from './Profile/index';

const TabNav = createMaterialTopTabNavigator({
    'Events': { screen: Events },
    'My Events': { screen: MyEvents },
    'My Profile': { screen: Profile },
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
            fontSize: FontSize(16),
            fontFamily: 'Microsoft Tai Le',
        },
    },
    showIcon: false,
    tabBarPosition: 'top',
    animationEnabled: true,
    swipeEnabled: true,
});

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
    }

    render() {
        const styles = (this.props.nightMode?require('@styles/nightMode/wagering'):require('@styles/wagering'));
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
                        <TouchableOpacity onPress={() => this.props.screenProps
                            .navigation.goBack()}>
                            <Icon style={styles.headerBackIcon} name='angle-left'/>
                        </TouchableOpacity>
                    </HeaderLeft>
                    <HeaderTitle>Wagering</HeaderTitle>
                </Header>
                <TabNav screenProps={{navigate:this.props.navigation.navigate}}/>
                <Loader style={{
                    ...Platform.select({
                        ios: {
                            top: isIphoneX()?92:77,
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
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Wagering);
