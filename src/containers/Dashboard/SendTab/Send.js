/**
 * Home Container
 */

import React, { Component } from 'react';
import {
  View,
  BackHandler,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  Dimensions
} from 'react-native';
import {
    Container,
    Header,
    HeaderLeft,
    HeaderTitle,
    Content,
    Icon,
    Text,
    Button,
    Toast
} from '@components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '@actions';
import * as Validation from '@lib/validation';
import * as utils from '@lib/utils';
import * as constants from '@src/constants';
import { PROFILE_URL } from '@src/config';
import Premium from 'Premium';

const { height, width } = Dimensions.get('window');
const styles = require("@styles/send");

class Send extends Component<{}> {

    static navigationOptions = {
        header: null,
    }

    componentWillReceiveProps(nextProps){
        if(nextProps){
            if(nextProps.sendTxnSuccess){
                this.setState({sendTxnSuccess:nextProps.sendTxnSuccess, visibleMsg: true, isConfirm: false});
                this.props.resetMessages();
            }
            if(nextProps.search_wallet && this.state.term &&
                this.state.term.toLowerCase() == nextProps.search_wallet.email.toLowerCase()){
                this.setState({
                    isVerify:true,
                    search_wallet:nextProps.search_wallet,
                    publicAddress:nextProps.search_wallet.address
                });
            }
            if(!nextProps.loading && this.props.loading !== nextProps.loading){
                this.resetState();
            }
            if(nextProps.decryptedWallets && this.props.decryptedWallets !== nextProps.decryptedWallets){
                this.sendMoney(true);
            }
        }
    }

    constructor(props) {
        super(props);
        let publicAddress = !!props.navigation.state.params?
            props.navigation.state.params.publicAddress: null;
        this.state = {
            term: publicAddress || null,
            publicAddress: publicAddress || null,
            fee: utils.calcFee(0,this.props.currency_type,this.props.bcMedianTxSize,this.props.satoshiPerByte),
            isVerify: false,
            isAmtVerify: false,
            isAddressVerify: false,
            search_wallet: null,
            sendTxnSuccess: null,
        };
    }

