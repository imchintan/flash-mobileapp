/**
 * Forgot Password Container
 */

import React, { Component } from 'react';
import {
    TouchableOpacity,
    Image,
    View,
    BackHandler
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
    Loader
} from '@components';
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '@actions';

const styles = require("@styles/lock");

class SetOrUpdatePIN extends Component<{}> {

    static navigationOptions = {
        // header: null,
    }

    constructor(props) {
        super(props);
        let isUpdatePIN = (props.navigation.state.params && !!props.navigation.state.params.update_pin);
        this.state = {
            isUpdatePIN,
            isCurrentPIN: isUpdatePIN,
            isNewPIN: !isUpdatePIN,
            pin: '',
            newPIN: '',
        };
    }

    componentDidMount(){
        this.isMount = true;
        BackHandler.addEventListener('hardwareBackPress', this.backHandler);
    }

    componentWillUnmount(){
        this.isMount = false;
        BackHandler.removeEventListener('hardwareBackPress', this.backHandler);
    }

    backHandler=()=>{
        if(!this.isMount) return false;
        return !this.state.isUpdatePIN;
    }

    enterPIN(number){
        let pin = this.state.pin;
        if(pin.length > 5) return ;
        pin += number.toString();
        this.setState({pin});
        if(pin.length < 6){
            this.setState({pin});
            return ;
        }
        if(this.state.isCurrentPIN){
            this.setState({pin:''});
            if(this.props.pin !== pin){
                Toast.errorTop("Your current PIN is incorrect.");
            }else{
                this.setState({isNewPIN:true,isCurrentPIN:false,newPIN:''});
            }
        }else if(this.state.isNewPIN){
            this.setState({isNewPIN:false,newPIN:pin, pin: ''});
        }else if(this.state.newPIN !== pin){
            Toast.errorTop("New PIN doesn't match, please re-enter.");
            this.setState({pin:'',isNewPIN:true,newPIN:''});
        }else{
            this.props.setDevicePIN(pin,this.state.isUpdatePIN);
            if(this.state.isUpdatePIN){
                Toast.successTop("Your 6-Digit PIN is changed successfully.");
                this.props.navigation.goBack();
            }else{
                Toast.successTop("You have successfully set 6-digit PIN.");
                const resetAction = StackActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({ routeName: 'Home' })
                    ],
                });
                setTimeout(()=>this.props.navigation.dispatch(resetAction),100);
            }
        }
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
                <Header>
                    {this.state.isUpdatePIN?
                    <HeaderLeft>
                        <TouchableOpacity>
                            <Icon onPress={()=>this.props.navigation.goBack()}
                                style={styles.headerBackIcon} name='angle-left' />
                        </TouchableOpacity>
                    </HeaderLeft>:null}
                    <HeaderTitle>{this.state.isUpdatePIN?'Update':'Set'} PIN</HeaderTitle>
                </Header>
                <Content contentContainerStyle={{
                    flex: 1/2,
                    flexDirection: 'column',
                    justifyContent: 'center',
                }}>
                    <Text style={styles.pinTitle}>{!this.state.isCurrentPIN && !this.state.isNewPIN?'Re-':''}
                        Enter {this.state.isCurrentPIN?'your current':'new'} PIN</Text>
                    <View style={styles.pinBox}>
                        <Icon style={[styles.pinIcon, this.state.pin.length > 0 && styles.pinIconFilled]} name={'circle'}/>
                        <Icon style={[styles.pinIcon, this.state.pin.length > 1 && styles.pinIconFilled]} name={'circle'}/>
                        <Icon style={[styles.pinIcon, this.state.pin.length > 2 && styles.pinIconFilled]} name={'circle'}/>
                        <Icon style={[styles.pinIcon, this.state.pin.length > 3 && styles.pinIconFilled]} name={'circle'}/>
                        <Icon style={[styles.pinIcon, this.state.pin.length > 4 && styles.pinIconFilled]} name={'circle'}/>
                        <Icon style={[styles.pinIcon, this.state.pin.length > 5 && styles.pinIconFilled]} name={'circle'}/>
                    </View>
                </Content>
                <View style={styles.keypad}>
                    <Text style={styles.pinNote}>
                        {"Remember this PIN, If you forget it, You won't be able to access your FLASH App"}
                    </Text>
                    <View style={styles.keypadBox}>
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
                </View>
                <Loader transparent show={this.state.loading} />
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

export default connect(mapStateToProps, mapDispatchToProps)(SetOrUpdatePIN);
