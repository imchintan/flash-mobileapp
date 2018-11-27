import React from 'react';
import {
    Platform,
    Alert,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    DatePickerAndroid,
    TimePickerAndroid,
    DatePickerIOS
} from 'react-native';
import {
    Content,
    Icon,
    Text,
    Button,
    Modal
} from '@components';

import * as utils from '@lib/utils';
import * as constants from '@src/constants';
import { APP_URL } from '@src/config';
import moment from 'moment-timezone';

/**
 * Edit oracle event
 */
export const editOracleEvent = (self,styles) => <Modal transparent={false} animationType="slide"
    onRequestClose={() => self.setState({editEvent:false})}
    visible={!!self.state.editEvent}>
    <TouchableOpacity style={styles.wagerCancelBtn}
        onPress={()=>self.setState({editEvent:false})}>
        <Text style={styles.wagerCancelBtnText}>x</Text>
    </TouchableOpacity>
    <Text style={styles.wagerTitle}>Edit Event</Text>
    <Content hasHeader={false}>
        <View style={styles.oracleProfileContent}>
            {/*
            <View style={styles.oracleProfile}>
                <Text style={styles.oracleProfileLabel}>
                    1st Team / Player
                    <Text style={styles.mandatoryField}>*</Text>
                </Text>
                <View style={styles.oracleProfileInputBox}>
                    <TextInput
                        underlineColorAndroid='transparent'
                        style={styles.oracleProfileInput}
                        placeholder={'i.e Portugal'}
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        value={self.state.p1}
                        onChangeText={(p1)=>self.setState({p1})}
                    />
                </View>
            </View>
            <View style={styles.oracleProfile}>
                <Text style={styles.oracleProfileLabel}>
                    2nd Team / Player
                    <Text style={styles.mandatoryField}>*</Text>
                </Text>
                <View style={styles.oracleProfileInputBox}>
                    <TextInput
                        underlineColorAndroid='transparent'
                        style={styles.oracleProfileInput}
                        placeholder={'i.e Brazil'}
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        value={self.state.p2}
                        onChangeText={(p2)=>self.setState({p2})}
                    />
                </View>
            </View>
            */}
            <View style={styles.oracleProfile}>
                <Text style={styles.oracleProfileLabel}>
                    Wagering End Time
                    <Text style={styles.mandatoryField}>*</Text>
                </Text>
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={()=>dateAndTimePicker(self,'expires_on_ts')}
                    style={styles.oracleProfileInputBox}>
                    <TextInput
                        editable={false}
                        underlineColorAndroid='transparent'
                        style={styles.oracleProfileInput}
                        placeholder={'Select event expiry datetime'}
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        value={self.state.display_expires_on_ts || ''}
                    />
                    <Icon style={{
                        position: 'absolute',
                        right: 15,
                        fontSize: 25,
                        color: '#787878',
                    }} name={'calendar'} />
                </TouchableOpacity>
            </View>
            <View style={styles.oracleProfile}>
                <Text style={styles.oracleProfileLabel}>
                    Result Declaration time
                    <Text style={styles.mandatoryField}>*</Text>
                </Text>
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={()=>dateAndTimePicker(self,'ends_on_ts')}
                    style={styles.oracleProfileInputBox}>
                    <TextInput
                        editable={false}
                        underlineColorAndroid='transparent'
                        style={styles.oracleProfileInput}
                        placeholder={'Select event expiry datetime'}
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        value={self.state.display_ends_on_ts || ''}
                    />
                    <Icon style={{
                        position: 'absolute',
                        right: 15,
                        fontSize: 25,
                        color: '#787878',
                    }} name={'calendar'} />
                </TouchableOpacity>
            </View>
            <View style={styles.oracleProfile}>
                <Text style={styles.oracleProfileLabel}>
                    Event Description
                </Text>
                <View style={[styles.oracleProfileInputBox,{
                    height: 80
                }]}>
                    <TextInput
                        multiline={true}
                        numberOfLines={3}
                        underlineColorAndroid='transparent'
                        style={styles.oracleProfileInput}
                        placeholder={'Enter extra notes (optional)'}
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        value={self.state.description}
                        onChangeText={(description)=>self.setState({description})}
                    />
                </View>
            </View>
        </View>
        <Button
            style={{marginBottom: 30}}
            onPress={()=>self.setState({editEvent:false},self.updateEvent.bind(self))}
            value='SAVE'/>
        {dateAndTimePickerIOS(self)}
    </Content>
