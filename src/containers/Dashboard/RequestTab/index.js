/**
 * Request Container
 */

import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    Image,
    Modal,
} from 'react-native';
import {
    Container,
    Content,
    Header,
    HeaderTitle,
    Icon,
    Button,
    Toast,
} from '@components';
import moment from 'moment-timezone';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '@actions';
import * as Validation from '@lib/validation';
import { PROFILE_URL } from '@src/config';
const styles = require("@styles/request");

class RequestTab extends Component<{}> {

    static navigationOptions = {
        header: null,
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

    resetState(){
        this.setState({
            email:'',
            amount:'',
            note:'',
            isVerify: false,
            isAmtVerify: false,
            search_wallet: null
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
        if(!this.state.isAmtVerify || parseFloat(this.state.amount) < 1){
            return Toast.errorTop("Amount must be at least 1");
        }
        this.setState({visible:true});
    }

    render() {
        return (
            <Container>
                <Header>
                    <HeaderTitle>Request</HeaderTitle>
                </Header>
                <Content bounces={false}>
                    <View style={styles.requestBox}>
                        <View style={styles.requestRow}>
                            <Text style={styles.requestRowLabel}>Email</Text>
                            <View style={styles.requestRowInputBox}>
                                <TextInput
                                    ref={'_input_email'}
                                    underlineColorAndroid='transparent'
                                    style={styles.requestRowInput}
                                    keyboardType='email-address'
                                    returnKeyType='next'
                                    placeholder='Enter email address'
                                    onBlur={this.verifyAddress.bind(this)}
                                    onSubmitEditing={()=>this.refs._input_amount.focus()}
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
                        </View>
                        <View style={styles.requestRow}>
                            <Text style={styles.requestRowLabel}>Amount</Text>
                            <View style={[styles.requestRowInputBox,{
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                                paddingLeft: 0
                            }]}>
                                <View style={styles.requestRowAmtLabelBox}>
                                    <Text style={styles.requestRowAmtLabel}>FLASH</Text>
                                </View>
                                <TextInput
                                    ref={'_input_amount'}
                                    underlineColorAndroid='transparent'
                                    style={[styles.requestRowInput,{paddingLeft:10}]}
                                    keyboardType='numeric'
                                    returnKeyType='next'
                                    placeholder='Enter amount'
                                    onBlur={this.verifyAmount.bind(this)}
                                    onSubmitEditing={()=>this.refs._input_amount.focus()}
                                    value={this.state.amount || ''}
                                    onChangeText={(amount) => this.setState({amount})}
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
                                    underlineColorAndroid='transparent'
                                    style={styles.requestRowInput}
                                    placeholder={'Enter note (optional)'}
                                    value={this.state.note || ''}
                                    onChangeText={(note) => note.length <= 50 && this.setState({note})}
                                />
                            </View>
                            <Text style={styles.requestRowNote}>Max Characters 50</Text>
                        </View>
                        <View style={[styles.requestRow,{flexDirection: 'row', justifyContent: 'center'}]}>
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
                                <Text style={styles.reqDetailTitle}>Confirm Payment Request</Text>
                                <Text style={styles.reqDetailCloseIcon} onPress={()=>this.setState({visible:false})} >X</Text>
                            </View>
                            <View style={styles.reqDetailBody}>
                                <Text style={styles.reqAmtText}>{this.state.amount} FLASH</Text>
                                <Icon style={styles.reqDownArrow} name='arrow-down'/>
                                <View style={styles.reqDetailRow}>
                                    <Image style={styles.reqDetailIcon}
                                        defaultSource={require("@images/app-icon.png")}
                                        source={this.state.search_wallet?(this.state.search_wallet.profile_pic_url?
                                            {uri:PROFILE_URL+this.state.search_wallet.profile_pic_url}:
                                            require('@images/app-icon.png')):require('@images/app-icon.png')} />
                                    <View>
                                        <Text style={styles.reqDetailText}>{this.state.search_wallet?this.state.search_wallet.display_name:''}</Text>
                                        <Text style={styles.reqDetailText}>{this.state.search_wallet?this.state.search_wallet.email:''}</Text>
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
                                        ()=>this.props.addMoneyRequest(this.state.amount,
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
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestTab);
