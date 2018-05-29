/**
 * Home Container
 */

import React, { Component } from 'react';
import {
    View,
    Image,
    TextInput,
    TouchableOpacity
} from 'react-native';
import {
    Container,
    Content,
    Button,
    Text,
    Loader,
    Toast
} from '@components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '@actions';
import * as Validation from '@lib/validation';

const styles = require("@styles/login");

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
        this.props.login(this.state.email, this.state.password);
    }

    render() {
        return (
            <Container style={{backgroundColor:'#191714'}}>
                <Content hasHeader={false} style={{backgroundColor:'#191714'}} contentContainerStyle={styles.loginBox}>
                    <Image style={styles.appLogo}  source={require('@images/app-text-icon-white-vertical.png')}/>
                    <View style={styles.loginInputRow}>
                        <TextInput
                            style={styles.loginInput}
                            onSubmitEditing={()=>this.refs._input_passowrd.focus()}
                            underlineColorAndroid='transparent'
                            placeholder={'Email address'}
                            keyboardType={'email-address'}
                            returnKeyType='next'
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
