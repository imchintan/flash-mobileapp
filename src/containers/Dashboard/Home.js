/**
 * Home Container
 */

import React, { Component } from 'react';
import {
    View,
    Image,
    Text,
} from 'react-native';
import {
    Container,
    Content,
    Header,
    HeaderLeft,
    HeaderTitle,
    HeaderRight,
    Icon,
    Button
} from '@components';
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

    render() {
        return (
            <Container>
                <Header>
                    <HeaderLeft>
                        <Image style={{width:40,height:40}} source={{uri:'https://walletstg.flashcoin.io/assets/images/pages/account.png'}} />
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
                        <Text style={styles.balanceLabel}><Icon name='refresh' /> <Text style={styles.balanceLabelText}>Your Balance</Text></Text>
                        <Text style={styles.balanceText}>2125.61234564 k FLASH</Text>
                        <Text style={styles.otherBalanceText}>≈ 0.56240124 BTC</Text>
                        <Text style={styles.otherBalanceText}>≈ 00012.5624 USD</Text>
                    </View>
                    <View>
                        <Text style={styles.recentTxnLabel}>
                            Recent Transactions
                        </Text>
                        <Button value={'Logout'} onPress={this.props.logout} />
                        <View style={styles.txnTab}>
                            <Image style={styles.txnIcon} source={require('@images/receive-icon.png')} />
                            <View style={styles.txnDetail}>
                                <Text numberOfLines={1} style={styles.txnAmount}>+ 112516.1250
                                <Text style={styles.txnRecvFrom}> from Maulik Vora</Text></Text>
                                <Text style={styles.txnDateTime}>Feb 19, 2018 06:22:52 PM</Text>
                            </View>
                            <View style={styles.txnTag}>
                                <Text style={styles.txnTagLabel}>Recived</Text>
                            </View>
                        </View>
                        <View style={styles.txnTab}>
                            <Image style={styles.txnIcon} source={require('@images/send-icon.png')} />
                            <View style={styles.txnDetail}>
                                <Text numberOfLines={1} style={styles.txnAmount}>- 2516.1250
                                <Text style={styles.txnRecvFrom}> to Chintan Prjapati</Text></Text>
                                <Text style={styles.txnDateTime}>Feb 18, 2018 11:02:29 AM</Text>
                            </View>
                            <View style={styles.txnTagSent}>
                                <Text style={styles.txnTagLabel}>Sent</Text>
                            </View>
                        </View>
                        <View style={styles.txnTab}>
                            <Image style={styles.txnIcon} source={require('@images/receive-icon.png')} />
                            <View style={styles.txnDetail}>
                                <Text numberOfLines={1} style={styles.txnAmount}>+ 112516.1250
                                <Text style={styles.txnRecvFrom}> from Maulik Vora</Text></Text>
                                <Text style={styles.txnDateTime}>Feb 19, 2018 06:22:52 PM</Text>
                            </View>
                            <View style={styles.txnTag}>
                                <Text style={styles.txnTagLabel}>Recived</Text>
                            </View>
                        </View>
                        <View style={styles.txnTab}>
                            <Image style={styles.txnIcon} source={require('@images/send-icon.png')} />
                            <View style={styles.txnDetail}>
                                <Text numberOfLines={1} style={styles.txnAmount}>- 2516.1250
                                <Text style={styles.txnRecvFrom}> to Chintan Prjapati</Text></Text>
                                <Text style={styles.txnDateTime}>Feb 18, 2018 11:02:29 AM</Text>
                            </View>
                            <View style={styles.txnTagSent}>
                                <Text style={styles.txnTagLabel}>Sent</Text>
                            </View>
                        </View>
                        <View style={styles.txnTab}>
                            <Image style={styles.txnIcon} source={require('@images/receive-icon.png')} />
                            <View style={styles.txnDetail}>
                                <Text numberOfLines={1} style={styles.txnAmount}>+ 112516.1250
                                <Text style={styles.txnRecvFrom}> from Maulik Vora</Text></Text>
                                <Text style={styles.txnDateTime}>Feb 19, 2018 06:22:52 PM</Text>
                            </View>
                            <View style={styles.txnTag}>
                                <Text style={styles.txnTagLabel}>Recived</Text>
                            </View>
                        </View>
                        <View style={styles.txnTab}>
                            <Image style={styles.txnIcon} source={require('@images/send-icon.png')} />
                            <View style={styles.txnDetail}>
                                <Text numberOfLines={1} style={styles.txnAmount}>- 2516.1250
                                <Text style={styles.txnRecvFrom}> to Chintan Prjapati</Text></Text>
                                <Text style={styles.txnDateTime}>Feb 18, 2018 11:02:29 AM</Text>
                            </View>
                            <View style={styles.txnTagSent}>
                                <Text style={styles.txnTagLabel}>Sent</Text>
                            </View>
                        </View>
                        <View style={styles.txnTab}>
                            <Image style={styles.txnIcon} source={require('@images/receive-icon.png')} />
                            <View style={styles.txnDetail}>
                                <Text numberOfLines={1} style={styles.txnAmount}>+ 112516.1250
                                <Text style={styles.txnRecvFrom}> from Maulik Vora</Text></Text>
                                <Text style={styles.txnDateTime}>Feb 19, 2018 06:22:52 PM</Text>
                            </View>
                            <View style={styles.txnTag}>
                                <Text style={styles.txnTagLabel}>Recived</Text>
                            </View>
                        </View>
                        <View style={styles.txnTab}>
                            <Image style={styles.txnIcon} source={require('@images/send-icon.png')} />
                            <View style={styles.txnDetail}>
                                <Text numberOfLines={1} style={styles.txnAmount}>- 2516.1250
                                <Text style={styles.txnRecvFrom}> to Chintan Prjapati</Text></Text>
                                <Text style={styles.txnDateTime}>Feb 18, 2018 11:02:29 AM</Text>
                            </View>
                            <View style={styles.txnTagSent}>
                                <Text style={styles.txnTagLabel}>Sent</Text>
                            </View>
                        </View>
                    </View>
                </Content>
            </Container>
        );
    }
}

function mapStateToProps(state) {
  return {
    // email: state.email,
    // password: state.password,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
