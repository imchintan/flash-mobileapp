/**
 * Event Detail Container
 */

import React, { Component } from 'react';
import {
    BackHandler,
    View,
    Image,
    RefreshControl,
    TouchableOpacity,
    DatePickerAndroid,
    TimePickerAndroid,
} from 'react-native';
import {
    Container,
    Content,
    Header,
    HeaderLeft,
    HeaderTitle,
    HeaderRight,
    Icon,
    Text,
    Button,
    Toast,
    Loader
} from '@components';
import moment from 'moment-timezone';
import Premium from 'Premium';
import * as Validation from '@lib/validation';
import * as utils from '@lib/utils';
import * as constants from '@src/constants';
import { APP_URL } from '@src/config';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '@actions';

import * as em from './EventModal';

class EventDetail extends Component<{}> {

    static navigationOptions = {
        header: null,
        gesturesEnabled: true,
    }
    constructor(props) {
        super(props);
        let data = {}
        if(this.props.oracleEvent.expires_on_ts > new Date().getTime()
            && this.props.profile.username == this.props.oracleEvent.username){
            data.description = this.props.oracleEvent.description;
            data.expires_on_ts = this.props.oracleEvent.expires_on_ts;
            data.display_expires_on_ts = moment(this.props.oracleEvent.expires_on_ts)
                .format('MMM DD, YYYY hh:mm A');
            data.ends_on_ts = this.props.oracleEvent.ends_on_ts;
            data.display_ends_on_ts = moment(this.props.oracleEvent.ends_on_ts)
                .format('MMM DD, YYYY hh:mm A');
        }
        this.state = {
            ...data,
            password: this.props.password || null,
        };
    }
    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.oracleEvent !== prevState.oracleEvent){
            return {description: nextProps.oracleEvent.description};
        }
        return null;
    }

    componentDidUpdate(prevProps, prevState){
        if(this.props.decryptedWallet !== null && prevProps.decryptedWallet == null){
            this.addOracleWager();
        }
    }

    componentDidMount(){
        this.isMount = true;
        this.props.getOracleEvent();
        BackHandler.addEventListener('hardwareBackPress', this.backHandler.bind(this));
        this.refreshTime = setInterval(()=>this.setState({refreshing:new Date().getTime()}),1000);
    }

    componentWillUnmount(){
        this.isMount = false;
        BackHandler.removeEventListener('hardwareBackPress', this.backHandler.bind(this));
        clearInterval(this.refreshTime);
    }

    backHandler(){
        this.props.navigation.goBack();
        return this.isMount;
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
            amount:utils.formatAmountInput(res.amount),
            fiat_amount: utils.formatAmountInput(fiat_amount),
        });
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
            ()=>this.props.decryptWallet(constants.CURRENCY_TYPE.FLASH,this.state.password));
    }

    addOracleWager(){
        let amt = utils.toOrginalNumber(this.state.amount);
        let minLimit = this.props.oracleEvent.min || 100;
        if(amt < minLimit)
            return Toast.errorTop("Amount must be greater than min limit.");

        if(this.props.oracleEvent.max !== 0 && amt > this.props.oracleEvent.max)
            return Toast.errorTop("Amount must be less than max limit.");

        if(utils.flashToSatoshi(amt) > this.props.balance){
            return Toast.errorTop("You don’t have enough FLASH to wager.");
        }

        if(!this.props.decryptedWallet){
            if(!this.state.password)
                return this.setState({visibleGetPassword: true, password: '', errorMsg: ''});
            else
                return this.decryptWallet();
        }

        this.props.addOracleWager(this.props.oracleEvent.id,
            this.props.oracleEvent.receiver_address, this.state.p, this.state.amount);

        setTimeout(()=>this.setState({p:null,amount:0}),1000);

    }

    async dateAndTimePicker(key){
        try{
            let dateRes = await DatePickerAndroid.open({
                // mode: 'spinner',
                date: new Date(this.state[key]),
                minDate: new Date()
            });
            if (dateRes.action !== DatePickerAndroid.dismissedAction) {
                let timerRes = await TimePickerAndroid.open({
                    // mode: 'spinner',
                    hour: new Date(this.state[key]).getHours(),
                    minute: new Date(this.state[key]).getMinutes(),
                    is24Hour: false, // Will display '2 PM'
                });
                if (timerRes.action !== TimePickerAndroid.dismissedAction) {
                    let dateStr = `${dateRes.year}-${(dateRes.month+1) < 10?
                     ('0'+(dateRes.month+1)):(dateRes.month+1)}-${dateRes.day < 10 ?
                    ('0'+dateRes.day):dateRes.day}`;
                    dateStr += ` ${timerRes.hour < 10 ? ('0'+timerRes.hour):timerRes.hour}:
                    ${timerRes.minute < 10 ?('0'+timerRes.minute):timerRes.minute}`;
                    let state = {};
                    state[key] = new Date(moment(dateStr)).getTime();
                    state[`display_${key}`] = moment(dateStr).format('MMM DD, YYYY hh:mm A');
                    this.setState(state);
                }
            }
        }catch(e){
            console.log(e);
        }
    }

    cancelEvent(){
        if(!this.state.cancel_reason || !this.state.cancel_reason.trim()){
            return Toast.errorTop("Please specify cancellation reason!");
        }
        this.props.declareOracleEventResult(this.props.oracleEvent.id, 3,
            null, this.state.cancel_reason);
    }

    updateEvent(){
        data={};
        if(this.state.expires_on_ts <= new Date().getTime()){
            return Toast.errorTop("Expire time is invalid!");
        }
        data.expires_on_ts = this.state.expires_on_ts;

        if(!this.state.ends_on_ts){
            return Toast.errorTop("Event end time is required!");
        }
        if(this.state.ends_on_ts <= new Date().getTime() ||
            this.state.ends_on_ts <= this.state.expires_on_ts){
            return Toast.errorTop("Event end time can not be earlier than expiry time.");
        }
        data.ends_on_ts = this.state.ends_on_ts;
        data.description = this.state.description || '';
        this.props.updateOracleEvent(this.props.oracleEvent.id,data);
    }

    render() {
        const styles = (this.props.nightMode?
            require('@styles/nightMode/wagering'):require('@styles/wagering'));
        const expire = this.props.oracleEvent.status == constants.ORACLE_EVENT.ACTIVE_WAITING_FOR_RESULT?
            utils.getExpierTime(this.props.oracleEvent.expires_on_ts):null;
        const odds = utils.getOdds(this.props.oracleEvent.p1_wagers,this.props.oracleEvent.p2_wagers);

        return (
            <Container>
                <Header>
                    <HeaderLeft>
                        <TouchableOpacity>
                            <Icon onPress={this.backHandler.bind(this)}
                                style={styles.headerBackIcon} name='angle-left' />
                        </TouchableOpacity>
                    </HeaderLeft>
                    <HeaderTitle>Event</HeaderTitle>
                    {(expire && this.props.profile.username == this.props.oracleEvent.username) &&
                    <HeaderRight>
                        <TouchableOpacity onPress={()=>this.setState({editEvent:true})}>
                            <Text style={styles.headerBtnText}>EDIT</Text>
                        </TouchableOpacity>
                    </HeaderRight>}
                </Header>
                <Content
                    refreshControl={
                        <RefreshControl
                            colors={['#191714']}
                            tintColor='#191714'
                            refreshing={false}
                            onRefresh={()=>this.props.getOracleEvent()}/>
                    }>
                    <View style={styles.eventDetail}>
                        <View style={styles.eventDetailTitle}>
                            {this.props.oracleEvent.event_pic_url && <Image
                                style={[styles.eventTabImage,{marginRight: 7}]}
                                source={{uri:APP_URL+'event/'+this.props.oracleEvent.event_pic_url}}/>}
                            <Text style={[styles.eventDetailTitleText, this.props.oracleEvent.event_pic_url && styles.eventDetailTitleTextWithImg]}>
                                {this.props.oracleEvent.event_name}
                            </Text>
                        </View>
                        <View style={styles.hr}/>
                        <Text style={styles.eventDetailCreatedBy}>
                            By {this.props.oracleEvent.company_name}
                        </Text>
                        <Text style={styles.eventDetailVol}>
                            Vol: {utils.flashNFormatter(this.props.oracleEvent.volume,2)+' FLASH '}
                            by {utils.flashNFormatter(this.props.oracleEvent.total_wagers,2)} wager
                        </Text>
                        <Text style={styles.eventDetailEndsOn}>
                            Ends on - {moment(this.props.oracleEvent.ends_on_ts)
                                .format('MMM DD, YYYY hh:mm A')}
                        </Text>
                        <Text style={styles.eventDetailEndsOn}>
                            Oracle Fees - {this.props.oracleEvent.fees}
                            {this.props.oracleEvent.fee_type == 0?' FLASH':'%'}
                        </Text>
                        {expire && <View>
                            <Text style={styles.eventExpiryOnLabel}>Expiring in</Text>
                            <Text style={styles.eventExpiryOnText}>
                                {expire}
                            </Text>
                        </View>}
                        <View style={styles.eventPlayerDetail}>
                            <View style={styles.eventPlayerDetailRow}>
                                <Text style={styles.eventPlayerDetailLabel}>
                                </Text>
                                <Text style={styles.eventPlayerDetailHeader}>
                                    Player 1
                                </Text>
                                <Text style={styles.eventPlayerDetailVs} />
                                <Text style={styles.eventPlayerDetailHeader}>
                                    Player 2
                                </Text>
                            </View>
                            <View style={styles.eventPlayerDetailRow}>
                                <Text style={styles.eventPlayerDetailLabel} />
                                <Text style={styles.eventPlayerDetailValue}>
                                    {this.props.oracleEvent.p1}
                                </Text>
                                <Text style={styles.eventPlayerDetailVs}>
                                    vs
                                </Text>
                                <Text style={styles.eventPlayerDetailValue}>
                                    {this.props.oracleEvent.p2}
                                </Text>
                            </View>
                            <View style={styles.eventPlayerDetailRow}>
                                <Text style={styles.eventPlayerDetailLabel}>
                                    Odds
                                </Text>
                                <Text style={styles.eventPlayerDetailValue}>
                                    {odds.p1}
                                </Text>
                                <Text style={styles.eventPlayerDetailVs}>
                                    :
                                </Text>
                                <Text style={styles.eventPlayerDetailValue}>
                                    {odds.p2}
                                </Text>
                            </View>
                            {this.props.oracleEvent.username !== this.props.profile.username && expire &&
                                this.props.oracleEvent.status == constants.ORACLE_EVENT.ACTIVE_WAITING_FOR_RESULT &&
                            <View style={styles.eventPlayerDetailRow}>
                                <Text style={styles.eventPlayerDetailLabel} />
                                <View style={styles.eventPlayerJoin}>
                                    <Button
                                        onPress={()=>this.setState({wager:true,p:this.props.oracleEvent.p1})}
                                        style={styles.eventPlayerJoinBtn}
                                        textstyle={styles.eventPlayerJoinBtnText}
                                        value='Wager'/>
                                    </View>
                                <Text style={styles.eventPlayerDetailVs}/>
                                <View style={styles.eventPlayerJoin}>
                                    <Button
                                        onPress={()=>this.setState({wager:true,p:this.props.oracleEvent.p2})}
                                        style={styles.eventPlayerJoinBtn}
                                        textstyle={styles.eventPlayerJoinBtnText}
                                        value='Wager'/>
                                </View>
                            </View>}
                            {this.props.oracleEvent.winner &&
                            <View style={styles.eventPlayerDetailRow}>
                                <Text style={styles.eventPlayerDetailLabel} />
                                <Text style={this.props.oracleEvent.winner == this.props.oracleEvent.p1?
                                    styles.eventPlayerDetailWon:styles.eventPlayerDetailLoss}>
                                    {this.props.oracleEvent.winner == this.props.oracleEvent.p1?'WON':'LOST'}
                                </Text>
                                <Text style={styles.eventPlayerDetailVs} />
                                <Text style={this.props.oracleEvent.winner == this.props.oracleEvent.p2?
                                    styles.eventPlayerDetailWon:styles.eventPlayerDetailLoss}>
                                    {this.props.oracleEvent.winner == this.props.oracleEvent.p2?'WON':'LOST'}
                                </Text>
                            </View>}
                        </View>

                        {this.props.oracleEvent.wagers && this.props.oracleEvent.wagers.length > 0 && <View>
                            <Text style={styles.label}>
                                My Wager
                            </Text>
                            <View style={styles.hr}/>
                            {this.props.oracleEvent.wagers.map((wager,i) =>
                                <View key={'_my_vager_'+i} style={styles.eventMyWagerRow}>
                                    <View style={{flexDirection:'row'}}>
                                        <Text style={styles.eventMyWagerPlayer}>
                                            {i+1}.
                                        </Text>
                                        <View style={{marginLeft:5}}>
                                            <Text style={styles.eventMyWagerPlayer}>
                                                {wager.p}
                                            </Text>
                                            <Text style={styles.eventMyWagerVol}>
                                                {utils.flashNFormatter(wager.amount,2)} FLASH
                                            </Text>
                                        </View>
                                    </View>
                                    {wager.result !== constants.ORACLE_EVENT_WAGER.WON &&
                                        wager.result !== constants.ORACLE_EVENT_WAGER.LOST &&
                                    <Text style={styles.eventMyWagerVol}>
                                        -
                                    </Text>}
                                    {wager.result == constants.ORACLE_EVENT_WAGER.WON &&
                                    <Text style={styles.eventMyWagerVolWon}>
                                        {utils.flashNFormatter(wager.amount_won,2)} FLASH
                                    </Text>}
                                    {wager.result == constants.ORACLE_EVENT_WAGER.LOST &&
                                    <Text style={styles.eventMyWagerVolLost}>
                                        {utils.flashNFormatter(wager.amount,2)} FLASH
                                    </Text>}
                                </View>
                            )}
                        </View>}
                        {this.props.oracleEvent.status == constants.ORACLE_EVENT.CANCELLED_OR_ABANDONED && <View>
                            <Text style={styles.label}>
                                Cancellation Reason
                            </Text>
                            <View style={styles.hr}/>
                            <Text style={styles.eventCancelledReason}>
                                {this.props.oracleEvent.cancel_reason}
                            </Text>
                        </View>}
                        <Text style={styles.label}>
                            Description
                        </Text>
                        <View style={styles.hr}/>
                        <Text style={styles.eventDescription}>
                            {this.props.oracleEvent.description || 'There is no event description!!'}
                        </Text>
                        {this.props.oracleEvent.status == constants.ORACLE_EVENT.ACTIVE_WAITING_FOR_RESULT && <View>
                        {(!expire && this.props.oracleEvent.ends_on_ts < new Date().getTime() && this.props.profile.username == this.props.oracleEvent.username) &&
                        <Button
                            onPress={()=>this.setState({declareWiner:true})}
                            style={styles.eventDetailBtn}
                            value="Declare Winner"
                            />}
                        {(this.props.profile.username == this.props.oracleEvent.username) &&
                        <Button
                            onPress={()=>this.setState({cancelEvent:true})}
                            style={styles.eventDetailBtn}
                            value="Cancel Event"
                            />}
                        </View>}
                    </View>
                </Content>
                {em.editOracleEvent(this,styles)}
                {em.declareWinner(this,styles)}
                {em.wagerEvent(this,styles)}
                {em.cancelEvent(this,styles)}
                {em.passwordRequest(this,styles)}
                {!expire && this.props.oracleEvent.status == constants.ORACLE_EVENT.ACTIVE_WAITING_FOR_RESULT
                    && this.props.oracleEvent.ends_on_ts > new Date().getTime() && <View style={styles.eventExpired}>
                    <Text style={styles.eventExpiredText}>
                        Wagering time ended!
                    </Text>
                </View>}
                {(this.props.oracleEvent.ends_on_ts < new Date().getTime() ||
                    this.props.oracleEvent.status !== constants.ORACLE_EVENT.ACTIVE_WAITING_FOR_RESULT) &&
                <View style={[styles.eventExpired,
                    {backgroundColor:
                        this.props.oracleEvent.status == constants.ORACLE_EVENT.ACTIVE_WAITING_FOR_RESULT?
                            '#0080ff':(
                        this.props.oracleEvent.status == constants.ORACLE_EVENT.WINNER_DECLARED?
                            (this.props.oracleEvent.username !== this.props.profile.username &&
                                this.props.oracleEvent.result_amount < 0?'#d33':'#0D0'): (
                        this.props.oracleEvent.status == constants.ORACLE_EVENT.TIED?
                            '#FFA500':'#d33'))}]}>
                    <Text style={styles.eventExpiredText}>
                    {this.props.oracleEvent.status == constants.ORACLE_EVENT.ACTIVE_WAITING_FOR_RESULT?
                        'Waiting for result!':(
                    this.props.oracleEvent.status == constants.ORACLE_EVENT.WINNER_DECLARED?
                        (this.props.oracleEvent.username === this.props.profile.username?
                            this.props.oracleEvent.winner+' won!': `You ${this.props.oracleEvent
                                .result_amount > 0 ? 'won':'lost'} ${utils.flashNFormatter(Math
                                .abs(this.props.oracleEvent.result_amount),2)} FLASH`) : (
                    this.props.oracleEvent.status == constants.ORACLE_EVENT.TIED?
                        'Tie!': 'Event is canelled'
                    ))}
                    </Text>
                </View>}
                <Loader show={this.props.loading} />
            </Container>
        );
    }
}

function mapStateToProps({params}) {
    return {
        loading: params.loading || false,
        nightMode: params.nightMode,
        balance: params.balance || 0,
        profile: params.profile,
        currency_type: params.currency_type,
        fiat_currency: params.fiat_currency,
        fiat_balance: params.fiat_balance,
        fiat_per_value: params.fiat_per_value,
        oracleEvent: params.oracleEvent || {},
        decryptedWallet: params.decryptedWallet || null,
        password: params.password || null,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EventDetail);
