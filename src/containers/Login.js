/**
 * Home Container
 */

import React, { Component } from 'react';
import {
    View,
    Text,
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
    Loader,
    Toast
} from '@components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '@actions';
import Validation from '@lib/validation';

const styles = require("@styles/login");

class Login extends Component<{}> {

    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);
        this.state = {
            // email: 'maulikvora59+3@gmail.com',
            // password: 'Maulik123'
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
        if(!res.result){
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
            <Container>
                <View style={{
                    flex: 1,
                    width: '100%',
                    paddingHorizontal: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Image style={{
                        alignSelf: 'center',
                        width: '100%',
                        resizeMode: 'contain',
                    }}  source={require('@images/app-text-icon.png')}/>
                    <View style={{
                        width: '100%',
                        alignItems: 'center',
                        marginBottom: 50,
                        marginTop: 30,
                    }}>
                        <View style={{
                            justifyContent: 'center',
                            marginTop: 20,
                            width: '100%',
                            paddingHorizontal: 15,
                            height: 50,
                            borderWidth: 1.5,
                            borderRadius: 25,
                            borderColor: '#ddd'
                        }}>
                            <TextInput
                                style={{
                                    fontSize: 16,
                                    fontWeight: '600'
                                }}
                                underlineColorAndroid='transparent'
                                placeholder={'Email address'}
                                keyboardType={'email-address'}
                                onChangeText={(email) => this.setState({email})}
                                value={this.state.email || ''}
                            />
                        </View>
                        <View style={{
                            justifyContent: 'center',
                            marginTop: 20,
                            width: '100%',
                            paddingHorizontal: 15,
                            height: 50,
                            borderWidth: 1.5,
                            borderRadius:25,
                            borderColor: '#ddd'
                        }}>
                            <TextInput
                                style={{
                                    fontSize: 16,
                                    fontWeight: '600'
                                }}
                                underlineColorAndroid='transparent'
                                secureTextEntry={true}
                                placeholder={'Password'}
                                onChangeText={(password) => this.setState({password})}
                                value={this.state.password || ''}
                            />
                        </View>
                        <Button style={{
                                marginTop: 50,
                                width: '100%',
                                height: 50,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 25,
                            }}
                            textstyle={{
                                fontSize: 20,
                                fontWeight: '600'
                            }}
                            value={'Login'}
                            onPress={this.login}
                        />

                        <TouchableOpacity style={{
                            marginTop: 20,
                            borderBottomWidth: 0.5,
                            borderColor: '#666666'
                        }}>
                            <Text style={{
                                fontSize: 13,
                                fontWeight: '400',
                                color: '#666666'
                            }}>Forgot password?</Text>
                        </TouchableOpacity>
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
