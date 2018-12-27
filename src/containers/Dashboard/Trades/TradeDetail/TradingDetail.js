/**
 * Trading Detail Container
 */

 import React, {Component} from 'react';
 import {
     View,
     TouchableOpacity,
     Modal
 } from 'react-native';
 import {
     Icon,
     Text
 } from '@components';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ActionCreators} from '@actions';

import * as constants from '@src/constants';
import * as utils from '@lib/utils';

class TradingDetail extends Component < {} > {

    static navigationOptions = {
        header: null,
        gesturesEnabled: true,
    }

    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        const styles = (this.props.nightMode?require('@styles/nightMode/htm'):require('@styles/htm'));
        const exchangeRates = this.props.exchange_rates || this.props.balances;
        return(
            <View style={{flex:1}}>
                {this.props.htm.currencies_traded.length>0?
                <View style={[styles.htmProfileContent,{marginBottom: -10}]}>
                    <Text style={styles.label}>Currencies Traded</Text>
                    <View style={[styles.hr,{marginBottom:15}]}/>
                    {this.props.htm.currencies_traded.map((_trade,idx) =>
                        <View key={'_trade_'+idx}  style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}>
                            <Text style={styles.htmProfileLabel}>
                                {utils.getCurrencyName(_trade.currency)}
                            </Text>
                            <Text style={styles.htmBuySellText}>
                                {_trade.amount+' '}
                                {utils.getCurrencyUnitUpcase(_trade.currency)}
                            </Text>
                        </View>
                    )}
                </View>:null}
                <View style={[styles.htmProfileContent,{marginBottom: -10}]}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}>
                        <Text style={styles.label}>Trading In</Text>
                        <TouchableOpacity style={styles.htmExchangesTab}
                            onPress={()=>this.setState({selectExchange:true})}>
                            <Text style={[styles.label,styles.htmExchangesTabTitle]}>
                                {this.props.exchange.NAME}
                            </Text>
                            <Icon style={styles.htmExchangesTabIcon}
                                name='angle-down' />
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.hr,{marginBottom:15}]}/>
                    {this.props.htm.currencies.map(currency =>{
                        let balIndex = exchangeRates.findIndex(bal=>
                            bal.currency_type == currency.currency_type);
                        let balance = exchangeRates[balIndex];
                        return (<View
                                style={styles.htmDetailBuySell}
                                key={'_currency_'+currency.currency_type}>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                            }}>
                                <View style={styles.htmCurrency}>
                                    <Icon style={styles.htmCurrencyCheckIcon}
                                        name='check-square-o'/>
                                    <Text style={styles.htmProfileLabel}>
                                        {utils.getCurrencyName(currency.currency_type)}
                                    </Text>
                                </View>
                                <Text style={[styles.htmProfileLabel,{paddingRight:0}]}>
                                {balance.per_value > 0?(
                                    utils.getCurrencySymbol(this.props.fiat_currency) + ' ' +
                                    utils.flashNFormatter((balance.per_value).toFixed(3),2)
                                ):'-'}
                                </Text>
                            </View>
                            <View style={styles.htmDetailBuySellRow}>
                                <View style={styles.htmProfileDetailTabBuySell}>
                                    <Text style={styles.htmBuySellText}>
                                        Buying @
                                    </Text>
                                    <Text style={styles.htmBuySellText}> ( </Text>
                                    <Text style={[styles.htmBuySellText,{
                                        color: (currency.buy_at < 0)?'#FF0000':'#00FF00'}]}>
                                        {(currency.buy_at < 0?'- ' :'+ ') +
                                        Math.abs(currency.buy_at)+' %'}
                                    </Text>
                                    <Text style={styles.htmBuySellText}> ) </Text>
                                </View>
                                <Text style={[styles.htmBuySellText,{
                                    color: (currency.buy_at < 0)?'#FF0000':'#00FF00'}]}>
                                    {balance.per_value > 0?(
                                        utils.getCurrencySymbol(this.props.fiat_currency) + ' ' +
                                        utils.flashNFormatter((balance.per_value * (1+(currency.buy_at/100))).toFixed(3),2)
                                    ):'-'}
                                </Text>
                            </View>
                            <View style={styles.htmDetailBuySellRow}>
                                <View style={styles.htmProfileDetailTabBuySell}>
                                    <Text style={styles.htmBuySellText}>
                                        Selling @
                                    </Text>
                                    <Text style={styles.htmBuySellText}> ( </Text>
                                    <Text style={[styles.htmBuySellText,{
                                        color: (currency.sell_at < 0)?'#FF0000':'#00FF00'}]}>
                                        {(currency.sell_at < 0?'- ' :'+ ')
                                        + Math.abs(currency.sell_at)+' %'}
                                    </Text>
                                    <Text style={styles.htmBuySellText}> ) </Text>
                                </View>
                                <Text style={[styles.htmBuySellText,{
                                    color: (currency.sell_at < 0)?'#FF0000':'#00FF00'}]}>
                                    {balance.per_value > 0?(
                                        utils.getCurrencySymbol(this.props.fiat_currency) + ' ' +
                                        utils.flashNFormatter((balance.per_value * (1+(currency.sell_at/100))).toFixed(3),2)
                                    ):'-'}
                                </Text>
                            </View>
                            {currency.max_qty > 0?
                                <Text style={styles.htmBuySellTradeLimit}>
                                    {
                                        'Available to trade from ' + currency.min_qty + ' ' +
                                        utils.getCurrencyUnitUpcase(currency.currency_type) +
                                        ' to ' + currency.max_qty + ' ' +
                                        utils.getCurrencyUnitUpcase(currency.currency_type)
                                    }
                                </Text>:null
                            }
                        </View>
                    )})}
                </View>
                {this.props.htm.fiat_currencies.length>0?
                <View style={styles.htmProfileContent}>
                    <Text style={styles.label}>Accepted Fiat Currenc{
                        this.props.htm.fiat_currencies.length == 1?'y':'ies'
                    }</Text>
                    <View style={styles.hr}/>
                    <View style={[styles.selectedFiatCurrencies,{marginTop:0,marginBottom:20}]}>
                        {this.props.htm.fiat_currencies.map((cur,idx) =>
                            <View key={'_selected_fiat_'+idx+'_'+cur}
                                style={styles.selectedFiatCurrency}>
                                <Text style={[styles.selectedFiatCurrencyName,{
                                    paddingLeft:5,
                                }]}>
                                    {cur.currency_code}
                                </Text>
                            </View>
                        )}
                    </View>
                </View>:null}
                <Modal
                    transparent={true}
                    animationType="slide"
                    visible={!!this.state.selectExchange}
                    onRequestClose={()=>this.setState({selectExchange:false})}>
                    <View style={[styles.overlayStyle,{
                            justifyContent: 'flex-end',paddingBottom: 45}]}>
                        <View style={[styles.optionContainer,{height:249}]}>
                            <View style={{ paddingHorizontal: 10 }}>
                                {constants.COIN_GECKO_EXCHANGES.map((exchange,index) =>
                                    <TouchableOpacity key={'_que_'+exchange.NAME+'_'+index}
                                        style={styles.optionStyle}
                                        onPress={()=>this.setState({selectExchange:false},
                                            ()=> this.props.getCoinGeckoExchangesByID(exchange))}>
                                        <Text style={[styles.optionTextStyle,{
                                                fontWeight: this.props
                                                    .exchange.ID == exchange.ID?
                                                    'bold':'normal'
                                            }]}>
                                            {exchange.NAME}
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>
                        <View style={styles.cancelContainer}>
                            <TouchableOpacity onPress={()=>this.setState({selectExchange:false})}>
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
        )
    }
}

function mapStateToProps({params}) {
    return {
        loading: params.loading,
        nightMode: params.nightMode,
        balances: params.balances,
        fiat_currency: params.fiat_currency,
        exchange: params.exchange || constants.COIN_GECKO_EXCHANGES[0],
        exchange_rates: params.exchange_rates || null,
        htm: params.htm || {},
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TradingDetail);
