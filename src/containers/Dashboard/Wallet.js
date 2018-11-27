/**
 * Wallet Container
 */

import React, { Component } from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    RefreshControl
} from 'react-native';
import {
    Container,
    Content,
    Header,
    HeaderLeft,
    HeaderRight,
    TransactionTab,
    WalletMenu,
    WalletFooter,
    Icon,
    Loader,
    Text
} from '@components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '@actions';
import moment from 'moment-timezone';
import * as utils from '@lib/utils';
import * as constants from '@src/constants';

class Wallet extends Component<{}> {

    static navigationOptions = {
        header: null,
        gesturesEnabled: true,
    }

    constructor(props) {
        super(props);
        this.state = {
            showMenu: false
        };
    }

    componentDidMount(){
        this.props.getBalanceV2(this.props.currency_type);
        this.props.getFiatCurrencyRate();
    }

    render() {
        const styles = (this.props.nightMode?require('@styles/nightMode/wallet'):require('@styles/wallet'));
        return (
            <Container>
                <Header>
                    <HeaderLeft>
                        <TouchableOpacity>
                            <Icon onPress={()=>this.props.navigation.goBack()}
                                style={styles.headerBackIcon} name='angle-left' />
                        </TouchableOpacity>
                    </HeaderLeft>
                    <View style={styles.walletHeader}>
                        <View style={styles.walletHeaderTitle}>
                            <Image style={styles.walletIcon} source={utils.getCurrencyIcon(this.props.currency_type)} />
                            <Text style={styles.walletLabel}>{utils.getCurrencyName(this.props.currency_type)}</Text>
                        </View>
                        <Text style={styles.walletConversionRate}>{
                            utils.getCurrencySymbol(this.props.fiat_currency) + ' ' +
                            utils.flashNFormatter(this.props.fiat_per_value,2) + ' per ' +
                            utils.getCurrencyUnitUpcase(this.props.currency_type)}
                        </Text>
                    </View>
                    <HeaderRight>
                        <TouchableOpacity>
                            <Icon style={[styles.headerFAIcon,{paddingLeft:25}]}
                                onPress={()=>this.setState({showMenu: !this.state.showMenu})}
                                name='ellipsis-v' />
                        </TouchableOpacity>
                        {this.props.totalPending>0 && !this.state.showMenu?<View style={styles.badge}>
                            <Text style={styles.badgeText}>{this.props.totalPending}</Text>
                        </View>:null}
                    </HeaderRight>
                </Header>
                <Content style={styles.content}
                    hasFooter={true}
                    refreshControl={
                        <RefreshControl
                            colors={['#191714']}
                            tintColor='#191714'
                            refreshing={false}
                            onRefresh={this.props.refreshingHome}/>
                    }>
                    <View style={styles.walletBalanceTab}>
                        <Text style={styles.walletBalanceLabel}>Balance</Text>
                        <TouchableOpacity style={styles.walletBalanceDetail}>
                            <Text style={styles.walletBalance}>{
                                utils.getCurrencyUnitUpcase(this.props.currency_type) + ' ' +
                                utils.flashNFormatter((this.props.currency_type == constants.CURRENCY_TYPE.FLASH?
                                    utils.satoshiToFlash(this.props.balance).toFixed(10):this.props.balance),2)}
                            </Text>
                            <Icon style={styles.exchangeIcon} name='exchange' />
                            <Text style={styles.walletBalanceInFiatCurrency}>{
                                utils.getCurrencySymbol(this.props.fiat_currency) + ' ' +
                                utils.flashNFormatter(this.props.fiat_balance,2)}
                            </Text>
                        </TouchableOpacity>
                        {this.props.currency_type == constants.CURRENCY_TYPE.FLASH &&
                        <View style={{alignItems:'flex-end'}}>
                            <Text style={[styles.walletBalanceLabel,{marginVertical:3}]}>Staked Balance</Text>
                            <Text style={styles.walletBalance}>{
                                utils.getCurrencyUnitUpcase(this.props.currency_type) + ' ' +
                                utils.flashNFormatter((this.props.currency_type == constants.CURRENCY_TYPE.FLASH?
                                    utils.satoshiToFlash(this.props.sbalance).toFixed(10):this.props.sbalance),2)}
                            </Text>
                        </View>}
                    </View>
                    <View style={{paddingHorizontal: 20}}>
                        <Text style={styles.label}>Recent Transactions</Text>
                        <View style={styles.hr}/>
                        {
                            this.props.txns.map((txn,index)=>
                                <TransactionTab txn={txn}
                                    nightMode={this.props.nightMode}
                                    currency_type={this.props.currency_type}
                                    timezone={this.props.profile.timezone || moment.tz.guess()}
                                    txnLoader={this.props.txnLoader}
                                    txnDetail={this.props.txnDetail}
                                    onPress={()=>this.props.getTransactionDetail(txn.transaction_id)}
                                    key={'_txn_'+txn.transaction_id+'_'+index} />
                            )
                        }
                        {this.props.txns.length == 0 && !this.props.refreshingHomeLoader?<Text style={styles.txnListEmpty}>
                            There are no recent transactions.
                        </Text>:null}
                        {this.props.txns.length == 0 && this.props.refreshingHomeLoader?<Text style={styles.txnListEmpty}>
                            loading transactions....please wait
                        </Text>:null}
                    </View>
                </Content>
                <WalletMenu onPress={()=>this.setState({showMenu:false})}
                    visible={this.state.showMenu}
                    badgePending={this.props.totalPending}
                    currency_type={this.props.currency_type}
                    navigation={this.props.navigation} />
                <WalletFooter
                    nightMode={this.props.nightMode}
                    navigation={this.props.navigation} />
                <Loader show={this.props.loading} />
            </Container>
        );
    }
}

function mapStateToProps({params}) {
    return {
        isLoggedIn: params.isLoggedIn,
        profile: params.profile,
        loading: params.balanceLoader ||  params.loading,
        refreshingHomeLoader: params.refreshingHome ||  false,
        errorMsg: params.errorMsg || null,
        successMsg: params.successMsg || null,
        balance: params.balance || 0,
        sbalance: params.sbalance || 0,
        txns: params.recentTxns || [],
        txnDetail: params.txnDetail || {},
        txnLoader: params.txnLoader || false,
        currency_type: params.currency_type,
        fiat_currency: params.fiat_currency,
        fiat_balance: params.fiat_balance,
        fiat_per_value: params.fiat_per_value,
        totalPending: params.totalPending,
        nightMode: params.nightMode,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