</Modal>

/**
 * Declare winner of oracle event
 */
export const declareWinner = (self,styles) => <Modal transparent={false} animationType="slide"
    onRequestClose={() => self.setState({declareWiner:false})}
    visible={!!self.state.declareWiner}>
    <TouchableOpacity style={styles.wagerCancelBtn}
        onPress={()=>self.setState({declareWiner:false})}>
        <Text style={styles.wagerCancelBtnText}>x</Text>
    </TouchableOpacity>
    <Text style={styles.wagerTitle}>Who won?</Text>
    <Button
        style={styles.declareWinerBtn}
        onPress={()=>Alert.alert(
            self.props.oracleEvent.p1,
            `Are you sure, you want to declare won ${self.props.oracleEvent.p1}?`,
            [
                {text: 'Cancel', style: 'cancel'},
                {text: 'OK', onPress: () => self.setState({declareWiner:false},
                    ()=>self.props.declareOracleEventResult(
                        self.props.oracleEvent.id,
                        1,
                        self.props.oracleEvent.p1,
                        null
                ))},
            ],
        )}
        value={self.props.oracleEvent.p1}/>
    <Button
        style={styles.declareWinerBtn}
        onPress={()=>Alert.alert(
            self.props.oracleEvent.p2,
            `Are you sure, you want to declare won ${self.props.oracleEvent.p2}?`,
            [
                {text: 'Cancel', style: 'cancel'},
                {text: 'OK', onPress: () => self.setState({declareWiner:false},
                    ()=>self.props.declareOracleEventResult(
                        self.props.oracleEvent.id,
                        1,
                        self.props.oracleEvent.p2,
                        null
                ))},
            ],
        )}
        value={self.props.oracleEvent.p2}/>
    <Button
        style={styles.declareWinerBtn}
        onPress={()=>Alert.alert(
            'Tied',
            `Are you sure, you want to declare tide event?`,
            [
                {text: 'Cancel', style: 'cancel'},
                {text: 'OK', onPress: () => self.setState({declareWiner:false},
                    ()=>self.props.declareOracleEventResult(
                        self.props.oracleEvent.id,
                        2,
                        null,
                        null
                ))},
            ],
        )}
        value='Tied'/>
</Modal>

/**
 * Wager oracle event
 */
