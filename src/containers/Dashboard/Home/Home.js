/**
 * Home Container
 */

import React, { Component } from 'react';
import {
    View,
    Image,
    Text,
    Modal,
    TouchableOpacity,
    Dimensions
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
    Toast,
    QRCode
} from '@components';
import moment from 'moment-timezone';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '@actions';
import { satoshiToFlash } from '@lib/commonFN';

const { height, width } = Dimensions.get('window');
const styles = require("@styles/home");

class Home extends Component<{}> {

    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillReceiveProps(nextProps){
        if(nextProps){
            if(nextProps.errorMsg){
                Toast.errorTop(nextProps.errorMsg);
            }
            if(nextProps.successMsg){
                Toast.successTop(nextProps.successMsg);
            }
        }
    }

    componentDidMount(){
        this.props.getBalance();
        this.props.getProfile();
        this.props.getMyWallets();
        this.props.getRecentTransactions();
        // this.coinmarketcapValue = setInterval(this.props.getCoinMarketCapDetail, 60000);
    }

    componentWillUnMount(){
        // clearInterval(this.coinmarketcapValue);
    }

    render() {
        return (
            <Container>
                <Header>
                    <HeaderLeft>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('MyAccount')}>
                            <Image style={{width:35,height:35, borderRadius: 20}}
                                defaultSource={require('@images/user-profile-icon-white.png')}
                                source={require('@images/user-profile-icon-white.png')}
                                // source={{uri:'https://content-static.upwork.com/uploads/2014/10/01073427/profilephoto1.jpg'}}
                            />
                        </TouchableOpacity>
                    </HeaderLeft>
                    <HeaderTitle>
                        <Image style={styles.appHeaderIcon} source={require("@images/app-icon.png")}/>
                    </HeaderTitle>
                    <HeaderRight>
                        <Icon style={styles.headerFAIcon} onPress={this.props.showQR} name='qrcode' />
                    </HeaderRight>
                </Header>
                <Content bounces={false}>
                    <View style={styles.balanceBox}>
                        <TouchableOpacity onPress={()=>this.props.getBalance(true)}>
                            <Text style={styles.balanceLabel}>
                                <Icon name='refresh' /> <Text style={styles.balanceLabelText}>Your Balance</Text>
                            </Text>
                        </TouchableOpacity>
                        <Text style={styles.balanceText}>{satoshiToFlash(this.props.balance)} FLASH</Text>
                        <Text style={styles.otherBalanceText}>≈ {this.props.balance_in_btc} BTC</Text>
                        <Text style={styles.otherBalanceText}>≈ {this.props.balance_in_usd} USD</Text>
                    </View>
                    <View>
                        <Text style={styles.recentTxnLabel}>Recent Transactions</Text>
                        {
                            this.props.txns.map(txn=>
                                <TransactionTab txn={txn} key={'_txn_'+txn.transaction_id} />
                            )
                        }
                    </View>
                </Content>
                <Modal
                    transparent={true}
                    visible={this.props.show_qr}
                    onRequestClose={this.props.hideQR}>
                    <View style={styles.qrCodeModal}>
                        <Text style={styles.qrCodeModalTitle}>Wallet Address</Text>
                        <QRCode
                            value={'flashcoin:'+this.props.wallet_address}
                            size={width-70}
                            bgColor='#000'
                            fgColor='#fff'/>
                        <View style={styles.qrCodeModalWalletAddress}>
                            <Text selectable={true} style={styles.qrCodeModalWalletAddressText}>
                                {this.props.wallet_address}
                            </Text>
                        </View>
                        <View>
                            <Button onPress={this.props.hideQR} style={styles.qrCodeModalCloseBtn} value='Close' />
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
        isLoggedIn: params.isLoggedIn,
        errorMsg: params.errorMsg || null,
        successMsg: params.successMsg || null,
        currencyType: params.currencyType,
        balance: params.balance || 0,
        txns: params.recentTxns || [],
        wallet_address: params.wallet_address || null,
        show_qr: params.show_qr || false,
        balance_in_btc: params.balance_in_btc || '0.00000000',
        balance_in_usd: params.balance_in_usd || '0.00000000',
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
