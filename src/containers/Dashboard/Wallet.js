/**
 * Home Container
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
    Text
} from '@components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '@actions';
import moment from 'moment-timezone';
import * as utils from '@lib/utils';
import * as constants from '@src/constants';

const styles = require("@styles/wallet");

class Wallet extends Component<{}> {

    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);
        this.state = {
            showMenu: false
        };
    }

    componentDidMount(){
        this.props.getBalanceV2(this.props.currency_type);
        this.props.getCoinMarketCapDetail();
    }

    render() {
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
                            <Icon style={[styles.headerFAIcon,{paddingLeft:15}]}
                                onPress={()=>this.setState({showMenu: !this.state.showMenu})}
                                name='ellipsis-v' />
                        </TouchableOpacity>
                        {this.props.totalPending>0 && !this.state.showMenu?<View style={styles.badge}>
                            <Text style={styles.badgeText}>{this.props.totalPending}</Text>
                        </View>:null}
                    </HeaderRight>
                </Header>
                <Content
                    hasFooter={true}
                    refreshControl={
                        <RefreshControl
                            colors={['#191714']}
                            tintColor='#191714'
                            refreshing={this.props.loading}
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
                    </View>
                    <View style={{paddingHorizontal: 20}}>
                        <Text style={styles.label}>Recent Transactions</Text>
                        <View style={styles.hr}/>
                        {
                            this.props.txns.map((txn,index)=>
                                <TransactionTab txn={txn}
                                    currency_type={this.props.currency_type}
                                    timezone={this.props.profile.timezone || moment.tz.guess()}
                                    txnLoader={this.props.txnLoader}
                                    txnDetail={this.props.txnDetail}
                                    onPress={()=>this.props.getTransactionDetail(txn.transaction_id)}
                                    key={'_txn_'+txn.transaction_id+'_'+index} />
                            )
                        }
                        {this.props.txns.length == 0?<Text style={styles.txnListEmpty}>
                            There is no recent transactions.
                        </Text>:null}
                    </View>
                </Content>
                <WalletMenu onPress={()=>this.setState({showMenu:false})}
                    visible={this.state.showMenu}
                    badgePending={this.props.totalPending}
                    navigation={this.props.navigation} />
                <WalletFooter navigation={this.props.navigation} />
            </Container>
        );
    }
}

function mapStateToProps({params}) {
    return {
        isLoggedIn: params.isLoggedIn,
        profile: params.profile,
        loading: params.balanceLoader ||  params.loading,
        errorMsg: params.errorMsg || null,
        successMsg: params.successMsg || null,
        balance: params.balance,
        txns: params.recentTxns || [],
        txnDetail: params.txnDetail || {},
        txnLoader: params.txnLoader || false,
        currency_type: params.currency_type,
        fiat_currency: params.fiat_currency,
        fiat_balance: params.fiat_balance,
        fiat_per_value: params.fiat_per_value,
        totalPending: params.totalPending
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
