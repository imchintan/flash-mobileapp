/**
 * Chat Channel Container
 */

import React, {Component} from 'react';
import {
    View,
    TouchableOpacity,
    TextInput,
    Image,
    BackHandler
} from 'react-native';
import {
    Container,
    Content,
    Header,
    HeaderLeft,
    HeaderRight,
    HeaderTitle,
    Icon,
    Button,
    Text,
    Toast,
    Loader
} from '@components';
import { StackActions, NavigationActions } from 'react-navigation';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ActionCreators} from '@actions';

import { PROFILE_URL } from '@src/config';
import * as utils from '@lib/utils';
import * as constants from '@src/constants';
import * as Validation from '@lib/validation';

class FeedBack extends Component < {} > {

    static navigationOptions = {
        header: null,
        gesturesEnabled: true,
    }

    constructor(props) {
        super(props);
        this.state = {
            prof_rating: 0,
            vfm_rating: 0,
            comments: '',
            currencies_traded: [],
        };
    }

    componentDidMount(){
        this.mount = true;
        BackHandler.addEventListener('hardwareBackPress', this.backHandler.bind(this));
    }

    componentWillUnmount(){
        this.mount = false;
        BackHandler.removeEventListener('hardwareBackPress', this.backHandler.bind(this));
    }

    backHandler(){
        return this.props.forceFeedBack && this.mount;
    }

    submit(){
        let data = {
            prof_rating:this.state.prof_rating,
            comments:this.state.comments.trim(),
        };
        if(typeof this.state.is_txn_success == 'undefined')
            return Toast.errorTop("Please give the answer of requird fields!");
        data.is_txn_success = this.state.is_txn_success;

        if(this.state.is_txn_success){
            let currencies_traded = Object.values(this.state.currencies_traded);
            if(currencies_traded.length > 0){
                let isValid = currencies_traded.filter(traded => (traded.amount)).length > 0;
                if(!isValid)
                    return Toast.errorTop("Please enter valid trade amount!");
                data.currencies_traded = currencies_traded;
            }
            data.vfm_rating = this.state.vfm_rating;
        }
        this.props.submitFeedback(data,(goBack=false)=>{
            if(goBack) return this.props.navigation.goBack();
            const resetAction = StackActions.reset({
                index: 2,
                actions: [
                    NavigationActions.navigate({ routeName: 'HTM' }),
                    NavigationActions.navigate({ routeName: 'ChatHistory' }),
                    NavigationActions.navigate({ routeName: 'ChatChannel' })
                ],
            });
            this.props.navigation.dispatch(resetAction);
        });
    }

    // 0 - manually editing, 1 - on blur
    currencyTradedAmount(currency, value, type=0){
        let traded = this.state.currencies_traded[currency];
        switch (type) {
            case 0:
                value = value.toString().trim();
                if(value && value !== '.'){
                    let res = Validation.percentage(value,8);
                    if(!res.success){
                        break;
                    }
                }
                traded.amount = value;
                break;
            case 1:
                if(traded.amount && traded.amount !== '.'){
                    let res1 = Validation.percentage(traded.amount,8);
                    if(!res1.success){
                        Toast.errorTop("Please enter valid amount of "
                            +utils.getCurrencyUnit(currency)+"!");
                        break;
                    }
                    traded.amount = res1.percentage;
                } else {
                    traded.amount = null;
                }
                break;
            default:
                break;
        }
        let currencies_traded = this.state.currencies_traded;
        currencies_traded[currency] = traded;
        this.setState({currencies_traded});
    }

