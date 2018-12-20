import React from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    TextInput,
} from 'react-native';
import {
    Icon,
    Text,
    Button,
    Modal,
    Loader,
    FToast
} from '@components';
import moment from 'moment-timezone';
import * as constants from '@src/constants';
import * as utils from '@lib/utils';
import * as Validation from '@lib/validation';
import { PROFILE_URL } from '@src/config';

/**
 * Legal Disclaimer for online trade
 */
export const legalDisclaimer = (self,styles) => <Modal transparent={true}
    visible={!self.props.onlineTradeDisclaimer} onRequestClose={() => true}>
    <View style={styles.legalDisclaimer}>
        <View style={styles.legalDisclaimerBox}>
            <Text style={styles.label}>
                Legal Disclaimer
            </Text>
            <View style={styles.legalDisclaimerHr}/>
            <Text style={styles.legalDisclaimerText}>
                {"P2P trading is based on trust. This platform allows you to " +
                "buy, sell, and trade with others. Please note that by " +
                "initiating a trade, you are knowingly assuming any and all " +
                "risk associated with P2P trading. The FLASH community is not " +
                "responsible for any loss."}
            </Text>
            <TouchableOpacity style={styles.legalDisclaimerDNS}
                onPress={()=>self.setState({do_not_show:!self.state.do_not_show})}>
                <Icon style={styles.legalDisclaimerDNSIcon}
                    name={self.state.do_not_show === true?
                        'check-square-o':'square-o'}/>
                <Text style={styles.legalDisclaimerDNSText}>
                    {"  Do not show again."}
                </Text>
            </TouchableOpacity>
            <View style={styles.legalDisclaimerHr}/>
            <TouchableOpacity style={styles.legalDisclaimerBtn}
                onPress={self.legalDisclaimer.bind(self)}>
                <Text style={styles.legalDisclaimerBtnText}>
                    I UNDERSTAND
                </Text>
            </TouchableOpacity>
        </View>
    </View>
</Modal>

/**
 * Ads Filter Modal
 */
