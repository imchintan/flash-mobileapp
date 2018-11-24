/**
 * HTM Create Ad Container
 */

 import React, {Component} from 'react';
 import {
     View,
     TouchableOpacity,
     TextInput,
     ScrollView,
     BackHandler
 } from 'react-native';
 import {
     Container,
     Content,
     Header,
     HeaderLeft,
     HeaderTitle,
     Icon,
     Text,
     Modal,
     Toast,
     Button,
     Loader
 } from '@components';
import * as constants from '@src/constants'
import * as Validation from '@lib/validation';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ActionCreators} from '@actions';

class CreateAd extends Component < {} > {

    static navigationOptions = {
        header: null,
        gesturesEnabled: true,
    }

    constructor(props) {
        super(props);
        this.state = {
            margin:0,
            min:0,
            max:0,
            txn_limit_isValid:true,
            terms: ''
        };
    }

    componentDidMount() {
        this.mount = true;
        BackHandler.addEventListener('hardwareBackPress', this.backHandler.bind(this));
    }

    componentWillUnmount(){
        this.mount = false;
        BackHandler.removeEventListener('hardwareBackPress', this.backHandler.bind(this));
    }

    backHandler(){
        this.props.navigation.goBack();
        if(this.mount){
            this.props.customAction({
                htmAdCreateOrEdit: false

            })
        }
        return this.mount;
    }

    // 0 - manually editing, 1 - increase, 2 - decrease, 3 - manually editing on blur
    setMargin(value, type=0){
        let margin = this.state.margin;
        switch (type) {
            case 0:
                value = value.toString().trim();
                if(value && value !== '-' && value !== '.' && value !== '-.'){
                    let res = Validation.percentage(value);
                    if(!res.success){
                        break;
                    }
                }
                margin = value;
                break;
            case 1:
                margin = Number((++margin).toFixed(2));
                break;
            case 2:
                margin = Number((--margin).toFixed(2));
                break;
            case 3:
                if(margin && margin !== '-' && margin !== '.' && margin !== '-.'){
                    let res1 = Validation.percentage(margin);
                    if(!res1.success){
                        Toast.errorTop("Please enter valid percentage for margin!");
                        break;
                    }
                    margin = res1.percentage;
                } else{
                    margin =  0;
                }
                break;
            default:
                break;
        }
        this.setState({margin});
    }

    // 0 - on text change, 1 - on blur
    txnLimit(isMin=true, value, type=0){
        let txn_limit = isMin?this.state.min:this.state.max;
        let txn_limit_isValid = this.state.txn_limit_isValid;
        let maxLimitFocused =  (!!this.refs['_max_txn_limit'] &&
            this.refs['_max_txn_limit'].isFocused());
        switch (type) {
            case 0:
                value = value.toString().trim();
                if(value && value !== '.'){
                    let res = Validation.percentage(value,8);
                    if(!res.success){
                        break;
                    }
                }
                txn_limit = value;
                break;
            case 1:
                if(txn_limit && txn_limit !== '.'){
                    let res = Validation.percentage(txn_limit,8);
                    if(!res.success){
                        Toast.errorTop("Invalid input!");
                        break;
                    }
                    txn_limit = res.percentage;
                }else{
                    txn_limit = 0;
                }
                let txn_limit_against = isMin?this.state.max:this.state.min;;
                txn_limit_isValid = (maxLimitFocused ||
                    (isMin && (txn_limit_against == 0 || txn_limit <= txn_limit_against)) ||
                    (!isMin && (txn_limit ==0 || txn_limit >= txn_limit_against)));
                if(!txn_limit_isValid){
                    Toast.errorTop("Minimum value alwasy less then Maximum value!");
                }
                break;
            default:

        }
        let state= {txn_limit_isValid}
        if(isMin) state.min = txn_limit;
        else state.max = txn_limit;
        this.setState(state);
    }

    createAd(){
        let data = {};
        if(!this.state.buy){
            return Toast.errorTop("Please select currency for Buy!");
        }
        data.buy = this.state.buy.currency_type;

        if(!this.state.sell){
            return Toast.errorTop("Please select currency for Sell!");
        }
        data.sell = this.state.sell.currency_type;
        data.margin = this.state.margin;

        if(!this.state.txn_limit_isValid){
            return Toast.errorTop("Minimum value alwasy less then Maximum value!");
        }
        data.min = this.state.min;
        data.max = this.state.max;
        data.terms = this.state.terms.trim();
        this.props.addHTMAd(data,this.props.navigation.goBack);
    }

