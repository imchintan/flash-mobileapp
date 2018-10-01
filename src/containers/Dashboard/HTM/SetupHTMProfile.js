/**
 * Setup HTM Profile Container
 */

import React, {Component} from 'react';
import {
    View,
    TouchableOpacity,
    ScrollView,
    TextInput,
} from 'react-native';
import {
    Container,
    Content,
    Header,
    HeaderLeft,
    HeaderTitle,
    Icon,
    Modal,
    Text,
    Toast,
    Loader,
    Button,
    Switch
} from '@components';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ActionCreators} from '@actions';

import * as utils from '@lib/utils';
import * as constants from '@src/constants'
import * as Validation from '@lib/validation';

class SetupHTMProfile extends Component < {} > {

    static navigationOptions = {
        header: null,
        gesturesEnabled: true,
    }

    constructor(props) {
        super(props);
        this.state = {
            display_name: this.props.profile.display_name,
            email: '',
            sell_at: 0,
            buy_at: 0,
            show_profile_pic: 0,
            show_distance_in: 'miles', // Miles/Kms
            currency_types: {}
        };
    }

    setupProfile(){
        let data = {};
        if(!this.state.display_name.trim()){
            return Toast.errorTop("Display name is required!");
        }
        data.display_name = this.state.display_name.trim();

        data.email = this.state.email.trim();
        if(data.email){
            let res = Validation.email(data.email);
            if(!res.success){
                return Toast.errorTop(res.message);
            }
        }else{
            data.email = null;
        }

        if(!this.state.country){
            return Toast.errorTop("Please select country!");
        }
        data.country = this.state.country;

        if(this.state.buy_at){
            res = Validation.percentage(this.state.buy_at);
            if(!res.success){
                return Toast.errorTop("Please enter valid percentage for buy!");
            }
            data.buy_at = res.percentage;
        } else {
            data.buy_at = 0;
        }

        if(this.state.buy_at){
            res = Validation.percentage(this.state.sell_at);
            if(!res.success){
                return Toast.errorTop("Please enter valid percentage for sell!");
            }
            data.sell_at = res.percentage;
        } else {
            data.sell_at = 0;
        }
        let isValidQty = true;
        data.currency_types = Object.values(this.state.currency_types)
            .map(currency_type=>{
                isValidQty = (isValidQty && currency_type.isValidQty !== false);
                delete currency_type.isValidQty;
                return currency_type;
            });
        if(!data.currency_types.length){
            return Toast.errorTop("Please choose at least one currency!");
        }
        if(!isValidQty){
            return Toast.errorTop("Minimum value alwasy less then Maximum value!");
        }
        data.show_profile_pic = this.state.show_profile_pic;
        data.show_distance_in = this.state.show_distance_in;
        data.is_active = 1;
        this.props.setupHTMProfile(data,this.props.navigation.goBack);
    }

    // 0 - manually editing, 1 - increase, 2 - decrease, 3 - manually editing on blur
    buyAtTradeIn(value, type=0){
        let buy_at = this.state.buy_at;
        switch (type) {
            case 0:
                value = value.toString().trim();
                if(value && value !== '-' && value !== '.' && value !== '-.'){
                    let res = Validation.percentage(value);
                    if(!res.success){
                        break;
                    }
                }
                buy_at = value;
                break;
            case 1:
                buy_at = Number((++buy_at).toFixed(2));
                break;
            case 2:
                buy_at = Number((--buy_at).toFixed(2));
                break;
            case 3:
                if(buy_at && buy_at !== '-' && buy_at !== '.' && buy_at !== '-.'){
                    let res1 = Validation.percentage(buy_at);
                    if(!res1.success){
                        Toast.errorTop("Please enter valid percentage for buy!");
                        break;
                    }
                    buy_at = res1.percentage;
                } else{
                    buy_at =  0;
                }
                break;
            default:
                break;
        }
        this.setState({buy_at});
    }

