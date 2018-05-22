/**
 * Home Container
 */

import React, { Component } from 'react';
import {
  View,
  Image,
  Linking,
} from 'react-native';
import {
    Container,
    Header,
    HeaderTitle,
    Icon,
    Toast,
    Text,
    Button,
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
        this.state = { scan: false };
    }

    componentWillReceiveProps(props) {
        this.setState({scan:props.screenProps.scan});
    }

    onBarCodeRead(e){
        this.setState({scan:false});
        let data = e.data;
        if(!data){
            Toast.errorTop('Invalid qr code!');
            setTimeout(()=>this.setState({scan:true}),2000);
            return false;
        }

        let containsColumn = data.indexOf(':');
        if (containsColumn >= 0) {
            data = data.substring(containsColumn + 1, data.length);
        }

        //check for qt wallet
        let containsQueMark = data.indexOf('?');
        if (containsQueMark >= 0) {
            data = data.substring(0, containsQueMark);
        }

        if(data.length < 25 || data.length > 34){
            Toast.errorTop('Invalid qr code!');
            setTimeout(()=>this.setState({scan:true}),2000);
            return false;
        }

        let publicAddress = data;
        this.props.navigation.navigate('Send',{publicAddress});
        // setTimeout(()=>this.setState({scan:true}),2000);
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
                    {this.state.scan?
                        <Camera
                            ref={(cam) => {
                                this.camera = cam;
                            }}
                            onBarCodeRead={this.onBarCodeRead.bind(this)}
                            notAuthorizedView={
                                <View style={styles.notAuthorizedView}>
                                    <Text  style={styles.notAuthorizedViewText}>
                                        Need permission to access Camera,{"\n"}
                                        Please go to <Text style={{fontWeight: 'bold'}}>Settings</Text> and allow{"\n"}
                                        <Text style={{fontWeight: 'bold', color:'#E0AE27'}}>FLASH</Text> to access Camera
                                    </Text>
                                    <Button
                                        style={{marginTop:15}}
                                        onPress={()=>Linking.openURL('app-settings:')}
                                        value="Go to Settings"/>
                                </View>
                            }
                            style={styles.preview}
                            aspect={Camera.constants.Aspect.fill}>
                            <Image style={styles.scanQRBoxImg} source={require('@images/scan-qr.png')} />
                        </Camera>:<View style={[styles.preview,{backgroundColor: '#222'}]}>
                            <Image style={styles.scanQRBoxImg} source={require('@images/scan-qr.png')} />
                            <Button
                                style={styles.scanQRBtn}
                                onPress={()=>this.setState({scan:true})}
                                value="Scan QR"/>
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
