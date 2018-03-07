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
    Button
} from '@components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '@actions';

const styles = require("@styles/login");

class Login extends Component<{}> {

    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        console.log(this.props.profile);
        return (
            <Container>
                <Content hasHeader={false} bounces={false}>
                    <View style={{
                        flex: 1,
                        backgroundColor: '#00AFFD',
                        height: 150,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <Image style={{
                        marginTop: 10,
                        width: '40%',
                        resizeMode: 'contain',
                    }}  source={require('@images/app-text-icon-white.png')}/>
                    </View>
                    <View style={{
                        alignItems: 'center',
                        marginHorizontal: 40,
                        marginTop: 50,
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
                            borderRadius: 25,
                            borderColor: '#ddd'
                        }}>
                            <TextInput
                                style={{
                                    fontSize: 16,
                                    fontWeight: '600'
                                }}
                                secureTextEntry={true}
                                placeholder={'Password'}
                                onChangeText={(password) => this.setState({password})}
                                value={this.state.password || ''}
                            />
                        </View>
                        <Button style={{
                                marginTop: 30,
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
                            onPress={this.props.login}
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
                </Content>
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {
        isLoggedIn: state.login.isLoggedIn,
        errorMsg: state.login.errorMsg,
        profile: state.login.profile || null
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