    // 0 - manually editing, 1 - increase, 2 - decrease, 3 - manually editing on blur
    sellAtTradeIn(value, type=0){
        let sell_at = this.state.sell_at;
        switch (type) {
            case 0:
                value = value.toString().trim();
                if(value && value !== '-' && value !== '.' && value !== '-.'){
                    let res = Validation.percentage(value);
                    if(!res.success){
                        break;
                    }
                }
                sell_at = value;
                break;
            case 1:
                sell_at = Number((++sell_at).toFixed(2));
                break;
            case 2:
                sell_at = Number((--sell_at).toFixed(2));
                break;
            case 3:
                if(sell_at && sell_at !== '-' && sell_at !== '.' && sell_at !== '-.'){
                    let res1 = Validation.percentage(sell_at);
                    if(!res1.success){
                        Toast.errorTop("Please enter valid percentage for buy!");
                        break;
                    }
                    sell_at = res1.percentage;
                } else {
                    sell_at = 0;
                }
                break;
            default:
                break;
        }
        this.setState({sell_at});
    }

    // 0 - manually editing, 1 - increase, 2 - decrease, 3 - manually editing on blur
    buyAt(currency_type, value, type=0){
        let currency_types = this.state.currency_types;
        let buy_at = currency_types[currency_type].buy_at;
        switch (type) {
            case 0:
                value = value.toString().trim();
                if(value && value !== '-' && value !== '.' && value !== '-.'){
                    let res = Validation.percentage(value);
                    if(!res.success){
                        break;
                    }
                }
                buy_at = value;
                break;
            case 1:
                buy_at = Number((++buy_at).toFixed(2));
                break;
            case 2:
                buy_at = Number((--buy_at).toFixed(2));
                break;
            case 3:
                if(buy_at && buy_at !== '-' && buy_at !== '.' && buy_at !== '-.'){
                    let res1 = Validation.percentage(buy_at);
                    if(!res1.success){
                        Toast.errorTop("Please enter valid percentage for buy!");
                        break;
                    }
                    buy_at = res1.percentage;
                } else{
                    buy_at =  0;
                }
                break;
            default:
                break;
        }
        currency_types[currency_type].buy_at = buy_at;
        this.setState({currency_types});
    }

    // 0 - manually editing, 1 - increase, 2 - decrease, 3 - manually editing on blur
    sellAt(currency_type, value, type=0){
        let currency_types = this.state.currency_types;
        let sell_at = currency_types[currency_type].sell_at;
        switch (type) {
            case 0:
                value = value.toString().trim();
                if(value && value !== '-' && value !== '.' && value !== '-.'){
                    let res = Validation.percentage(value);
                    if(!res.success){
                        break;
                    }
                }
                sell_at = value;
                break;
            case 1:
                sell_at = Number((++sell_at).toFixed(2));
                break;
            case 2:
                sell_at = Number((--sell_at).toFixed(2));
                break;
            case 3:
                if(sell_at && sell_at !== '-' && sell_at !== '.' && sell_at !== '-.'){
                    let res1 = Validation.percentage(sell_at);
                    if(!res1.success){
                        Toast.errorTop("Please enter valid percentage for buy!");
                        break;
                    }
                    sell_at = res1.percentage;
                } else {
                    sell_at = 0;
                }
                break;
            default:
                break;
        }
        currency_types[currency_type].sell_at = sell_at;
        this.setState({currency_types});
    }

