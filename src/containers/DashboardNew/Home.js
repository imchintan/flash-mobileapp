/**
 * Home Container
 */

import React, { Component } from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    RefreshControl,
    Dimensions,
    Platform,
    StyleSheet
} from 'react-native';
import {
    Container,
    Content,
    Header,
    HeaderLeft,
    HeaderRight,
    Icon,
    Loader,
    Text,
    Toast,
} from '@components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '@actions';
import * as utils from '@lib/utils';
import * as constants from '@src/constants';
const { height, width } = Dimensions.get('window');
// const styles = require("@styles/home");

class Home extends Component<{}> {

    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount(){
        // this.refreshingHome();
        this.props.getBalanceV2(constants.CURRENCY_TYPE.FLASH);
        this.props.getBalanceV2(constants.CURRENCY_TYPE.BTC);
        this.props.getBalanceV2(constants.CURRENCY_TYPE.LTC);
        this.props.getBalanceV2(constants.CURRENCY_TYPE.DASH);

        if(!this.coinmarketcapValue)
            this.coinmarketcapValue = setInterval(this.props.getCoinMarketCapDetail, 60000);

        if(!this.getMessages)
            this.getMessages = setInterval(this.props.getMessages, 10000);
    }
    refreshingHome(){
        this.props.getCoinMarketCapDetail();
        // this.props.getBalanceV2(constants.CURRENCY_TYPE.FLASH);
        // this.props.getBalanceV2(constants.CURRENCY_TYPE.BTC);
        // this.props.getBalanceV2(constants.CURRENCY_TYPE.LTC);
        // this.props.getBalanceV2(constants.CURRENCY_TYPE.DASH);
    }

