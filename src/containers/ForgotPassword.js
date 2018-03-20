/**
 * Home Container
 */

import React, { Component } from 'react';
import {
    StyleSheet,
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
    Icon,
    Loader,
    Toast
} from '@components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '@actions';
import * as Validation from '@lib/validation';

class ForgotPassword extends Component<{}> {

    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillReceiveProps(nextProps){
        if(nextProps && nextProps.errorMsg){
            Toast.errorTop(nextProps.errorMsg);
            this.props.resetMessages();
        }
        if(nextProps && nextProps.successMsg){
            Toast.successTop(nextProps.successMsg);
            this.setState({email:''});
            this.props.resetMessages();
        }
    }

    forgotPassword=()=>{

        let res = Validation.email(this.state.email)
        if(!res.success){
            Toast.errorTop(res.message);
            return false;
        }
        this.props.forgotPassword(this.state.email);
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
                    <View style={{
                        width: '100%',
                        alignItems: 'center',
                        marginBottom: 50,
                        marginTop: 30,
                    }}>
                        <Image style={{
                            alignSelf: 'center',
                            width: '80%',
                            resizeMode: 'contain',
                        }}  source={require('@images/app-text-icon.png')}/>
                        <Text style={{
                            fontSize: 20,
                            textAlign: 'center',
                            marginVertical: 20,
                        }}>
                            <Icon style={{fontSize: 25}} name='unlock-alt' />
                            <Text style={{fontWeight: '500'}}>  FORGOT YOUR PASSWORD?</Text>
                        </Text>
                        <Text style={{
                            fontSize: 15,
                            textAlign: 'center',
                            paddingHorizontal: 10,
                        }}>
                            Please enter your email address below.{"\n"}You will receive a link to reset your password.
                        </Text>
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
                            value={'Submit'}
                            onPress={this.forgotPassword}
                        />

                        <TouchableOpacity style={{
                            marginTop: 20,
                        }} onPress={()=>this.props.navigation.goBack()}>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: '400',
                                color: '#009DE4'
                            }}> {'<<'} Back to login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Loader show={this.props.loading} />
            </Container>
        );
    }
}

const styles = StyleSheet.create({

});

function mapStateToProps(state) {
    return {
        loading: state.params.loading,
        isLoggedIn: state.params.isLoggedIn,
        errorMsg: state.params.errorMsg || null,
        successMsg: state.params.successMsg || null
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
