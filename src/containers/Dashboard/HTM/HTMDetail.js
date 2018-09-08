/**
 * HTM Detail Container
 */

 import React, {Component} from 'react';
 import {
     View,
     Image,
     TouchableOpacity,
 } from 'react-native';
 import {
     Container,
     Content,
     Header,
     HeaderLeft,
     Icon,
     Button,
     Text
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
                                {(this.props.htm.isOnline?' online': 'last seen at '+moment(this.state.htm.last_seen_at).fromNow())}
                            </Text>
                        </Text>
                    </View>
                </Header>
                <Content bounces={false} style={styles.content}>
                    <View style={styles.htmProfileDetail}>
                        <Image
                            style={styles.htmProfileImage}
                            source={this.props.htm.profile_pic_url?
                                {uri:PROFILE_URL+this.state.htm.profile_pic_url}:
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
                        <Text style={[styles.label,{marginTop:10}]}>Trade In</Text>
                        <View style={[styles.hr,{marginBottom:15}]}/>
                        {this.props.htm.currencies.map(currency =>{
                            let balIndex = this.props.balances
                                .findIndex(bal=>bal.currency_type == currency.currency_type);
                            let balance = this.props.balances[balIndex];
                            return (<View
                                    style={styles.htmDetailBuySell}
                                    key={'_currency_'+currency.currency_type}>
                                <View style={styles.htmCurrency}>
                                    <Icon style={styles.htmCurrencyCheckIcon}
                                        name='check-square-o'/>
                                    <Text style={styles.htmProfileLabel}>
                                        {utils.getCurrencyName(currency.currency_type)}
                                    </Text>
                                </View>
                                <View style={styles.htmDetailBuySellRow}>
                                    <View style={styles.htmProfileDetailTabBuySell}>
                                        <Text style={styles.htmBuySellText}>
                                            Buying @
                                        </Text>
                                        <Text style={styles.htmBuySellText}> ( </Text>
                                        <Text style={[styles.htmBuySellText,{
                                            color: (currency.buy_at < 0)?'red':'green'}]}>
                                            {(currency.buy_at < 0?'- ' :'+ ') +
                                            Math.abs(currency.buy_at)+' %'}
                                        </Text>
                                        <Text style={styles.htmBuySellText}> ) </Text>
                                    </View>
                                    <Text style={[styles.htmBuySellText,{
                                        color: (currency.buy_at < 0)?'red':'green'}]}>
                                        {
                                            utils.getCurrencySymbol(this.props.fiat_currency) + ' ' +
                                            utils.flashNFormatter((balance.per_value * (1+(currency.buy_at/100))).toFixed(3),2)
                                        }
                                    </Text>
                                </View>
                                <View style={styles.htmDetailBuySellRow}>
                                    <View style={styles.htmProfileDetailTabBuySell}>
                                        <Text style={styles.htmBuySellText}>
                                            Selling @
                                        </Text>
                                        <Text style={styles.htmBuySellText}> ( </Text>
                                        <Text style={[styles.htmBuySellText,{
                                            color: (currency.sell_at < 0)?'red':'green'}]}>
                                            {(currency.sell_at < 0?'- ' :'+ ')
                                            + Math.abs(currency.sell_at)+' %'}
                                        </Text>
                                        <Text style={styles.htmBuySellText}> ) </Text>
                                    </View>
                                    <Text style={[styles.htmBuySellText,{
                                        color: (currency.sell_at < 0)?'red':'green'}]}>
                                        {
                                            utils.getCurrencySymbol(this.props.fiat_currency) + ' ' +
                                            utils.flashNFormatter((balance.per_value * (1+(currency.sell_at/100))).toFixed(3),2)
                                        }
                                    </Text>
                                </View>
                            </View>
                        )})}
                    </View>
                </Content>
            </Container>
        );
    }
}

function mapStateToProps({params}) {
    return {
        nightMode: params.nightMode,
        balances: params.balances,
        fiat_currency: params.fiat_currency,
        htm: params.htm,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HTMDetail);