    render() {
        return (
            <Container>
                <Header>
                    <HeaderLeft>
                        <Image style={styles.headerTextLogo} source={require('@images/app-text-icon-white.png')} />
                    </HeaderLeft>
                    <HeaderRight>
                        <View style={styles.headerBalanceBox}>
                            <Text style={styles.headerBalanceLabel}>total assets</Text>
                            <Text style={styles.headerBalance}>{
                                utils.getCurrencySymbol(this.props.fiat_currency) + ' ' +
                                utils.flashNFormatter(this.props.total_fiat_balance)}
                            </Text>
                        </View>
                    </HeaderRight>
                </Header>
                <Content contentContainerStyle={{paddingHorizontal: 20, alignItems: 'center'}}
                    refreshControl={
                        <RefreshControl
                            colors={['#191714']}
                            tintColor='#191714'
                            refreshing={this.props.loading}
                            onRefresh={this.refreshingHome.bind(this)}/>
                    }>
                    <Text style={styles.label}>Wallets</Text>
                    <View style={styles.hr}/>
                    { this.props.balances.map(balance =>
                        <TouchableOpacity key={'_wallet_'+balance.currency_type+'_'+balance.amt}
                            style={[styles.walletTab,{backgroundColor: balance.color}]}>
                            <Image style={styles.walletIcon} source={utils.getCurrencyIcon(balance.currency_type)} />
                            <View style={styles.walletTabDetail}>
                                <View style={styles.walletDetail}>
                                    <Text style={styles.currencyLabel}>
                                        {utils.getCurrencyName(balance.currency_type)}
                                    </Text>
                                    <Text style={styles.walletConversionRate}>{
                                        utils.getCurrencySymbol(this.props.fiat_currency) + ' ' +
                                        utils.flashNFormatter(balance.per_value,2) + ' per ' +
                                        utils.getCurrencyUnitUpcase(balance.currency_type)}
                                    </Text>
                                </View>
                                <View style={styles.walletBalanceDetail}>
                                    <Text style={styles.walletBalanceInFiatCurrency}>{
                                        utils.getCurrencySymbol(this.props.fiat_currency) + ' ' +
                                        utils.flashNFormatter(balance.amt2,2)}
                                    </Text>
                                    <Text style={styles.walletBalance}>{
                                        utils.getCurrencyUnitUpcase(balance.currency_type) + ' ' +
                                        utils.flashNFormatter((balance.currency_type == constants.CURRENCY_TYPE.FLASH?
                                            utils.satoshiToFlash(balance.amt).toFixed(10):balance.amt),2)}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                    {/*
                    <TouchableOpacity style={styles.walletTab}>
                        <Image style={styles.walletIcon} source={utils.getCurrencyIcon(constants.CURRENCY_TYPE.FLASH)} />
                        <View style={styles.walletTabDetail}>
                            <View style={styles.walletDetail}>
                                <Text style={styles.currencyLabel}>
                                    {constants.CURRENCY_TYPE_NAME.FLASH}
                                </Text>
                                <Text style={styles.walletConversionRate}>{
                                    utils.getCurrencySymbol(this.props.fiat_currency) + ' ' +
                                    utils.flashNFormatter(0.0224,2) + ' per ' +
                                    utils.getCurrencyUnitUpcase(constants.CURRENCY_TYPE.FLASH)}
                                </Text>
                            </View>
                            <View style={styles.walletBalanceDetail}>
                                <Text style={styles.walletBalanceInFiatCurrency}>{
                                    utils.getCurrencySymbol(this.props.fiat_currency) + ' ' +
                                    utils.flashNFormatter(1758.12,2)}
                                </Text>
                                <Text style={styles.walletBalance}>{
                                    utils.getCurrencyUnitUpcase(constants.CURRENCY_TYPE.FLASH) + ' ' +
                                    utils.flashNFormatter(78741.12040005,2)}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.walletTab,{backgroundColor: '#343434'}]}>
                        <Image style={styles.walletIcon} source={utils.getCurrencyIcon(constants.CURRENCY_TYPE.BTC)} />
                        <View style={styles.walletTabDetail}>
                            <View style={styles.walletDetail}>
                                <Text style={styles.currencyLabel}>
                                    {constants.CURRENCY_TYPE_NAME.BTC}
                                </Text>
                                <Text style={styles.walletConversionRate}>{
                                    utils.getCurrencySymbol(this.props.fiat_currency) + ' ' +
                                    utils.flashNFormatter(9022.41,2) + ' per ' +
                                    utils.getCurrencyUnitUpcase(constants.CURRENCY_TYPE.BTC)}
                                </Text>
                            </View>
                            <View style={styles.walletBalanceDetail}>
                                <Text style={styles.walletBalanceInFiatCurrency}>{
                                    utils.getCurrencySymbol(this.props.fiat_currency) + ' ' +
                                    utils.flashNFormatter(19858.42,2)}
                                </Text>
                                <Text style={styles.walletBalance}>{
                                    utils.getCurrencyUnitUpcase(constants.CURRENCY_TYPE.BTC) + ' ' +
                                    utils.flashNFormatter(2.20105947,2)}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.walletTab,{backgroundColor: '#565656'}]}>
                        <Image style={styles.walletIcon} source={utils.getCurrencyIcon(constants.CURRENCY_TYPE.LTC)} />
                        <View style={styles.walletTabDetail}>
                            <View style={styles.walletDetail}>
                                <Text style={styles.currencyLabel}>
                                    {constants.CURRENCY_TYPE_NAME.LTC}
                                </Text>
                                <Text style={styles.walletConversionRate}>{
                                    utils.getCurrencySymbol(this.props.fiat_currency) + ' ' +
                                    utils.flashNFormatter(9022.41,2) + ' per ' +
                                    utils.getCurrencyUnitUpcase(constants.CURRENCY_TYPE.LTC)}
                                </Text>
                            </View>
                            <View style={styles.walletBalanceDetail}>
                                <Text style={styles.walletBalanceInFiatCurrency}>{
                                    utils.getCurrencySymbol(this.props.fiat_currency) + ' ' +
                                    utils.flashNFormatter(10141.58,2)}
                                </Text>
                                <Text style={styles.walletBalance}>{
                                    utils.getCurrencyUnitUpcase(constants.CURRENCY_TYPE.LTC) + ' ' +
                                    utils.flashNFormatter(69.18330036,2)}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.walletTab,{backgroundColor: '#898989'}]}>
                        <Image style={styles.walletIcon} source={utils.getCurrencyIcon(constants.CURRENCY_TYPE.DASH)} />
                        <View style={styles.walletTabDetail}>
                            <View style={styles.walletDetail}>
                                <Text style={styles.currencyLabel}>
                                    {constants.CURRENCY_TYPE_NAME.DASH}
                                </Text>
                                <Text style={styles.walletConversionRate}>{
                                    utils.getCurrencySymbol(this.props.fiat_currency) + ' ' +
                                    utils.flashNFormatter(452.41,2) + ' per ' +
                                    utils.getCurrencyUnitUpcase(constants.CURRENCY_TYPE.DASH)}
                                </Text>
                            </View>
                            <View style={styles.walletBalanceDetail}>
                                <Text style={styles.walletBalanceInFiatCurrency}>{
                                    utils.getCurrencySymbol(this.props.fiat_currency) + ' ' +
                                    utils.flashNFormatter(76050.1485,2)}
                                </Text>
                                <Text style={styles.walletBalance}>{
                                    utils.getCurrencyUnitUpcase(constants.CURRENCY_TYPE.DASH) + ' ' +
                                    utils.flashNFormatter(169.08036,2)}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    */}
                    <Text style={styles.label}>Admin</Text>
                    <View style={styles.hr}/>
                    <TouchableOpacity style={styles.adminTab}>
                        <View style={styles.adminTabTitle}>
                            <Icon style={styles.adminTabTitleIcon} name='user'/>
                            <Text style={styles.adminTabTitleLabel}>My Profile</Text>
                        </View>
                        <Icon style={styles.adminTabRightIcon} name='angle-right'/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.adminTab}>
                        <View style={styles.adminTabTitle}>
                            <Icon style={styles.adminTabTitleIcon} name='cog'/>
                            <Text style={styles.adminTabTitleLabel}>Settings</Text>
                        </View>
                        <Icon style={styles.adminTabRightIcon} name='angle-right'/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.adminTab}>
                        <View style={styles.adminTabTitle}>
                            <Icon style={styles.adminTabTitleIcon} name='shield'/>
                            <Text style={styles.adminTabTitleLabel}>Security Questions</Text>
                        </View>
                        <Icon style={styles.adminTabRightIcon} name='angle-right'/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.adminTab}>
                        <View style={styles.adminTabTitle}>
                            <Icon style={styles.adminTabTitleIcon} name='shield'/>
                            <Text style={styles.adminTabTitleLabel}>Security Questions</Text>
                        </View>
                        <Icon style={styles.adminTabRightIcon} name='angle-right'/>
                    </TouchableOpacity>
                </Content>
            </Container>
        );
    }
}