export const wagerEvent = (self,styles) => <Modal transparent={false} animationType="slide"
    onRequestClose={() => self.setState({wager:false})}
    visible={!!self.state.wager}>
    <TouchableOpacity style={styles.wagerCancelBtn}
        onPress={()=>self.setState({wager:false})}>
        <Text style={styles.wagerCancelBtnText}>x</Text>
    </TouchableOpacity>
    <Text style={styles.wagerTitle}>Wager</Text>
    <View style={styles.walletBalanceTab}>
        <Text style={styles.walletBalanceLabel}>Balance</Text>
        <TouchableOpacity style={styles.walletBalanceDetail}>
            <Text style={styles.walletBalance}>{
                utils.getCurrencyUnitUpcase(constants.CURRENCY_TYPE.FLASH) + ' ' +
                utils.flashNFormatter(utils.satoshiToFlash(self.props.balance).toFixed(10),2)}
            </Text>
            <Icon style={styles.exchangeIcon} name='exchange' />
            <Text style={styles.walletBalanceInFiatCurrency}>{
                utils.getCurrencySymbol(self.props.fiat_currency) + ' ' +
                utils.flashNFormatter(self.props.fiat_balance,2)}
            </Text>
        </TouchableOpacity>
    </View>
    <View style={[styles.requestBox,{
        marginVertical: 20,
    }]}>
        <Text style={styles.wagerLimit}>Wager limit: {self.props.oracleEvent.max > 0? (utils
            .flashNFormatter(self.props.oracleEvent.min,2) + ' - ' +
            utils.flashNFormatter(self.props.oracleEvent.max,2) +' FLASH'):
            (self.props.oracleEvent.min > 0? ('At least ' + utils.flashNFormatter(self.props.oracleEvent.min,2)
             + ' FLASH'):'No limits')}</Text>
        <View style={[styles.requestRowInputBox,{flexDirection: 'row'}]}>
            <View style={styles.requestRowAmtLabelBox}>
                <Text style={styles.requestRowAmtLabel}>{utils.getFiatCurrencyUnit(self.props.fiat_currency)}</Text>
            </View>
            <TextInput
                ref={'_input_fiat_amount'}
                underlineColorAndroid='transparent'
                style={[styles.requestRowInput,{paddingLeft:10}]}
                keyboardType='numeric'
                returnKeyType='next'
                placeholder={'Enter amount in '+utils.getFiatCurrencyUnit(self.props.fiat_currency)}
                value={self.state.fiat_amount || ''}
                onBlur={self.verifyAmount.bind(self)}
                onChangeText={(fiat_amount) => self.setState({fiat_amount},()=>{
                    fiat_amount = utils.toOrginalNumber(fiat_amount);
                    if(isNaN(fiat_amount)) fiat_amount=0;
                    let amount = (self.props.fiat_per_value?utils.toOrginalNumber(
                        utils.otherCurrencyToCrypto(fiat_amount, self.props.fiat_per_value)
                    ):0);
                    let fee = utils.calcFee(amount, self.props.currency_type,
                        self.props.bcMedianTxSize, self.props.satoshiPerByte, self.props.fixedTxnFee)
                    self.setState({
                        amount: amount>0?utils.formatAmountInput(amount):'',
                        fee,
                    });
                })}
            />
        </View>
        <View style={[styles.requestRowInputBox,{flexDirection: 'row', marginTop:5}]}>
            <View style={styles.requestRowAmtLabelBox}>
                <Text style={styles.requestRowAmtLabel}>{utils.getCurrencyUnitUpcase(self.props.currency_type)}</Text>
            </View>
            <TextInput
                ref={'_input_amount'}
                underlineColorAndroid='transparent'
                style={[styles.requestRowInput,{paddingLeft:10}]}
                keyboardType='numeric'
                returnKeyType='next'
                placeholder={'Enter amount in '+utils.getCurrencyUnitUpcase(self.props.currency_type)}
                value={self.state.amount || ''}
                onBlur={self.verifyAmount.bind(self)}
                onChangeText={(amount) => self.setState({amount},()=>{
                    amount = utils.toOrginalNumber(amount);
                    if(isNaN(amount)) amount=0;
                    let fiat_amount = (self.props.fiat_per_value?utils.toOrginalNumber(
                        utils.cryptoToOtherCurrency(amount, self.props.fiat_per_value, 0)
                    ):0);
                    let fee = utils.calcFee(amount, self.props.currency_type,
                        self.props.bcMedianTxSize, self.props.satoshiPerByte, self.props.fixedTxnFee)
                    self.setState({
                        fiat_amount: fiat_amount>0?utils.formatAmountInput(fiat_amount):'',
                        fee
                    });
                })}
            />
        </View>
        <View style={{flexDirection: 'row',justifyContent:'space-between'}}>
            <Text style={styles.wagerTxnFeeText}>
                +{self.state.fee} {utils.getCurrencyUnitUpcase(self.props.currency_type)} transaction fee
            </Text>
            <Text style={styles.wagerSetAllFlash}
                onPress={()=>{
                    let amount = utils.flashNFormatter(utils.satoshiToFlash(self.props.balance).toFixed(10),2);
                    self.setState({amount},()=>{
                        amount = utils.toOrginalNumber(amount);
                        if(isNaN(amount)) amount=0;
                        let fiat_amount = (self.props.fiat_per_value?utils.toOrginalNumber(
                            utils.cryptoToOtherCurrency(amount, self.props.fiat_per_value, 0)
                        ):0);
                        self.setState({
                            fiat_amount: fiat_amount>0?utils.formatAmountInput(fiat_amount):''
                        });
                    })
                }}>All FLASH</Text>
        </View>
    </View>
    <Button
        style={{marginTop:-30}}
        onPress={()=>self.setState({wager:false},self.addOracleWager.bind(self))}
        value='JOIN'/>
