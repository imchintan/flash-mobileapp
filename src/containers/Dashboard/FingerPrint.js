/**
 * Settings Container
 */

import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    Image,
    TextInput,
    Dimensions
} from 'react-native';
import {
    Container,
    Content,
    Header,
    HeaderLeft,
    HeaderTitle,
    QRCode,
    Switch,
    Icon,
    Text,
    Toast
} from '@components';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '@actions';
const { width } = Dimensions.get('window');
const styles = require("@styles/securityCenter");

class FingerPrint extends Component<{}> {

    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <Container>
                <Header>
                    <HeaderLeft>
                        <TouchableOpacity>
                            <Icon onPress={()=>this.props.navigation.goBack()}
                                style={styles.headerBackIcon} name='angle-left' />
                        </TouchableOpacity>
                    </HeaderLeft>
                    <HeaderTitle style={{width:'80%',left:'10%'}}>Fingerprint Authentication</HeaderTitle>
                </Header>
                <Content>
                    <View style={styles.securityCenterBox}>
                        <Image style={styles.fingerprint} source={require('@images/fingerprint.png')}/>
                    </View>
                    <View>
                        <Text style={styles.fingerprintNote}>
                            Use your fingerprint to unlock your FLASH App.
                        </Text>
                        <View style={styles.fingerprintSwitch}>
                            <Text style={styles.fingerprintSwitchLabel}>
                                Enable Fingerprint Authentication
                            </Text>
                            <Switch
                                value={this.props.isEnableTouchID}
                                activeText={''}
                                inActiveText={''}
                                backgroundActive={'#E0AE27'}
                                barHeight={34}
                                circleBorderWidth={0}
                                onValueChange={(totp_enabled)=>{
                                    this.props.setTouchID((totp_enabled));
                                    Toast.successTop("Fingerprint Authentication is "+(totp_enabled?'enabled': 'disabled')+" successfully.");
                                    this.props.navigation.goBack();
                                }} />
                        </View>
                    </View>
                </Content>
            </Container>
        );
    }
}

function mapStateToProps({params}) {
    return {
        profile: params.profile,
        isSupportedTouchID: params.isSupportedTouchID || false,
        isEnableTouchID: params.isEnableTouchID || false,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FingerPrint);
