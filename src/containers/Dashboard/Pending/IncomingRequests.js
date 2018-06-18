/**
 * Incoming Requests Container Tab
 */

import React, { Component } from 'react';
import {
  View,
  Image,
  FlatList,
  TextInput,
  RefreshControl
} from 'react-native';
import {
    Loader,
    Button,
    Text,
    RequestTab,
    Modal,
    Toast,
    Icon
} from '@components';
import moment from 'moment-timezone';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as utils from '@lib/utils';
import * as constants from '@src/constants';
import { ActionCreators } from '@actions';
import { PROFILE_URL } from '@src/config';
import Premium from 'Premium';

class IncomingRequests extends Component<{}> {

    static navigationOptions = ({ navigation, screenProps }) =>{
        return ({
            title:'Incoming'+(screenProps.inReqs_total > 0?` (${screenProps.inReqs_total})` :''),
        })
    }

    constructor(props) {
        super(props);
        this.state = {
            fee: utils.calcFee(0,this.props.currency_type, this.props.bcMedianTxSize,
                this.props.satoshiPerByte, this.props.fixedTxnFee),
            password: this.props.password || null,
        };
    }

    componentWillReceiveProps(nextProps){
        if(nextProps){
            if(nextProps.sendTxnSuccess){
                this.setState({sendTxnSuccess:nextProps.sendTxnSuccess, visibleMsg: true});
                this.props.resetMessages();
            }
            if(nextProps.search_wallet && nextProps.search_wallet !== this.props.search_wallet
                && this.state.req && this.state.req.sender_email == nextProps.search_wallet.email){
                this.setState({
                    visible: true,
                    isVerify:true,
                    search_wallet:nextProps.search_wallet,
                    publicAddress:nextProps.search_wallet.address
                });
            }
            if(!this.state.visible && !nextProps.loading && this.props.loading !== nextProps.loading){
                this.resetState();
            }
            if(nextProps.decryptedWallet && this.props.decryptedWallet !== nextProps.decryptedWallet){
                this.sendMoney(true);
            }
        }
    }

    resetState(){
        this.setState({
            isVerify: false,
            req: null,
            note: '',
            fee: utils.calcFee(0,this.props.currency_type, this.props.bcMedianTxSize,
                this.props.satoshiPerByte, this.props.fixedTxnFee),
            publicAddress: null,
            search_wallet: null,
            errorMsg: null,
        });
    }

    accept(req, note){
        if(this.props.currency_type !== constants.CURRENCY_TYPE.FLASH && this.props.currency_type !== constants.CURRENCY_TYPE.DASH){
            this.props.setBcMedianTxSize();
            this.props.setSatoshiPerByte();
        }
        if(this.props.currency_type !== constants.CURRENCY_TYPE.FLASH)
            this.props.setThresholdAmount();

        if(this.props.currency_type === constants.CURRENCY_TYPE.DASH)
            this.props.setFixedTxnFee();

        this.setState({req,note},
            ()=>this.props.searchWallet(req.sender_email, true));
    }

    sendMoney(force=false){
        if(!force && !this.props.decryptedWallet){
            if(!this.state.password)
                return this.setState({visible:false, visibleGetPassword: true, password: '', errorMsg: ''});
            else
                return this.setState({visible:false},this.decryptWallet);
        }
        if(!this.state.isConfirm) return ;
        let amount = utils.toOrginalNumber(this.state.req.amount);
        let fee = utils.calcFee(amount, this.props.currency_type, this.props.bcMedianTxSize,
                this.props.satoshiPerByte, this.props.fixedTxnFee);
        this.setState({visible:false, visibleGetPassword:false, isConfirm: false},
            ()=>{
                if(this.props.currency_type === constants.CURRENCY_TYPE.FLASH){
                    if(utils.flashToSatoshi(amount+fee) > this.props.balance){
                        this.resetState();
                        return Toast.errorTop("You do not have enough fee to make this payment");
                    }
                }else{
                    if((amount+fee) > this.props.balance){
                        this.resetState();
                        return Toast.errorTop("You do not have enough fee to make this payment");
                    }
                }

                let receiver_bare_uid =
                    this.state.search_wallet?
                    this.state.search_wallet.email:null;
                let receiver_id =
                    this.state.search_wallet?
                    this.state.search_wallet.username:null;
                this.props.rawTransaction(amount, fee, this.state.publicAddress,
                    this.state.note, receiver_bare_uid, receiver_id, this.state.req.id);
        })
    }

