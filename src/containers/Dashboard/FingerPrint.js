/**
 * Finger Print Container
 */

import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    Image,
    Platform
} from 'react-native';
import {
    Container,
    Content,
    Header,
    HeaderLeft,
    HeaderTitle,
    Switch,
    Icon,
    Text,
    Toast
} from '@components';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '@actions';

class FingerPrint extends Component<{}> {

    static navigationOptions = {
        header: null,
        gesturesEnabled: true,
    }

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const styles = (this.props.nightMode?require('@styles/nightMode/securityCenter'):
            require('@styles/securityCenter'));
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
                <Content style={styles.content}>
                    <View style={styles.securityCenterBox}>
                        <Image style={styles.fingerprint} source={require('@images/fingerprint.png')}/>
                    </View>
                    <View>
                        <Text style={styles.fingerprintNote}>
                            Use your fingerprint to unlock your {Platform.OS === 'ios'?'FLASH Wallet':'FLASH app'}.
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
        nightMode: params.nightMode,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FingerPrint);