</Modal>

/**
 * Cancel oracle event
 */
export const cancelEvent = (self,styles) => <Modal transparent={false} animationType="slide"
    onRequestClose={() => self.setState({cancelEvent:false})}
    visible={!!self.state.cancelEvent}>
    <TouchableOpacity style={styles.wagerCancelBtn}
        onPress={()=>self.setState({cancelEvent:false})}>
        <Text style={styles.wagerCancelBtnText}>x</Text>
    </TouchableOpacity>
    <Text style={styles.wagerTitle}>Cancel Event</Text>
    <View style={styles.oracleProfileContent}>
        <View style={styles.eventDetailTitle}>
            {self.props.oracleEvent.event_pic_url && <Image
                style={[styles.eventTabImage,{marginRight: 7}]}
                source={{uri:APP_URL+'event/'+self.props.oracleEvent.event_pic_url}}/>}
            <Text style={styles.eventDetailTitleText}>
                {self.props.oracleEvent.event_name}
            </Text>
        </View>
        <View style={styles.hr}/>
        <Text style={styles.eventDetailCreatedBy}>
            By {self.props.oracleEvent.company_name}
        </Text>
        <View style={styles.oracleProfile}>
            <View style={[styles.oracleProfileInputBox,{
                height: 100,
                marginTop: 20,
            }]}>
                <TextInput
                    multiline={true}
                    numberOfLines={5}
                    underlineColorAndroid='transparent'
                    style={styles.oracleProfileInput}
                    placeholder={'Please specify cancellation reason'}
                    autoCapitalize={'none'}
                    autoCorrect={false}
                    value={self.state.cancel_reason}
                    onChangeText={(cancel_reason)=>self.setState({cancel_reason})}
                />
            </View>
        </View>
    </View>
    <Button
    onPress={()=>{
        Alert.alert(
            self.props.oracleEvent.event_name,
            'Are you sure, you want to cancel this event?',
              [
                {text: 'Cancel', style: 'cancel'},
                {text: 'OK', onPress: () => self.setState({cancelEvent:false},
                    self.cancelEvent.bind(self))},
              ],
            )
        }}
        value='SUBMIT'/>
</Modal>

/**
 * Password request modal
 */
