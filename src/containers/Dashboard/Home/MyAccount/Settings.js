/**
 * Settings Container
 */

import React, { Component } from 'react';
import {
  View,
  TextInput,
  Dimensions
} from 'react-native';
import {
    Content,
    QRCode,
    Switch,
    Button,
    Text,
    Toast
} from '@components';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '@actions';
const { height, width } = Dimensions.get('window');
const styles = require("@styles/myAccount");

class Settings extends Component<{}> {

    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);
        this.state = {
            recovery_obj_2fa: null,
        };
    }

    componentWillReceiveProps(nextProps){
        if(nextProps){
            if(nextProps.recovery_obj_2fa !== this.props.recovery_obj_2fa){
                this.setState({recovery_obj_2fa: nextProps.recovery_obj_2fa})
            }
        }
    }

    render() {
        return (
            <Content hasHeader={false}>
                <View style={styles.profile}>
                    {/*
                    <View style={styles.profileRow}>
                        <Text style={styles.profileRowLabel}>Wallet Address</Text>
                        <View style={styles.profileRowQRBox}>
                            <QRCode
                                value={'flashcoin:'+this.props.wallet_address}
                                size={width-70}
                                bgColor='#000'
                                fgColor='#fff'/>
                        </View>
                        <View style={[styles.profileRowInputBox,{marginTop: 15}]}>
                            <Text selectable={true} style={[styles.profileRowInput,{fontSize:14, textAlign:'center'}]}>{this.props.wallet_address}</Text>
                        </View>
                    </View>
                    */}
                    <View style={styles.profileSettingRow}>
                        <Text style={styles.profileSettingLabel}>Account Type:</Text>
                        <Text style={styles.profileSettingValue}>Consumer</Text>


                    </View>
                    <View style={styles.profileSettingRow}>
                        <Text style={styles.profileSettingLabel}>Two phase authentication:</Text>
                        <Switch
                            value={!!this.props.profile.totp_enabled || !!this.state.totp_enabled}
                            activeText={''}
                            inActiveText={''}
                            backgroundActive={'#E0AE27'}
                            barHeight={34}
                            circleBorderWidth={0}
                            onValueChange={(totp_enabled)=>{
                                this.setState({totp_enabled})
                                if(totp_enabled){
                                    this.props.start2FA();
                                } else {
                                    if(this.props.profile.totp_enabled)
                                        this.props.turnOff2FA();
                                    else
                                        this.props.reset2FA();

                                }

                            }} />

                    </View>
                    {(this.state.totp_enabled && this.state.recovery_obj_2fa)?<View>
                        <Text style={styles.setting2faTitle}>Enable Google Authenticator</Text>
                        <View style={styles.setting2faNote}>
                            <Text style={styles.setting2faNoteText}>1.</Text>
                            <Text style={styles.setting2faNoteText}>
                                Install Google Authenticator on your mobile
                            </Text>
                        </View>
                        <View style={styles.setting2faNote}>
                            <Text style={styles.setting2faNoteText}>2.</Text>
                            <Text style={styles.setting2faNoteText}>
                                Open the Google Authenticator app
                            </Text>
                        </View>
                        <View style={styles.setting2faNote}>
                            <Text style={styles.setting2faNoteText}>3.</Text>
                            <Text style={styles.setting2faNoteText}>
                                Tab menu, then tap "Set up account",
                                then tap "Scan a barcode"
                            </Text>
                        </View>
                        <View style={styles.setting2faNote}>
                            <Text style={styles.setting2faNoteText}>4.</Text>
                            <Text style={styles.setting2faNoteText}>
                                Your phone will now be in a "scanning" mode.
                                When you are in this mode,
                                scan the barcode below
                            </Text>
                        </View>
                        <View style={styles.setting2faNote}>
                            <Text style={styles.setting2faNoteText}>5.</Text>
                            <Text style={styles.setting2faNoteText}>
                                <Text style={styles.setting2faNoteBold}>IMPORTANT !!</Text>
                                Please also note down or print recovery key given below.
                                It will help you when you lost or change your phone.
                            </Text>
                        </View>
                        <View style={styles.setting2faNote}>
                            <Text style={styles.setting2faNoteText}>6.</Text>
                            <Text selectable={true} style={styles.setting2faNoteText}>
                                Recovery key :-
                                <Text selectable={true} style={styles.setting2faNoteBold}>
                                    {' '+this.state.recovery_obj_2fa.totp_key}
                                </Text>
                            </Text>
                        </View>
                        <Text style={[styles.setting2faNoteText,{marginTop:5,padding: 15}]}>
                            Once you have scanned the barcode,
                            enter the 6-digit code below:
                        </Text>
                        <View style={styles.profileSettingRow}>
                            <QRCode
                                value={this.state.recovery_obj_2fa.otpUri}
                                size={width-70}
                                bgColor='#000'
                                fgColor='#fff'/>
                        </View>
                        <Text style={[styles.setting2faNoteText,{marginTop:5,padding: 10}]}>
                            Verification code
                        </Text>
                        <View style={styles.profileRowInputBox}>
                            <TextInput
                                underlineColorAndroid='transparent'
                                style={styles.profileRowInput}
                                placeholder={'Enter verification code'}
                                value={this.state.verification_code || ''}
                                keyboardType={'numeric'}
                                onChangeText={(verification_code) => this.setState({verification_code})}
                            />
                        </View>
                        <Button style={{
                                marginTop: 20,
                                width: '100%',
                                height: 50,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 25,
                            }}
                            value={'Submit'}
                            onPress={()=>{
                                if(!this.state.verification_code || this.state.verification_code.length < 6){
                                    return Toast.errorTop('Invalid varification code!');
                                }
                                this.props.confirm2FA(this.state.verification_code);
                            }}
                        />
                    </View>:null}
                </View>
            </Content>
        );
    }
}

function mapStateToProps({params}) {
    return {
        profile: params.profile,
        wallet_address: params.wallet_address || null,
        recovery_obj_2fa: params.recovery_obj_2fa || null,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
