/**
 * Home Container
 */

import React, { Component } from 'react';
import {
  View,
  Text,
  Image
} from 'react-native';
import {
    Container,
    Header,
    HeaderTitle,
    Content,
    Icon,
    FAB
} from '@components';
import Camera from 'react-native-camera';

const styles = require("@styles/send");

export default class ScanQR extends Component<{}> {

    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);
        this.state = {};
    }

    onBarCodeRead = (data) => {

    }

    render() {
        return (
            <Container>
                <Header>
                    <HeaderTitle>
                        Send
                    </HeaderTitle>
                </Header>
                <View style={styles.sendFormBox}>
                    <View style={styles.sendFormRow}>
                        <Text style={styles.sendFormPlaceholder}>Enter email or Public address</Text>
                        <Icon style={styles.sendFormPlaceholder} name='search'/>
                    </View>
                </View>
                <FAB style={styles.fab} textstyle={styles.fabText}>OR</FAB>
                <View style={styles.content}>
                    <Camera
                        ref={(cam) => {
                            this.camera = cam;
                        }}
                        onBarCodeRead={this.onBarCodeRead.bind(this)}
                        style={styles.preview}
                        aspect={Camera.constants.Aspect.fill}>
                        <Image style={styles.scanQRBoxImg} source={require('@images/scan-qr.png')} />
                        <Text style={styles.scanQRLabel}>Scan QR</Text>
                    </Camera>
                </View>
            </Container>
        );
    }
}