    render() {
        const styles = (this.props.nightMode?require('@styles/nightMode/chat'):require('@styles/chat'));
        return (
            <Container>
                <Header>
                    {!this.props.forceFeedBack?<HeaderLeft>
                        <TouchableOpacity>
                            <Icon onPress={() => this.props.navigation.goBack()} style={styles.headerBackIcon} name='angle-left'/>
                        </TouchableOpacity>
                    </HeaderLeft>:null}
                    <HeaderTitle>Feedback</HeaderTitle>
                    <HeaderRight>
                        <Image
                            style={{
                                width: 40,
                                height: 40,
                                borderRadius: 20,
                            }}
                            source={this.props.htm.profile_pic_url?
                                {uri:PROFILE_URL+this.props.htm.profile_pic_url}:
                                utils.getCurrencyIcon(constants.CURRENCY_TYPE.FLASH)} />
                    </HeaderRight>
                </Header>
                <Content style={styles.content}>
                    <View style={{marginHorizontal: 20}}>
                        <Text style={styles.feedbackNote}>
                            Please provide your valuable feedback for trade
                            <Text style={{fontWeight:'bold'}}> #{this.props.chatRoomChannel.name}</Text> with
                            <Text style={{fontWeight:'bold'}}> {this.props.htm.display_name} </Text>
                        </Text>
                        <Text style={styles.label}>
                            Was trading successful?
                            <Text style={styles.mandatoryField}>*</Text>
                        </Text>
                        <View style={styles.hr}/>
                        <View style={styles.feedBackValueRow}>
                            <TouchableOpacity style={styles.feedBacRadioBtn}
                                onPress={()=>this.setState({is_txn_success:true})}>
                                <Icon style={styles.feedBacRadioBtnIcon}
                                    name={this.state.is_txn_success !== true?
                                        "circle-o":"dot-circle-o"}/>
                                <Text style={styles.feedBacRadioBtnText}>Yes</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.feedBacRadioBtn}
                                onPress={()=>this.setState({is_txn_success:false})}>
                                <Icon style={styles.feedBacRadioBtnIcon}
                                    name={this.state.is_txn_success !== false?
                                        "circle-o":"dot-circle-o"}/>
                                <Text style={styles.feedBacRadioBtnText}>No</Text>
                            </TouchableOpacity>
                        </View>
                        {this.state.is_txn_success === true?<View>
                            <Text style={styles.label}>Currency Traded</Text>
                            <View style={styles.hr}/>
                            <View style={[styles.feedBackValueRow,{flexDirection: 'column'}]}>
                            {this.props.balances.map(balance =>
                                <View key={'_currency_'+balance.currency_type+
                                    '_'+balance.amt}>
                                    <TouchableOpacity
                                        style={styles.feedBackCurrencyBtn}
                                        onPress={()=>{
                                            let currencies_traded = this.state.currencies_traded;
                                            if(currencies_traded[balance.currency_type])
                                                delete currencies_traded[balance.currency_type];
                                            else {
                                                currencies_traded[balance.currency_type] = {
                                                    currency: balance.currency_type,
                                                    amount: null,
                                                }
                                            }
                                            this.setState({currencies_traded},
                                                ()=>!!this.refs["_currencies_traded_"+balance.currency_type]
                                                    && this.refs["_currencies_traded_"+balance.currency_type].focus());
                                        }}>
                                        <Icon style={styles.feedBackCurrencyBtnIcon}
                                            name={this.state.currencies_traded[balance.currency_type]?
                                            'check-square-o':'square-o'}/>
                                        <Text style={styles.feedBackCurrencyBtnText}>
                                            {utils.getCurrencyName(balance.currency_type)}
                                        </Text>
                                    </TouchableOpacity>
                                    {this.state.currencies_traded[balance.currency_type]?<View>
                                        <TextInput
                                            ref={"_currencies_traded_"+balance.currency_type}
                                            underlineColorAndroid='transparent'
                                            style={styles.feedBackCurrencyInput}
                                            placeholder={"Enter amount in "+utils.getCurrencyUnit(balance.currency_type)}
                                            keyboardType={'numeric'}
                                            value={this.state
                                                .currencies_traded[balance.currency_type]
                                                .amount !== null?this.state
                                                .currencies_traded[balance.currency_type]
                                                .amount.toString():''}
                                            onBlur={()=>this.currencyTradedAmount(balance.currency_type,0,1)}
                                            onChangeText={(amount)=>this.currencyTradedAmount(balance.currency_type,amount)}
                                        />
                                    </View>:null}
                                </View>
                            )}
                            </View>
                        </View>:null}
                        <Text style={styles.label}>How professional was the HTM?</Text>
                        <View style={styles.hr}/>
                        <View style={[styles.feedBackValueRow,styles.feedBackRatingBtnGrp]}>
                            {([1,2,3,4,5]).map(v=>
                                <TouchableOpacity key={'_start_'+v} activeOpacity={0.7}
                                    style={styles.feedBackRatingBtn}
                                    onPress={()=>this.setState({prof_rating:v})}>
                                    <Icon style={styles.feedBackRatingBtnIcon}
                                        name={this.state.prof_rating>=v?'star':'star-o'}/>
                                </TouchableOpacity>
                            )}
                        </View>
                        {this.state.is_txn_success === true?<View>
                            <Text style={styles.label}>How was the value for money?</Text>
                            <View style={styles.hr}/>
                            <View style={[styles.feedBackValueRow,styles.feedBackRatingBtnGrp]}>
                                {([1,2,3,4,5]).map(v=>
                                    <TouchableOpacity key={'_start_'+v} activeOpacity={0.7}
                                        style={styles.feedBackRatingBtn}
                                        onPress={()=>this.setState({vfm_rating:v})}>
                                        <Icon style={styles.feedBackRatingBtnIcon}
                                            name={this.state.vfm_rating>=v?'star':'star-o'}/>
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>:null}
                        <Text style={styles.label}>Comments</Text>
                        <View style={styles.hr}/>
                        <TextInput
                            multiline={true}
                            underlineColorAndroid='transparent'
                            style={styles.feedBackCommentBox}
                            placeholder={'Enter comments'}
                            autoCapitalize={'none'}
                            autoCorrect={false}
                            value={this.state.comments}
                            onChangeText={(comments)=>this.setState({comments})}
                        />
                        <Button
                            onPress={this.submit.bind(this)}
                            style={{margin: 20}}
                            value={'SUBMIT'} />
                    </View>
                </Content>
                <Loader show={this.props.loading} />
            </Container>
        );
    }
}

function mapStateToProps({params}) {
    return {
        loading: params.loading,
        nightMode: params.nightMode,
        htm: params.htm || {},
        htmProfile: params.htmProfile,
        balances: params.balances,
        chatRoom: params.chatRoom,
        chatRoomChannel: params.chatRoomChannel,
        forceFeedBack: params.forceFeedBack || false,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedBack);