    // 0 - on text change, 1 - on blur
    minQty(currency_type, value, type=0){
        let currency_types = this.state.currency_types;
        let min_qty = currency_types[currency_type].min_qty;
        let isValidQty = currency_types[currency_type].isValidQty;
        let maxQtyFocused =  (!!this.refs['_max_qty_'+currency_type] &&
            this.refs['_max_qty_'+currency_type].isFocused());
        switch (type) {
            case 0:
                value = value.toString().trim();
                if(value && value !== '.'){
                    let res = Validation.percentage(value,8);
                    if(!res.success){
                        break;
                    }
                }
                min_qty = value;
                break;
            case 1:
                if(min_qty && min_qty !== '.'){
                    let res = Validation.percentage(min_qty,8);
                    if(!res.success){
                        Toast.errorTop("Invalid input!");
                        break;
                    }
                    min_qty = res.percentage;
                }else{
                    min_qty = 0;
                }
                let max_qty = currency_types[currency_type].max_qty;
                isValidQty = (maxQtyFocused || min_qty <= max_qty);
                if(!isValidQty){
                    Toast.errorTop("Minimum value alwasy less then Maximum value!");
                }
                break;
            default:

        }
        currency_types[currency_type].min_qty = min_qty;
        currency_types[currency_type].isValidQty = isValidQty;
        this.setState({currency_types});
    }
    // 0 - on text change, 1 - on blur
    maxQty(currency_type, value, type=0){
        let currency_types = this.state.currency_types;
        let max_qty = currency_types[currency_type].max_qty;
        let isValidQty = currency_types[currency_type].isValidQty;
        switch (type) {
            case 0:
                value = value.toString().trim();
                if(value && value !== '.'){
                    let res = Validation.percentage(value,8);
                    if(!res.success){
                        break;
                    }
                }
                max_qty = value;
                break;
            case 1:
                if(max_qty && max_qty !== '.'){
                    let res = Validation.percentage(max_qty,8);
                    if(!res.success){
                        Toast.errorTop("Invalid input!");
                        break;
                    }
                    max_qty = res.percentage;
                }else{
                    max_qty = 0;
                }
                let min_qty = currency_types[currency_type].min_qty;
                isValidQty = (min_qty <= max_qty);
                if(!isValidQty){
                    Toast.errorTop("Minimum value alwasy less then Maximum value!");
                }
                break;
            default:

        }
        currency_types[currency_type].max_qty = max_qty;
        currency_types[currency_type].isValidQty = isValidQty;
        this.setState({currency_types});
    }

