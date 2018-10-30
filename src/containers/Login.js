/**
 * Login Container
 */

import React, { Component } from 'react';
import {
    View,
    Image,
    TextInput,
    Platform,
    TouchableOpacity,
    WebView
} from 'react-native';
import {
    Container,
    Content,
    Button,
    Text,
    Loader,
    Modal,
    Toast
} from '@components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '@actions';
import * as Validation from '@lib/validation';

const styles = require("@styles/login");

TextInput.defaultProps.placeholderTextColor = '#7D7D7D';

// fix https://github.com/facebook/react-native/issues/10865
const patchPostMessageJsCode = `(${String(function() {
    var originalPostMessage = window.postMessage
    var patchedPostMessage = function(message, targetOrigin, transfer) {
        originalPostMessage(message, targetOrigin, transfer)
    }
    patchedPostMessage.toString = function() {
        return String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage')
    }
    window.postMessage = patchedPostMessage
})})();`

class Login extends Component<{}> {

    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount(){
        this.props.init()
        this.mount = true;
    }

    componentWillUnmount(){
        this.mount = false;
    }

    componentWillReceiveProps(nextProps){
        if(nextProps && nextProps.errorMsg){
            Toast.errorTop(nextProps.errorMsg);
            this.props.resetMessages();
        }
    }

    login=()=>{
        let res = Validation.email(this.state.email)
        if(!res.success){
            Toast.errorTop(res.message);
            return false;
        }

        if(!this.state.password){
            Toast.errorTop('Password is required!');
            return false;
        }

        this.setState({viewCaptcha: true, loading: true},()=>
            setTimeout(()=> this.mount && this.state.viewCaptcha &&
                this.setState({viewCaptcha: false, loading: false},
                () => Toast.errorTop('Something went wrong, Please try again!')),1000 * 30));

    }

    doLogin(g_recaptcha_response){
        this.setState({viewCaptcha: false, loading: false});
        if(!g_recaptcha_response){
            Toast.errorTop('Please verify that you are not a robot!');
            return false;
        }
        this.props.login(this.state.email, this.state.password, g_recaptcha_response);
    }

    render() {
        return (
            <Container style={{backgroundColor:'#191714'}}>
                <Content hasHeader={false} style={{backgroundColor:'#191714'}} contentContainerStyle={styles.loginBox}>
                    <Image style={styles.appLogo}  source={Platform.OS === 'ios'?
                    require('@images/app-text-icon-white-vertical-ios.png'):
                    require('@images/app-text-icon-white-vertical.png')}/>
                    <View style={styles.loginInputRow}>
                        <TextInput
                            style={styles.loginInput}
                            onSubmitEditing={()=>this.refs._input_passowrd.focus()}
                            underlineColorAndroid='transparent'
                            placeholder={'Email address'}
                            keyboardType={'email-address'}
                            returnKeyType='next'
                            autoCapitalize={'none'}
                            autoCorrect={false}
                            onChangeText={(email) => this.setState({email})}
                            value={this.state.email || ''}
                        />
                    </View>
                    <View style={styles.loginInputRow}>
                        <TextInput
                            ref={'_input_passowrd'}
                            style={styles.loginInput}
                            underlineColorAndroid='transparent'
                            secureTextEntry={true}
                            returnKeyType='done'
                            placeholder={'Password'}
                            onChangeText={(password) => this.setState({password})}
                            onSubmitEditing={this.login}
                            value={this.state.password || ''}
                        />
                    </View>
                    <Button style={styles.loginBtn}
                        textstyle={styles.loginBtnLabel}
                        value={'LOGIN'}
                        onPress={this.login}
                    />
                    <TouchableOpacity style={{marginTop: 50}}
                        onPress={()=>this.props.navigation.navigate('ForgotPassword')}>
                        <Text style={styles.loginFormOtherText}>Forgot password?</Text>
                    </TouchableOpacity>
                    <View style={{flexDirection: 'row',marginTop: 10, marginBottom: -50}}>
                        <Text style={styles.loginFormOtherText}>{"Don't have an account? "}</Text>
                        <TouchableOpacity
                        onPress={()=>this.props.navigation.navigate('SignUP')}>
                            <Text style={[styles.loginFormOtherText,{color: '#E0AE27'}]}>Create one</Text>
                        </TouchableOpacity>
                    </View>
                </Content>
                <Modal
                    transparent={true}
                    animationType="slide"
                    visible={!!this.state.viewCaptcha}
                    onRequestClose={()=>this.setState({viewCaptcha:false})}>
                    <WebView
                        javaScriptEnabled
                        automaticallyAdjustContentInsets
                        injectedJavaScript={patchPostMessageJsCode}
                        onLoadEnd={()=>{
                            setTimeout(()=> this.mount && this.state.viewCaptcha &&
                                this.setState({viewCaptcha: false, loading: false},
                                () => Toast.errorTop('Something went wrong, Please try again!')),1000 * 10);
                        }}
                        onError={(e)=>{
                            console.log(e);
                            this.setState({viewCaptcha:false});
                            Toast.errorTop('Something went wrong!');
                        }}
                        style={{backgroundColor: '#0009'}}
                        source={{uri:'https://wallet.flashcoin.io/recaptcha.html?'+new Date().getTime()}}
                        onMessage={e => this.doLogin(e.nativeEvent.data)}
                    />
                    <Loader show={this.state.loading} />
                </Modal>
                <Loader show={this.props.loading} />
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {
        loading: state.params.loading,
        isLoggedIn: state.params.isLoggedIn,
        errorMsg: state.params.errorMsg || null,
        profile: state.params.profile || null
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
