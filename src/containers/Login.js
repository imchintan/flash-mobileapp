/**
 * Home Container
 */

import React, { Component } from 'react';
import {
    View,
    Text as RNText,
    Image,
    TextInput,
    TouchableOpacity
} from 'react-native';
import {
    Container,
    Header,
    HeaderTitle,
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
        this.state = {
        };
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
                <View style={{
                    flex: 1,
                    width: '100%',
                    paddingHorizontal: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Image style={{
                        width: '60%',
                        maxHeight: 250,
                        alignSelf: 'center',
                        resizeMode: 'contain',
                    }}  source={require('@images/app-text-icon-white-vertical.png')}/>
                    <View style={{
                        width: '100%',
                        alignItems: 'center',
                        marginBottom: 50,
                    }}>
                        <View style={{
                            justifyContent: 'center',
                            marginTop: 20,
                            width: '100%',
                            paddingHorizontal: 15,
                            height: 60,
                            borderWidth: 1.5,
                            borderRadius:30,
                            borderColor: '#ddd',
                            backgroundColor:'#FFFFFF'
                        }}>
                            <TextInput
                                style={{
                                    fontSize: 16,
                                    fontWeight: '400'
                                }}
                                onSubmitEditing={()=>this.refs._input_passowrd.focus()}
                                underlineColorAndroid='transparent'
                                placeholder={'Email address'}
                                keyboardType={'email-address'}
                                returnKeyType='next'
                                onChangeText={(email) => this.setState({email})}
                                value={this.state.email || ''}
                            />
                        </View>
                        <View style={{
                            justifyContent: 'center',
                            marginTop: 30,
                            width: '100%',
                            paddingHorizontal: 15,
                            height: 60,
                            borderWidth: 1.5,
                            borderRadius:30,
                            borderColor: '#ddd',
                            backgroundColor:'#FFFFFF'
                        }}>
                            <TextInput
                                ref={'_input_passowrd'}
                                style={{
                                    fontSize: 16,
                                    fontWeight: '400'
                                }}
                                underlineColorAndroid='transparent'
                                secureTextEntry={true}
                                returnKeyType='done'
                                placeholder={'Password'}
                                onChangeText={(password) => this.setState({password})}
                                onSubmitEditing={this.login}
                                value={this.state.password || ''}
                            />
                        </View>
                        <Button style={{
                                marginTop: 30,
                                width: 180,
                                height: 50,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 25,
                            }}
                            textstyle={{
                                fontSize: 22,
                                fontWeight: '400'
                            }}
                            value={'LOGIN'}
                            onPress={this.login}
                        />

                        <TouchableOpacity
                            style={{
                                marginTop: 50,
                            }}
                            // onPress={()=>this.props.navigation.navigate('ForgotPassword')}
                            >
                            <Text style={{
                                fontSize: 15,
                                fontWeight: '400',
                                color: '#FFFFFF'
                            }}>Forgot password?</Text>
                        </TouchableOpacity>
                        <View style={{
                            flexDirection: 'row',
                            marginTop: 20,
                        }}>
                            <Text style={{
                                fontSize: 15,
                                fontWeight: '400',
                                color: '#FFFFFF'
                            }}>{"Don't have an account? "}</Text>
                            <TouchableOpacity>
                                <Text style={{
                                    fontSize: 15,
                                    fontWeight: '400',
                                    color: '#E0AE27'
                                }}>Create one</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>
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
