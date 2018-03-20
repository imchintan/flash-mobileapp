/**
 * Home Container
 */

import React, { Component } from 'react';
import {
  View,
  Text,
  BackHandler,
  TextInput,
  Image,
  Modal
} from 'react-native';
import {
    Container,
    Header,
    HeaderLeft,
    HeaderTitle,
    Content,
    Icon,
    Button,
    Toast
} from '@components';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '@actions';
import * as Validation from '@lib/validation';
const styles = require("@styles/send");

class Send extends Component<{}> {

    static navigationOptions = {
        header: null,
    }

    componentWillReceiveProps(nextProps){
        if(nextProps){
            if(nextProps.sendTxnSuccess){
                this.setState({sendTxnSuccess:nextProps.sendTxnSuccess, visibleMsg: true});
                this.props.resetMessages();
            }
            if(nextProps.search_wallet
                && this.state.term == nextProps.search_wallet.email){
                this.setState({
                    isVerify:true,
                    search_wallet:nextProps.search_wallet,
                    publicAddress:nextProps.search_wallet.address
                });
            }
            if(!nextProps.loading && this.props.loading !== nextProps.loading){
                this.resetState();
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
            isVerify: false,
            isAmtVerify: false,
            isAddressVerify: false,
            search_wallet: null,
            sendTxnSuccess: null,
        };
    }

    componentWillMount(){
        this.childNav={};
        this.currentState = 'Scan';
        BackHandler.addEventListener('hardwareBackPress', this.backHandler);
    }

    componentDidMount(){
        this.verifyAddress();
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
            isVerify: false,
            isAddressVerify: false,
            isAmtVerify: false,
            search_wallet: null,
        });
    }

    verifyAmount(){
        this.setState({isAmtVerify: false});
        if(!this.state.amount) return false;

        let res = Validation.amount(this.state.amount);
        if(!res.success){
            return Toast.errorTop(res.message);
        }

        this.setState({isAmtVerify: true, amount:res.amount});
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

        res =Validation.flashAddress(this.state.term);
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
        if(!this.state.isAmtVerify){
            return Toast.errorTop("Amount must be at least 1");
        }
        this.setState({visible:true});
    }

    render() {
        return (
            <Container>
                <Header>
                    <HeaderLeft>
                        <Icon onPress={()=>this.props.navigation.goBack()}
                            style={styles.headerBackIcon} name='angle-left' />
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
                                    underlineColorAndroid='transparent'
                                    style={styles.requestRowInput}
                                    keyboardType='email-address'
                                    placeholder='Enter email or public address'
                                    value={this.state.term}
                                    onBlur={this.verifyAddress.bind(this)}
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
                                paddingLeft: 0
                            }]}>
                                <Text style={styles.requestRowAmtLabel}>FLASH</Text>
                                <TextInput
                                    underlineColorAndroid='transparent'
                                    style={[styles.requestRowInput,{paddingLeft:10}]}
                                    keyboardType='numeric'
                                    placeholder='Enter amount'
                                    value={this.state.amount || ''}
                                    onBlur={this.verifyAmount.bind(this)}
                                    onChangeText={(amount) => this.setState({amount})}
                                />
                            </View>
                        </View>
                        <View style={styles.requestRow}>
                            <Text style={styles.requestRowLabel}>Note</Text>
                            <View style={[styles.requestRowInputBox,{height: 100}]}>
                                <TextInput
                                    multiline = {true}
                                    numberOfLines = {4}
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
                                <Icon style={styles.reqDetailCloseIcon}
                                    onPress={()=>this.setState({visible:false})} name='close' />
                            </View>
                            <View style={styles.reqDetailBody}>
                                <Text style={styles.reqAmtText}>{this.state.amount} FLASH</Text>
                                <Text style={styles.reqFeeText}>
                                    + 0.001 FLASH transaction fee
                                </Text>
                                <Icon style={styles.reqDownArrow} name='arrow-down'/>
                                <View style={styles.reqDetailRow}>
                                    <Image style={styles.reqDetailIcon}
                                        defaultSource={require("@images/app-icon.png")}
                                        source={this.state.search_wallet?
                                            (this.state.search_wallet.profile_pic_url?
                                            {uri:this.state.search_wallet.profile_pic_url}:
                                            require('@images/app-icon.png'))
                                            :require('@images/app-icon.png')} />
                                    <View>
                                        {this.state.search_walle?
                                            <Text style={styles.reqDetailText}>
                                                {this.state.search_wallet?this.state.search_wallet.display_name:''}
                                            </Text>:null
                                        }
                                        <Text style={styles.reqDetailText}>
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
                                    onPress={()=>this.setState({visible:false},
                                        ()=>{
                                            let receiver_bare_uid =
                                                this.state.search_wallet?
                                                this.state.search_wallet.email:null;
                                            let receiver_id =
                                                this.state.search_wallet?
                                                this.state.search_wallet.username:null;

                                            this.props.rawTransaction(this.state.amount,
                                                this.state.publicAddress, this.state.note,
                                                receiver_bare_uid, receiver_id);
                                        })
                                    }
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
                                <Icon style={styles.reqDetailCloseIcon}
                                    onPress={()=>this.setState({visibleMsg:false})} name='close' />
                            </View>
                        </View>
                        <View style={styles.reqDetailBody}>
                            <Text style={{
                                fontSize: 15,
                                color: '#333',
                                marginBottom: 25,
                            }}>
                                Processing time: {this.state.sendTxnSuccess?
                                        Number(this.state.sendTxnSuccess.processing_duration)
                                        .toFixed(3):'0.000'} second(s){"\n\n"}
                                Your transaction will appear in your activity tab shortly.
                            </Text>
                            <Button
                                onPress={()=>this.setState({visibleMsg:false,sendTxnSuccess:null})}
                                style={styles.reqBtn}
                                textstyle={styles.reqBtnLabel}
                                value='Close' />
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
        wallet_address: params.wallet_address || null,
        sendTxnSuccess: params.sendTxnSuccess || null,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Send);
