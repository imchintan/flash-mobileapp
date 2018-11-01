/**
 * HTM Advertisement Component
 */

import React from 'react';
import {
    View,
    Platform,
    TouchableOpacity,
    ScrollView,
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
    Text,
    Button,
    Modal
} from '@components';
import { isIphoneX, FontSize } from '@lib/utils';
import * as constants from '@src/constants'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '@actions';

import HTMAds from './Ads';
import HTMMyAds from './MyAds';

const TabNav = createMaterialTopTabNavigator({
    'Trade Ads': { screen: HTMAds },
    'My Ads': { screen: HTMMyAds },
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

class HTMAdTab extends React.Component {

    static navigationOptions = {
        gesturesEnabled: true,
    }

    constructor(props) {
        super(props);
        this.state ={
            filter: this.props.htmAdsFilter
        }
    }

    getPricePer=(buy, sell)=>{
        let buy_currency = this.props.balances.filter(bal=>bal.currency_type == buy)[0];
        let sell_currency = this.props.balances.filter(bal=>bal.currency_type == sell)[0];
        return (buy_currency.per_value / sell_currency.per_value );
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
                    <HeaderTitle>HTM Ads</HeaderTitle>
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
                <TabNav screenProps={{navigate:this.props.navigation.navigate, getPricePer: this.getPricePer}}/>
                <Modal transparent={false} animationType="slide"
                    onRequestClose={() => this.setState({showFilter:false})}
                    visible={!!this.state.showFilter}>
                    <TouchableOpacity style={styles.htmAdFilterBtn}
                        onPress={()=>this.setState({showFilter:false})}>
                        <Text style={styles.htmAdFilterBtnText}>x</Text>
                    </TouchableOpacity>
                    <Text style={styles.htmAdFilterTitle}>Filter By</Text>
                    <View style={{ marginHorizontal: 50 }}>
                        <Text style={[styles.label,styles.htmAdFilterLabel]}>Want to Buy</Text>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={()=>this.setState({selectCurrency:true, selectCurrencyFor:0})}
                            style={styles.htmProfileInputBox}>
                            <Text style={styles.htmProfileInput}>
                                {this.state.filter && this.state.filter.buy?
                                    this.state.filter.buy.currency_name:'Select Currency'}
                            </Text>
                            <Icon style={{
                                position: 'absolute',
                                right: 15,
                                fontSize: 30,
                                color: '#787878',
                            }} name={'angle-down'} />
                        </TouchableOpacity>
                        <Text style={[styles.label,styles.htmAdFilterLabel]}>Want to Sell</Text>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={()=>this.setState({selectCurrency:true, selectCurrencyFor:1})}
                            style={styles.htmProfileInputBox}>
                            <Text style={styles.htmProfileInput}>
                            {this.state.filter && this.state.filter.sell?
                                this.state.filter.sell.currency_name:'Select Currency'}
                            </Text>
                            <Icon style={{
                                position: 'absolute',
                                right: 15,
                                fontSize: 30,
                                color: '#787878',
                            }} name={'angle-down'} />
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.htmFilterRow, {
                        flexDirection: 'row',
                        alignSelf: 'center',
                        justifyContent: 'space-between',
                        width: 180,
                        marginTop: 30,
                    }]}>
                        <Button value={'Reset'}
                            onPress={()=>this.setState({showFilter:false,filter:{apply:false}},
                                ()=>this.props.findHTMAdsFilterApply(this.state.filter))}
                            style={styles.htmFilterBtn}
                            textstyle={styles.htmFilterBtnText}/>
                        <Button value={'Apply'}
                            style={[styles.htmFilterBtn,{
                                backgroundColor: '#E0AE27',
                            }]}
                            onPress={()=>{
                                let filter = this.state.filter || {};
                                filter.apply = true;
                                this.setState({showFilter:false,filter},
                                ()=>this.props.findHTMAdsFilterApply(this.state.filter))
                            }}
                            textstyle={styles.htmFilterBtnText}/>
                    </View>
                </Modal>
                <Modal
                    transparent={true}
                    animationType="slide"
                    visible={!!this.state.selectCurrency}
                    onRequestClose={()=>this.setState({selectCurrency:false})}>
                    <View style={styles.overlayStyle}>
                        <View style={[styles.optionContainer,{height:null, maxHeight:'80%'}]}>
                            <ScrollView keyboardShouldPersistTaps="always">
                                <View style={{ paddingHorizontal: 10 }}>
                                    {Object.keys(constants.CURRENCY_TYPE).map((currency,index) =>{
                                        let selected = false;
                                        let selectedCur = false;
                                        if(this.state.filter
                                            && this.state.filter.sell
                                            && this.state.filter.sell
                                            .currency_type == constants.CURRENCY_TYPE[currency]){
                                            if(this.state.selectCurrencyFor == 1)
                                                selectedCur = true;

                                        }
                                        if(this.state.filter
                                            && this.state.filter.buy
                                            && this.state.filter.buy
                                            .currency_type == constants.CURRENCY_TYPE[currency]){
                                            if(this.state.selectCurrencyFor == 1)
                                                selected = true;
                                            else
                                                selectedCur = true;
                                        }
                                        return(<TouchableOpacity activeOpacity={selected?1:0.5}
                                            key={'_cur_'+currency+'_'+index}
                                            onPress={()=>{
                                                if(selected)
                                                    return ;
                                                let state = { selectCurrency:false };
                                                state.filter = this.state.filter || {};
                                                if(this.state.selectCurrencyFor == 0){
                                                    state.filter.buy = {
                                                        currency_type: constants.CURRENCY_TYPE[currency],
                                                        currency_name: `${constants.CURRENCY_TYPE_NAME[currency]} (${currency})`
                                                    }
                                                    if(this.state.filter && this.state.filter.sell &&
                                                        state.filter.buy.currency_type == this.state.filter.sell.currency_type)
                                                        state.filter.sell = null;
                                                } else {
                                                    state.filter.sell = {
                                                        currency_type: constants.CURRENCY_TYPE[currency],
                                                        currency_name: `${constants.CURRENCY_TYPE_NAME[currency]} (${currency})`
                                                    }
                                                }
                                                this.setState(state);
                                            }}
                                            style={styles.optionStyle}>
                                            <Text style={[styles.optionTextStyle, selected && {
                                                color: '#999'
                                            }, selectedCur && {
                                                fontWeight: 'bold'
                                            }]}>
                                                {`${constants.CURRENCY_TYPE_NAME[currency]} (${currency})`}
                                            </Text>
                                        </TouchableOpacity>
                                    )})}
                                </View>
                            </ScrollView>
                        </View>
                        <View style={styles.cancelContainer}>
                            <TouchableOpacity onPress={()=>this.setState({selectCurrency:false})}>
                                <View style={styles.cancelStyle}>
                                    <Text style={styles.canceTextStyle}>
                                        Cancel
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}

function mapStateToProps({params}) {
  return {
      nightMode: params.nightMode,
      balances: params.balances,
      htmAdsFilter: params.htmAdsFilter || {},
  };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HTMAdTab);