export const adsFilter = (self,styles) => <Modal transparent={false}
    animationType="slide"
    onRequestClose={() => self.setState({showFilter:false})}
    visible={!!self.state.showFilter}>
    <TouchableOpacity style={styles.htmAdFilterBtn}
        onPress={()=>self.setState({showFilter:false})}>
        <Text style={styles.htmAdFilterBtnText}>x</Text>
    </TouchableOpacity>
    <Text style={styles.htmAdFilterTitle}>Filter By</Text>
    <View style={{ marginHorizontal: 50 }}>
        <Text style={[styles.label,styles.htmAdFilterLabel]}>Want to Buy</Text>
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={()=>self.setState({selectCurrency:true, selectCurrencyFor:0})}
            style={styles.htmProfileInputBox}>
            <Text style={styles.htmProfileInput}>
                {self.state.filter.buy?
                    self.state.filter.buy.currency_name:'Select Currency'}
            </Text>
            <Icon style={{
                position: 'absolute',
                right: 15,
                fontSize: 30,
                color: '#787878',
            }} name={'angle-down'} />
        </TouchableOpacity>
        {self.state.filter.buy &&
        <View style={{marginHorizontal: 20, marginTop: -5, marginBottom: 5}}>
            <Text style={[styles.label,styles.htmAdFilterLabel]}>Trade Amount</Text>
            <TextInput
                 underlineColorAndroid='transparent'
                 style={[styles.htmProfileInputBox,{paddingLeft:10}]}
                 keyboardType='numeric'
                 returnKeyType='done'
                 placeholder={'Enter amount for '+utils
                    .getCurrencyUnitUpcase(self.state.filter.buy.currency_type)}
                 value={(self.state.filter.buy_amount || '').toString()}
                 onBlur={()=>{
                     let filter = self.state.filter;
                     if(!filter.buy_amount) return false;
                     filter.isBuyAmtVerify = false;
                     self.setState({filter});
                     let buy_amount = utils.toOrginalNumber(filter.buy_amount);
                     let res = Validation.amount(buy_amount);
                     if(!res.success){
                         return FToast.errorTop(res.message);
                     }
                     filter.isBuyAmtVerify = true;
                     filter.buy_amount= res.amount;
                     self.setState({filter});
                 }}
                 onChangeText={(buy_amount) =>{
                     let filter = self.state.filter;
                     filter.buy_amount = buy_amount;
                     self.setState({filter})
                 }}
             />
        </View>}
        <Text style={[styles.label,styles.htmAdFilterLabel]}>Want to Sell</Text>
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={()=>self.setState({selectCurrency:true, selectCurrencyFor:1})}
            style={styles.htmProfileInputBox}>
            <Text style={styles.htmProfileInput}>
            {self.state.filter.sell?
                self.state.filter.sell.currency_name:'Select Currency'}
            </Text>
            <Icon style={{
                position: 'absolute',
                right: 15,
                fontSize: 30,
                color: '#787878',
            }} name={'angle-down'} />
        </TouchableOpacity>
        <Text style={[styles.label,styles.htmAdFilterLabel]}>Sort By</Text>
        <View style={styles.htmFilterWantTo}>
            <TouchableOpacity style={styles.htmFilterWantToValue}
                onPress={()=>{
                    let filter = self.state.filter;
                    filter.sort_by = "ratings";
                    self.setState({filter})
                }}>
                <Icon style={styles.htmFilterWantToValueIcon}
                    name={(self.state.filter.sort_by !== 'ratings')?"circle-o":"dot-circle-o"} />
                <Text style={styles.htmFilterWantToValueText}>Ratings</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.htmFilterWantToValue}
                onPress={()=>{
                    let filter = self.state.filter;
                    filter.sort_by = "margin";
                    self.setState({filter})
                }}>
                <Icon style={styles.htmFilterWantToValueIcon}
                    name={(self.state.filter.sort_by !== 'margin')?"circle-o":"dot-circle-o"} />
                <Text style={styles.htmFilterWantToValueText}>Best Rate</Text>
            </TouchableOpacity>
        </View>
    </View>
    <View style={[styles.htmFilterRow, {
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-between',
        width: 180,
        marginTop: 30,
    }]}>
        <Button value={'Reset'}
            onPress={()=>self.setState({showFilter:false,filter:{apply:false, sort_by:'ratings'}},
                ()=>self.props.findHTMAdsFilterApply(self.state.filter))}
            style={styles.htmFilterBtn}
            textstyle={styles.htmFilterBtnText}/>

        <Button value={'Apply'}
            style={[styles.htmFilterBtn,{
                backgroundColor: '#E0AE27',
            }]}
            onPress={()=>{
                let filter = self.state.filter || {};
                if(filter.buy_amount){
                    let buy_amount = utils.toOrginalNumber(filter.buy_amount);
                    let res = Validation.amount(buy_amount);
                    if(!res.success){
                        return FToast.errorTop(res.message);
                    }
                    filter.buy_amount = res.amount;
                }
                filter.apply = true;
                self.setState({showFilter:false,filter},
                ()=>self.props.findHTMAdsFilterApply(self.state.filter))
            }}
            textstyle={styles.htmFilterBtnText}/>
    </View>
    {selectCurrency(self,styles)}
</Modal>

/**
 * Select Currency Modal
 */
