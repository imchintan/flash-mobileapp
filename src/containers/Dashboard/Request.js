/**
 * Request Container
 */

import React, { Component } from 'react';
import {
    View,
    TextInput,
    TouchableOpacity,
    Image,
    Clipboard,
    Modal
} from 'react-native';
import {
    Container,
    Header,
    HeaderLeft,
    HeaderRight,
    Content,
    Icon,
    Text,
    Button,
    Loader,
    WalletMenu,
    WalletFooter,
    Toast
} from '@components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '@actions';
import * as Validation from '@lib/validation';
import { PROFILE_URL } from '@src/config';
import * as utils from '@lib/utils';
import * as constants from '@src/constants';

class Request extends Component<{}> {

    static navigationOptions = {
        header: null,
        gesturesEnabled: true,
    }

    constructor(props) {
        super(props);
        this.state = {
            isVerify: false,
            isAmtVerify: false,
            search_wallet: null
        };
    }

    componentWillReceiveProps(nextProps){
        if(nextProps){
            if(nextProps.search_wallet && this.state.email &&
                this.state.email.toLowerCase() == nextProps.search_wallet.email.toLowerCase()){
                this.setState({
                    isVerify:true,
                    search_wallet:nextProps.search_wallet
                });
            }
            if(!nextProps.loading && this.props.loading !== nextProps.loading){
                this.resetState();
            }
        }
    }

    componentDidMount(){
        if(this.props.currency_type !== constants.CURRENCY_TYPE.FLASH){
            this.props.setBcMedianTxSize();
        }
    }

    resetState(){
        this.setState({
            email:'',
            amount:'',
            fiat_amount:'',
            note:'',
            isVerify: false,
            isAmtVerify: false,
            search_wallet: null
        });
    }

    verifyAmount(){
        this.setState({isAmtVerify: false});
        if(!this.state.amount) return false;

        let amount = utils.toOrginalNumber(this.state.amount);
        let fiat_amount = utils.toOrginalNumber(this.state.fiat_amount);
        let res = Validation.amount(amount);
        if(!res.success){
            return Toast.errorTop(res.message);
        }

        this.setState({
            isAmtVerify: true,
            fiat_amount: fiat_amount>0?utils.formatAmountInput(fiat_amount):'',
            amount:utils.formatAmountInput(res.amount)
        });
    }

    verifyAddress(){
        if(this.state.search_wallet && this.state.search_wallet.email === this.state.email) return false;

        this.setState({isVerify:false,search_wallet:null});

        if(!this.state.email) return false;

        let res = Validation.email(this.state.email);
        if(!res.success){
            return Toast.errorTop(res.message);
        }

        this.props.searchWallet(this.state.email);
    }

    confirmRequest(){
        if(!this.state.isVerify){
            return Toast.errorTop("Address is invalid!");
        }
        let amount = utils.toOrginalNumber(this.state.amount);
        if(!this.state.isAmtVerify){
            let res = Validation.amount(amount);
            if(!res.success){
                return Toast.errorTop(res.message);
            }
            amount = utils.toOrginalNumber(res.amount);
            this.setState({isAmtVerify: true, amount});
        }
        if(this.props.currency_type === constants.CURRENCY_TYPE.FLASH){
            if(amount < 1){
                return Toast.errorTop("Amount must be at least 1");
            }
        }else{
            if(amount < this.props.thresholdAmount){
                return Toast.errorTop("Amount is less than threshold value");
            }
        }

        this.setState({visible:true});
    }