    render() {
        const styles = (this.props.nightMode?require('@styles/nightMode/htm'):require('@styles/htm'));
        return(
            <Container>
                <Header>
                    <HeaderLeft>
                        <TouchableOpacity>
                            <Icon onPress={this.backHandler.bind(this)}
                                style={styles.headerBackIcon} name='angle-left' />
                        </TouchableOpacity>
                    </HeaderLeft>
                    <HeaderTitle>Create Ad</HeaderTitle>
                </Header>
                <Content bounces={false} style={styles.content}>
                    <View style={styles.htmProfileContent}>
                        <Text style={[styles.label, styles.htmAdsLabel, {marginTop:0}]}>
                            Currency to Buy
                            <Text style={styles.mandatoryField}>*</Text>
                        </Text>
                        <View style={styles.htmProfile}>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={()=>this.setState({
                                    selectCurrency:true,
                                    selectCurrencyFor:0
                                })}
                                style={styles.htmProfileInputBox}>
                                <Text style={styles.htmProfileInput}>
                                {this.state.buy?
                                    this.state.buy.currency_name:'Select Currency'}
                                </Text>
                                <Icon style={{
                                    position: 'absolute',
                                    right: 15,
                                    fontSize: 30,
                                    color: '#787878',
                                }} name={'angle-down'} />
                            </TouchableOpacity>
                        </View>
                        <Text style={[styles.label, styles.htmAdsLabel]}>
                            Currency to Sell
                            <Text style={styles.mandatoryField}>*</Text>
                        </Text>
                        <View style={styles.htmProfile}>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={()=>this.setState({
                                    selectCurrency:true,
                                    selectCurrencyFor:1
                                })}
                                style={styles.htmProfileInputBox}>
                                <Text style={styles.htmProfileInput}>
                                {this.state.sell?
                                    this.state.sell.currency_name:'Select Currency'}
                                </Text>
                                <Icon style={{
                                    position: 'absolute',
                                    right: 15,
                                    fontSize: 30,
                                    color: '#787878',
                                }} name={'angle-down'} />
                            </TouchableOpacity>
                        </View>
                        <Text style={[styles.label, styles.htmAdsLabel]}>
                            Margin
                        </Text>
                        <View style={[styles.htmProfile,styles.htmWantToBuySell]}>
                            <View>
                                <Text style={styles.htmProfileNote}>
                                    Margin you want over the bitcoin market price. Use a negative value for buying or selling under the market price to attract more contacts.
                                </Text>
                            </View>
                            <View style={styles.htmWantToBuySellInputGrp}>
                                <TouchableOpacity
                                    onPressIn={()=>{
                                        this.margin = setInterval(()=>this
                                            .setMargin(0,2), 100);
                                    }}
                                    onPressOut={()=>{
                                        if(!!this.margin)
                                            clearInterval(this.margin);
                                    }}
                                    onPress={()=>this.setMargin(0,2)}
                                    style={styles.htmWantToBuySellBtn}>
                                    <Text style={styles.htmWantToBuySellBtnText}>-</Text>
                                </TouchableOpacity>
                                <TextInput
                                    underlineColorAndroid='transparent'
                                    style={styles.htmWantToBuySellInputText}
                                    keyboardType={'numeric'}
                                    value={this.state.margin.toString()}
                                    onBlur={()=>this.setMargin(0,3)}
                                    onChangeText={(margin)=>this.setMargin(margin)}
                                />
                                <TouchableOpacity
                                    onPressIn={()=>{
                                        this.margin = setInterval(()=>this
                                            .setMargin(0,1), 100);
                                    }}
                                    onPressOut={()=>{
                                        if(!!this.margin) clearInterval(this.margin);
                                    }}
                                    onPress={()=>this.setMargin(0,1)}
                                    style={styles.htmWantToBuySellBtn}>
                                    <Text style={[styles.htmWantToBuySellBtnText,{
                                        fontSize: 22
                                    }]}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Text style={[styles.label, styles.htmAdsLabel]}>
                            Transaction limit <Text style={styles.htmAdsOptional}>
                                (optional)
                            </Text>
                        </Text>
                        <View style={styles.htmCurrencyBuySellQty}>
                            <Text style={styles.htmCurrencyBuySellQtyLabel}>
                                Minimum {this.state.sell?
                                    `(${constants.CURRENCY_TYPE_UNIT_UPCASE[this.state.sell.currency_type]})`:''}
                            </Text>
                            <TextInput
                                underlineColorAndroid='transparent'
                                style={[styles.htmCurrencyBuySellQtyInput,
                                    this.state.txn_limit_isValid === false &&
                                    {
                                        borderWidth: 2,
                                        borderColor: '#FF0000'
                                    }
                                ]}
                                keyboardType={'numeric'}
                                returnKeyType='next'
                                value={this.state.min.toString()}
                                onBlur={()=>this.txnLimit(true,0,1)}
                                onChangeText={(value)=>this.txnLimit(true,value)}
                                onSubmitEditing={()=>this.refs['_max_txn_limit'].focus()}
                            />
                        </View>
                        <View style={styles.htmCurrencyBuySellQty}>
                            <Text style={styles.htmCurrencyBuySellQtyLabel}>
                                Maximum {this.state.sell?
                                    `(${constants.CURRENCY_TYPE_UNIT_UPCASE[this.state.sell.currency_type]})`:''}
                            </Text>
                            <View>
                            <TextInput
                                ref={'_max_txn_limit'}
                                underlineColorAndroid='transparent'
                                style={[styles.htmCurrencyBuySellQtyInput,
                                    this.state.txn_limit_isValid === false &&
                                    {
                                        borderWidth: 2,
                                        borderColor: '#FF0000'
                                    }
                                ]}
                                keyboardType={'numeric'}
                                returnKeyType='done'
                                value={this.state.max.toString()}
                                onBlur={()=>this.txnLimit(false,0,1)}
                                onChangeText={(value)=>this.txnLimit(false,value)}
                            />
                            </View>
                        </View>
                        <Text style={[styles.label, styles.htmAdsLabel]}>
                            Terms of trade <Text style={styles.htmAdsOptional}>
                                (optional)
                            </Text>
                        </Text>
                        <View style={[styles.htmProfileInputBox,{height: 100}]}>
                            <TextInput
                                underlineColorAndroid='transparent'
                                multiline={true}
                                numberOfLines={4}
                                style={styles.htmProfileInput}
                                placeholder={'Other information you wish to tell about your trade. '}
                                autoCapitalize={'none'}
                                autoCorrect={false}
                                value={this.state.terms}
                                onChangeText={(terms)=>this.setState({terms})}
                            />
                        </View>
                        <Button style={{margin: 20}}
                            onPress={this.createAd.bind(this)}
                            value={'Publish'} />
                    </View>
                </Content>
                <Modal
                    transparent={true}
                    animationType="slide"
                    visible={!!this.state.selectCurrency}
                    onRequestClose={()=>this.setState({selectCurrency:false})}>
                    <View style={styles.overlayStyle}>
                        <View style={[styles.optionContainer,{height:null, maxHeight:'80%'}]}>
                            <ScrollView keyboardShouldPersistTaps="always">
                                <View style={{ paddingHorizontal: 10 }}>
                                    {Object.keys(constants.CURRENCY_TYPE).map((currency,index) =>{
                                        let selected = false;
                                        let selectedCur = false;
                                        if(this.state.sell
                                            && this.state.sell
                                            .currency_type == constants.CURRENCY_TYPE[currency]){
                                            if(this.state.selectCurrencyFor == 1)
                                                selectedCur = true;
                                        }
                                        if(this.state.buy
                                            && this.state.buy
                                            .currency_type == constants.CURRENCY_TYPE[currency]){
                                            if(this.state.selectCurrencyFor == 1)
                                                selected = true;
                                            else
                                                selectedCur = true;
                                        }
                                        return(<TouchableOpacity activeOpacity={selected?1:0.5}
                                            key={'_cur_'+currency+'_'+index}
                                            onPress={()=>{
                                                if(selected)
                                                    return ;
                                                let state = { selectCurrency:false };
                                                if(this.state.selectCurrencyFor == 0){
                                                    state.buy = {
                                                        currency_type: constants.CURRENCY_TYPE[currency],
                                                        currency_name: `${constants.CURRENCY_TYPE_NAME[currency]} (${currency})`
                                                    }
                                                    if(this.state.sell && state.buy.currency_type == this.state.sell.currency_type)
                                                        state.sell = null;
                                                } else {
                                                    state.sell = {
                                                        currency_type: constants.CURRENCY_TYPE[currency],
                                                        currency_name: `${constants.CURRENCY_TYPE_NAME[currency]} (${currency})`
                                                    }
                                                }
                                                this.setState(state);
                                            }}
                                            style={styles.optionStyle}>
                                            <Text style={[styles.optionTextStyle, selected && {
                                                color: '#999'
                                            }, selectedCur && {
                                                fontWeight: 'bold'
                                            }]}>
                                                {`${constants.CURRENCY_TYPE_NAME[currency]} (${currency})`}
                                            </Text>
                                        </TouchableOpacity>
                                    )})}
                                </View>
                            </ScrollView>
                        </View>
                        <View style={styles.cancelContainer}>
                            <TouchableOpacity onPress={()=>this.setState({selectCurrency:false})}>
                                <View style={styles.cancelStyle}>
                                    <Text style={styles.canceTextStyle}>
                                        Cancel
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <Loader show={this.props.loading}/>
            </Container>
        )
    }
}

function mapStateToProps({params}) {
    return {
        loading: params.loading,
        nightMode: params.nightMode,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateAd);