export const selectCurrency = (self,styles) => <Modal
    transparent={true}
    animationType="slide"
    visible={!!self.state.selectCurrency}
    onRequestClose={()=>self.setState({selectCurrency:false})}>
    <View style={styles.overlayStyle}>
        <View style={[styles.optionContainer,{height:null, maxHeight:'80%'}]}>
            <ScrollView keyboardShouldPersistTaps="always">
                <View style={{ paddingHorizontal: 10 }}>
                    {Object.keys(constants.CURRENCY_TYPE).map((currency,index) =>{
                        let selected = false;
                        let selectedCur = false;
                        if(self.state.filter
                            && self.state.filter.sell
                            && self.state.filter.sell
                            .currency_type == constants.CURRENCY_TYPE[currency]){
                            if(self.state.selectCurrencyFor == 1)
                                selectedCur = true;

                        }
                        if(self.state.filter
                            && self.state.filter.buy
                            && self.state.filter.buy
                            .currency_type == constants.CURRENCY_TYPE[currency]){
                            if(self.state.selectCurrencyFor == 1)
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
                                state.filter = self.state.filter || {};
                                if(self.state.selectCurrencyFor == 0){
                                    state.filter.buy = {
                                        currency_type: constants.CURRENCY_TYPE[currency],
                                        currency_name: `${constants.CURRENCY_TYPE_NAME[currency]} (${currency})`
                                    }
                                    if(self.state.filter && self.state.filter.sell &&
                                        state.filter.buy.currency_type == self.state.filter.sell.currency_type)
                                        state.filter.sell = null;
                                } else {
                                    state.filter.sell = {
                                        currency_type: constants.CURRENCY_TYPE[currency],
                                        currency_name: `${constants.CURRENCY_TYPE_NAME[currency]} (${currency})`
                                    }
                                }
                                self.setState(state);
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
            <TouchableOpacity onPress={()=>self.setState({selectCurrency:false})}>
                <View style={styles.cancelStyle}>
                    <Text style={styles.canceTextStyle}>
                        Cancel
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    </View>
</Modal>

/**
 * View Ad details modal
 */
 export const viewAdDetails = (self,styles) => <Modal transparent={false} animationType="slide"
     onRequestClose={() => setTimeout(()=>self.setState({htmAd:{}}),200)}
     visible={!!self.state.htmAd.username && self.props.screenProps.isFocused}>
    <ScrollView
         showsVerticalScrollIndicator={false}
         bounces={false}
         style={styles.htmAdDetail}>
        <Image
             style={styles.htmProfileImage}
             source={self.props.htm.profile_pic_url?
                 {uri:PROFILE_URL+self.props.htm.profile_pic_url}:
                 utils.getCurrencyIcon(constants.CURRENCY_TYPE.FLASH)} />
        <Text numberOfLines={1} style={styles.htmAdFilterTitle}>
             {self.props.htm.display_name}
        </Text>
        <Text numberOfLines={1} style={styles.htmAdFilterSubTitle}>
             {self.state.htmAd.is_online?<Icon style={styles.htmProfileStatusIcon}
                     name={'circle'}/>:null}
            <Text style={{fontStyle: 'italic'}}>
                 {(self.state.htmAd.is_online?' online':
                 'last seen '+moment(self.props.htm.last_seen_at).fromNow())}
            </Text>
        </Text>
        <View style={{marginBottom: 10,alignItems: 'center'}}>
             {self.props.htm.email?
                <View style={styles.htmFilterRow}>
                    <Icon style={styles.htmAdEmailIcon}
                         name={'envelope'}/>
                    <Text style={styles.htmAdEmailText}>
                         {self.props.htm.email}
                    </Text>
                </View>: null
             }
            <View style={styles.htmFilterRow}>
                <Icon style={[styles.htmAdEmailIcon,
                         {fontSize: 20, top: 0}
                     ]}
                     name={'map-marker'}/>
                <Text style={styles.htmAdEmailText}>
                     {self.props.htm.country || ''}
                </Text>
            </View>
             {self.props.htm.total_txns > 0? <View style={{alignItems:'center'}}>
                 {self.props.htm.avg_rating>0?<View style={styles.htmAdRating}>
                     {([1,2,3,4,5]).map(v=>
                        <Icon key={'_start_'+v} style={styles.htmAdRatingIcon}
                             name={self.props.htm.avg_rating>=v?'star':
                             (self.props.htm.avg_rating>=(v-0.5)?'star-half-o':'star-o')}/>
                     )}
                </View>:null}
                 {self.props.htm.success_txns>0?<Text
                     style={styles.htmAdEmailText}>
                     {self.props.htm.success_txns} successful trades (
                         {Math.round(self.props.htm.success_txns/self.props.htm.total_txns*100)}
                     %)
                </Text>:null}
                 {self.props.htm.trusted_by>0?<Text style={styles.htmAdEmailText}>
                     Trusted by {self.props.htm.trusted_by} {self.props.htm.trusted_by>1?
                         'traders':'trader'}
                </Text>:null}
            </View>:null}
        </View>
        <View style={styles.htmAdDetailBox}>
            <Text style={[styles.htmAdConversion,{
                 fontSize: 16,
                 color:'#333',
                 paddingBottom: 5,
                 textAlign: 'center'
             }]}>
                 Want to sell {utils.getCurrencyUnitUpcase(self.state.htmAd.sell) + ' against ' +
                 utils.getCurrencyUnitUpcase(self.state.htmAd.buy)}
            </Text>
            <View style={styles.htmFilterRow}>
                <Text style={styles.htmAdDetailLabel}>Price</Text>
                <Text style={styles.htmAdDetailValue}>{
                     (self.state.htmAd.price_per > 1?
                         (1/self.state.htmAd.price_per).toFixed(8)
                         :self.state.htmAd.price_per) + ' ' +
                     utils.getCurrencyUnitUpcase(self.state.htmAd.price_per > 1?
                         self.state.htmAd.buy:self.state.htmAd.sell) + ' / ' +
                     utils.getCurrencyUnitUpcase(self.state.htmAd.price_per > 1?
                         self.state.htmAd.sell:self.state.htmAd.buy)}
                </Text>
            </View>
            <View style={styles.htmFilterRow}>
                <Text style={styles.htmAdDetailLabel}>Trade limits</Text>
                <Text style={styles.htmAdDetailValue}>{self.state.htmAd.trade_limit}</Text>
            </View>
            <View style={styles.htmFilterRow}>
                <Text style={styles.htmAdDetailLabel}>Terms of trade</Text>
                <Text style={styles.htmAdDetailValue}>
                     {self.state.htmAd.terms || '-'}
                </Text>
            </View>
        </View>
        <Button style={{marginVertical: 15}}
             value={self.state.htm_trade?'Open Trade':'Initiate Trade'}
             onPress={()=>{
                if(self.state.htm_trade)
                    return self.props.openTrade(self.state.htm_trade,
                            ()=>self.setState({htmAd:{},contactForTrade:false},()=>
                            self.props.screenProps.navigate('ChatRoom')));
                let trade_balance = self.props.balances
                    .filter(bal => bal.currency_type == self.state.htmAd.buy)[0];
                self.setState({contactForTrade:true, buy_amount:0, sell_amount:0, message:'', trade_balance})
             }}
             />
        <TouchableOpacity style={styles.htmActiveDeactiveLink}
             onPress={()=>self.props.screenProps
                 .navigate('TradeDetail')}>
            <Text style={styles.htmActiveDeactiveLinkText}>
                 View Trader Profile
            </Text>
        </TouchableOpacity>
    </ScrollView>
    <TouchableOpacity style={styles.htmAdFilterBtn}
         onPress={()=>self.setState({htmAd:{}})}>
        <Text style={styles.htmAdFilterBtnText}>x</Text>
    </TouchableOpacity>
    {contactForTrade(self,styles)}
    <Loader show={self.props.loading} />
</Modal>

/**
 * Contact For Trade
 */
 export const contactForTrade = (self,styles) => <Modal transparent={false} animationType="slide"
     onRequestClose={() => self.setState({contactForTrade:false})}
     visible={!!self.state.contactForTrade}>
    <TouchableOpacity style={styles.htmAdFilterBtn}
         onPress={()=>self.setState({contactForTrade:false})}>
        <Text style={styles.htmAdFilterBtnText}>x</Text>
    </TouchableOpacity>
    <Text style={styles.htmAdFilterTitle}>Initiate Trade</Text>
    {self.state.trade_balance && balanceHeader(self,styles)}
    <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        style={{ marginHorizontal: 50 }}>
        <Text style={[styles.label,styles.htmAdFilterLabel]}>Sell</Text>
        <View style={[styles.requestRowInputBox,{flexDirection: 'row', marginTop:5}]}>
            <View style={styles.requestRowAmtLabelBox}>
                <Text style={styles.requestRowAmtLabel}>
                    {utils.getCurrencyUnitUpcase(self.state.htmAd.buy)}
                </Text>
            </View>
            <TextInput
                 underlineColorAndroid='transparent'
                 style={[styles.requestRowInput,{paddingLeft:10}]}
                 keyboardType='numeric'
                 returnKeyType='done'
                 placeholder={'Enter amount in '+utils.getCurrencyUnitUpcase(self.state.htmAd.buy)}
                 value={self.state.buy_amount || ''}
                 onBlur={self.verifyAmount.bind(self)}
                 onChangeText={(buy_amount) => self.setState({buy_amount},()=>{
                     buy_amount = utils.toOrginalNumber(buy_amount);
                     let price_per = Number(self.state.htmAd.price_per);
                     if(isNaN(buy_amount)) buy_amount=0;
                     let sell_amount = utils.toOrginalNumber(
                         price_per > 1?utils.otherCurrencyToCrypto(buy_amount,
                             Number((1/price_per).toFixed(8)), 0, 8):
                         utils.cryptoToOtherCurrency(buy_amount, price_per, 0, 8)
                     ).toFixed(8);
                     self.setState({
                         sell_amount: Number(sell_amount)>1?utils.formatAmountInput(Number(sell_amount)):sell_amount.toString()
                     });
                 })}
             />
        </View>
        {self.state.trade_balance &&
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 5,
            marginBottom: -10,
        }}>
            <Text style={{
                marginLeft: 5,
                color:'#666'
            }}>+ max {self.props.max_fees[self.state.htmAd.buy]} {utils.getCurrencyUnitUpcase(self.state.htmAd.buy)} fee</Text>
            <Text style={{
                marginRight: 5,
                borderBottomWidth: 1,
                borderBottomColor: '#1a0dab',
                color:'#1a0dab'
            }}
            onPress={()=>{
                buy_amount = utils.toOrginalNumber(self.state.trade_balance.amt);
                if(self.state.trade_balance.currency_type == constants.CURRENCY_TYPE.FLASH)
                    buy_amount =utils.toOrginalNumber(utils.satoshiToFlash(self.state.trade_balance.amt)
                        .toFixed(10));
                buy_amount -= self.props.max_fees[self.state.htmAd.buy];
                if(buy_amount < 0) {
                    buy_amount=0;
                    return FToast.errorTop("You don't have enough "+
                    utils.getCurrencyUnitUpcase(self.state.htmAd.buy) +
                    " to initiate trade");
                }
                let price_per = Number(self.state.htmAd.price_per);
                if(isNaN(buy_amount)) buy_amount=0;
                let sell_amount = utils.toOrginalNumber(
                    price_per > 1?utils.otherCurrencyToCrypto(buy_amount,
                        Number((1/price_per).toFixed(8)), 0, 8):
                    utils.cryptoToOtherCurrency(buy_amount, price_per, 0, 8)
                ).toFixed(8);
                self.setState({
                    sell_amount: Number(sell_amount)>1?utils.formatAmountInput(Number(sell_amount)):sell_amount.toString(),
                    buy_amount: Number(buy_amount)>1?utils.formatAmountInput(Number(buy_amount)):buy_amount.toString()
                });
            }}>All {utils.getCurrencyUnitUpcase(self.state.htmAd.buy)}</Text>
        </View>}
        <Text style={[styles.label,styles.htmAdFilterLabel]}>Buy</Text>
        <View style={[styles.requestRowInputBox,{flexDirection: 'row', marginTop:5}]}>
            <View style={styles.requestRowAmtLabelBox}>
                <Text style={styles.requestRowAmtLabel}>
                    {utils.getCurrencyUnitUpcase(self.state.htmAd.sell)}
                </Text>
            </View>
            <TextInput
                underlineColorAndroid='transparent'
                style={[styles.requestRowInput,{paddingLeft:10}]}
                keyboardType='numeric'
                returnKeyType='done'
                placeholder={'Enter amount in '+utils.getCurrencyUnitUpcase(self.state.htmAd.sell)}
                value={self.state.sell_amount || ''}
                onBlur={self.verifyAmount.bind(self)}
                onChangeText={(sell_amount) => self.setState({sell_amount},()=>{
                    sell_amount = utils.toOrginalNumber(sell_amount);
                    let price_per = Number(self.state.htmAd.price_per);
                    if(isNaN(sell_amount)) sell_amount=0;
                    let buy_amount = utils.toOrginalNumber(
                        price_per > 1?utils.cryptoToOtherCurrency(sell_amount,
                            Number((1/price_per).toFixed(8)), 0, 8):
                        utils.otherCurrencyToCrypto(sell_amount, price_per, 0)
                    ).toFixed(8);
                    self.setState({
                        buy_amount: Number(buy_amount)>1?utils.formatAmountInput(Number(buy_amount)):buy_amount.toString()
                    });
                })}
             />
        </View>
        <Text style={[styles.label,styles.htmAdFilterLabel]}>Message</Text>
        <View style={[styles.requestRowInputBox,{flexDirection: 'row', marginTop:5, height:80}]}>
            <TextInput
                underlineColorAndroid='transparent'
                style={[styles.requestRowInput,{paddingLeft:10}]}
                placeholder={'Message'}
                multiline = {true}
                numberOfLines = {2}
                returnKeyType='done'
                value={self.state.message || ''}
                onChangeText={(message) => self.setState({message})}
             />
        </View>
        <Text style={[styles.label,styles.htmAdFilterLabel]}>Details</Text>
        <View style={styles.hr}/>
        <View style={[styles.htmFilterRow,{marginTop:-5}]}>
            <Text style={styles.htmAdDetailLabel}>Price</Text>
            <Text style={styles.htmAdDetailValue}>{
                 (self.state.htmAd.price_per > 1?
                     (1/self.state.htmAd.price_per).toFixed(8)
                     :self.state.htmAd.price_per) + ' ' +
                 utils.getCurrencyUnitUpcase(self.state.htmAd.price_per > 1?
                     self.state.htmAd.buy:self.state.htmAd.sell) + ' / ' +
                 utils.getCurrencyUnitUpcase(self.state.htmAd.price_per > 1?
                     self.state.htmAd.sell:self.state.htmAd.buy)}
            </Text>
        </View>
        <View style={styles.htmFilterRow}>
            <Text style={styles.htmAdDetailLabel}>Trade limits</Text>
            <Text style={styles.htmAdDetailValue}>{self.state.htmAd.trade_limit}</Text>
        </View>
        <Button style={{marginTop: 25}}
            value={'Next'} onPress={self.addHTMTrade.bind(self)}/>
     </ScrollView>
     <Loader show={self.props.loading} />
 </Modal>

 /**
  * balance header component
  */
 export const balanceHeader = (self,styles) => <View style={styles.walletBalanceTab}>
     <Text style={styles.walletBalanceLabel}>Balance</Text>
     <TouchableOpacity style={styles.walletBalanceDetail}>
         <Text style={styles.walletBalance}>{
             utils.getCurrencyUnitUpcase(self.state.trade_balance.currency_type) + ' ' +
             utils.flashNFormatter(self.state.trade_balance.currency_type == constants.CURRENCY_TYPE.FLASH?
                 utils.satoshiToFlash(self.state.trade_balance.amt).toFixed(10):
                 self.state.trade_balance.amt,2)}
         </Text>
         <Icon style={styles.exchangeIcon} name='exchange' />
         <Text style={styles.walletBalanceInFiatCurrency}>{
             utils.getCurrencySymbol(self.props.fiat_currency) + ' ' +
             utils.flashNFormatter(self.state.trade_balance.amt2,2)}
         </Text>
     </TouchableOpacity>
 </View>
