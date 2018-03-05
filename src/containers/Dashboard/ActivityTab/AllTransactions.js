/**
 * All Transaction Container Tab
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

const styles = require("@styles/activity");

export default class AllTransactions extends Component<{}> {

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
                </Content>
            </Container>
        );
    }
}
