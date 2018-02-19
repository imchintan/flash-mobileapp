/**
 * Home Container
 */

import React, { Component } from 'react';
import {
    View,
    Image,
    ImageBackground,
    Text,

} from 'react-native';
import {
    Container,
    Content,
    Header,
    HeaderTitle,
    Icon
} from '@components';

const styles = require("@styles/home");

export default class Home extends Component<{}> {

    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);
        this.state = {
            transparent:true,
            opacity:1,
            opacityHeader:0
        };
    }

    render() {
        return (
            <Container>
                <Header transparent={this.state.transparent} style={{opacity:this.state.opacityHeader}}>
                    <HeaderTitle>
                        <Image style={styles.appTextLogo} source={require("@images/app-text-icon-white.png")}/>
                    </HeaderTitle>
                </Header>
                <Content bounces={false} hasHeader={false}
                    scrollEventThrottle={20}
                    onScroll={(e)=>{
                        this.setState({transparent: (e.nativeEvent.contentOffset.y < 170),
                                opacity:e.nativeEvent.contentOffset.y > 120?
                                (e.nativeEvent.contentOffset.y > 170?0:(1 - e.nativeEvent.contentOffset.y/750)):1,
                                opacityHeader:e.nativeEvent.contentOffset.y < 120?0:
                                (e.nativeEvent.contentOffset.y < 170?(e.nativeEvent.contentOffset.y/200):1)})
                    }}>
                    <ImageBackground style={[styles.bg,{opacity: this.state.opacity}]} source={require('@images/bg.png')}>
                        <Image style={styles.appLogo} source={require("@images/app-text-icon-white.png")}/>
                        <Text style={styles.balanceLabel}>YOUR BALANCE</Text>
                        <View style={styles.balanceBox}>
                            <Image style={styles.appIcon25}
                            source={require("@images/app-icon.png")}/>
                            <Text style={styles.balanceText}>2125.61234564 K</Text>
                        </View>
                        <Text style={styles.otherBalanceText}>≈ 0.56240124 BTC</Text>
                        <Text style={styles.otherBalanceText}>≈ 00012.5624 USD</Text>
                    </ImageBackground>
                    <View>
                        <Text style={styles.recentTxnLabel}>
                            Recent Transactions
                        </Text>
                        <View style={styles.txnTab}>
                            <Image style={styles.txnIcon} source={require('@images/receive-flash.png')} />
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
                            <Image style={styles.txnIcon} source={require('@images/send-flash.png')} />
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
