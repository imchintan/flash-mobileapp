/**
 * Home Container
 */

import React, { Component } from 'react';
import {
    View,
    Image,
    Modal,
    TouchableOpacity,
    ActivityIndicator,
    RefreshControl,
    Dimensions,
    Clipboard,
    BackHandler,
    Share,
    Alert
} from 'react-native';
import {
    Container,
    Content,
    Header,
    HeaderLeft,
    HeaderTitle,
    HeaderRight,
    TransactionTab,
    Icon,
    Button,
    Loader,
    Text,
    Toast,
    QRCode
} from '@components';
import moment from 'moment-timezone';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '@actions';
import * as utils from '@lib/utils';
import * as constants from '@src/constants';
import { PROFILE_URL } from '@src/config';
const { height, width } = Dimensions.get('window');
const styles = require("@styles/home");

class Home extends Component<{}> {

    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);
        this.state = {
            showCurrencyMenu: false
        };
    }

    componentDidMount(){
        BackHandler.addEventListener('hardwareBackPress', this.backHandler);
    }

    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', this.backHandler);
    }

    backHandler=()=>{
        if(this.state.showCurrencyMenu){
            this.setState({showCurrencyMenu:false});
            return true;
        }

        return false;
    }

    changeCurrency(currency_type){
        this.setState({showCurrencyMenu: false},
            ()=> currency_type !== this.props.currency_type
            && this.props.changeCurrency(currency_type));
    }

    render() {
        return (
            <Container>
                <Header>
                    <HeaderLeft>
                        <TouchableOpacity style={{padding:5}} onPress={()=>this.props.navigation.navigate('MyAccount')}>
                            <Image style={styles.userProfileImage}
                                defaultSource={require('@images/user-profile-icon-white.png')}
                                source={this.props.profile.profile_pic_url?
                                    {uri: PROFILE_URL+this.props.profile.profile_pic_url}
                                    :require('@images/user-profile-icon-white.png')}
                            />
                        </TouchableOpacity>
                    </HeaderLeft>
                    <HeaderTitle>
                        <Image style={styles.headerTextLogo}
                            source={require('@images/app-text-icon-white.png')}/>
                    </HeaderTitle>
                    <HeaderRight>
                        {this.props.profile.auth_version >= 4 && this.props.my_wallets.length >=3?
                            <TouchableOpacity
                                style={styles.currencyMenuTab}
                                onPress={()=>this.setState({showCurrencyMenu:!this.state.showCurrencyMenu})}>
                                <Image style={styles.currencyMenuTabIcon}
                                    source={utils.getCurrencyIcon(this.props.currency_type)}/>
                                <Icon style={styles.currencyMenuTabArrow} name='angle-down' />
                            </TouchableOpacity>:<TouchableOpacity>
                                <Icon style={styles.headerFAIcon} onPress={this.props.showQR} name='qrcode' />
                            </TouchableOpacity>
                        }
                    </HeaderRight>
                </Header>
                <Content
                    refreshControl={
                        <RefreshControl
                            colors={['#191714']}
                            tintColor='#191714'
                            refreshing={false}
                            onRefresh={()=>this.props.refreshingHome()}/>
                    }>
                    <View style={styles.balanceBox}>
                        <TouchableOpacity style={styles.balanceRefresh} onPress={()=>this.props.getBalance(true)}>
                            {this.props.balanceLoader?<ActivityIndicator size="large" color="#FFFFFF" />:
                            <Icon style={styles.balanceRefreshIcon} name='refresh' />}
                        </TouchableOpacity>
                        <Text style={styles.balanceLabel}>Your Balance</Text>
                        <TouchableOpacity  onPress={()=>this.setState({fullBalance:true})}>
                            {this.props.currency_type === constants.CURRENCY_TYPE.FLASH?
                                <Text style={styles.balanceText}>{utils.flashNFormatter(utils.satoshiToFlash(this.props.balance).toFixed(10),2)} {utils.getCurrencyUnitUpcase(this.props.currency_type)}</Text>:
                                <Text style={styles.balanceText}>{utils.flashNFormatter(this.props.balance.toFixed(8),2)} {utils.getCurrencyUnitUpcase(this.props.currency_type)}</Text>
                            }
                        </TouchableOpacity>
                        <View style={styles.otherBalanceRow}>
                            <Text style={styles.otherBalanceText}>≈</Text>
                            <View style={styles.otherBalanceTab}>
                                <View style={styles.otherBalanceView}>
                                    {this.props.currency_type === constants.CURRENCY_TYPE.BTC?
                                        <Text style={styles.otherBalanceAmtText}>{utils.flashNFormatter(this.props.balance_in_flash,2)}</Text>:
                                        <Text style={styles.otherBalanceAmtText}>{utils.flashNFormatter(this.props.balance_in_btc,2)}</Text>

                                    }
                                </View>
                                {this.props.currency_type === constants.CURRENCY_TYPE.BTC?
                                    <Text style={styles.otherBalanceText}>{utils.getCurrencyUnitUpcase(constants.CURRENCY_TYPE.FLASH)}</Text>:
                                    <Text style={styles.otherBalanceText}>{utils.getCurrencyUnitUpcase(constants.CURRENCY_TYPE.BTC)}</Text>
                                }
                            </View>
                            <Text style={styles.otherBalanceText}>≈</Text>
                            <View style={styles.otherBalanceTab}>
                                <View style={styles.otherBalanceView}>
                                    {this.props.currency_type === constants.CURRENCY_TYPE.LTC?
                                        <Text style={styles.otherBalanceAmtText}>{utils.flashNFormatter(this.props.balance_in_flash,2)}</Text>:
                                        <Text style={styles.otherBalanceAmtText}>{utils.flashNFormatter(this.props.balance_in_ltc,2)}</Text>
                                    }
                                </View>
                                {this.props.currency_type === constants.CURRENCY_TYPE.LTC?
                                    <Text style={styles.otherBalanceText}>{utils.getCurrencyUnitUpcase(constants.CURRENCY_TYPE.FLASH)}</Text>:
                                    <Text style={styles.otherBalanceText}>{utils.getCurrencyUnitUpcase(constants.CURRENCY_TYPE.LTC)}</Text>
                                }
                            </View>
                            <Text style={styles.otherBalanceText}>≈</Text>
                            <View style={styles.otherBalanceTab}>
                                <View style={styles.otherBalanceView}>
                                    <Text style={styles.otherBalanceAmtText}>{utils.flashNFormatter(this.props.balance_in_usd,2)}</Text>
                                </View>
                                <Text style={styles.otherBalanceText}>USD</Text>
                            </View>
                        </View>
                        <View style={styles.sendReceiveBtnGrp}>
                            <Button onPress={()=>this.props.navigation.navigate('Send')} style={styles.sendReceiveBtn} value='Send' />
                            <Button onPress={this.props.showQR} style={styles.sendReceiveBtn} value='Receive' />
                        </View>
                    </View>
                    <View style={styles.txnList}>
                        <Text style={styles.recentTxnLabel}>Recent Transactions</Text>
                        {
                            this.props.txns.map((txn,index)=>
                                <TransactionTab txn={txn}
                                    currency_type={this.props.currency_type}
                                    timezone={this.props.profile.timezone || moment.tz.guess()}
                                    txnLoader={this.props.txnLoader}
                                    txnDetail={this.props.txnDetail}
                                    onPress={()=>this.props.getTransactionDetail(txn.transaction_id)}
                                    key={'_txn_'+txn.transaction_id+'_'+index} />
                            )
                        }
                        {this.props.txns.length == 0?<Text style={styles.txnListEmpty}>
                            There is no recent transactions.
                        </Text>:null}
                        <Loader transparent show={this.props.loading}/>
                    </View>
                </Content>
                <Modal
                    transparent={true}
                    visible={this.props.show_qr}
                    onRequestClose={this.props.hideQR}>
                    <View style={styles.qrCodeModal}>
                        <Text style={styles.qrCodeModalTitle}>Wallet Address</Text>
                        <View style={{
                            borderWidth: 10,
                            borderColor: '#FFFFFF',
                        }}>
                            <QRCode
                                value={'flashcoin:'+this.props.wallet_address}
                                size={width-80}
                                bgColor='#191714'
                                fgColor='#FFFFFF'/>
                        </View>
                        <View style={styles.qrCodeModalWalletAddress}>
                            <Text selectable={true} style={styles.qrCodeModalWalletAddressText}>
                                {this.props.wallet_address}
                            </Text>
                        </View>
                        <View style={styles.qrCodeModalBtnGrp}>
                            <TouchableOpacity onPress={()=>{
                                    Clipboard.setString(this.props.wallet_address);
                                    Alert.alert('Wallet address copied!');
                                }} style={styles.qrCodeModalBtn}>
                                <Icon style={styles.qrCodeModalBtnIcon} name='copy' />
                                <Text style={styles.qrCodeModalBtnText}>Copy</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>{
                                Share.share({message:this.props.wallet_address,title: utils.getCurrencyUnitUpcase(this.props.currency_type)});
                            }} style={styles.qrCodeModalBtn}>
                                <Icon style={styles.qrCodeModalBtnIcon} name='share-alt' />
                                <Text style={styles.qrCodeModalBtnText}>Share</Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Button onPress={this.props.hideQR} style={styles.qrCodeModalCloseBtn} value='Close' />
                        </View>
                    </View>
                </Modal>
                <Modal
                    transparent={true}
                    visible={!!this.state.fullBalance}
                    onRequestClose={()=>this.setState({fullBalance:false})}>
                    <View style={styles.reqDetailModal}>
                        <View style={styles.reqDetailBox}>
                            <View style={styles.reqDetailHeader}>
                                <Text style={styles.reqDetailTitle}>{utils.getCurrencyUnitUpcase(this.props.currency_type)} Balance</Text>
                                <Text style={styles.reqDetailCloseIcon}
                                    onPress={()=>this.setState({fullBalance:false})}>X</Text>
                            </View>
                        </View>
                        <View style={styles.reqDetailBody}>
                            <Text style={{
                                fontSize: 35,
                                fontWeight: 'bold',
                                textAlign: 'center',
                                color: '#000000',
                                marginBottom: 25,
                            }}>{constants.CURRENCY_TYPE.FLASH ===this.props.currency_type?
                                utils.currencyFormatter(utils.satoshiToFlash(this.props.balance),10):
                                utils.currencyFormatter(this.props.balance,8)}
                            {' '+utils.getCurrencyUnitUpcase(this.props.currency_type)}{"\n"}
                                {constants.CURRENCY_TYPE.FLASH !== this.props.currency_type?<Text style={{
                                        fontSize: 18,
                                        fontWeight: 'normal',
                                        color: '#191714',
                                    }}>
                                    Unconfirmed: {this.props.ubalance}
                                    {' '+utils.getCurrencyUnitUpcase(this.props.currency_type)}</Text>:null
                                }
                            </Text>
                            <Button
                                onPress={()=>this.setState({fullBalance:false})}
                                style={[styles.reqBtn,{backgroundColor:'#E0AE27'}]}
                                textstyle={[styles.reqBtnLabel,{color: '#191714'}]}
                                value='Close' />
                        </View>
                    </View>
                </Modal>
                <Loader show={!!this.props.refreshing}/>
                {this.state.showCurrencyMenu?<View style={styles.currencyMenuPopup}>
                        <TouchableOpacity
                            activeOpacity={1}
                            style={styles.currencyMenuPopupContainer}
                            onPress={()=>this.setState({showCurrencyMenu:false})}>
                            <Icon style={styles.currencyMenuPopupUpArrow} name='caret-up' />
                            <View style={styles.currencyMenuPopupBox}>
                                <TouchableOpacity
                                    onPress={()=>this.changeCurrency(constants.CURRENCY_TYPE.FLASH)}
                                    style={styles.currencyMenuPopupTab}>
                                    <View style={{flexDirection: 'row',alignItems: 'center'}}>
                                        <Image style={styles.currencyMenuPopupTabIconF}
                                        source={utils.getCurrencyIcon(constants.CURRENCY_TYPE.FLASH)}/>
                                        <Text style={styles.currencyMenuPopupTabLabel}>{utils.getCurrencyUnitUpcase(constants.CURRENCY_TYPE.FLASH)}</Text>
                                    </View>
                                    {this.props.currency_type === constants.CURRENCY_TYPE.FLASH?
                                    <Icon style={{color:'green'}} name='check' />:null}
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={()=>this.changeCurrency(constants.CURRENCY_TYPE.BTC)}
                                    style={styles.currencyMenuPopupTab}>
                                    <View style={{flexDirection: 'row',alignItems: 'center'}}>
                                        <Image style={styles.currencyMenuPopupTabIcon}
                                        source={utils.getCurrencyIcon(constants.CURRENCY_TYPE.BTC)}/>
                                        <Text style={styles.currencyMenuPopupTabLabel}>{utils.getCurrencyUnitUpcase(constants.CURRENCY_TYPE.BTC)}</Text>
                                    </View>
                                    {this.props.currency_type === constants.CURRENCY_TYPE.BTC?
                                    <Icon style={{color:'green'}} name='check' />:null}
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={()=>this.changeCurrency(constants.CURRENCY_TYPE.LTC)}
                                    style={[styles.currencyMenuPopupTab,{
                                        borderBottomWidth: 0,
                                        borderBottomColor: 'transparent',
                                    }]}>
                                    <View style={{flexDirection: 'row',alignItems: 'center'}}>
                                        <Image style={styles.currencyMenuPopupTabIcon}
                                        source={utils.getCurrencyIcon(constants.CURRENCY_TYPE.LTC)}/>
                                        <Text style={styles.currencyMenuPopupTabLabel}>{utils.getCurrencyUnitUpcase(constants.CURRENCY_TYPE.LTC)}</Text>
                                    </View>
                                    {this.props.currency_type === constants.CURRENCY_TYPE.LTC?
                                    <Icon style={{color:'green'}} name='check' />:null}
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    </View>:null
                }
            </Container>
        );
    }
}

function mapStateToProps({params}) {
    return {
        profile: params.profile,
        loading: params.recentTxns_loading || false,
        balanceLoader: params.balanceLoader || false,
        refreshing: params.refreshingHome || false,
        isLoggedIn: params.isLoggedIn,
        errorMsg: params.errorMsg || null,
        successMsg: params.successMsg || null,
        currency_type: params.currency_type,
        my_wallets: params.my_wallets || [],
        balance: params.balance || 0,
        ubalance: params.ubalance || 0,
        txns: params.recentTxns || [],
        txnLoader: params.txnLoader || false,
        txnDetail: params.txnDetail || {},
        wallet_address: params.wallet_address || null,
        show_qr: params.show_qr || false,
        balance_in_flash: params.balance_in_flash || '0.00000000',
        balance_in_btc: params.balance_in_btc || '0.00000000',
        balance_in_usd: params.balance_in_usd || '0.00000000',
        balance_in_ltc: params.balance_in_ltc || '0.00000000',
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
