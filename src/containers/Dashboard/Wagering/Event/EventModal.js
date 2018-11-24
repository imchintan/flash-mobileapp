import React from 'react';
import {
    Alert,
    View,
    Image,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import {
    Icon,
    Text,
    Button,
    Modal
} from '@components';

import * as utils from '@lib/utils';
import * as constants from '@src/constants';
import { APP_URL } from '@src/config';

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
    <View style={styles.oracleProfileContent}>
        <View style={styles.oracleProfile}>
            <Text style={styles.oracleProfileLabel}>
                Expire Datetime
                <Text style={styles.mandatoryField}>*</Text>
            </Text>
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={()=>self.dateAndTimePicker('expires_on_ts')}
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
                End Datetime
                <Text style={styles.mandatoryField}>*</Text>
            </Text>
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={()=>self.dateAndTimePicker('ends_on_ts')}
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
        onPress={()=>self.setState({editEvent:false},self.updateEvent.bind(self))}
        value='SAVE'/>
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
                {text: 'OK', onPress: () => self.setState({declareWiner:false},()=>self.props.declareOracleEventResult(
                    self.props.oracleEvent.id,
                    1,
                    self.props.oracleEvent.p1,
                    null,
                    self.backHandler.bind(self)
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
                {text: 'OK', onPress: () => self.setState({declareWiner:false},()=>self.props.declareOracleEventResult(
                    self.props.oracleEvent.id,
                    1,
                    self.props.oracleEvent.p2,
                    null,
                    self.backHandler.bind(self)
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
                {text: 'OK', onPress: () => self.setState({declareWiner:false},()=>self.props.declareOracleEventResult(
                    self.props.oracleEvent.id,
                    2,
                    null,
                    null,
                    self.backHandler.bind(self)
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
                    self.setState({
                        amount: amount>0?utils.formatAmountInput(amount):'',
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
                    self.setState({
                        fiat_amount: fiat_amount>0?utils.formatAmountInput(fiat_amount):''
                    });
                })}
            />
        </View>
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
    <Button
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
    onRequestClose={()=>self.setState({visibleGetPassword:false})}>
    <View style={styles.reqDetailModal}>
        <View style={styles.reqDetailBox}>
            <View style={styles.reqDetailHeader}>
                <Text style={styles.reqDetailTitle}>Password</Text>
                <Text style={styles.reqDetailCloseIcon}
                    onPress={()=>self.setState({visibleGetPassword:false})}>X</Text>
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
