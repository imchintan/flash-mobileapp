/**
 * Chat Room Container
 */

import React, {Component} from 'react';
import {
    View,
    Alert,
    TouchableOpacity,
    Platform,
    Dimensions,
    Image,
    BackHandler,
    TextInput,
    Linking
} from 'react-native';
import {
    Header,
    HeaderLeft,
    HeaderRight,
    Icon,
    Text,
    Loader,
    Button,
    Modal,
    Toast
} from '@components';
import moment from 'moment-timezone'
import * as utils from '@lib/utils';
import * as constants from '@src/constants';
import { PROFILE_URL } from '@src/config';
import { GiftedChat, Actions } from 'react-native-gifted-chat'
import Chat from '@helpers/chatHelper';
import CustomView from './CustomView';
import Premium from 'Premium';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ActionCreators} from '@actions';

const { width } = Dimensions.get('window');

class ChatRoom extends Component < {} > {

    static navigationOptions = {
        header: null,
        gesturesEnabled: true,
    }

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidUpdate(prevProps, prevState){
        if(this.props.chatRoomChannel &&
            this.props.chatRoomChannel.ty == 2 && (!prevProps.chatRoomChannel ||
            (this.props.chatRoomChannel.s != prevProps.chatRoomChannel.s))){
            this.props.getHTMTrade(this.props.chatRoomChannel.ti, true);
        }

        if(this.props.htm_trade !== null && this.props.htm_trade !== prevProps.htm_trade){
            if((this.props.htm_trade.status == 4 &&
                this.props.htm_trade.first_payer == this.props.htmProfile.username) ||
                (this.props.htm_trade.status == 5 &&
                    this.props.htm_trade.second_payer == this.props.htmProfile.username)){
                let isInitByMe = (this.props.htm_trade.username == this.props.htmProfile.username);
                let currency_type = isInitByMe?
                    this.props.htm_trade.to_currency:this.props.htm_trade.base_currency;
                let fiat_currency = !isInitByMe?
                    this.props.htm_trade.to_currency:this.props.htm_trade.base_currency;
                let amount = isInitByMe?
                    this.props.htm_trade.to_amount:this.props.htm_trade.base_amount;
                let fiat_amount = !isInitByMe?
                    this.props.htm_trade.to_amount:this.props.htm_trade.base_amount;
                let fee = 0;
                let fiat_amount_fee = 0;

                if(this.mount)this.setState({
                    currency_type,
                    amount,
                    fee,
                    fiat_currency,
                    fiat_amount,
                    fiat_amount_fee
                });
                this.props.searchWallet((this.props.htm_trade.status == 4?
                    this.props.htm_trade.second_payer_email:this.props.htm_trade.first_payer_email),
                     false, currency_type);
                if(currency_type !== constants.CURRENCY_TYPE.FLASH
                    && currency_type !== constants.CURRENCY_TYPE.ETH
                    && currency_type !== constants.CURRENCY_TYPE.DASH){
                    this.props.setBcMedianTxSize(currency_type);
                    this.props.setSatoshiPerByte(currency_type);
                }

                if(currency_type !== constants.CURRENCY_TYPE.FLASH)
                    this.props.setThresholdAmount(currency_type);

                if(currency_type === constants.CURRENCY_TYPE.DASH)
                    this.props.setFixedTxnFee(currency_type);

                if(currency_type === constants.CURRENCY_TYPE.ETH)
                    this.props.setEtherGasValues(currency_type);
            }
        }
        if(this.props.search_wallet !== null && this.props.search_wallet !== prevProps.search_wallet){
            if(this.mount)this.setState({
                search_wallet: this.props.search_wallet,
                publicAddress: this.props.search_wallet.address
            });
        }

        if(this.props.decryptedWallet && this.props.decryptedWallet !== prevProps.decryptedWallet){
            this.sendMoney(true);
        }

        if(this.props.sendTxnSuccess){
            if(this.mount)this.setState({sendTxnSuccess:this.props.sendTxnSuccess, visibleMsg: true, isConfirm: false});
            this.props.resetMessages();
            this.props.getHTMTrade(this.props.chatRoomChannel.ti);
        }
    }

