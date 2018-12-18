/**
 * HTM Ad detail Container
 */

 import React, {Component} from 'react';
 import {
     View,
     Image,
     TouchableOpacity,
     RefreshControl,
     FlatList
 } from 'react-native';
 import {
     Icon,
     Text,
     Loader,
     FToast
 } from '@components';

import * as utils from '@lib/utils';
import * as constants from '@src/constants';
import * as Validation from '@lib/validation';
import { PROFILE_URL } from '@src/config';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ActionCreators} from '@actions';

import * as am from './AdsModal';

class Ads extends Component < {} > {

    static navigationOptions = {
        header: null,
        gesturesEnabled: true,
    }

    constructor(props) {
        super(props);
        this.state = {
            htmAd:{}            
        };
    }

    componentDidMount(){
        this.props.findHTMAds(0,true);
    }

    verifyAmount(){
        this.setState({isAmtVerify: false});
        if(!this.state.buy_amount) return false;
        let buy_amount = utils.toOrginalNumber(this.state.buy_amount);
        let sell_amount = utils.toOrginalNumber(this.state.sell_amount);
        let res = Validation.amount(buy_amount);
        if(!res.success){
            return FToast.errorTop(res.message);
        }
        this.setState({
            isAmtVerify: true,
            sell_amount: Number(sell_amount)>1?utils.formatAmountInput(Number(sell_amount)):sell_amount.toString(),
            buy_amount: res.amount>1?utils.formatAmountInput(res.amount):res.amount.toString()
        });
    }

    addHTMTrade(){
        let buy_amount = utils.toOrginalNumber(this.state.buy_amount);
        let sell_amount = utils.toOrginalNumber(this.state.sell_amount);
        let res = Validation.amount(buy_amount);
        if(!res.success){
            return FToast.errorTop(res.message);
        }

        if(this.state.htmAd.min > sell_amount){
            return FToast.errorTop('Amount must be greater than min limit.');
        }

        if(this.state.htmAd.max && this.state.htmAd.max < sell_amount){
            return FToast.errorTop('Amount must be less than max limit.');
        }

        let message = (this.state.message || '').trim();
        if(!message) return FToast.errorTop('Message is required!');

        let balance = this.props.balances
            .filter(bal => bal.currency_type == this.state.htmAd.buy)[0].amt;
        if(this.state.htmAd.buy == constants.CURRENCY_TYPE.FLASH){
            balance = utils.satoshiToFlash(balance);
        }

        if(balance < buy_amount){
            return FToast.errorTop('You do not have enough '
            +utils.getCurrencyUnitUpcase(this.state.htmAd.buy)
            +' to create this trad!');
        }

        let data = {
            ad_id: this.state.htmAd.id,
            base_amount: sell_amount,
            to_amount: buy_amount,
            rate: utils.toOrginalNumber(this.state.htmAd.price_per),
            receiver_name: this.props.htm.display_name,
            receiver_dp: this.props.htm.profile_pic_url,
            sender_name: this.props.htmProfile.display_name,
            sender_dp: this.props.htmProfile.profile_pic_url,
        }
        this.props.addHTMTrade(data, message, ()=>
            this.setState({htmAd:{},contactForTrade:false,
                buy_amount:0, sell_amount:0, message:''},()=>
                this.props.screenProps.navigate('ChatRoom')
        ));
    }

