/**
 * Receive Container
 */

import React, {Component} from 'react';
import {
    View,
    TextInput,
    TouchableOpacity,
    Clipboard,
    Share,
    Dimensions
} from 'react-native';
import {
    Container,
    Header,
    HeaderLeft,
    HeaderRight,
    Content,
    Icon,
    Text,
    WalletMenu,
    WalletFooter,
    Toast,
    QRCode
} from '@components';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ActionCreators} from '@actions';
import * as Validation from '@lib/validation';
import * as utils from '@lib/utils';
import * as constants from '@src/constants';

const { width } = Dimensions.get('window');

class Receive extends Component < {} > {

    static navigationOptions = {
        header: null,
        gesturesEnabled: true,
    }

    constructor(props) {
        super(props);
        this.state = {
            amount: '',
            fiat_amount: ''
        };
    }



    verifyAmount() {
        this.setState({isAmtVerify: false});
        if (!this.state.amount)
            return false;

        let amount = utils.toOrginalNumber(this.state.amount);
        let fiat_amount = utils.toOrginalNumber(this.state.fiat_amount);
        let res = Validation.amount(amount);
        if (!res.success) {
            return Toast.errorTop(res.message);
        }

        if (this.props.currency_type === constants.CURRENCY_TYPE.FLASH) {
            if (amount < 1) {
                return Toast.errorTop("Amount must be at least 1");
            }
        } else {
            if (amount < this.props.thresholdAmount) {
                return Toast.errorTop("Amount is less than threshold value");
            }
        }

        this.setState({
            isAmtVerify: true,
            fiat_amount: fiat_amount>0?utils.formatAmountInput(fiat_amount):'',
            amount: utils.formatAmountInput(res.amount)
        });
    }

