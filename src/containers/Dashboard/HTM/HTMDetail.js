/**
 * HTM Detail Container
 */

 import React, {Component} from 'react';
 import {
     View,
     Image,
     TouchableOpacity,
     Modal
 } from 'react-native';
 import {
     Container,
     Content,
     Header,
     HeaderLeft,
     HeaderRight,
     Icon,
     Button,
     Text,
     Loader
 } from '@components';
import moment from 'moment-timezone';

 import {connect} from 'react-redux';
 import {bindActionCreators} from 'redux';
 import {ActionCreators} from '@actions';

 import { PROFILE_URL } from '@src/config';
 import * as constants from '@src/constants';
 import * as utils from '@lib/utils';

class HTMDetail extends Component < {} > {

    static navigationOptions = {
        header: null,
        gesturesEnabled: true,
    }

    constructor(props) {
        super(props);
        this.state = {
            htm: this.props.htm
        };
    }

    render() {
        const styles = (this.props.nightMode?require('@styles/nightMode/htm'):require('@styles/htm'));
        const exchangeRates = this.props.exchange_rates || this.props.balances;
        return (
            <Container>
                <Header>
                    <HeaderLeft>
                        <TouchableOpacity>
                            <Icon onPress={() => this.props.navigation.goBack()}
                                style={styles.headerBackIcon} name='angle-left'/>
                        </TouchableOpacity>
                    </HeaderLeft>
                    <View style={styles.htmHeaderTitleBox}>
                        <Text numberOfLines={1} style={styles.htmHeaderTitle}>
                            {this.props.htm.display_name}
                        </Text>
                        <Text numberOfLines={1} style={styles.htmHeaderSubTitle}>
                            {this.props.htm.isOnline?
                                <Icon style={styles.htmProfileStatusIcon}
                                    name={'circle'}/>:null}
                            <Text>
                                {(this.props.htm.isOnline?' online': 'last seen '+moment(this.state.htm.last_seen_at).fromNow())}
                            </Text>
                        </Text>
                    </View>
                    <HeaderRight>
                        <TouchableOpacity onPress={()=>this.props.goToChatRoom(this.state.htm.username,
                            (feedback)=>this.props.navigation
                                .navigate(feedback?'FeedBack':'ChatRoom'))}>
                            <Icon style={[styles.headerFAIcon,{
                                    fontSize:24,
                                    paddingHorizontal: 12
                                }]}
                                name='comments'/>
                            {/*<View style={styles.htmChatBadge}>
                                <Text style={styles.htmChatBadgeText}>19</Text>
                            </View>*/}
                        </TouchableOpacity>
                    </HeaderRight>
                </Header>
                <Content bounces={false} style={styles.content}>
                    <View style={styles.htmProfileDetail}>
                        <Image
                            style={styles.htmProfileImage}
                            source={this.props.htm.profile_pic_url?
                                {uri:PROFILE_URL+this.props.htm.profile_pic_url}:
                                utils.getCurrencyIcon(constants.CURRENCY_TYPE.FLASH)} />
                        <View style={{marginVertical: 15,alignItems: 'center'}}>
                            {this.props.htm.email?
                                <View style={styles.htmProfileEmail}>
                                    <Icon style={styles.htmProfileEmailIcon}
                                        name={'envelope'}/>
                                    <Text style={styles.htmProfileEmailText}>
                                        {this.props.htm.email}
                                    </Text>
                                </View>: null
                            }
                            <View style={styles.htmProfileEmail}>
                                <Icon style={[styles.htmProfileEmailIcon,
                                        {fontSize: 20, top: 0}
                                    ]}
                                    name={'map-marker'}/>
                                <Text style={styles.htmProfileEmailText}>
                                    {this.props.htm.country || ''}
                                </Text>
                            </View>
                            <Button style={{marginVertical: 10}}
                                value={'Contact'}
                                onPress={()=> this.props.navigation
                                    .navigate('ChatRoom', this.state.htm)} />
                        </View>
                    </View>
                    <View style={styles.htmProfileContent}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}>
                            <Text style={[styles.label,{}]}>Trading In</Text>
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
                </Content>
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
                <Loader show={this.props.loading} />
            </Container>
        );
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
        htm: params.htm,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HTMDetail);
