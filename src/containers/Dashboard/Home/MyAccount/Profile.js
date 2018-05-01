/**
 * My Profile Container
 */

import React, { Component } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal
} from 'react-native';
import {
    Text,
    Content,
    Button,
    Icon,
    Toast
} from '@components';
import moment from 'moment-timezone';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '@actions';
import PhoneInput from 'react-native-phone-input'
import PhoneNumber from 'react-native-phone-input/lib/phoneNumber'
import Premium from 'Premium';
const styles = require("@styles/myAccount");

class MyProfile extends Component<{}> {

    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            timezones: moment.tz.names().slice(0, 75),
            display_name: '',
            current_password: '',
            new_password: '',
            confirm_new_password: '',
        };
    }

    componentWillReceiveProps(nextProps){
        if(!nextProps) return;

        if(!nextProps.errorMsg && !!this.state.sendVerificationSMS &&
            nextProps.loading === false && this.props.loading !== nextProps.loading){
            this.setState({visibleVerifyInfo:true})
        }else if(nextProps.errorMsg && this.state.verifying){
            this.setState({errorMsg:nextProps.errorMsg, verifying: false});
        }else if(this.state.verifying === true && nextProps.successMsg){
            this.setState({errorMsg:'', verifying: false, visibleVerifyPhone: false, smsCode:''});
        }
    }

    updateDisplayName(){
        let display_name = !this.state.display_name?this.state.display_name.trim():this.state.display_name;
        this.setState({editName:false,display_name:''});
        if(!display_name){
            return;
        }
        this.props.updateProfile({display_name});
    }

    updateTimeZone(){
        let timezone = this.state.timezone;
        this.setState({editTZ:false,timezone:''});
        if(!timezone || timezone == this.props.profile.timezone){
            return;
        }
        this.props.updateProfile({timezone});
    }

    updatePhoneNumber(){
        let phone = this.state.phone;
        if(phone && !this.refs.phone.isValidNumber()){
            return Toast.errorTop('The phone number is invalid.');
        }

        let dialCode = this.refs.phone.getCountryCode();
        let phoneWithDialCode = '+'+dialCode+phone;

        this.setState({editPhone:false,phone:''});

        if(!phone || this.props.profile.phone === phoneWithDialCode){
            return ;
        }

        this.props.updateProfile({phone:phoneWithDialCode});
    }

    changePassword(){
        if(this.state.current_password  === '' &&
            this.state.new_password  === '' &&
            this.state.confirm_new_password  === ''){
            return this.setState({
                editPassword:false,
                current_password:'',
                new_password:'',
                confirm_new_password:'',
            });
        }

        if(!this.state.current_password){
            return Toast.errorTop('Please enter your current password');
        }

        let privKeyHex;

        // Verify current password
        try{
            privKeyHex = Premium.xaesDecrypt(this.state.current_password, this.props.profile.privateKey);
        }catch(e){
            return Toast.errorTop('Current password is not correct');
        }

        if(this.state.new_password === ''){
          return Toast.errorTop('Password cannot be empty');
        }

        if(this.state.new_password < 8){
          return Toast.errorTop('Password must have at least 8 characters');
        }

        if (!this.state.new_password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/)) {
          return Toast.errorTop('Password must contain at least 1 digit, 1 uppercase and 1 lowercase character');
        }

        if (this.state.new_password != this.state.confirm_new_password) {
          return Toast.errorTop('Confirmed password is not correct!');
        }

        let newPrivateKey = JSON.stringify(
          Premium.xaesEncrypt(256, this.state.new_password, privKeyHex)
        );

        let params = {
          idToken: this.props.profile.idToken,
          password: this.state.current_password,
          newPassword: this.state.new_password,
          newPrivateKey,
        };

        this.props.changePassword(params);

        this.setState({
            editPassword:false,
            current_password:'',
            new_password:'',
            confirm_new_password:'',
            timezone: ''
        });
    }

    getNumberWithoutDialCode(number){
        if(!number) return '';
        let dialCode = PhoneNumber.getDialCode(number);
        return number.replace(dialCode,'');
    }

    sendVerificationSMS(){
        this.setState({
            errorMsg: '',
            smsCode: '',
            visibleVerifyInfo: false,
            visibleVerifyPhone: false,
            sendVerificationSMS: true
        },()=>this.props.sendVerificationSMS());
    }

    verifyCode(){
        if(!this.state.smsCode || !this.state.smsCode.match(/^[0-9]{5,5}$/)){
            return this.setState({errorMsg: 'Verification code is not valid!'})
        }

        this.setState({
            verifying: true,
            errorMsg: '',
        },()=>this.props.verifyPhone(this.state.smsCode));
    }

    render() {

        const timezones = this.state.timezones.map((tz,index) =>
            <TouchableOpacity key={'_tz_'+index}
                onPress={()=>this.setState({visible:false, timezone: tz})}
                style={styles.optionStyle}>
                <Text style={styles.optionTextStyle}>{tz}</Text>
            </TouchableOpacity>
        );

        return (
            <Content hasHeader={false}>
                <View style={styles.profile}>
                    <View style={styles.profileRow}>
                        <View style={styles.profileRowTitle}>
                            <Text style={styles.profileRowLabel}>Full Name</Text>
                            {!this.state.editName?<TouchableOpacity
                                    onPress={()=>this.setState({editName:true},()=>this.refs.name.focus())}
                                    style={styles.profileActionBtn}>
                                    <Icon style={styles.profileActionIcon} name={'edit'}/>
                                </TouchableOpacity>:<View style={styles.profileActionBtnGrp}>
                                    <TouchableOpacity
                                        onPress={this.updateDisplayName.bind(this)}
                                        style={styles.profileActionBtn}>
                                        <Icon style={[styles.profileActionIcon,{color: 'green'}]} name={'check'}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={()=>this.setState({editName:false,display_name:''})}
                                        style={styles.profileActionBtn}>
                                        <Icon style={[styles.profileActionIcon, ,{color: 'red'}]} name={'close'}/>
                                    </TouchableOpacity>
                                </View>
                            }
                        </View>
                        <View style={styles.profileRowInputBox}>
                        <TextInput
                            ref='name'
                            editable={!!this.state.editName}
                            underlineColorAndroid='transparent'
                            style={styles.profileRowInput}
                            returnKeyType='done'
                            placeholder={this.props.profile.display_name || 'Enter full name'}
                            onChangeText={(display_name) => this.setState({display_name})}
                            value={!this.state.editName?this.props.profile.display_name:this.state.display_name}
                        />
                        </View>
                    </View>
                    <View style={styles.profileRow}>
                        <Text style={styles.profileRowLabel}>Email</Text>
                        <View style={styles.profileRowInputBox}>
                            <TextInput
                                editable={false}
                                underlineColorAndroid='transparent'
                                style={styles.profileRowInput}
                                placeholder={'Enter email address'}
                                keyboardType={'email-address'}
                                value={this.props.profile.email}
                            />
                        </View>
                    </View>
                    <View style={styles.profileRow}>
                        <View style={styles.profileRowTitle}>
                            <Text style={styles.profileRowLabel}>Password</Text>
                            {!this.state.editPassword?<TouchableOpacity
                                    onPress={()=>this.setState({editPassword:true},()=>this.refs.current_password.focus())}
                                    style={styles.profileActionBtn}>
                                    <Icon style={styles.profileActionIcon} name={'edit'}/>
                                </TouchableOpacity>:<View style={styles.profileActionBtnGrp}>
                                    <TouchableOpacity
                                        onPress={this.changePassword.bind(this)}
                                        style={styles.profileActionBtn}>
                                        <Icon style={[styles.profileActionIcon,{color: 'green'}]} name={'check'}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={()=>this.setState({
                                            editPassword:false,
                                            current_password:'',
                                            new_password:'',
                                            confirm_new_password:'',
                                        })}
                                        style={styles.profileActionBtn}>
                                        <Icon style={[styles.profileActionIcon,{color: 'red'}]} name={'close'}/>
                                    </TouchableOpacity>
                                </View>
                            }
                        </View>
                        <View style={styles.profileRowInputBox}>
                            <TextInput
                                ref='current_password'
                                editable={!!this.state.editPassword}
                                underlineColorAndroid='transparent'
                                placeholder={'Current Password'}
                                secureTextEntry={true}
                                style={[styles.profileRowInput,{marginTop:!this.state.editPassword?5:0}]}
                                returnKeyType='next'
                                onChangeText={(current_password) => this.setState({current_password})}
                                onSubmitEditing={()=>this.refs.new_password.focus()}
                                value={!this.state.editPassword?'************':this.state.current_password}
                            />
                        </View>
                        {!!this.state.editPassword?<View style={styles.profileRowInputBox}>
                                <TextInput
                                    ref='new_password'
                                    underlineColorAndroid='transparent'
                                    placeholder={'New Password'}
                                    secureTextEntry={true}
                                    style={styles.profileRowInput}
                                    returnKeyType='next'
                                    onChangeText={(new_password) => this.setState({new_password})}
                                    onSubmitEditing={()=>this.refs.confirm_new_password.focus()}
                                    value={this.state.new_password}
                                />
                            </View>:null
                        }
                        {!!this.state.editPassword?<View style={styles.profileRowInputBox}>
                                <TextInput
                                    ref='confirm_new_password'
                                    underlineColorAndroid='transparent'
                                    placeholder={'Confirm New Password'}
                                    secureTextEntry={true}
                                    returnKeyType='done'
                                    style={styles.profileRowInput}
                                    onChangeText={(confirm_new_password) => this.setState({confirm_new_password})}
                                    value={this.state.confirm_new_password}
                                />
                            </View>:null
                        }
                    </View>
                    <View style={styles.profileRow}>
                        <View style={styles.profileRowTitle}>
                            <Text style={styles.profileRowLabel}>Timezone</Text>
                            {!this.state.editTZ?<TouchableOpacity
                                    onPress={()=>this.setState({editTZ:true})}
                                    style={styles.profileActionBtn}>
                                    <Icon style={styles.profileActionIcon} name={'edit'}/>
                                </TouchableOpacity>:<View style={styles.profileActionBtnGrp}>
                                    <TouchableOpacity
                                        onPress={this.updateTimeZone.bind(this)}
                                        style={styles.profileActionBtn}>
                                        <Icon style={[styles.profileActionIcon,{color: 'green'}]} name={'check'}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={()=>this.setState({editTZ:false,timezone:''})}
                                        style={styles.profileActionBtn}>
                                        <Icon style={[styles.profileActionIcon, ,{color: 'red'}]} name={'close'}/>
                                    </TouchableOpacity>
                                </View>
                            }
                        </View>
                        <View style={styles.profileRowInputBox}>
                            <TouchableOpacity onPress={()=>!!this.state.editTZ && this.setState({visible:true})}>
                                <Text style={styles.profileRowInput}>{this.state.timezone || this.props.profile.timezone || moment.tz.guess()}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.profileRow}>
                        <View style={styles.profileRowTitle}>
                            <Text style={styles.profileRowLabel}>Phone number</Text>
                            {!this.state.editPhone?<View style={styles.profileActionBtnGrp}>
                                    {!!this.props.profile.phone && this.props.profile.phone_verified === 0?<TouchableOpacity
                                        onPress={this.sendVerificationSMS.bind(this)}
                                        style={styles.profileActionBtn}>
                                        <Icon style={[styles.profileActionIcon,{color: 'green'}]} name={'check-square-o'}/>
                                    </TouchableOpacity>:null}
                                    <TouchableOpacity
                                        onPress={()=>this.setState({editPhone:true})}
                                        style={styles.profileActionBtn}>
                                        <Icon style={styles.profileActionIcon} name={'edit'}/>
                                    </TouchableOpacity>
                                </View>:<View style={styles.profileActionBtnGrp}>
                                    <TouchableOpacity
                                        onPress={this.updatePhoneNumber.bind(this)}
                                        style={styles.profileActionBtn}>
                                        <Icon style={[styles.profileActionIcon,{color: 'green'}]} name={'check'}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={()=>this.setState({editPhone:false,timezone:''})}
                                        style={styles.profileActionBtn}>
                                        <Icon style={[styles.profileActionIcon, ,{color: 'red'}]} name={'close'}/>
                                    </TouchableOpacity>
                                </View>
                            }
                        </View>
                        <View style={[styles.profileRowInputBox,this.state.editPhone && {paddingHorizontal:0}]}>
                            {!this.state.editPhone?<Text style={styles.profileRowInput}>
                                    {this.props.profile.phone || 'Enter phone number'}
                                </Text>:<PhoneInput
                                    style={{borderWidth: 0}}
                                    initialCountry = {PhoneNumber.getCountryCodeOfNumber(this.props.profile.phone || '') || 'us'}
                                    textStyle={styles.profileRowInput}
                                    flagBoxStyle={styles.flagBoxStyle}
                                    textProps={{
                                        placeholder: this.getNumberWithoutDialCode(this.props.profile.phone || '') || 'Enter phone number'
                                    }}
                                    onChangePhoneNumber={(phone)=>this.setState({phone})}
                                ref='phone'/>
                            }

                        </View>
                    </View>
                </View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={!!this.state.visible}
                    onRequestClose={()=>this.setState({visible:false})}>
                    <View style={styles.overlayStyle}>
                        <View style={styles.optionContainer}>
                            <ScrollView keyboardShouldPersistTaps="always">
                                <View style={{ paddingHorizontal: 10 }}>
                                    {timezones}
                                </View>
                            </ScrollView>
                        </View>
                        <View style={styles.cancelContainer}>
                            <TouchableOpacity onPress={()=>this.setState({visible:false})}>
                                <View style={styles.cancelStyle}>
                                    <Text style={styles.canceTextStyle}>
                                        Cancel
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={!!this.state.visibleVerifyInfo}
                    onRequestClose={()=>this.setState({visibleVerifyInfo:false, sendVerificationSMS: false})}>
                    <View style={styles.reqDetailModal}>
                        <View style={styles.reqDetailBox}>
                            <View style={styles.reqDetailHeader}>
                                <Text style={styles.reqDetailTitle}>Verify Phone</Text>
                                <Text style={styles.reqDetailCloseIcon}
                                    onPress={()=>this.setState({visibleVerifyInfo:false, sendVerificationSMS: false})}>X</Text>
                            </View>
                            <View style={styles.reqDetailBody}>
                                <Text style={styles.verifyPhoneDesc}>
                                    A verification code has been sent to your phone.
                                </Text>
                                <Button
                                    onPress={()=>this.setState({visibleVerifyInfo:false, visibleVerifyPhone: true, sendVerificationSMS: false},()=>this.refs.verify_code.focus())}
                                    style={styles.reqBtn}
                                    textstyle={styles.reqBtnLabel}
                                    value='OK' />
                            </View>
                        </View>
                    </View>
                </Modal>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={!!this.state.visibleVerifyPhone}
                    onRequestClose={()=>this.setState({visibleVerifyPhone:false})}>
                    <View style={styles.reqDetailModal}>
                        <View style={styles.reqDetailBox}>
                            <View style={styles.reqDetailHeader}>
                                <Text style={styles.reqDetailTitle}>Verify Phone</Text>
                                <Text style={styles.reqDetailCloseIcon}
                                    onPress={()=>this.setState({visibleVerifyPhone:false})}>X</Text>
                            </View>
                            <View style={styles.reqDetailBody}>
                                <Text style={[styles.verifyPhoneDesc,{fontWeight: '500'}]}>
                                    {!!this.state.verifying?'We are verifying your phone number...':
                                    'Please enter the code in the SMS message that we just sent you:'}
                                </Text>
                                {!!this.state.verifying?null:<View>
                                        <View style={styles.verifyPhoneInputBox}>
                                            <TextInput
                                                ref='verify_code'
                                                underlineColorAndroid='transparent'
                                                placeholder={'Enter the code here'}
                                                keyboardType='numeric'
                                                returnKeyType='done'
                                                style={styles.verifyPhoneInput}
                                                onChangeText={(smsCode) => this.setState({smsCode})}
                                                onSubmitEditing={this.verifyCode.bind(this)}
                                                value={this.state.smsCode}
                                            />
                                            <Button
                                                onPress={this.verifyCode.bind(this)}
                                                style={styles.verifyPhoneBtn}
                                                textstyle={styles.reqBtnLabel}
                                                value='Verify Now' />
                                        </View>
                                        {!!this.state.errorMsg?<Text style={styles.verifyPhoneError}>{this.state.errorMsg}</Text>:null}
                                        <Text style={styles.verifyPhoneNote}>
                                            {"Didn't get the code? Sometimes it can take up to 15 minutes. If it takes longer than that please "}
                                            <Text style={styles.verifyPhoneResend} onPress={this.sendVerificationSMS.bind(this)}>click here</Text>
                                            {" to resend a code to your mobile phone."}
                                        </Text>
                                    </View>
                                }
                            </View>
                        </View>
                    </View>
                </Modal>
            </Content>
        );
    }
}

function mapStateToProps({params}) {
    return {
        profile: params.profile,
        loading: params.loading,
        errorMsg: params.verifyCodeErrorMsg || null,
        successMsg: params.verifyCodeSuccessMsg || null,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);