    componentDidMount() {
        this.mount = true;
        if(this.props.chatRoomChannel && this.props.chatRoomChannel.ai)
            this.props.getHTMTrade(this.props.chatRoomChannel.ti);
        this.props.getChatMessages();
        this.props.markAsRead();
        Chat.addListener('nm',this._chatHandler);
        BackHandler.addEventListener('hardwareBackPress', this.backHandler.bind(this));
    }

    componentWillUnmount(){
        this.mount = false;
        Chat.removeListener('nm',this._chatHandler);
        BackHandler.removeEventListener('hardwareBackPress', this.backHandler.bind(this));
        if(!this.props.forceFeedBack)
            global.store.dispatch({
                type: 'RESET_CHAT_OBJECT',
                payload: {
                    chatRoomChannel: null
                }
            })
    }

    backHandler(){
        this.props.navigation.goBack();
        return this.mount;
    }

    _chatHandler=(d)=>{
        this.props.receiveChatMessage(d);
        this.props.markAsRead();
    }

    sendMoney(force=false){
        if(!force && !this.props.decryptedWallet){
            if(!this.state.password)
                return this.setState({visible:false, visibleGetPassword: true, password: '', errorMsg: ''});
            else
                return this.setState({visible:false},this.decryptWallet);
        }
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
            this.props.rawTransaction(amount, fee, this.state.publicAddress, '',
                receiver_bare_uid, receiver_id, 0, this.state.currency_type, this.props.htm_trade.id);
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
            ()=>this.props.decryptWallet(this.state.currency_type,this.state.password,true,true));
    }

    renderCustomActions(props) {
        const options = {
            'Share Location': (props) => {
                this.props.navigation.navigate('ShareLocation');
            },
            'Cancel': () => {},
        };
        return (
            <Actions
                {...props}
                options={options}
            />
        );
    }

    renderCustomView(props) {
        return (
            <CustomView
                {...props}
            />
        );
    }

    renderTradeDetail(styles) {
        let isInitByMe = (this.props.htm_trade.username == this.props.htmProfile.username);
        const v1 = utils.flashNFormatter(this.props.htm_trade.to_amount || 0,2) + ' ' +
        utils.getCurrencyUnitUpcase(this.props.htm_trade.to_currency);
        const v2 = utils.flashNFormatter(this.props.htm_trade.base_amount || 0,2) + ' ' +
        utils.getCurrencyUnitUpcase(this.props.htm_trade.base_currency);
        let first_trader_currency_type = ((this.props.htm_trade.first_payer == this.props.htmProfile.username && isInitByMe) ||
            (this.props.htm_trade.first_payer !== this.props.htmProfile.username && !isInitByMe))?
            this.props.htm_trade.to_currency:this.props.htm_trade.base_currency;
        let second_trader_currency_type = ((this.props.htm_trade.second_payer == this.props.htmProfile.username && isInitByMe) ||
            (this.props.htm_trade.second_payer !== this.props.htmProfile.username && !isInitByMe))?
            this.props.htm_trade.to_currency:this.props.htm_trade.base_currency;
        return (
            <View style={styles.tradeDetailTab}>
                <Text style={styles.tradeDetailTitle}>
                    Trading { (isInitByMe?v1:v2) + ' against ' + (isInitByMe?v2:v1)}
                </Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View>
                        <Text style={styles.tradeDetailRate}>Rate: {(this.props.htm_trade.rate>1?
                            (1/this.props.htm_trade.rate).toFixed(8):
                            this.props.htm_trade.rate.toFixed(8)) + ' ' +
                            utils.getCurrencyUnitUpcase(this.props.htm_trade.rate>1?this.props.htm_trade.to_currency:
                                this.props.htm_trade.base_currency) + ' / ' +
                            utils.getCurrencyUnitUpcase(this.props.htm_trade.rate>1?this.props.htm_trade.base_currency:
                                this.props.htm_trade.to_currency)}
                        </Text>
                        {this.props.htm_trade.status ==1 && isInitByMe &&
                        <Text style={styles.tradeDetailRate}>
                            Waiting for trader
                        </Text>}
                        {((this.props.htm_trade.status == 4 &&
                            this.props.htm_trade.first_payer !== this.props.htmProfile.username) ||
                            (this.props.htm_trade.status == 5 &&
                                this.props.htm_trade.first_payer == this.props.htmProfile.username)) &&
                        <Text style={styles.tradeDetailRate}>
                            Waiting for payment from {this.props.htm.display_name}
                        </Text>}
                    </View>
                    {((this.props.htm_trade.status ==1 && isInitByMe) || (this.props.htm_trade.status == 4 &&
                        this.props.htm_trade.first_payer !== this.props.htmProfile.username)) &&
                    <Button
                        style={styles.tradeDetailBtn}
                        textstyle={styles.tradeDetailBtnText}
                        onPress={()=>this.setState({isCancel:true})}
                        value='Cancel' />}
                </View>
                {this.props.htm_trade.status ==1 && !isInitByMe &&
                <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginTop: 5}}>
                    <Button
                        style={[styles.tradeDetailGrayeBtn,{marginRight: 10}]}
                        textstyle={styles.tradeDetailBtnText}
                        onPress={()=>this.setState({isReject:true})}
                        value='Reject' />
                    <Button
                        onPress={()=>{
                            let currency_type = isInitByMe?
                                this.props.htm_trade.to_currency:this.props.htm_trade.base_currency;
                            let amount = isInitByMe?
                                this.props.htm_trade.to_amount:this.props.htm_trade.base_amount;
                            let balance = this.props.balances.filter(bal => bal.currency_type == currency_type)[0].amt;
                            if(currency_type == constants.CURRENCY_TYPE.FLASH){
                                balance = utils.satoshiToFlash(balance);
                            }
                            if(balance < amount){
                                return Toast.errorTop('You do not have enough '
                                +utils.getCurrencyUnitUpcase(currency_type)
                                +' to accept this trade request!');
                            }
                            Alert.alert(
                                'Trade #'+this.props.chatRoomChannel.name,
                                'Are you sure, you want to accept this trade request?',
                                [
                                    {text: 'YES', onPress: () => this.props.acceptHTMTrade()},
                                    {text: 'NO', style: 'cancel'},
                                ],
                                { cancelable: false }
                            );
                        }}
                        style={styles.tradeDetailBtn}
                        textstyle={styles.tradeDetailBtnText}
                        value='Accept' />
                </View>}
                {this.props.htm_trade.status >= 5 &&
                <View style={{flexDirection: 'row',marginTop:5}}>
                    {this.props.htm_trade.first_payer == this.props.htmProfile.username &&
                        <Text style={styles.tradeDetailRate}>
                            You paid {isInitByMe?v1:v2}
                        </Text>
                    }
                    {this.props.htm_trade.first_payer !== this.props.htmProfile.username &&
                        <Text style={styles.tradeDetailRate}>
                            Trader paid {isInitByMe?v2:v1}
                        </Text>
                    }
                    <Text style={{
                            marginLeft:5,
                            color: '#FFB400',
                            borderBottomWidth: 1,
                            borderBottomColor: '#FFB400'
                        }}
                        onPress={()=>Linking.openURL(utils
                        .getTransactionDetailURL(first_trader_currency_type,
                            this.props.htm_trade.first_txn_id))}>
                        View detail
                    </Text>
                </View>}
                {this.props.htm_trade.status == 7 &&
                <View style={{flexDirection: 'row',marginTop:5}}>
                    {this.props.htm_trade.second_payer == this.props.htmProfile.username &&
                        <Text style={styles.tradeDetailRate}>
                            You paid {isInitByMe?v1:v2}
                        </Text>
                    }
                    {this.props.htm_trade.second_payer !== this.props.htmProfile.username &&
                        <Text style={styles.tradeDetailRate}>
                            Trader paid {isInitByMe?v2:v1}
                        </Text>
                    }
                    <Text style={{
                            marginLeft:5,
                            color: '#FFB400',
                            borderBottomWidth: 1,
                            borderBottomColor: '#FFB400'
                        }}
                        onPress={()=>Linking.openURL(utils
                            .getTransactionDetailURL(second_trader_currency_type,
                                this.props.htm_trade.second_txn_id))}>
                        View detail
                    </Text>
                </View>}
                {this.props.htm_trade.status ==7 && !(this.props.chatRoomChannel && this.props.chatRoomChannel.f &&
                    typeof this.props.chatRoomChannel.f[this.props.htmProfile.username] !== 'undefined') &&
                <Button
                    style={[styles.tradeDetailBtn,{marginTop: 10}]}
                    textstyle={styles.tradeDetailBtnText}
                    onPress={()=>this.props.navigation.navigate('FeedBack')}
                    value='Provide Feeedback' />}
                {this.props.htm_trade.status ==7 && this.props.chatRoomChannel && this.props.chatRoomChannel.f &&
                    typeof this.props.chatRoomChannel.f[this.props.htmProfile.username] !== 'undefined' &&
                <Button
                    style={[styles.tradeDetailBtn,{marginTop: 10}]}
                    textstyle={styles.tradeDetailBtnText}
                    onPress={()=>this.props.navigation.navigate('ViewFeedBacks')}
                    value='View Feeedback' />}
                {((this.props.htm_trade.status ==4 &&
                    this.props.htm_trade.first_payer == this.props.htmProfile.username) ||
                (this.props.htm_trade.status ==5 &&
                    this.props.htm_trade.first_payer !== this.props.htmProfile.username)) &&
                <View style={this.props.htm_trade.status ==4?{
                    flexDirection: 'column',
                    alignItem: 'center',
                    marginTop: -3,
                }:{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItem: 'center',
                    marginTop: 5
                }}>
                    <Text style={[styles.tradeDetailPaymentText,
                        this.props.htm_trade.status ==5 && {marginBottom:5}]}>
                        You need to pay {isInitByMe?v1:v2}
                    </Text>
                    <View style={{flexDirection: 'row', justifyContent:'center', alignItem:'center'}}>
                        {this.props.htm_trade.status ==4 && <Button
                            style={[styles.tradeDetailGrayeBtn,{marginRight: 10}]}
                            textstyle={styles.tradeDetailBtnText}
                            onPress={()=>this.setState({isCancel:true})}
                            value='Cancel' />}
                        <Button
                            onPress={()=>this.setState({
                                visible:true,
                                fee: utils.calcFee(0,this.state.currency_type, this.props.bcMedianTxSize,
                                this.props.satoshiPerByte, this.props.fixedTxnFee)
                            })}
                            style={styles.tradeDetailBtn}
                            textstyle={styles.tradeDetailBtnText}
                            value='Pay Now' />
                    </View>
                </View>}
            </View>
        );
    }

    renderInputToolbar(styles){
        let msg=null;
        if(!this.props.htm_trade && this.props.chatRoomChannel &&
            !this.props.chatRoomChannel.a){
                msg = 'This trade is closed!';
        }else if(this.props.htm_trade){
            let isInitByMe = (this.props.htm_trade.username == this.props.htmProfile.username);
            if(this.props.htm_trade.status == 2){
                msg = isInitByMe?'You cancelled this trade.':'Requester cancelled this trade.';
            }else if(this.props.htm_trade.status == 3){
                msg = !isInitByMe?'You rejected this trade.':'Trader rejected this trade.';
            }else if(this.props.htm_trade.status == 7 && !this.props.chatRoomChannel.a){
                msg = 'This trade is closed!';
            }
        }
        if(msg) return () => (
            <Text style={styles.closeChat}>
                {msg}
            </Text>
        );

        return null;
    }

    render() {
        const styles = (this.props.nightMode?require('@styles/nightMode/chat'):require('@styles/chat'));
        const un = this.props.htm.username;
        const os = this.props.chatRoom?(this.props.chatRoom.os && this.props.chatRoom.os[un]):false;
        let textInputProps = {};
        if(Platform.OS !== 'ios'){
            textInputProps.value = null;
        }
        return (
            <View style={{flex:1, paddingTop: 55}}>
                <Header>
                    <HeaderLeft>
                        <TouchableOpacity>
                            <Icon onPress={this.backHandler.bind(this)}
                                style={styles.headerBackIcon} name='angle-left'/>
                        </TouchableOpacity>
                    </HeaderLeft>
                    <TouchableOpacity style={[styles.chatHeaderTitleBox,{
                        flexDirection: 'row',
                    }]} onPress={()=>this.props.navigation.navigate('TradeDetail',{isBack:true})}>
                        <Image
                            style={{
                                width: 40,
                                height: 40,
                                borderRadius: 20,
                                marginRight: 10
                            }}
                            source={this.props.htm.profile_pic_url?
                                {uri:PROFILE_URL+this.props.htm.profile_pic_url}:
                                utils.getCurrencyIcon(constants.CURRENCY_TYPE.FLASH)} />
                        <View>
                            <Text numberOfLines={1} style={styles.chatHeaderTitle}>
                                {this.props.htm.display_name}
                            </Text>
                            <Text numberOfLines={1} style={styles.chatHeaderSubTitle}>
                                {os?<Icon style={styles.chatProfileStatusIcon}
                                        name={'circle'}/>:null}
                                <Text>
                                    {(os?' online': 'last seen '+moment(this.props.htm.last_seen_at).fromNow())}
                                </Text>
                            </Text>
                        </View>
                    </TouchableOpacity>
                    {!this.props.forceFeedBack && this.props.chatRoomChannel &&
                        this.props.chatRoomChannel.ty != 2 && (!this.props.chatRoomChannel.f ||
                        typeof this.props.chatRoomChannel.f[this.props.htmProfile.username] == 'undefined')?
                    <HeaderRight>
                        <TouchableOpacity>
                            <Icon onPress={() => {
                                if(!!this.props.chatRoomChannel.f) this.props.navigation.navigate('FeedBack');
                                else Alert.alert(
                                    'Trade #'+this.props.chatRoomChannel.name,
                                    'Are you done with this trade?',
                                    [
                                        {text: 'YES', onPress: () => this.props.navigation.navigate('FeedBack')},
                                        {text: 'NO', style: 'cancel'},
                                    ],
                                    { cancelable: false }
                                )
                            }}
                                style={styles.headerFAIcon} name='check'/>
                        </TouchableOpacity>
                    </HeaderRight>:null}
                    {this.props.chatRoomChannel && this.props.chatRoomChannel.f &&
                        typeof this.props.chatRoomChannel.f[this.props.htmProfile.username] !== 'undefined'?
                    <HeaderRight>
                        <TouchableOpacity>
                            <Icon onPress={() => this.props.navigation.navigate('ViewFeedBacks')}
                                style={styles.headerFAIcon} name='info-circle'/>
                        </TouchableOpacity>
                    </HeaderRight>:null}
                </Header>
                {this.props.htm_trade && this.renderTradeDetail(styles)}
                <GiftedChat
                    renderActions={this.renderCustomActions.bind(this)}
                    renderCustomView={this.renderCustomView.bind(this)}
                    listViewProps={{
                        onEndReachedThreshold:10,
                        onEndReached:()=> !this.props.loading
                            && this.props.getChatMessages()
                    }}
                    textInputProps={textInputProps}
                    messages={[
                        ...[
                            this.props.htm_trade &&
                            (this.props.htm_trade.status == 2 || this.props.htm_trade.status == 3 ||
                            (this.props.htm_trade.status == 4 && this.props.htm_trade.first_payer == this.props.htmProfile.username))?{
                                _id: -1,
                                text: this.props.htm_trade.status == 4?
                                "Your profile has low rating than "+this.props.htm.display_name+". Hence, you need to initiate the trade first."
                                :((this.props.htm_trade.status == 2?'Cancellation':
                                'Rejection')+' reason: '+this.props.htm_trade.comment),
                                isCancel: this.props.htm_trade.status !== 4,
                                isFirstPay: (this.props.htm_trade.status == 4),
                                system: true,
                            }:{
                                _id: -2,
                                system: true,
                            }],
                        ...this.props.chatMessages,
                        {
                            _id: 2,
                            text: "🔒 Messages to this chat are secured with end-to-end encryption.",
                            system: true,
                        },
                        {
                            _id: 1,
                            text: this.props.chatRoomChannel && this.props.chatRoomChannel.ty == 2?
                            "It is strongly recommended to trade only if you trust trader, Please note by initiating this trade you are knowingly taking the risk and will be sole responsible for any kind of loss.":
                            "It's strongly recommended to trade with an unknown HTM user only after meeting at a safe public place.",
                            system: true,
                        }
                    ]}
                    onSend={messages => messages.map(message => !!message.text
                            && this.props.sendChatMessage(message.text))}
                    user={{
                      _id: this.props.htmProfile.id,
                    }}
                    renderSystemMessage={({currentMessage})=> currentMessage._id !== -2?
                        <Text style={[styles.chatSystemMessage,
                            !!currentMessage.isFirstPay && {
                                backgroundColor: '#ffa34e',
                                color:'#683100'
                            },!!currentMessage.isCancel && {
                                backgroundColor: '#d55',
                                color:'#fff'
                            },currentMessage._id == 1 && {marginTop: 10}]}>
                            {currentMessage.text}
                        </Text>:null
                    }
                    renderInputToolbar={this.renderInputToolbar(styles)}/>
                <Modal
                    transparent={true}
                    visible={!!this.state.isCancel || !!this.state.isReject}
                    onRequestClose={()=>this.setState({isCancel:false,isReject:false,errorMsg:''})}>
                    <View style={styles.reqDetailModal}>
                        <View style={styles.reqDetailBox}>
                            <View style={styles.reqDetailHeader}>
                                <Text style={styles.reqDetailTitle}>
                                {this.state.isCancel?'Cancel':'Reject'} Trade
                                </Text>
                                <Text style={styles.reqDetailCloseIcon}
                                    onPress={()=>this.setState({isCancel:false,isReject:false,errorMsg:''})}>X</Text>
                            </View>
                            <View style={styles.reqDetailBody}>
                                <View style={[styles.requestRowInputBox,{height:100}]}>
                                    <TextInput
                                        underlineColorAndroid='transparent'
                                        style={styles.requestRowInput}
                                        multiline = {true}
                                        numberOfLines = {2}
                                        placeholder={'Please give the '+(this.state.isCancel?
                                            'cancellation':'rejection')+' reason'}
                                        value={this.state.reason || ''}
                                        onChangeText={(reason) => this.setState({reason})}
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
                                    onPress={()=>this.setState({isCancel:false,isReject:false,errorMsg:''})}
                                    style={[styles.reqBtn,{backgroundColor: this.props.nightMode?'#b98e1b':'#EFEFEF'}]}
                                    textstyle={[styles.reqBtnLabel,{color: this.props.nightMode?'#191714':'#333'}]}
                                    value={this.state.isCancel?'Back':'Cancel'} />
                                <Button
                                    onPress={()=>{
                                        let msg = (this.state.reason || '').trim();
                                        if(!msg) return this.setState({errorMsg:'Reason required!'});
                                        this.setState({isCancel:false,isReject:false});
                                        if(this.state.isCancel){
                                            this.setState({isCancel:false,isReject:false});
                                            this.props.cancelHTMTrade(msg,(success)=>{
                                                this.setState({isCancel:!success,errorMsg:'',
                                                reason:!success?msg:''});
                                            })
                                        }else if(this.state.isReject){
                                            this.setState({isCancel:false,isReject:false});
                                            this.props.rejectHTMTrade(msg,(success)=>{
                                                this.setState({isReject:!success,errorMsg:'',
                                                reason:!success?msg:''});
                                            })
                                        }
                                    }}
                                    style={styles.reqBtn}
                                    textstyle={styles.reqBtnLabel}
                                    value={this.state.isCancel?'Next':'Reject'} />
                            </View>
                        </View>
                    </View>
                </Modal>
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
                                <Text style={styles.reqAmtText}>{this.state.amount} {utils.getCurrencyUnitUpcase(this.state.currency_type)}</Text>
                                <Text style={styles.reqFiatAmtText}>for {this.state.fiat_amount} {utils.getCurrencyUnitUpcase(this.state.fiat_currency)}</Text>
                                <Text style={styles.reqFeeText}>
                                    + {this.state.fee} {utils.getCurrencyUnitUpcase(this.state.currency_type)+' '} transaction fee
                                </Text>
                                <Icon style={styles.reqDownArrow} name='arrow-down'/>
                                {this.state.search_wallet &&
                                    <View style={styles.reqDetailRow}>
                                        <Image style={styles.reqDetailIcon}
                                            source={this.state.search_wallet.profile_pic_url?
                                                {uri:PROFILE_URL+this.state.search_wallet.profile_pic_url}:
                                                utils.getCurrencyIcon(this.props.currency_type)} />
                                        <View>
                                            <Text style={styles.reqDetailText}>
                                                {this.state.search_wallet.display_name}
                                            </Text>
                                            <Text style={[styles.reqDetailText,{maxWidth: width - 150}]}>
                                                {this.state.search_wallet.email}
                                            </Text>
                                        </View>
                                    </View>
                                }
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <Button
                                    onPress={()=>this.setState({visible:false})}
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
                                <Text style={styles.reqDetailCloseIcon}
                                    onPress={()=>this.setState({visibleGetPassword:false})}>X</Text>
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
                                        secureTextEntry={true}
                                        placeholder={'Enter your password'}
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
                                    color: this.props.nightMode?'#E9E9E9':'#333',
                                    marginBottom: 25,
                                }}>
                                    {this.state.currency_type === constants.CURRENCY_TYPE.FLASH?
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
                <Loader show={this.props.loading} style={{marginTop:55}} />
            </View>
        );
    }
}

function mapStateToProps({params}) {
    return {
        loading: params.loading,
        nightMode: params.nightMode,
        htm: params.htm || {},
        htm_trade: params.htm_trade || null,
        profile: params.profile,
        htmProfile: params.htmProfile,
        chatRoom: params.chatRoom,
        balances: params.balances || 0,
        chatRoomChannel: params.chatRoomChannel,
        chatMessages: params.chatMessages || [],
        forceFeedBack: params.forceFeedBack || false,
        search_wallet: params.search_wallet || null,
        bcMedianTxSize: params.trade_bcMedianTxSize || 250,
        satoshiPerByte: params.trade_satoshiPerByte || 20,
        thresholdAmount: params.trade_thresholdAmount || 0.00001,
        fixedTxnFee: params.trade_fixedTxnFee || 0.00002,
        decryptedWallet: params.trade_decryptedWallet || null,
        sendTxnSuccess: params.sendTxnSuccess || null,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);
