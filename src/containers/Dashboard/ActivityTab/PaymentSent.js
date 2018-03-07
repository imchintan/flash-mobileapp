/**
 * Payment Sent Container Tab
 */

import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
} from 'react-native';
import {
    Container,
    Content
} from '@components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '@actions';
const styles = require("@styles/activity");

class PaymentSent extends Component<{}> {

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
                <Content hasHeader={false} style={styles.content}>
                    <View style={[styles.txnTab,{marginTop:10}]}>
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

export default connect(mapStateToProps, mapDispatchToProps)(PaymentSent);
