/**
 * Home Container
 */

import React, { Component } from 'react';
import {
  View,
  Text,
  BackHandler,
  TextInput
} from 'react-native';
import {
    Container,
    Header,
    HeaderLeft,
    HeaderTitle,
    Content,
    Icon,
    Button,
    Toast
} from '@components';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '@actions';

const styles = require("@styles/send");

class Send extends Component<{}> {

    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);
        let publicAddress = !!props.navigation.state.params?
            props.navigation.state.params.publicAddress: null;
        this.state = {
            publicAddress: publicAddress || null,
        };
    }

    componentWillMount(){
        this.childNav={};
        this.currentState = 'Scan';
        BackHandler.addEventListener('hardwareBackPress', this.backHandler);
    }

    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', this.backHandler);
    }

    backHandler=()=>{
        return this.props.navigation.goBack();
    }

    render() {
        return (
            <Container>
                <Header>
                    <HeaderLeft>
                        <Icon onPress={()=>this.props.navigation.goBack()} style={styles.headerBackIcon} name='angle-left' />
                    </HeaderLeft>
                    <HeaderTitle>
                        Send
                    </HeaderTitle>
                </Header>
                <Content>
                    <View style={styles.requestBox}>
                        <View style={styles.requestRow}>
                            <Text style={styles.requestRowLabel}>Email/Public address</Text>
                            <View style={styles.requestRowInputBox}>
                                <TextInput
                                    underlineColorAndroid='transparent'
                                    style={styles.requestRowInput}
                                    keyboardType='email-address'
                                    placeholder='Enter email or public address'
                                    value={this.state.term || this.state.publicAddress}
                                    onChangeText={(term) => this.setState({term})}
                                />
                            </View>
                        </View>
                        <View style={styles.requestRow}>
                            <Text style={styles.requestRowLabel}>Amount</Text>
                            <View style={[styles.requestRowInputBox,{
                                flexDirection: 'row',
                                paddingLeft: 0
                            }]}>
                                <Text style={styles.requestRowAmtLabel}>FLASH</Text>
                                <TextInput
                                    underlineColorAndroid='transparent'
                                    style={[styles.requestRowInput,{paddingLeft:10}]}
                                    keyboardType='numeric'
                                    placeholder='Enter amount'
                                    value={this.state.amount || ''}
                                    onChangeText={(amount) => this.setState({amount})}
                                />
                            </View>
                        </View>
                        <View style={styles.requestRow}>
                            <Text style={styles.requestRowLabel}>Note</Text>
                            <View style={[styles.requestRowInputBox,{height: 100}]}>
                                <TextInput
                                    multiline = {true}
                                    numberOfLines = {4}
                                    underlineColorAndroid='transparent'
                                    style={styles.requestRowInput}
                                    placeholder={'Enter note (optional)'}
                                    value={this.state.note || ''}
                                    onChangeText={(note) => note.length <= 50 && this.setState({note})}
                                />
                            </View>
                            <Text style={styles.requestRowNote}>Max Characters 50</Text>
                        </View>
                        <View style={[styles.requestRow,{flexDirection: 'row', justifyContent: 'center'}]}>
                            <Button value='Continue' />
                            <Button
                                onPress={()=>this.setState({email:'',amount:'',note:'',term:'',publicAddress:''})}
                                style={styles.requestRowClearBtn}
                                textstyle={styles.requestRowClearBtnTxt}
                                value='Clear' />
                        </View>
                    </View>
                </Content>
            </Container>
        );
    }
}

function mapStateToProps({params}) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Send);