    decryptWallet(){
        if(!this.state.password){
            return this.setState({errorMsg:'Password is invalid!'});
        }

        try{
            Premium.xaesDecrypt(this.state.password, this.props.profile.privateKey);
        }catch(e){
            return this.setState({errorMsg:'Password is invalid!'});
        }

        this.props.customAction({loading:true, password: this.state.password});
        this.setState({visibleGetPassword:false, errorMsg:''},
            ()=>setTimeout(()=>this.props.decryptWallet(this.props.currency_type,this.state.password,true),0));
    }

    render() {
        const styles = (this.props.nightMode?require('@styles/nightMode/pending'):require('@styles/pending'));
        return (
            <View style={{flex:1}}>
                <FlatList
                    refreshControl={
                        <RefreshControl
                            colors={['#191714']}
                            tintColor='#191714'
                            refreshing={false}
                            onRefresh={()=>this.props.getIncomingRequests(0,true)}/>
                    }
                    style={styles.reqList}
                    showsVerticalScrollIndicator={false}
                    data={this.props.reqs}
                    keyExtractor={(req, index) => (index+'_'+req.id)}
                    onEndReachedThreshold={5}
                    onEndReached={()=>(this.props.reqs.length < this.props.total_reqs) &&
                        this.props.getIncomingRequests(this.props.reqs.length)}
                    renderItem={({item, index})=>
                        <RequestTab
                            req={item}
                            style={[!index && {marginTop:10}]}
                            nightMode={this.props.nightMode}
                            fiat_currency={this.props.fiat_currency}
                            fiat_per_value={this.props.fiat_per_value}
                            timezone={this.props.timezone}
                            reject={this.props.markRejectedMoneyRequests}
                            accept={this.accept.bind(this)}
                        />
                    }
                    ListEmptyComponent={()=>
                        <View>
                            <Text style={styles.reqListEmpty}>
                                There are no request in this date range.
                            </Text>
                            <Button value='Show All Requests'
                                onPress={()=>this.props.updateRequestReportDate(this.props.minDate,
                                    this.props.maxDate)}/>
                        </View>
                    }
                />
                <Modal
                    transparent={true}
                    visible={!!this.state.visible}
                    onRequestClose={()=>this.setState({visible:false}, this.resetState.bind(this))}>
                    <View style={styles.reqDetailModal}>
                        <View style={styles.reqDetailBox}>
                            <View style={styles.reqDetailHeader}>
                                <Text style={styles.reqDetailTitle}>Confirm Transaction</Text>
                                <Icon style={styles.reqDetailCloseIcon}
                                    onPress={()=>this.setState({visible:false})} name='close' />
                            </View>
                            <View style={styles.reqDetailBody}>
                                <Text style={styles.reqAmtText}>{this.state.req?this.state.req.amount:0.00} {this.state.req?
                                    utils.getCurrencyUnitUpcase(this.state.req.currency):
                                    utils.getCurrencyUnitUpcase(constants.CURRENCY_TYPE.FLASH)}</Text>
                                <Text style={styles.reqFiatAmtText}>≈ {utils.getCurrencySymbol(this.props.fiat_currency)} {utils.cryptoToOtherCurrency(this.state.req?this.state.req.amount:0.00, this.props.fiat_per_value, 0)}</Text>
                                <Text style={styles.reqFeeText}>
                                    + {this.state.fee} {this.state.req?utils.getCurrencyUnitUpcase(this.state.req.currency):
                                        utils.getCurrencyUnitUpcase(constants.CURRENCY_TYPE.FLASH)} transaction fee
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
                                                {this.state.search_wallet.display_name}
                                            </Text>:null
                                        }
                                        <Text style={styles.reqDetailText}>
                                            {this.state.req?this.state.req.sender_email:''}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <Button
                                    onPress={()=>this.setState({visible:false},this.resetState.bind(this))}
                                    style={[styles.reqBtn,{backgroundColor: this.props.nightMode?'#b98e1b':'#EFEFEF'}]}
                                    textstyle={[styles.reqBtnLabel,{color: this.props.nightMode?'#191714':'#333'}]}
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
                                <Icon style={styles.reqDetailCloseIcon}
                                    onPress={()=>this.setState({visibleGetPassword:false})} name='close' />
                            </View>
                            <View style={styles.reqDetailBody}>
                                <Text style={{
                                    fontSize: 15,
                                    color: this.props.nightMode?'#E9E9E9':'#333',
                                    textAlign: 'center',
                                    marginBottom: 15,
                                }}>
                                    For additional security check, Please enter your password.
                                </Text>
                                <View style={styles.requestRowInputBox}>
                                    <TextInput
                                        underlineColorAndroid='transparent'
                                        style={styles.requestRowInput}
                                        placeholder={'Enter your password'}
                                        secureTextEntry={true}
                                        value={this.state.password || ''}
                                        onChangeText={(password) => this.setState({password})}
                                        onSubmitEditing={this.decryptWallet.bind(this)}
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
                                    style={[styles.reqBtn,{backgroundColor: this.props.nightMode?'#b98e1b':'#EFEFEF'}]}
                                    textstyle={[styles.reqBtnLabel,{color: this.props.nightMode?'#191714':'#333'}]}
                                    value='Cancel' />
                                <Button
                                    onPress={this.decryptWallet.bind(this)}
                                    style={styles.reqBtn}
                                    textstyle={styles.reqBtnLabel}
                                    value='Confirm' />
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
                            <View style={styles.reqDetailBody}>
                                <Text style={{
                                    fontSize: 15,
                                    color: this.props.nightMode?'#E9E9E9':'#333',
                                    marginBottom: 25,
                                }}>
                                {this.props.currency_type === constants.CURRENCY_TYPE.FLASH?
                                ('Processing time: '+(this.state.sendTxnSuccess?
                                        Number(this.state.sendTxnSuccess.processing_duration)
                                        .toFixed(3):'0.000')+" second(s)\n\n"):''}
                                    Your transaction will appear in your activity tab shortly.
                                </Text>
                                <Button
                                    onPress={()=>this.setState({visibleMsg:false,sendTxnSuccess:null})}
                                    style={styles.reqBtn}
                                    textstyle={styles.reqBtnLabel}
                                    value='Close' />
                            </View>
                        </View>
                    </View>
                </Modal>
                <Loader show={this.props.inReqs_loading || this.props.loading} />
            </View>
        );
    }
}

function mapStateToProps({params}) {
  return {
      reqs: params.inReqs || [],
      total_reqs: params.inReqs_total || 0,
      inReqs_loading: params.inReqs_loading || false,
      loading: params.loading || false,
      profile: params.profile || null,
      balance: params.balance || 0,
      currency_type: params.currency_type,
      fiat_currency: params.fiat_currency,
      fiat_balance: params.fiat_balance,
      fiat_per_value: params.fiat_per_value,
      bcMedianTxSize: params.bcMedianTxSize,
      satoshiPerByte: params.satoshiPerByte,
      fixedTxnFee: params.fixedTxnFee,
      search_wallet: params.search_wallet || null,
      sendTxnSuccess: params.sendTxnSuccess || null,
      decryptedWallet: params.decryptedWallet || null,
      timezone: params.profile.timezone || moment.tz.guess(),
      minDate: moment(params.profile.created_ts),
      maxDate: moment(),
      nightMode: params.nightMode,
      password: params.password || null,
  };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(IncomingRequests);