    render() {
        const styles = (this.props.nightMode?require('@styles/nightMode/htm'):require('@styles/htm'));
        return (
            <Container>
                <Header>
                    <HeaderLeft>
                        <TouchableOpacity>
                            <Icon onPress={() => this.props.navigation.goBack()} style={styles.headerBackIcon} name='angle-left'/>
                        </TouchableOpacity>
                    </HeaderLeft>
                    <HeaderTitle>Setup HTM Profile</HeaderTitle>
                </Header>
                <Content bounces={false} style={styles.content}>
                    <View style={styles.htmProfileContent}>
                        <Text style={[styles.label,{marginTop:0}]}>Basic Info</Text>
                        <View style={[styles.hr,{marginBottom:15}]}/>
                        <View style={styles.htmProfile}>
                            <Text style={styles.htmProfileLabel}>
                                Diplay Name
                                <Text style={styles.mandatoryField}>*</Text>
                            </Text>
                            <View style={styles.htmProfileInputBox}>
                                <TextInput
                                    underlineColorAndroid='transparent'
                                    style={styles.htmProfileInput}
                                    placeholder={'Enter display name'}
                                    autoCapitalize={'none'}
                                    autoCorrect={false}
                                    value={this.state.display_name}
                                    onChangeText={(display_name)=>this.setState({display_name})}
                                />
                            </View>
                        </View>
                        <View style={styles.htmProfile}>
                            <Text style={styles.htmProfileLabel}>Email</Text>
                            <View style={styles.htmProfileInputBox}>
                                <TextInput
                                    underlineColorAndroid='transparent'
                                    style={styles.htmProfileInput}
                                    placeholder={'Enter email address'}
                                    keyboardType={'email-address'}
                                    autoCapitalize={'none'}
                                    autoCorrect={false}
                                    value={this.state.email}
                                    onChangeText={(email)=>this.setState({email})}
                                />
                            </View>
                        </View>
                        <View style={styles.htmProfile}>
                            <Text style={styles.htmProfileLabel}>
                                Country
                                <Text style={styles.mandatoryField}>*</Text>
                            </Text>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={()=>this.setState({selectCountry:true})}
                                style={styles.htmProfileInputBox}>
                                <TextInput
                                    editable={false}
                                    underlineColorAndroid='transparent'
                                    style={styles.htmProfileInput}
                                    placeholder={'Select Country'}
                                    autoCapitalize={'none'}
                                    autoCorrect={false}
                                    value={this.state.country || ''}
                                />
                                <Icon style={{
                                    position: 'absolute',
                                    right: 15,
                                    fontSize: 30,
                                    color: '#787878',
                                }} name={'angle-down'} />
                            </TouchableOpacity>
                        </View>
                        <Text style={[styles.label,{marginTop:10}]}>Trade In</Text>
                        <View style={[styles.hr,{marginBottom:15}]}/>
                        <View style={[styles.htmProfile,styles.htmWantToBuySell]}>
                            <View>
                                <Text style={styles.htmProfileLabel}>Want to buy at (%)</Text>
                                <Text style={styles.htmProfileNote}>
                                    Want to buy at % below/above spot/market price
                                </Text>
                            </View>
                            <View style={styles.htmWantToBuySellInputGrp}>
                                <TouchableOpacity
                                    onPressIn={()=>{
                                        this.buy_at = setInterval(()=>this
                                            .buyAtTradeIn(0,2), 100);
                                    }}
                                    onPressOut={()=>{
                                        if(!!this.buy_at)
                                            clearInterval(this.buy_at);
                                    }}
                                    onPress={()=>this.buyAtTradeIn(0,2)}
                                    style={styles.htmWantToBuySellBtn}>
                                    <Text style={styles.htmWantToBuySellBtnText}>-</Text>
                                </TouchableOpacity>
                                <TextInput
                                    underlineColorAndroid='transparent'
                                    style={styles.htmWantToBuySellInputText}
                                    keyboardType={'numeric'}
                                    value={this.state.buy_at.toString()}
                                    onBlur={()=>this.buyAtTradeIn(0,3)}
                                    onChangeText={(buy_at)=>this.buyAtTradeIn(buy_at)}
                                />
                                <TouchableOpacity
                                    onPressIn={()=>{
                                        this.buy_at = setInterval(()=>this
                                            .buyAtTradeIn(0,1), 100);
                                    }}
                                    onPressOut={()=>{
                                        if(!!this.buy_at) clearInterval(this.buy_at);
                                    }}
                                    onPress={()=>this.buyAtTradeIn(0,1)}
                                    style={styles.htmWantToBuySellBtn}>
                                    <Text style={[styles.htmWantToBuySellBtnText,{
                                        fontSize: 22
                                    }]}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={[styles.htmProfile,styles.htmWantToBuySell]}>
                            <View>
                                <Text style={styles.htmProfileLabel}>Want to sell at (%)</Text>
                                <Text style={styles.htmProfileNote}>
                                    Want to sell at % below/above spot/market price
                                </Text>
                            </View>
                            <View style={styles.htmWantToBuySellInputGrp}>
                                <TouchableOpacity
                                    onPressIn={()=>{
                                        this.sell_at = setInterval(()=>this
                                            .sellAtTradeIn(0,2), 100);
                                    }}
                                    onPressOut={()=>{
                                        if(!!this.sell_at)
                                            clearInterval(this.sell_at);
                                    }}
                                    onPress={()=>this.sellAtTradeIn(0,2)}
                                    style={styles.htmWantToBuySellBtn}>
                                    <Text style={styles.htmWantToBuySellBtnText}>-</Text>
                                </TouchableOpacity>
                                <TextInput
                                    underlineColorAndroid='transparent'
                                    style={styles.htmWantToBuySellInputText}
                                    keyboardType={'numeric'}
                                    value={this.state.sell_at.toString()}
                                    onBlur={()=>this.sellAtTradeIn(0,3)}
                                    onChangeText={(sell_at)=>this.sellAtTradeIn(sell_at)}
                                />
                                <TouchableOpacity
                                    onPressIn={()=>{
                                        this.sell_at = setInterval(()=>this
                                            .sellAtTradeIn(0,1), 100);
                                    }}
                                    onPressOut={()=>{
                                        if(!!this.sell_at) clearInterval(this.sell_at);
                                    }}
                                    onPress={()=>this.sellAtTradeIn(0,1)}
                                    style={styles.htmWantToBuySellBtn}>
                                    <Text style={[styles.htmWantToBuySellBtnText,{
                                        fontSize: 22
                                    }]}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Text style={[styles.label,{marginTop:10}]}>
                            Currency
                            <Text style={styles.mandatoryField}>*</Text>
                        </Text>
                        <View style={[styles.hr,{marginBottom:15}]}/>
                        <Text style={styles.htmCurrencyNote1}>Choose currencies you want to trade in</Text>
                        { this.props.balances.map(balance =>
                            <View key={'_currency_'+balance.currency_type+'_'+balance.amt}
                                style={styles.htmProfile}>
                                <View style={styles.htmCurrency}>
                                    <TouchableOpacity onPress={()=>{
                                        let currency_types = this.state.currency_types;
                                        if(currency_types[balance.currency_type])
                                            delete currency_types[balance.currency_type];
                                        else {
                                            currency_types[balance.currency_type] = {
                                                currency_type: balance.currency_type,
                                                buy_at: this.state.buy_at,
                                                sell_at: this.state.sell_at,
                                                min_qty: 0,
                                                max_qty: 0,
                                            }
                                        }
                                        this.setState({currency_types});
                                    }}>
                                        <Icon style={styles.htmCurrencyCheckIcon}
                                            name={this.state.currency_types[balance.currency_type]?'check-square-o':'square-o'}/>
                                    </TouchableOpacity>
                                    <Text style={styles.htmProfileLabel}>
                                        {utils.getCurrencyName(balance.currency_type)}
                                    </Text>
                                </View>
                                {this.state.currency_types[balance.currency_type]?
                                <View style={styles.htmCurrencyWantToBuySell}>
                                    <View style={[styles.htmProfile,styles.htmWantToBuySell]}>
                                        <View>
                                            <Text style={styles.htmCurrencyLabel}>Buy at (%)</Text>
                                            <Text style={styles.htmCurrencyNote}>
                                                Want to buy at % below/above spot/market price
                                            </Text>
                                        </View>
                                        <View style={styles.htmWantToBuySellInputGrp}>
                                            <TouchableOpacity
                                                onPressIn={()=>{
                                                    this.buy_at = setInterval(()=>this
                                                        .buyAt(balance.currency_type,0,2), 100);
                                                }}
                                                onPressOut={()=>{
                                                    if(!!this.buy_at)
                                                        clearInterval(this.buy_at);
                                                }}
                                                onPress={()=>this.buyAt(balance.currency_type,0,2)}
                                                style={styles.htmWantToBuySellBtn}>
                                                <Text style={styles.htmCurrencyWantToBuySellBtnText}>-</Text>
                                            </TouchableOpacity>
                                            <TextInput
                                                underlineColorAndroid='transparent'
                                                style={styles.htmCurrencyWantToBuySellInputText}
                                                keyboardType={'numeric'}
                                                value={this.state
                                                    .currency_types[balance.currency_type]
                                                    .buy_at.toString()}
                                                onBlur={()=>this.buyAt(balance.currency_type,0,3)}
                                                onChangeText={(buy_at)=>this.buyAt(balance.currency_type,buy_at)}
                                            />
                                            <TouchableOpacity
                                                onPressIn={()=>{
                                                    this.buy_at = setInterval(()=>this
                                                    .buyAt(balance.currency_type,0,1), 100);
                                                }}
                                                onPressOut={()=>{
                                                    if(!!this.buy_at) clearInterval(this.buy_at);
                                                }}
                                                onPress={()=>this.buyAt(balance.currency_type,0,1)}
                                                style={styles.htmWantToBuySellBtn}>
                                                <Text style={[styles.htmCurrencyWantToBuySellBtnText,{
                                                    fontSize: 17
                                                }]}>+</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View style={[styles.htmProfile,styles.htmWantToBuySell]}>
                                        <View>
                                            <Text style={styles.htmCurrencyLabel}>Sell at (%)</Text>
                                            <Text style={styles.htmCurrencyNote}>
                                                Want to sell at % below/above spot/market price
                                            </Text>
                                        </View>
                                        <View style={styles.htmWantToBuySellInputGrp}>
                                            <TouchableOpacity
                                                onPressIn={()=>{
                                                    this.sell_at = setInterval(()=>this
                                                        .sellAt(balance.currency_type,0,2), 100);
                                                }}
                                                onPressOut={()=>{
                                                    if(!!this.sell_at)
                                                        clearInterval(this.sell_at);
                                                }}
                                                onPress={()=>this.sellAt(balance.currency_type,0,2)}
                                                style={styles.htmWantToBuySellBtn}>
                                                <Text style={styles.htmCurrencyWantToBuySellBtnText}>-</Text>
                                            </TouchableOpacity>
                                            <TextInput
                                                underlineColorAndroid='transparent'
                                                style={styles.htmCurrencyWantToBuySellInputText}
                                                keyboardType={'numeric'}
                                                value={this.state
                                                    .currency_types[balance.currency_type]
                                                    .sell_at.toString()}
                                                onBlur={()=>this.sellAt(balance.currency_type,0,3)}
                                                onChangeText={(sell_at)=>this.sellAt(balance.currency_type,sell_at)}
                                            />
                                            <TouchableOpacity
                                                onPressIn={()=>{
                                                    this.sell_at = setInterval(()=>this
                                                        .sellAt(balance.currency_type,0,1), 100);
                                                }}
                                                onPressOut={()=>{
                                                    if(!!this.sell_at) clearInterval(this.sell_at);
                                                }}
                                                onPress={()=>this.sellAt(balance.currency_type,0,1)}
                                                style={styles.htmWantToBuySellBtn}>
                                                <Text style={[styles.htmCurrencyWantToBuySellBtnText,{
                                                    fontSize: 17
                                                }]}>+</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View style={styles.htmProfile}>
                                        <Text style={styles.htmCurrencyLabel}>
                                            Trade limits
                                        </Text>
                                        <Text style={[styles.htmCurrencyNote,{width:'100%'}]}>
                                            Minimum and Maximum number of
                                            {' ' + utils.getCurrencyName(balance.currency_type)+ ' '}
                                            coins (leave 0 for no preference)
                                        </Text>
                                        <View style={styles.htmCurrencyBuySellQty}>
                                            <Text style={styles.htmCurrencyBuySellQtyLabel}>
                                                Minimum
                                            </Text>
                                            <TextInput
                                                underlineColorAndroid='transparent'
                                                style={[styles.htmCurrencyBuySellQtyInput,
                                                    this.state.currency_types[balance.currency_type]
                                                    .isValidQty === false && {
                                                        borderWidth: 2,
                                                        borderColor: '#FF0000'
                                                    }]}
                                                keyboardType={'numeric'}
                                                returnKeyType='next'
                                                value={this.state
                                                    .currency_types[balance.currency_type]
                                                    .min_qty.toString()}
                                                onBlur={()=>this.minQty(balance.currency_type,0,1)}
                                                onChangeText={(min_qty)=>this.minQty(balance.currency_type,min_qty)}
                                                onSubmitEditing={()=>this.refs['_max_qty_'+balance.currency_type].focus()}
                                            />
                                        </View>
                                        <View style={styles.htmCurrencyBuySellQty}>
                                            <Text style={styles.htmCurrencyBuySellQtyLabel}>
                                                Maximum
                                            </Text>
                                            <TextInput
                                                ref={'_max_qty_'+balance.currency_type}
                                                underlineColorAndroid='transparent'
                                                style={[styles.htmCurrencyBuySellQtyInput,
                                                    this.state.currency_types[balance.currency_type]
                                                    .isValidQty === false && {
                                                        borderWidth: 2,
                                                        borderColor: '#FF0000'
                                                    }]}
                                                keyboardType={'numeric'}
                                                value={this.state
                                                    .currency_types[balance.currency_type]
                                                    .max_qty.toString()}
                                                onBlur={()=>this.maxQty(balance.currency_type,0,1)}
                                                onChangeText={(max_qty)=>this.maxQty(balance.currency_type,max_qty)}
                                            />
                                        </View>
                                    </View>
                                </View>:null}
                            </View>
                        )}
                        <Text style={[styles.label,{marginTop:10}]}>Setting</Text>
                        <View style={[styles.hr,{marginBottom:15}]}/>
                        <View style={[styles.htmProfile,styles.htmWantToBuySell]}>
                            <Text style={[styles.htmProfileLabel,{marginTop:8}]}>
                                Show Profile Picture
                            </Text>
                            <Switch
                                active={(this.state.show_profile_pic==1)}
                                buttonRadius={13}
                                switchWidth={70}
                                activeText={'ON'}
                                activeTextStyle={styles.htmSwitchActiveTextStyle}
                                inactiveText={'OFF'}
                                inactiveTextStyle={styles.htmSwitchInactiveTextStyle}
                                inactiveButtonColor={'#DFDFDF'}
                                inactiveButtonPressedColor={'#191714'}
                                activeButtonColor={'#191714'}
                                activeButtonPressedColor={'#DFDFDF'}
                                activeBackgroundColor={'#E0AE27'}
                                inactiveBackgroundColor={'#A1A1A1'}
                                onChangeState={(show_profile_pic)=>this.setState({show_profile_pic:show_profile_pic?1:0})} />
                        </View>
                        <View style={[styles.htmProfile,styles.htmWantToBuySell,{marginTop: -10}]}>
                            <Text style={[styles.htmProfileLabel,{marginTop:8}]}>
                                Show Distance in
                            </Text>
                            <View style={styles.htmSwitch}>
                                <TouchableOpacity
                                    onPress={()=>this.setState({show_distance_in:'kms'})}
                                    style={[styles.htmSwitchLeft,
                                        this.state.show_distance_in == 'kms' &&
                                        styles.htmSwitchActive]}>
                                    <Text style={[styles.htmSwitchText,
                                        this.state.show_distance_in == 'kms' &&
                                        styles.htmSwitchActiveText]}>KMS</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={()=>this.setState({show_distance_in:'miles'})}
                                    style={[styles.htmSwitchRight,
                                        this.state.show_distance_in !== 'kms' &&
                                        styles.htmSwitchActive]}>
                                    <Text style={[styles.htmSwitchText,
                                        this.state.show_distance_in !== 'kms' &&
                                        styles.htmSwitchActiveText]}>MILES</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Button
                            style={{
                                marginVertical: 20,
                            }}
                            value={'Setup Profile'}
                            onPress={this.setupProfile.bind(this)} />
                    </View>
                    <Loader show={this.props.loading} />
                </Content>
                <Modal
                    transparent={true}
                    animationType="slide"
                    visible={!!this.state.selectCountry}
                    onRequestClose={()=>this.setState({selectCountry:false})}>
                    <View style={styles.overlayStyle}>
                        <View style={[styles.optionContainer,{height:'80%'}]}>
                            <ScrollView keyboardShouldPersistTaps="always">
                                <View style={{ paddingHorizontal: 10 }}>
                                    {constants.COUNTRY.map((country,index) =>
                                        <TouchableOpacity key={'_que_'+country+'_'+index}
                                            style={styles.optionStyle}
                                            onPress={()=>{
                                                this.setState({selectCountry:false, country});
                                            }}>
                                            <Text style={styles.optionTextStyle}>
                                                {country}
                                            </Text>
                                        </TouchableOpacity>
                                    )}
                                </View>
                            </ScrollView>
                        </View>
                        <View style={styles.cancelContainer}>
                            <TouchableOpacity onPress={()=>this.setState({selectCountry:false})}>
                                <View style={styles.cancelStyle}>
                                    <Text style={styles.canceTextStyle}>
                                        Cancel
                                    </Text>
                                </View>
                            </TouchableOpacity>
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
        nightMode: params.nightMode,
        profile: params.profile,
        balances: params.balances,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SetupHTMProfile);
