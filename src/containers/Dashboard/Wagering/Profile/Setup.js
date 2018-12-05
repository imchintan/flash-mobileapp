/**
 * Setup Oracle Profile Container
 */

import React, { Component } from 'react';
import {
    BackHandler,
    View,
    TextInput,
    TouchableOpacity
} from 'react-native';
import {
    Container,
    Content,
    Header,
    HeaderLeft,
    HeaderTitle,
    Icon,
    Text,
    Toast,
    Button,
    Loader
} from '@components';
import * as Validation from '@lib/validation';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '@actions';

class SetupProfile extends Component<{}> {

    static navigationOptions = {
        header: null,
        gesturesEnabled: true,
    }
    constructor(props) {
        super(props);
        this.state = {
            display_name: this.props.profile.display_name,
            email: this.props.profile.email,
            company_name: ''
        };
    }

    componentDidMount(){
        this.isMount = true;
        BackHandler.addEventListener('hardwareBackPress', this.backHandler.bind(this));
    }

    componentWillUnmount(){
        this.isMount = false;
        BackHandler.removeEventListener('hardwareBackPress', this.backHandler.bind(this));
    }

    backHandler(){
        this.props.navigation.goBack();
        return this.isMount;
    }

    setupProfile(){
        let data = {};
        // if(!this.state.display_name.trim()){
        //     return Toast.errorTop("Display name is required!");
        // }
        // data.display_name = this.state.display_name.trim();

        data.email = (this.state.email || '').trim();
        if(data.email){
            let res = Validation.email(data.email);
            if(!res.success){
                return Toast.errorTop(res.message);
            }
        }

        if(!this.state.company_name.trim()){
            return Toast.errorTop("Company name is required!");
        }
        data.company_name = this.state.company_name;
        data.is_active = 1;
        this.props.setupOracleProfile(data,this.props.navigation.goBack);
    }

    render() {
        const styles = (this.props.nightMode?
            require('@styles/nightMode/wagering'):require('@styles/wagering'));
        return (
            <Container>
                <Header>
                    <HeaderLeft>
                        <TouchableOpacity>
                            <Icon onPress={this.backHandler.bind(this)}
                                style={styles.headerBackIcon} name='angle-left' />
                        </TouchableOpacity>
                    </HeaderLeft>
                    <HeaderTitle>Setup Profile</HeaderTitle>
                </Header>
                <Content>
                    <View style={styles.oracleProfileContent}>
                        <View style={styles.oracleProfile}>
                            <Text style={styles.oracleProfileLabel}>
                                Display Name
                            </Text>
                            <View style={[styles.oracleProfileInputBox,{
                                backgroundColor: '#EFEFEF'
                            }]}>
                                <TextInput
                                    editable={false}
                                    underlineColorAndroid='transparent'
                                    style={styles.oracleProfileInput}
                                    placeholder={'Enter display name'}
                                    autoCapitalize={'none'}
                                    autoCorrect={false}
                                    value={this.state.display_name}
                                    onChangeText={(display_name)=>this.setState({display_name})}
                                />
                            </View>
                        </View>
                        <View style={styles.oracleProfile}>
                            <Text style={styles.oracleProfileLabel}>
                                Email
                            </Text>
                            <View style={styles.oracleProfileInputBox}>
                                <TextInput
                                    underlineColorAndroid='transparent'
                                    style={styles.oracleProfileInput}
                                    placeholder={'Enter email address'}
                                    keyboardType={'email-address'}
                                    autoCapitalize={'none'}
                                    autoCorrect={false}
                                    value={this.state.email}
                                    onChangeText={(email)=>this.setState({email})}
                                />
                            </View>
                        </View>
                        <View style={styles.oracleProfile}>
                            <Text style={styles.oracleProfileLabel}>
                                Company Name
                                <Text style={styles.mandatoryField}>*</Text>
                            </Text>
                            <View style={styles.oracleProfileInputBox}>
                                <TextInput
                                    underlineColorAndroid='transparent'
                                    style={styles.oracleProfileInput}
                                    placeholder={'Enter company name'}
                                    autoCapitalize={'none'}
                                    autoCorrect={false}
                                    value={this.state.company_name}
                                    onChangeText={(company_name)=>this.setState({company_name})}
                                />
                            </View>
                        </View>
                        <Button
                            style={{
                                marginVertical: 20,
                            }}
                            value={'Setup Profile'}
                            onPress={this.setupProfile.bind(this)} />
                    </View>
                </Content>
                <Loader show={this.props.loading} />
            </Container>
        );
    }
}

function mapStateToProps({params}) {
    return {
        loading: params.loading || false,
        nightMode: params.nightMode,
        profile: params.profile,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SetupProfile);