export const passwordRequest = (self,styles) => <Modal
    transparent={true}
    visible={!!self.state.visibleGetPassword}
    onRequestClose={()=>self.setState({visibleGetPassword:false, password:'', errorMsg: ''})}>
    <View style={styles.reqDetailModal}>
        <View style={styles.reqDetailBox}>
            <View style={styles.reqDetailHeader}>
                <Text style={styles.reqDetailTitle}>Password</Text>
                <Text style={styles.reqDetailCloseIcon}
                    onPress={()=>self.setState({visibleGetPassword:false, password:'', errorMsg: ''})}>X</Text>
            </View>
            <View style={styles.reqDetailBody}>
                <Text style={{
                    fontSize: 15,
                    color: self.props.nightMode?'#E9E9E9':'#333',
                    textAlign: 'center',
                    marginBottom: 15,
                }}>
                    For additional security check, Please enter your password.
                </Text>
                <View style={styles.requestRowInputBox}>
                    <TextInput
                        underlineColorAndroid='transparent'
                        style={styles.requestRowInput}
                        secureTextEntry={true}
                        placeholder={'Enter your password'}
                        value={self.state.password || ''}
                        onChangeText={(password) => self.setState({password})}
                        onSubmitEditing={self.decryptWallet.bind(self)}
                    />
                </View>
                {!!self.state.errorMsg?<Text style={{
                    fontSize: 15,
                    color: 'red',
                    paddingHorizontal: 10,
                    marginTop: 5,
                }}>{self.state.errorMsg}</Text>:null}
            </View>
            <View style={{flexDirection:'row'}}>
                <Button
                    onPress={()=>self.setState({visibleGetPassword:false})}
                    style={[styles.reqBtn,{backgroundColor: self.props.nightMode?'#b98e1b':'#EFEFEF'}]}
                    textstyle={[styles.reqBtnLabel,{color: self.props.nightMode?'#191714':'#333'}]}
                    value='Cancel' />
                <Button
                    onPress={self.decryptWallet.bind(self)}
                    style={styles.reqBtn}
                    textstyle={styles.reqBtnLabel}
                    value='OK' />
            </View>
        </View>
    </View>
</Modal>


/**
 * Date & Time Picker
 */
export const dateAndTimePicker = async (self,key) => {
    try{
        let date = new Date(self.state[key]);
        if(Platform.OS !== 'ios'){
            let dateRes = await DatePickerAndroid.open({
                // mode: 'spinner',
                date: date,
                minDate: new Date()
            });
            if (dateRes.action !== DatePickerAndroid.dismissedAction) {
                let timerRes = await TimePickerAndroid.open({
                    // mode: 'spinner',
                    hour: date.getHours(),
                    minute: date.getMinutes(),
                    is24Hour: false, // Will display '2 PM'
                });
                if (timerRes.action !== TimePickerAndroid.dismissedAction) {
                    let dateStr = `${dateRes.year}-${(dateRes.month+1) < 10?
                     ('0'+(dateRes.month+1)):(dateRes.month+1)}-${dateRes.day < 10 ?
                    ('0'+dateRes.day):dateRes.day}`;
                    dateStr += ` ${timerRes.hour < 10 ? ('0'+timerRes.hour):
                    timerRes.hour}:${timerRes.minute < 10 ?('0'+timerRes.minute):
                    timerRes.minute}`;
                    let state = {};
                    state[key] = new Date(moment(dateStr)).getTime();
                    state[`display_${key}`] = moment(dateStr).format('MMM DD, YYYY hh:mm A');
                    self.setState(state);
                }
            }
        } else {
            console.log("iOS");
            self.setState({chooseDateTime:true, datetime_key:key});
        }
    }catch(e){
        console.log(e);
    }
}

/**
 * Date & Time Picker
 */
export const dateAndTimePickerIOS = (self,key) => <Modal transparent={true} animationType="slide"
    onRequestClose={() => self.setState({chooseDateTime:false})}
    visible={!!self.state.chooseDateTime}>
    <View style={{flex:1,justifyContent: 'center',backgroundColor:'#0003'}}>
        <View style={{backgroundColor:'#fff', marginHorizontal: 10, paddingVertical: 10}}>
        <DatePickerIOS
            minimumDate={new Date()}
            date={new Date(self.state[self.state.datetime_key])}
            mode={'datetime'}
            onDateChange={(d) =>{
                let state = {};
                state[self.state.datetime_key] = d.getTime();
                state[`display_${self.state.datetime_key}`] = moment(d).format('MMM DD, YYYY hh:mm A');
                self.setState(state);
                console.log(state);
            }} />
        <Button value={'SET'}
            onPress={()=>self.setState({chooseDateTime:false})}/>
        </View>
   </View>
</Modal>
