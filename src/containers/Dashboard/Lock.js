/**
 * Forgot Password Container
 */

import React, { Component } from 'react';
import {
    BackHandler,
    TouchableOpacity,
    Image,
    View,
    Alert
} from 'react-native';
import {
    Container,
    Content,
    Icon,
    Text,
    Toast
} from '@components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '@actions';
import { StackActions, NavigationActions } from 'react-navigation';

const styles = require("@styles/lock");

class Lock extends Component<{}> {

    static navigationOptions = {
        // header: null,
    }

    constructor(props) {
        super(props);
        this.state = {
            pin: ''
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
        return this.isMount;
    }

    enterPIN(number){
        let pin = this.state.pin;
        if(pin.length > 5) return ;
        pin += number.toString();
        this.setState({pin});
        if(pin.length < 6) return ;

        if(this.props.pin !== pin){
            Toast.errorTop("Your PIN is incorrect.");
            this.setState({pin:''});
            return;
        }
        this.props.navigation.goBack();

    }

    removePIN(){
        let pin = this.state.pin;
        if(pin.length == 0) return ;
        pin = pin.substr(0,pin.length-1);
        this.setState({pin});
    }

    render() {
        return (
            <Container>
                <Content hasHeader={false} style={{backgroundColor:'#191714'}}>
                    <View style={styles.pinBoxContent}>
                        <Image style={styles.appLogo}  source={require('@images/app-text-icon-white-vertical.png')}/>
                        <Text style={styles.pinDarkTitle}>Enter PIN</Text>
                        <View style={styles.pinBox}>
                            <Icon style={[styles.pinIcon, this.state.pin.length > 0 && styles.pinIconDarkFilled]} name={'circle'}/>
                            <Icon style={[styles.pinIcon, this.state.pin.length > 1 && styles.pinIconDarkFilled]} name={'circle'}/>
                            <Icon style={[styles.pinIcon, this.state.pin.length > 2 && styles.pinIconDarkFilled]} name={'circle'}/>
                            <Icon style={[styles.pinIcon, this.state.pin.length > 3 && styles.pinIconDarkFilled]} name={'circle'}/>
                            <Icon style={[styles.pinIcon, this.state.pin.length > 4 && styles.pinIconDarkFilled]} name={'circle'}/>
                            <Icon style={[styles.pinIcon, this.state.pin.length > 5 && styles.pinIconDarkFilled]} name={'circle'}/>
                        </View>
                        <TouchableOpacity style={styles.pinResetBox} onPress={()=>{
                            Alert.alert(
                                'Forgot PIN',
                                'Do you want to reset your PIN? Once reset, Your FLASH account will be logged out, you will need to login again to set new PIN.',
                                [
                                    {text: 'Cancel', onPress: () => {}, style: 'cancel'},
                                    {text: 'Reset', onPress: () => this.props.logout(true)}
                                ]);
                        }}>
                            <Text style={styles.pinResetBoxText}>Forgot PIN?</Text>
                        </TouchableOpacity>
                    </View>
                </Content>
                <View style={styles.keypad}>
                <View style={styles.keypadRow}>
                    <TouchableOpacity style={styles.keypadBtn}
                        onPress={()=>this.enterPIN(1)}>
                        <Text style={styles.keypadBtnText}>1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.keypadBtn}
                        onPress={()=>this.enterPIN(2)}>
                        <Text style={styles.keypadBtnText}>2</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.keypadBtn}
                        onPress={()=>this.enterPIN(3)}>
                        <Text style={styles.keypadBtnText}>3</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.keypadRow}>
                    <TouchableOpacity style={styles.keypadBtn}
                        onPress={()=>this.enterPIN(4)}>
                        <Text style={styles.keypadBtnText}>4</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.keypadBtn}
                        onPress={()=>this.enterPIN(5)}>
                        <Text style={styles.keypadBtnText}>5</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.keypadBtn}
                        onPress={()=>this.enterPIN(6)}>
                        <Text style={styles.keypadBtnText}>6</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.keypadRow}>
                    <TouchableOpacity style={styles.keypadBtn}
                        onPress={()=>this.enterPIN(7)}>
                        <Text style={styles.keypadBtnText}>7</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.keypadBtn}
                        onPress={()=>this.enterPIN(8)}>
                        <Text style={styles.keypadBtnText}>8</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.keypadBtn}
                        onPress={()=>this.enterPIN(9)}>
                        <Text style={styles.keypadBtnText}>9</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.keypadRow}>
                    <View style={styles.keypadBtnTran} />
                    <TouchableOpacity style={styles.keypadBtn}
                        onPress={()=>this.enterPIN(0)}>
                        <Text style={styles.keypadBtnText}>0</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.keypadBtnTran}
                        onPress={()=>this.removePIN()}>
                        <Image style={styles.keypadBtnIcon} source={require('@images/delete-gold.png')} />
                    </TouchableOpacity>
                </View>
                </View>
            </Container>
        );
    }
}

function mapStateToProps({params}) {
    return {
        isLoggedIn: params.isLoggedIn,
        profile: params.profile,
        pin: params.pin,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Lock);
