/**
 * Two Phase Authentication Container
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
    Loader,
    Button,
    Switch,
    Icon,
    Text,
    Toast
} from '@components';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '@actions';
const { width } = Dimensions.get('window');

class TwoPhaseAuth extends Component<{}> {

    static navigationOptions = {
        header: null,
        gesturesEnabled: true,
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
                    <HeaderTitle style={{width:'80%',left:'10%'}}>Two Phase Authentication</HeaderTitle>
                </Header>
                <Content style={styles.content}>
                    <View style={styles.securityCenterBox}>
                        <Image style={styles.fingerprint} source={require('@images/g-auth-icon.png')}/>
                    </View>
                    <View>
                        <View style={styles.twoPhaseAuthSwitch}>
                            <Text style={styles.twoPhaseAuthSwitchLabel}>
                                Two Phase Authentication
                            </Text>
                            <Switch
                                active={!!this.props.profile.totp_enabled || !!this.state.totp_enabled}
                                buttonRadius={12}
                                inactiveButtonColor={'#DFDFDF'}
                                inactiveButtonPressedColor={'#191714'}
                                activeButtonColor={'#191714'}
                                activeButtonPressedColor={'#DFDFDF'}
                                activeBackgroundColor={'#E0AE27'}
                                inactiveBackgroundColor={'#B1B1B1'}
                                onChangeState={(totp_enabled)=>{
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
                        {(this.state.totp_enabled && this.state.recovery_obj_2fa)?<View style={styles.twoPhaseAuth}>
                            <Text style={styles.twoPhaseAuthTitle}>Enable Google Authenticator</Text>
                            <View style={styles.twoPhaseAuthNote}>
                                <Text style={styles.twoPhaseAuthNoteText}>1.</Text>
                                <Text style={styles.twoPhaseAuthNoteText}>
                                    Install Google Authenticator on your mobile
                                </Text>
                            </View>
                            <View style={styles.twoPhaseAuthNote}>
                                <Text style={styles.twoPhaseAuthNoteText}>2.</Text>
                                <Text style={styles.twoPhaseAuthNoteText}>
                                    Open the Google Authenticator app
                                </Text>
                            </View>
                            <View style={styles.twoPhaseAuthNote}>
                                <Text style={styles.twoPhaseAuthNoteText}>3.</Text>
                                <Text style={styles.twoPhaseAuthNoteText}>
                                    Tab menu, then tap "Set up account",
                                    then tap "Scan a barcode"
                                </Text>
                            </View>
                            <View style={styles.twoPhaseAuthNote}>
                                <Text style={styles.twoPhaseAuthNoteText}>4.</Text>
                                <Text style={styles.twoPhaseAuthNoteText}>
                                    Your phone will now be in a "scanning" mode.
                                    When you are in this mode,
                                    scan the barcode below
                                </Text>
                            </View>
                            <View style={styles.twoPhaseAuthNote}>
                                <Text style={styles.twoPhaseAuthNoteText}>5.</Text>
                                <Text style={styles.twoPhaseAuthNoteText}>
                                    <Text style={styles.twoPhaseAuthNoteBold}>IMPORTANT !! </Text>
                                    Please also note down or print recovery key given below.
                                    It will help you when you lost or change your phone.
                                </Text>
                            </View>
                            <View style={styles.twoPhaseAuthNote}>
                                <Text style={styles.twoPhaseAuthNoteText}>6.</Text>
                                <Text selectable={true} style={styles.twoPhaseAuthNoteText}>
                                    Recovery key :-
                                    <Text selectable={true} style={styles.twoPhaseAuthNoteBold}>
                                        {' '+this.state.recovery_obj_2fa.totp_key}
                                    </Text>
                                </Text>
                            </View>
                            <Text style={[styles.twoPhaseAuthNoteText,{marginTop:5,padding: 15}]}>
                                Once you have scanned the barcode,
                                enter the 6-digit code below:
                            </Text>
                            <View style={styles.twoPhaseAuthQR}>
                                <QRCode
                                    value={this.state.recovery_obj_2fa.otpUri}
                                    size={width-70}
                                    bgColor={this.props.nightMode?'#fff':'#000'}
                                    fgColor={this.props.nightMode?'#000':'#fff'}/>
                            </View>
                            <Text style={[styles.twoPhaseAuthNoteText,{
                                    marginTop:20,
                                    paddingHorizontal: 10,
                                    fontSize: 16,
                                    fontFamily: 'futura-medium',
                                    color: this.props.nightMode?'#E9E9E9':'#333'
                                }]}>
                                Verification code
                            </Text>
                            <View style={styles.twoPhaseAuthInputBox}>
                                <TextInput
                                    underlineColorAndroid='transparent'
                                    style={styles.twoPhaseAuthInput}
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
                <Loader show={this.props.loading} />
            </Container>
        );
    }
}

function mapStateToProps({params}) {
    return {
        loading: params.loading,
        profile: params.profile,
        recovery_obj_2fa: params.recovery_obj_2fa || null,
        nightMode: params.nightMode,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TwoPhaseAuth);
