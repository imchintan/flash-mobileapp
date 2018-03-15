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
    Toast,
    FAB
} from '@components';
import Camera from 'react-native-camera';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '@actions';
const styles = require("@styles/send");

class ScanQR extends Component<{}> {

    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);
        this.state = { scan: true };
    }

    onBarCodeRead = (e) => {
        this.setState({scan:false});
        let data = e.data;
        if(!data){
            Toast.errorTop('Invalid qr code!');
            setTimeout(()=>this.setState({scan:true}),2000);
            return false;
        }
        let _data = data.split(':');
        if(_data.length == 1 || _data[0] !== 'flashcoin'){
            Toast.errorTop('Invalid qr code!');
            setTimeout(()=>this.setState({scan:true}),2000);
            return false;
        }
        let publicAddress = _data[1];
        this.props.navigation.navigate('Send',{publicAddress});
        setTimeout(()=>this.setState({scan:true}),2000);
    }

    render() {
        return (
            <Container>
                <Header>
                    <HeaderTitle>Send</HeaderTitle>
                </Header>
                <View style={styles.sendFormBox}>
                    <View style={styles.sendFormRow}>
                        <Text onPress={()=>this.props.navigation.navigate('Send')} style={styles.sendFormPlaceholder}>Enter email or Public address</Text>
                        <Icon style={styles.sendFormPlaceholder} name='search'/>
                    </View>
                </View>
                <FAB style={styles.fab} textstyle={styles.fabText}>OR</FAB>
                <View style={styles.content}>
                    {this.props.screenProps.scan && this.state.scan?
                        <Camera
                            ref={(cam) => {
                                this.camera = cam;
                            }}
                            onBarCodeRead={this.onBarCodeRead.bind(this)}
                            style={styles.preview}
                            aspect={Camera.constants.Aspect.fill}>
                            <Image style={styles.scanQRBoxImg} source={require('@images/scan-qr.png')} />
                            <Text style={styles.scanQRLabel}>Scan QR</Text>
                        </Camera>:<View style={[styles.preview,{backgroundColor: '#222'}]}>
                            <Image style={styles.scanQRBoxImg} source={require('@images/scan-qr.png')} />
                            <Text style={styles.scanQRLabel}>Scan QR</Text>
                        </View>
                    }
                </View>
            </Container>
        );
    }
}

function mapStateToProps({params}) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ScanQR);