    render() {
        const styles = (this.props.nightMode?require('@styles/nightMode/request'):require('@styles/request'));
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
                        <Text style={styles.walletLabel}>Request</Text>
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
                <Content bounces={false} style={styles.content}>
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
                    <View style={styles.requestBox}>
                        <Text style={styles.requestRowLabel}>Amount</Text>
                        <View style={styles.hr}/>
                        <View style={[styles.requestRowInputBox,{flexDirection: 'row'}]}>
                            <View style={styles.requestRowAmtLabelBox}>
                                <Text style={styles.requestRowAmtLabel}>{utils.getFiatCurrencyUnit(this.props.fiat_currency)}</Text>
                            </View>
                            <TextInput
                                ref={'_input_fiat_amount'}
                                underlineColorAndroid='transparent'
                                style={[styles.requestRowInput,{paddingLeft:10}]}
                                keyboardType='numeric'
                                returnKeyType='next'
                                onSubmitEditing={()=>this.refs._input_email.focus()}
                                placeholder={'Enter amount in '+utils.getFiatCurrencyUnit(this.props.fiat_currency)}
                                value={this.state.fiat_amount || ''}
                                onBlur={this.verifyAmount.bind(this)}
                                onChangeText={(fiat_amount) => this.setState({fiat_amount},()=>{
                                    fiat_amount = utils.toOrginalNumber(fiat_amount);
                                    if(isNaN(fiat_amount)) fiat_amount=0;
                                    let amount = utils.toOrginalNumber(
                                        utils.otherCurrencyToCrypto(fiat_amount, this.props.fiat_per_value)
                                    );
                                    this.setState({
                                        amount: amount>0?utils.formatAmountInput(amount):'',
                                    });
                                })}
                            />
                        </View>
                        <View style={[styles.requestRowInputBox,{flexDirection: 'row', marginTop:5}]}>
                            <View style={styles.requestRowAmtLabelBox}>
                                <Text style={styles.requestRowAmtLabel}>{utils.getCurrencyUnitUpcase(this.props.currency_type)}</Text>
                            </View>
                            <TextInput
                                ref={'_input_amount'}
                                underlineColorAndroid='transparent'
                                style={[styles.requestRowInput,{paddingLeft:10}]}
                                keyboardType='numeric'
                                returnKeyType='next'
                                onSubmitEditing={()=>this.refs._input_email.focus()}
                                placeholder={'Enter amount in '+utils.getCurrencyUnitUpcase(this.props.currency_type)}
                                value={this.state.amount || ''}
                                onBlur={this.verifyAmount.bind(this)}
                                onChangeText={(amount) => this.setState({amount},()=>{
                                    amount = utils.toOrginalNumber(amount);
                                    if(isNaN(amount)) amount=0;
                                    let fiat_amount = utils.toOrginalNumber(
                                        utils.cryptoToOtherCurrency(amount, this.props.fiat_per_value, 0)
                                    );
                                    this.setState({
                                        fiat_amount: fiat_amount>0?utils.formatAmountInput(fiat_amount):''
                                    });
                                })}
                            />
                        </View>
                        <Text style={styles.requestRowLabel}>Email address</Text>
                        <View style={styles.hr}/>
                        <View style={styles.requestRowInputBox}>
                            <TextInput
                                ref={'_input_email'}
                                underlineColorAndroid='transparent'
                                style={styles.requestRowInput}
                                keyboardType='email-address'
                                returnKeyType='next'
                                autoCapitalize={'none'}
                                autoCorrect={false}
                                placeholder='Enter email address'
                                onBlur={this.verifyAddress.bind(this)}
                                value={this.state.email || ''}
                                onChangeText={(email) => this.setState({email})}
                            />
                            {this.state.isVerify?<Icon style={{
                                    color: 'green',
                                    fontSize: 30,
                                    position: 'absolute',
                                    right: 7,
                                    top :8
                                }} name='check-circle-o' />:null}
                        </View>
                        <View style={styles.requestRowActionLinkTab}>
                            <TouchableOpacity style={styles.requestRowActionLink}
                                onPress={async()=>{
                                    let email = await Clipboard.getString();
                                    if(email)this.setState({email});
                                }}>
                                <Icon style={styles.requestRowActionLinkIcon} name='paste'/>
                                <Text  style={styles.requestRowActionLinkLabel}>Paste from Clipboard</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.requestRowLabel}>Note</Text>
                        <View style={styles.hr}/>
                        <View style={[styles.requestRowInputBox,{height: 60}]}>
                            <TextInput
                                ref={'_input_note'}
                                multiline = {true}
                                numberOfLines = {2}
                                returnKeyType='done'
                                underlineColorAndroid='transparent'
                                style={styles.requestRowInput}
                                placeholder={'Enter note (optional)'}
                                value={this.state.note || ''}
                                maxLength={50}
                                onChangeText={(note) => note.length <= 50 &&
                                    this.setState({note})}
                            />
                        </View>
                        <Text style={styles.requestRowNote}>Max Characters 50</Text>
                        <Button
                            style={{width: 150, alignItems:'center', marginTop:10}}
                            onPress={this.confirmRequest.bind(this)}
                            value='Request' />
                    </View>
                </Content>
                <WalletMenu onPress={()=>this.setState({showMenu:false})}
                    selected='Request'
                    visible={this.state.showMenu}
                    badgePending={this.props.totalPending}
                    currency_type={this.props.currency_type}
                    navigation={this.props.navigation} />
                <WalletFooter selected='Request'
                    nightMode={this.props.nightMode}
                    navigation={this.props.navigation} />
                <Loader show={this.props.loading} />
                <Modal
                    transparent={true}
                    visible={!!this.state.visible}
                    onRequestClose={()=>this.setState({visible:false})}>
                    <View style={styles.reqDetailModal}>
                        <View style={styles.reqDetailBox}>
                            <View style={styles.reqDetailHeader}>
                                <Text style={styles.reqDetailTitle}>Confirm Payment Request</Text>
                                <Text style={styles.reqDetailCloseIcon} onPress={()=>this.setState({visible:false})} >X</Text>
                            </View>
                            <View style={styles.reqDetailBody}>
                                <Text style={styles.reqAmtText}>{this.state.amount} {utils.getCurrencyUnitUpcase(this.props.currency_type)}</Text>
                                <Text style={styles.reqFiatAmtText}>≈ {utils.getCurrencySymbol(this.props.fiat_currency)} {this.state.fiat_amount}</Text>
                                <Icon style={styles.reqDownArrow} name='arrow-down'/>
                                <View style={styles.reqDetailRow}>
                                    <Image style={styles.reqDetailIcon}
                                        source={this.state.search_wallet && this.state.search_wallet.profile_pic_url?
                                            {uri:PROFILE_URL+this.state.search_wallet.profile_pic_url}:
                                            utils.getCurrencyIcon(this.props.currency_type)} />
                                    <View>
                                        <Text style={styles.reqDetailText}>{this.state.search_wallet?this.state.search_wallet.display_name:''}</Text>
                                        <Text style={styles.reqDetailText}>{this.state.search_wallet?this.state.search_wallet.email:''}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <Button
                                    onPress={()=>this.setState({visible:false})}
                                    style={[styles.reqBtn,{backgroundColor: this.props.nightMode?'#b98e1b':'#EFEFEF'}]}
                                    textstyle={[styles.reqBtnLabel,{color: this.props.nightMode?'#191714':'#333'}]}
                                    value='Cancel' />
                                <Button
                                    onPress={()=>this.setState({visible:false},
                                        ()=>this.props.addMoneyRequest(utils.toOrginalNumber(this.state.amount),
                                            this.state.search_wallet.email,
                                            this.state.search_wallet.username,
                                            this.state.note
                                        ))}
                                    style={styles.reqBtn}
                                    textstyle={styles.reqBtnLabel}
                                    value='Request' />
                            </View>
                        </View>
                    </View>
                </Modal>
            </Container>
        );
    }
}

function mapStateToProps({params}) {
    return {
        loading: params.loading,
        search_wallet: params.search_wallet || null,
        balance: params.balance || 0,
        sbalance: params.sbalance || 0,
        currency_type: params.currency_type,
        fiat_currency: params.fiat_currency,
        fiat_balance: params.fiat_balance,
        fiat_per_value: params.fiat_per_value,
        thresholdAmount: params.thresholdAmount,
        totalPending: params.totalPending,
        nightMode: params.nightMode,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Request);