function mapStateToProps({params}) {
    return {
        isLoggedIn: params.isLoggedIn,
        profile: params.profile,
        loading: params.balanceLoader || false,
        errorMsg: params.errorMsg || null,
        successMsg: params.successMsg || null,
        balances: params.balances,
        fiat_currency: params.fiat_currency,
        total_fiat_balance: params.total_fiat_balance,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
    headerTextLogo:{
        resizeMode: 'contain',
        height: 40,
        width: 273*40/100,
        ...Platform.select({
            ios: {
                marginTop: 7,
            },
            android: {
            },
        }),
    },
    headerBalanceBox:{
        width: width/2,
        alignItems: 'flex-end',
    },
    headerBalance:{
        color: '#EDEDED',
        fontSize: 25,
        fontWeight: '500',
        marginTop: -7
    },
    headerBalanceLabel:{
        color: '#BDBDBD',
        fontSize: 16,
    },
    label:{
        fontSize: 18,
        color: '#4A4A4A',
        marginTop: 15,
    },
    hr:{
        width: '100%',
        borderBottomWidth: 1,
        borderColor: '#9F9F9F',
        marginBottom: 15,
    },
    walletTab:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        width: '100%',
        height: 65,
        borderRadius: 5,
        backgroundColor: '#111111',
        marginBottom: 10,
    },
    walletIcon:{
        width: 50,
        height: 50,
    },
    walletTabDetail:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: width - 120,
    },
    walletDetail:{
    },
    currencyLabel:{
        color:'#FFFFFF',
        fontFamily: 'futura-medium',
        fontSize: 20,
    },
    walletConversionRate:{
        color:'rgba(255,255,255,0.8)',
        fontSize: 14,
    },
    walletBalanceDetail:{
        alignItems: 'flex-end',
    },
    walletBalanceInFiatCurrency:{
        color:'#FFFFFF',
        fontWeight: '500',
        fontSize: 18,
    },
    walletBalance:{
        color:'#FFFFFF',
        fontSize: 14,
    },
    adminTab:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        width: '100%',
        height: 45,
        borderRadius: 5,
        backgroundColor: '#EBEBEB',
        marginBottom: 10,
    },
    adminTabTitle:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    adminTabTitleIcon:{
        fontSize: 24,
        color: '#9B9B9B',
        marginRight: 8,
    },
    adminTabTitleLabel:{
        fontSize: 16,
        color: '#989898',
    },
    adminTabRightIcon:{
        fontSize: 40,
        color: 'rgba(155,155,155,0.54)',
    },
})
