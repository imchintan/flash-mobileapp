/**
 * Home Container
 */

import React, { Component } from 'react';
import {
    View,
    Image,
    Text,
    TouchableOpacity
} from 'react-native';
import {
    Container,
    Content,
    Header,
    HeaderLeft,
    HeaderTitle,
    HeaderRight,
    Icon,
    Button,
    Toast
} from '@components';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '@actions';
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
    }

    satoshiToFlash(num) {
      if (num == undefined || num === '') return;
      return parseFloat(num/10000000000).toString();
    }

    render() {
        return (
            <Container>
                <Header>
                    <HeaderLeft>
                        {/*
                        <Image style={{width:40,height:40, borderRadius: 20}} source={{uri:'https://content-static.upwork.com/uploads/2014/10/01073427/profilephoto1.jpg'}} />
                        */}
                       <Icon style={styles.headerFAIcon} onPress={()=>this.props.logout()} name='power-off' />
                    </HeaderLeft>
                    <HeaderTitle>
                        <Image style={styles.appHeaderIcon} source={require("@images/app-icon.png")}/>
                    </HeaderTitle>
                    <HeaderRight>
                        <Icon style={styles.headerFAIcon} name='qrcode' />
                    </HeaderRight>
                </Header>
                <Content bounces={false}>
                    <View style={styles.balanceBox}>
                        <TouchableOpacity onPress={()=>this.props.getBalance(true)}>
                            <Text style={styles.balanceLabel}>
                                <Icon name='refresh' /> <Text style={styles.balanceLabelText}>Your Balance</Text>
                            </Text>
                        </TouchableOpacity>
                        <Text style={styles.balanceText}>{this.satoshiToFlash(this.props.balance)} FLASH</Text>
                        <Text style={styles.otherBalanceText}>≈ 0.56240124 BTC</Text>
                        <Text style={styles.otherBalanceText}>≈ 00012.5624 USD</Text>
                    </View>
                    <View>
                        <Text style={styles.recentTxnLabel}>Recent Transactions</Text>
                        {
                            this.props.txns.map(txn=>
                                <View style={styles.txnTab} key={txn.transaction_id}>
                                    <Image style={styles.txnIcon} source={txn.receiver_profile_pic_url?{uri:txn.receiver_profile_pic_url}:(txn.type == 1?require('@images/send-icon.png'):require('@images/receive-icon.png'))} />
                                    <View style={styles.txnDetail}>
                                        <Text numberOfLines={1} style={styles.txnAmount}>{txn.type == 1?'-':'+'} {txn.amount}
                                        <Text style={styles.txnRecvFrom}> {txn.type == 1?'to':'from'} {txn.sender_display_name}</Text></Text>
                                        <Text style={styles.txnDateTime}> {moment(txn.created_ts).format('MMM DD, YYYY hh:mm A')}</Text>
                                    </View>
                                    {txn.type == 1?<View style={styles.txnTagSent}>
                                        <Text style={styles.txnTagLabel}>Sent</Text>
                                    </View>:<View style={styles.txnTag}>
                                        <Text style={styles.txnTagLabel}>Recived</Text>
                                    </View>}
                                </View>
                            )
                        }
                    </View>
                </Content>
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {
        loading: state.params.loading,
        isLoggedIn: state.params.isLoggedIn,
        errorMsg: state.params.errorMsg || null,
        successMsg: state.params.successMsg || null,
        currencyType: state.params.currencyType,
        balance: state.params.balance || 0,
        txns: state.params.recentTxns || [],
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
