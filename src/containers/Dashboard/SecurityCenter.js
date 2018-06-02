/**
 * Settings Container
 */

import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
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
    Button,
    Icon,
    Text,
    Loader,
    Toast
} from '@components';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '@actions';
const { width } = Dimensions.get('window');
const styles = require("@styles/securityCenter");

class SecurityCenter extends Component<{}> {

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
                    <HeaderTitle>Security Center</HeaderTitle>
                </Header>
                <Content>
                    <View style={styles.securityCenterBox}>
                        <Icon style={styles.securityCenterBoxIcon} name='shield'/>
                        <Text style={styles.securityCenterBoxNote}>
                            Enable all security features for maximum protection.
                        </Text>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.securityCenterTab}
                            onPress={()=>this.props.navigation.navigate('SecurityQuestion')}>
                            <Icon style={[styles.securityCenterTabLeftIcon,{color: 'green'}]}
                                name='check-circle-o'/>
                            <View style={styles.securityCenterTabContent}>
                                <Text style={styles.securityCenterTabTitle}>
                                    Security Questions
                                </Text>
                                <Text style={styles.securityCenterTabNote}>
                                    To recover your FLASH account if you forget password.
                                </Text>
                            </View>
                            <Icon style={styles.securityCenterTabRightIcon} name='angle-right'/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.securityCenterTab}
                            onPress={()=>this.props.navigation.navigate('SetOrUpdatePIN',{update_pin: true})}>
                            <Icon style={[styles.securityCenterTabLeftIcon,{color: 'green'}]}
                                name='check-circle-o'/>
                            <View style={styles.securityCenterTabContent}>
                                <Text style={styles.securityCenterTabTitle}>
                                    6-Digit PIN
                                </Text>
                                <Text style={styles.securityCenterTabNote}>
                                    Protect your FLASH app from unauthorized access.
                                </Text>
                            </View>
                            <Icon style={styles.securityCenterTabRightIcon} name='angle-right'/>
                        </TouchableOpacity>
                        {/*
                        <TouchableOpacity style={styles.securityCenterTab}>
                            <Icon style={styles.securityCenterTabLeftIcon}
                                name='check-circle-o'/>
                            <View style={styles.securityCenterTabContent}>
                                <Text style={styles.securityCenterTabTitle}>
                                    Fingerprint Authentication
                                </Text>
                                <Text style={styles.securityCenterTabNote}>
                                    Conveniently unlock your FLASH app with fingerprint.
                                </Text>
                            </View>
                            <Icon style={styles.securityCenterTabRightIcon} name='angle-right'/>
                        </TouchableOpacity>
                        */}
                    </View>
                </Content>
                <Loader show={this.props.loading} />
            </Container>
        );
    }
}

function mapStateToProps({params}) {
    return {
        loading: params.loading,
        profile: params.profile,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SecurityCenter);