    render() {
        const styles = (this.props.nightMode?require('@styles/nightMode/request'):require('@styles/request'));
        return (
            <Container>
                <Header>
                    <HeaderLeft>
                        <TouchableOpacity>
                            <Icon onPress={() => this.props.navigation.goBack()} style={styles.headerBackIcon} name='angle-left'/>
                        </TouchableOpacity>
                    </HeaderLeft>
                    <View style={styles.walletHeader}>
                        <Text style={styles.walletLabel}>Receive</Text>
                        <Text style={styles.walletConversionRate}>{utils.getCurrencySymbol(this.props.fiat_currency) + ' ' + utils.flashNFormatter(this.props.fiat_per_value, 2) + ' per ' + utils.getCurrencyUnitUpcase(this.props.currency_type)}
                        </Text>
                    </View>
                    <HeaderRight>
                        <TouchableOpacity>
                            <Icon style={[styles.headerFAIcon,{paddingLeft:15}]}
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
                            <Text style={styles.walletBalance}>{utils.getCurrencyUnitUpcase(this.props.currency_type) + ' ' + utils.flashNFormatter((this.props.currency_type == constants.CURRENCY_TYPE.FLASH
                                    ? utils.satoshiToFlash(this.props.balance).toFixed(10)
                                    : this.props.balance), 2)}
                            </Text>
                            <Icon style={styles.exchangeIcon} name='exchange'/>
                            <Text style={styles.walletBalanceInFiatCurrency}>{utils.getCurrencySymbol(this.props.fiat_currency) + ' ' + utils.flashNFormatter(this.props.fiat_balance, 2)}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.requestBox}>
                        <Text style={styles.requestRowLabel}>Amount</Text>
                        <View style={styles.hr}/>
                        <View style={[
                            styles.requestRowInputBox, {
                                flexDirection: 'row'
                            }
                        ]}>
                            <View style={styles.requestRowAmtLabelBox}>
                                <Text style={styles.requestRowAmtLabel}>{utils.getFiatCurrencyUnit(this.props.fiat_currency)}</Text>
                            </View>
                            <TextInput ref={'_input_fiat_amount'} underlineColorAndroid='transparent' style={[
                                styles.requestRowInput, {
                                    paddingLeft: 10
                                }
                            ]} keyboardType='numeric' returnKeyType='next' onSubmitEditing={() => this.refs._input_email.focus()} placeholder={'Enter amount in ' + utils.getFiatCurrencyUnit(this.props.fiat_currency)} value={this.state.fiat_amount || ''} onBlur={this.verifyAmount.bind(this)} onChangeText={(fiat_amount) => this.setState({
                                fiat_amount
                            }, () => {
                                fiat_amount = utils.toOrginalNumber(fiat_amount);
                                if(isNaN(fiat_amount)) fiat_amount=0;
                                let amount = utils.toOrginalNumber(utils.otherCurrencyToCrypto(fiat_amount, this.props.fiat_per_value));
                                this.setState({
                                    amount: amount > 0
                                        ? utils.formatAmountInput(amount)
                                        : ''
                                });
                            })}/>
                        </View>
                        <View style={[
                            styles.requestRowInputBox, {
                                flexDirection: 'row',
                                marginTop: 5
                            }
                        ]}>
                            <View style={styles.requestRowAmtLabelBox}>
                                <Text style={styles.requestRowAmtLabel}>{utils.getCurrencyUnitUpcase(this.props.currency_type)}</Text>
                            </View>
                            <TextInput ref={'_input_amount'} underlineColorAndroid='transparent' style={[
                                styles.requestRowInput, {
                                    paddingLeft: 10
                                }
                            ]} keyboardType='numeric' returnKeyType='next' onSubmitEditing={() => this.refs._input_email.focus()} placeholder={'Enter amount in ' + utils.getCurrencyUnitUpcase(this.props.currency_type)} value={this.state.amount || ''} onBlur={this.verifyAmount.bind(this)} onChangeText={(amount) => this.setState({
                                amount
                            }, () => {
                                if(isNaN(amount)) amount=0;
                                amount = utils.toOrginalNumber(amount);
                                let fiat_amount = utils.toOrginalNumber(utils.cryptoToOtherCurrency(amount, this.props.fiat_per_value, 0));
                                this.setState({
                                    fiat_amount: fiat_amount > 0
                                        ? utils.formatAmountInput(fiat_amount)
                                        : ''
                                });
                            })}/>
                        </View>
                        <Text style={styles.requestRowLabel}>QR Code</Text>
                        <View style={styles.hr}/>
                        <View style={styles.qrCodeBox}>
                            <QRCode
                                value={constants.CURRENCY_TYPE_QR_PREFIX[this.props.currency_type]+':'+
                                    this.props.wallet_address+'?amount='+this.state.amount}
                                size={width-190}
                                bgColor={this.props.nightMode?'#FFFFFF':'#191714'}
                                fgColor={this.props.nightMode?'#191714':'#FFFFFF'}/>
                            <View style={styles.qrCodeBorder}/>
                        </View>
                        <View style={styles.walletAddress}>
                            <Text selectable={true} style={styles.walletAddressText}>
                                {this.props.wallet_address}
                            </Text>
                        </View>
                        <View style={styles.requestRowActionLinkTab}>
                            <TouchableOpacity style={styles.requestRowActionLink}
                                onPress={()=>{
                                    Clipboard.setString(this.props.wallet_address);
                                    Toast.showTop('Wallet address copied!');
                                }}>
                                <Icon style={styles.requestRowActionLinkIcon} name='copy'/>
                                <Text  style={styles.requestRowActionLinkLabel}>Copy</Text>
                            </TouchableOpacity>
                            <Text  style={styles.requestRowActionLinkDiv}> / </Text>
                            <TouchableOpacity style={styles.requestRowActionLink}
                                onPress={()=>Share.share({message:this.props.wallet_address,title: utils.getCurrencyUnitUpcase(this.props.currency_type)})}>
                                <Icon style={styles.requestRowActionLinkIcon} name='share-alt'/>
                                <Text  style={styles.requestRowActionLinkLabel}>Share</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Content>
                <WalletMenu onPress={()=>this.setState({showMenu:false})}
                    selected='Receive'
                    visible={this.state.showMenu}
                    badgePending={this.props.totalPending}
                    navigation={this.props.navigation} />
                <WalletFooter selected='Receive'
                    nightMode={this.props.nightMode}
                    navigation={this.props.navigation}/>
            </Container>
        );
    }
}

function mapStateToProps({params}) {
    return {
        balance: params.balance || 0,
        wallet_address: params.wallet_address || null,
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

export default connect(mapStateToProps, mapDispatchToProps)(Receive);
