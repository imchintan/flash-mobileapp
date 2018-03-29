/**
 * Home Container
 */

import React, { Component } from 'react';
import {
    View,
    Image,
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
    Loader,
    Text,
    Toast,
    QRCode
} from '@components';
import moment from 'moment-timezone';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '@actions';
import { satoshiToFlash, flashNFormatter } from '@lib/utils';

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
        }
    }

    componentDidMount(){
        this.props.getBalance();
        this.props.getProfile();
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
                            <Image style={{width:40,height:40, borderRadius: 20}}
                                defaultSource={require('@images/user-profile-icon-white.png')}
                                source={require('@images/user-profile-icon-white.png')}
                            />
                        </TouchableOpacity>
                    </HeaderLeft>
                    <HeaderTitle>
                        <Image style={{resizeMode: 'contain'}}
                            source={require('@images/app-text-icon-white.png')}/>
                    </HeaderTitle>
                    <HeaderRight>
                        <Icon style={styles.headerFAIcon} onPress={this.props.showQR} name='qrcode' />
                    </HeaderRight>
                </Header>
                <Content bounces={false}>
                    <View style={styles.balanceBox}>
                        <Icon onPress={()=>this.props.getBalance(true)} style={styles.balanceRefresh} name='refresh' />
                        <Text style={styles.balanceLabel}>Your Balance</Text>
                        <Text style={styles.balanceText}>{flashNFormatter(satoshiToFlash(this.props.balance),2)} FLASH</Text>
                        <Text style={styles.otherBalanceText}>≈ {this.props.balance_in_btc} BTC</Text>
                        <Text style={styles.otherBalanceText}>≈ {this.props.balance_in_usd} USD</Text>
                    </View>
                    <View style={styles.txnList}>
                        <Text style={styles.recentTxnLabel}>Recent Transactions</Text>
                        {
                            this.props.txns.map((txn,index)=>
                                <TransactionTab txn={txn} key={'_txn_'+txn.transaction_id+'_'+index} />
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
                        <QRCode
                            value={'flashcoin:'+this.props.wallet_address}
                            size={width-70}
                            bgColor='#191714'
                            fgColor='#FFFFFF'/>
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
        loading: params.recentTxns_loading || false,
        isLoggedIn: params.isLoggedIn,
        errorMsg: params.errorMsg || null,
        successMsg: params.successMsg || null,
        currency_type: params.currency_type,
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