    componentDidMount(){
        BackHandler.addEventListener('hardwareBackPress', this.backHandler);

        if(this.props.currency_type !== constants.CURRENCY_TYPE.FLASH){
            this.props.setThresholdAmount();
            this.props.setBcMedianTxSize();
            this.props.setSatoshiPerByte();
        }            

        if(this.state.term){
            this.verifyAddress();
            this.refs._input_amount.focus();
        }else{
            this.refs._input_term.focus();
        }
    }

    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', this.backHandler);
    }

    backHandler=()=>{
        return this.props.navigation.goBack();
    }

    resetState(){
        this.setState({
            term:'',
            amount:'',
            note:'',
            fee: utils.calcFee(0,this.props.currency_type,this.props.bcMedianTxSize,this.props.satoshiPerByte),
            isVerify: false,
            isAddressVerify: false,
            isAmtVerify: false,
            search_wallet: null,
            publicAddress: null,
            errorMsg: null,
        });
    }

    verifyAmount(){
        this.setState({isAmtVerify: false});
        if(!this.state.amount) return false;
        let amount = utils.toOrginalNumber(this.state.amount);
        let res = Validation.amount(amount);
        if(!res.success){
            return Toast.errorTop(res.message);
        }
        this.setState({
            isAmtVerify: true,
            amount:utils.formatAmountInput(res.amount),
            fee: utils.calcFee(res.amount, this.props.currency_type,
                this.props.bcMedianTxSize, this.props.satoshiPerByte)
        });
    }

    verifyAddress(){
        if(this.state.term === this.props.profile.email ||
            this.state.term === this.props.wallet_address) return false;
        if(this.state.search_wallet &&
            this.state.search_wallet.email === this.state.term) return false;

        this.setState({isVerify:false, isAddressVerify:false,
            search_wallet:null, publicAddress: null});

        if(!this.state.term) return false;

        let res = Validation.email(this.state.term);
        if(res.success){
            return this.props.searchWallet(this.state.term);
        }

        res =Validation.cryptoAddress(this.state.term, this.props.currency_type);
        if(!res.success){
            return Toast.errorTop("Address is invalid!");
        }else{
            this.setState({isAddressVerify:true, publicAddress: this.state.term});
        }
    }

    confirmRequest(){
        if(!this.state.isVerify && !this.state.isAddressVerify){
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
        if(!amount.toString().match(/^(\d+\.?\d*|\.\d+)$/)){
            return Toast.errorTop("Amount must be a number");
        }
        let fee = utils.calcFee(amount, this.props.currency_type,
            this.props.bcMedianTxSize, this.props.satoshiPerByte);

        if(this.props.currency_type === constants.CURRENCY_TYPE.FLASH){
            if(amount < 1){
                return Toast.errorTop("Amount must be at least 1");
            }
            if(utils.flashToSatoshi(amount+fee) > this.props.balance){
                return Toast.errorTop("You do not have enough fee to make this payment");
            }
        }else{
            if(amount < this.props.thresholdAmount){
                return Toast.errorTop("Amount is less than threshold value");
            }
            if((amount+fee) > this.props.balance){
                return Toast.errorTop("You do not have enough fee to make this payment");
            }
        }

        this.setState({visible:true, fee});
    }

    sendMoney(force=false){
        if(!force && !this.props.decryptedWallets)
            return this.setState({visible:false, visibleGetPassword: true, password: '', errorMsg: ''});
        if(!this.state.isConfirm) return ;
        this.setState({visible:false, visibleGetPassword:false, isConfirm: false}, ()=>{
            let receiver_bare_uid =
                this.state.search_wallet?
                this.state.search_wallet.email:null;
            let receiver_id =
                this.state.search_wallet?
                this.state.search_wallet.username:null;
            let amount = utils.toOrginalNumber(this.state.amount);
            let fee = utils.toOrginalNumber(this.state.fee);
            this.props.rawTransaction(amount, fee, this.state.publicAddress,
                this.state.note, receiver_bare_uid, receiver_id);
        })
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
                    <HeaderTitle>
                        Send
                    </HeaderTitle>
                </Header>
                <Content>
                    <View style={styles.requestBox}>
                        <View style={styles.requestRow}>
                            <Text style={styles.requestRowLabel}>
                                Email/Public address
                            </Text>
                            <View style={styles.requestRowInputBox}>
                                <TextInput
                                    ref={'_input_term'}
                                    underlineColorAndroid='transparent'
                                    style={styles.requestRowInput}
                                    keyboardType='email-address'
                                    returnKeyType='next'
                                    placeholder='Enter email or public address'
                                    value={this.state.term}
                                    onBlur={this.verifyAddress.bind(this)}
                                    onSubmitEditing={()=>this.refs._input_amount.focus()}
                                    onChangeText={(term) => this.setState({term})}
                                />
                                {this.state.isVerify || this.state.isAddressVerify?
                                    <Icon style={{
                                        color: 'green',
                                        fontSize: 30,
                                        position: 'absolute',
                                        right: 7,
                                        top :8
                                    }} name='check-circle-o' />:null}
                            </View>
                        </View>
                        <View style={styles.requestRow}>
                            <Text style={styles.requestRowLabel}>Amount</Text>
                            <View style={[styles.requestRowInputBox,{
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                                paddingLeft: 0
                            }]}>
                                <View style={styles.requestRowAmtLabelBox}>
                                    <Text style={styles.requestRowAmtLabel}>{utils.getCurrencyUnitUpcase(this.props.currency_type)}</Text>
                                </View>
                                <TextInput
                                    ref={'_input_amount'}
                                    underlineColorAndroid='transparent'
                                    style={[styles.requestRowInput,{paddingLeft:10}]}
                                    keyboardType='numeric'
                                    returnKeyType='done'
                                    // onSubmitEditing={()=>this.refs._input_note.focus()}
                                    placeholder='Enter amount'
                                    value={this.state.amount || ''}
                                    onBlur={this.verifyAmount.bind(this)}
                                    onChangeText={(amount) => this.setState({amount})}
                                />
                            </View>
                        </View>
                        <View style={styles.requestRow}>
                            <Text style={styles.requestRowLabel}>Fee</Text>
                            <View style={[styles.requestRowInputBox,{
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                                paddingLeft: 0,
                                backgroundColor: '#EDEDED'
                            }]}>
                                <View style={styles.requestRowAmtLabelBox}>
                                    <Text style={styles.requestRowAmtLabel}>{utils.getCurrencyUnitUpcase(this.props.currency_type)}</Text>
                                </View>
                                <TextInput
                                    editable={false}
                                    underlineColorAndroid='transparent'
                                    style={[styles.requestRowInput,{paddingLeft:10}]}
                                    placeholder='Transaction Fee'
                                    value={this.state.fee.toString()}
                                />
                            </View>
                        </View>
                        <View style={styles.requestRow}>
                            <Text style={styles.requestRowLabel}>Note</Text>
                            <View style={[styles.requestRowInputBox,{height: 100}]}>
                                <TextInput
                                    ref={'_input_note'}
                                    multiline = {true}
                                    numberOfLines = {4}
                                    returnKeyType='done'
                                    underlineColorAndroid='transparent'
                                    style={styles.requestRowInput}
                                    placeholder={'Enter note (optional)'}
                                    value={this.state.note || ''}
                                    onChangeText={(note) => note.length <= 50 &&
                                        this.setState({note})}
                                />
                            </View>
                            <Text style={styles.requestRowNote}>Max Characters 50</Text>
                        </View>
                        <View style={[styles.requestRow,{flexDirection: 'row',
                            justifyContent: 'center'}]}>
                            <Button
                                onPress={this.confirmRequest.bind(this)}
                                value='Continue' />
                            <Button
                                onPress={this.resetState.bind(this)}
                                style={styles.requestRowClearBtn}
                                textstyle={styles.requestRowClearBtnTxt}
                                value='Clear' />
                        </View>
                    </View>
                </Content>
                <Modal
                    transparent={true}
                    visible={!!this.state.visible}
                    onRequestClose={()=>this.setState({visible:false})}>
                    <View style={styles.reqDetailModal}>
                        <View style={styles.reqDetailBox}>
                            <View style={styles.reqDetailHeader}>
                                <Text style={styles.reqDetailTitle}>Confirm Transaction</Text>
                                <Text style={styles.reqDetailCloseIcon}
                                    onPress={()=>this.setState({visible:false})} >X</Text>
                            </View>
                            <View style={styles.reqDetailBody}>
                                <Text style={styles.reqAmtText}>{this.state.amount} {utils.getCurrencyUnitUpcase(this.props.currency_type)}</Text>
                                <Text style={styles.reqFeeText}>
                                    + {this.state.fee} {utils.getCurrencyUnitUpcase(this.props.currency_type)} transaction fee
                                </Text>
                                <Icon style={styles.reqDownArrow} name='arrow-down'/>
                                <View style={styles.reqDetailRow}>
                                    <Image style={styles.reqDetailIcon}
                                        source={this.state.search_wallet && this.state.search_wallet.profile_pic_url?
                                            {uri:PROFILE_URL+this.state.search_wallet.profile_pic_url}:
                                            utils.getCurrencyIcon(this.props.currency_type)} />
                                    <View>
                                        {this.state.search_wallet?
                                            <Text style={styles.reqDetailText}>
                                                {this.state.search_wallet?this.state.search_wallet.display_name:''}
                                            </Text>:null
                                        }
                                        <Text style={[styles.reqDetailText,{maxWidth: width - 150}]}>
                                            {this.state.term}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <Button
                                    onPress={()=>this.setState({visible:false})}
                                    style={[styles.reqBtn,{backgroundColor: '#EFEFEF'}]}
                                    textstyle={[styles.reqBtnLabel,{color:'#333'}]}
                                    value='Cancel' />
                                <Button
                                    onPress={()=>this.setState({isConfirm: true},this.sendMoney.bind(this))}
                                    style={styles.reqBtn}
                                    textstyle={styles.reqBtnLabel}
                                    value='Send' />
                            </View>
                        </View>
                    </View>
                </Modal>
                <Modal
                    transparent={true}
                    visible={!!this.state.visibleGetPassword}
                    onRequestClose={()=>this.setState({visibleGetPassword:false})}>
                    <View style={styles.reqDetailModal}>
                        <View style={styles.reqDetailBox}>
                            <View style={styles.reqDetailHeader}>
                                <Text style={styles.reqDetailTitle}>Password</Text>
                                <Text style={styles.reqDetailCloseIcon}
                                    onPress={()=>this.setState({visibleGetPassword:false})}>X</Text>
                            </View>
                            <View style={styles.reqDetailBody}>
                                <Text style={{
                                    fontSize: 15,
                                    color: '#333',
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
                                        value={this.state.password || ''}
                                        onChangeText={(password) => this.setState({password})}
                                    />
                                </View>
                                {!!this.state.errorMsg?<Text style={{
                                    fontSize: 15,
                                    color: 'red',
                                    paddingHorizontal: 10,
                                    marginTop: 5,
                                }}>{this.state.errorMsg}</Text>:null}
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <Button
                                    onPress={()=>this.setState({visibleGetPassword:false})}
                                    style={[styles.reqBtn,{backgroundColor: '#EFEFEF'}]}
                                    textstyle={[styles.reqBtnLabel,{color:'#333'}]}
                                    value='Cancel' />
                                <Button
                                    onPress={()=>{
                                        if(!this.state.password){
                                            return this.setState({errorMsg:'Password is invalid!'});
                                        }
                                        try{
                                            Premium.xaesDecrypt(this.state.password, this.props.profile.privateKey);
                                        }catch(e){
                                            return this.setState({errorMsg:'Password is invalid!'});
                                        }
                                        this.setState({visibleGetPassword:false, errorMsg:''},
                                            ()=>this.props.decryptWallets(this.state.password));
                                    }}
                                    style={styles.reqBtn}
                                    textstyle={styles.reqBtnLabel}
                                    value='Send' />
                            </View>
                        </View>
                    </View>
                </Modal>
                <Modal
                    transparent={true}
                    visible={!!this.state.visibleMsg}
                    onRequestClose={()=>this.setState({visibleMsg:false})}>
                    <View style={styles.reqDetailModal}>
                        <View style={styles.reqDetailBox}>
                            <View style={styles.reqDetailHeader}>
                                <Text style={styles.reqDetailTitle}>Transaction Successful</Text>
                                <Text style={styles.reqDetailCloseIcon}
                                    onPress={()=>this.setState({visibleMsg:false})}>X</Text>
                            </View>
                            <View style={styles.reqDetailBody}>
                                <Text style={{
                                    fontSize: 15,
                                    color: '#333',
                                    marginBottom: 25,
                                }}>
                                    {this.props.currency_type === constants.CURRENCY_TYPE.FLASH?
                                    ('Processing time: '+(this.state.sendTxnSuccess?
                                            Number(this.state.sendTxnSuccess.processing_duration)
                                            .toFixed(3):'0.000')+" second(s)\n\n"):''}
                                    Your transaction will appear in your activity tab shortly.
                                </Text>
                                <Button
                                    onPress={()=>this.setState({visibleMsg:false,sendTxnSuccess:null, isConfirm: false})}
                                    style={styles.reqBtn}
                                    textstyle={styles.reqBtnLabel}
                                    value='Close' />
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
        profile: params.profile || null,
        balance: params.balance || 0,
        currency_type: params.currency_type,
        bcMedianTxSize: params.bcMedianTxSize,
        satoshiPerByte: params.satoshiPerByte,
        thresholdAmount: params.thresholdAmount,
        wallet_address: params.wallet_address || null,
        sendTxnSuccess: params.sendTxnSuccess || null,
        decryptedWallets: params.decryptedWallets || null,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Send);