    render() {
        const styles = (this.props.nightMode?require('@styles/nightMode/htm'):require('@styles/htm'));
        return(
            <View style={{flex:1}}>
                <FlatList
                    refreshControl={
                        <RefreshControl
                            colors={['#191714']}
                            tintColor='#191714'
                            refreshing={false}
                            onRefresh={()=>!this.props.htmAdCreateOrEdit && this.props.findHTMAds(0,true)}/>
                    }
                    style={styles.htmAdList}
                    showsVerticalScrollIndicator={false}
                    data={this.props.htmAds}
                    keyExtractor={(ad, index) => (index+'_'+ad.id)}
                    // onEndReachedThreshold={2}
                    // onEndReached={()=>!this.props.htmAdCreateOrEdit && this.props.findHTMAds(this.props.htmAds.length)}
                    renderItem={({item, index})=>{
                        let price_per = this.props.screenProps.getPricePer(item.buy,item.sell);
                        if(price_per > 1){
                            price_per = ((1/price_per) * (1+item.margin/100)).toFixed(8);
                            price_per = (1/Number(price_per)).toFixed(8);
                        }else{
                            price_per = (price_per * (1-item.margin/100)).toFixed(8);
                        }
                        let trade_limit = item.max > 0?
                            ('Limits: ' + utils.flashNFormatter(item.min,2) +
                            ' - ' + utils.flashNFormatter(item.max,2) +
                            ' ' + utils.getCurrencyUnitUpcase(item.sell)):(item.min > 0?
                            ('At least ' + utils.flashNFormatter(item.min,2) +
                            ' ' + utils.getCurrencyUnitUpcase(item.sell)):
                            'No limits');
                        return(
                            <TouchableOpacity activeOpacity={0.5}
                                onPress={()=>this.props.getHTMDetail(item.username,
                                    ()=>this.setState({htm_trade:null},
                                    ()=>this.props.getActiveHTMTrade(item.id,
                                        (htm_trade)=>this.setState({
                                            htmAd:{
                                                ...item,
                                                price_per,
                                                trade_limit
                                            },
                                            htm_trade,
                                            trade_balance:null,
                                        },()=>this.props.getBalanceV2(this.state.htmAd.buy,true))))
                                )}
                                style={styles.htmAdTab}>
                                <Image style={styles.htmAdUserImage}
                                    source={item.profile_pic_url?
                                    {uri:PROFILE_URL+item.profile_pic_url}:
                                    utils.getCurrencyIcon(constants.CURRENCY_TYPE.FLASH)} />
                                <View>
                                    <View style={styles.htmAdTabDetail}>
                                        <View>
                                            <View style={styles.htmAdUserTitle}>
                                                <Icon style={[styles.htmAdStatusIcon,
                                                    item.is_online && styles.htmAdOnlineStatus]}
                                                    name={'circle'}/>
                                                <Text style={styles.htmAdUserName}>
                                                    {item.display_name}
                                                </Text>
                                            </View>
                                            <Text style={styles.htmAdConversionLimits}>
                                                {trade_limit}
                                            </Text>
                                        </View>
                                        <View style={styles.htmAdPriceDetail}>
                                            <Text style={styles.htmAdPriceTitle}>
                                                Price / {utils.getCurrencyUnitUpcase(price_per > 1?item.sell:item.buy)}
                                            </Text>
                                            <Text style={styles.htmAdPriceValue}>{
                                                (price_per > 1?(1/price_per).toFixed(8):price_per) + ' ' +
                                                utils.getCurrencyUnitUpcase(price_per > 1?item.buy:item.sell)}
                                            </Text>
                                        </View>
                                    </View>
                                    <Text style={styles.htmAdConversion}>
                                        Want to sell {utils.getCurrencyUnitUpcase(item.sell) + ' against ' +
                                        utils.getCurrencyUnitUpcase(item.buy)}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        );
                    }}
                    ListEmptyComponent={()=>{
                        return(
                            <View>
                                <Text style={styles.txnListEmpty}>
                                    No Trade Ads!
                                </Text>
                            </View>
                        )
                    }}
                />
                {am.viewAdDetails(this,styles)}
                {am.contactForTrade(this,styles)}
                <Loader show={this.props.loading} />
            </View>
        )
    }
}

function mapStateToProps({params}) {
    return {
        loading: params.loading,
        nightMode: params.nightMode,
        htmAds: params.htmAds || [],
        htmProfile: params.htmProfile || {},
        balances: params.balances,
        htm: params.htm || {},
        htmAdCreateOrEdit: params.htmAdCreateOrEdit || false,
        fiat_currency: params.fiat_currency,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Ads);
