/**
 * HTM Advertisement Component
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
    HeaderRight,
    HeaderTitle,
    HeaderLeft,
    Icon,
} from '@components';
import { isIphoneX, FontSize } from '@lib/utils';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '@actions';
import * as am from './AdsModal';

import Ads from './Ads';
import MyAds from './MyAds';

const TabNav = createMaterialTopTabNavigator({
    'Trade Ads': { screen: Ads },
    'My Ads': { screen: MyAds },
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

class AdsTab extends React.Component {

    static navigationOptions = {
        gesturesEnabled: true,
    }

    constructor(props) {
        super(props);
        this.state ={
            filter: this.props.htmAdsFilter,
            isFocuse: false,
        }
    }

    componentDidMount(){
        this._willFocus =this.props.navigation.addListener('willFocus',
            ()=>this.setState({isFocused:true}));
        this._willBlur =this.props.navigation.addListener('willBlur',
            ()=>this.setState({isFocused:false}));
    }

    componentWillUnmount(){
        this._willFocus.remove();
        this._willBlur.remove();
    }

    getPricePer=(buy, sell)=>{
        let buy_currency = this.props.balances.filter(bal=>bal.currency_type == buy)[0];
        let sell_currency = this.props.balances.filter(bal=>bal.currency_type == sell)[0];
        let price_per = Number((buy_currency.per_btc / sell_currency.per_btc).toFixed(8));
        return price_per;
    }

    legalDisclaimer(){
        if(this.state.do_not_show){
            AsyncStorage.setItem('onlineTradeDisclaimer','true');
        }
        this.props.customAction({
            onlineTradeDisclaimer: true
        });
    }

    render() {
        const styles = (this.props.nightMode?require('@styles/nightMode/htm'):require('@styles/htm'));
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
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Icon style={styles.headerBackIcon} name='angle-left'/>
                        </TouchableOpacity>
                    </HeaderLeft>
                    <HeaderTitle>Online Trades</HeaderTitle>
                    <HeaderRight>
                        <TouchableOpacity
                            onPress={()=>this.setState({showFilter:!this.state.showFilter,
                                htm:null})}>
                            <Icon style={[styles.headerFAIcon,{
                                    fontSize:28,
                                    color: this.state.filter && this.state.filter.apply?'#E0AE27':'#FFFFFF'
                                }]}
                                name='filter'/>
                        </TouchableOpacity>
                    </HeaderRight>
                </Header>
                <TabNav screenProps={{
                    navigate:this.props.navigation.navigate,
                    getPricePer: this.getPricePer,
                    isFocused: this.state.isFocused
                }}/>
                {am.legalDisclaimer(this,styles)}
                {am.adsFilter(this,styles)}                
            </View>
        );
    }
}

function mapStateToProps({params}) {
  return {
      nightMode: params.nightMode,
      balances: params.balances,
      htmAdsFilter: params.htmAdsFilter || { sort_by: 'ratings'},
      onlineTradeDisclaimer: params.onlineTradeDisclaimer || false,
  };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AdsTab);
