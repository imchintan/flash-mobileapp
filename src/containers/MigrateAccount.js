/**
 * Migrate Account Container
 */

import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Linking
} from 'react-native';
import {
    Container,
    Content,
    Button,
    Modal,
    Loader,
    Toast
} from '@components';
import { getSecurityQuestion } from '@lib/utils';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '@actions';

const styles = require("@styles/myAccount");

class MigrateAccount extends Component<{}> {

    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);
        this.state = {
            visible:false,
            visibleSuccess: false,
            ques: 'A',
            answerA: '',
            answerB: '',
            answerC: '',
        };
    }

    componentWillReceiveProps(nextProps){
        if(nextProps && nextProps.successMsg){
            this.setState({visibleSuccess:true});
            this.props.resetMessages();
        }
        if(nextProps && nextProps.errorMsg){
            Toast.errorTop(nextProps.errorMsg);
            this.props.resetMessages();
        }
    }

    checkSecurityQuestionsAnswers(){
        if(this.state.answerA ===  '' || this.state.answerB ===  '' ||
            this.state.answerC ===  '' || !this.state.questionA ||
            !this.state.questionB || !this.state.questionC){
            return Toast.errorTop('All security question is required to recover passowd and coin in case you foget your passowd');
        }
        this.setState({setQueAns:true},()=> this.props.migrateAccount(
            this.state.questionA, this.state.answerA, this.state.questionB,
            this.state.answerB, this.state.questionC, this.state.answerC));
    }

    render() {
        return (
            <Container>
                <Content hasHeader={false}>
                    <View style={{
                        marginTop: 15,
                        marginHorizontal: 25,
                        marginBottom: -5
                    }}>
                        <Text style={{
                            textAlign: 'center',
                            fontSize: 22,
                            fontWeight: 'bold',
                            color: '#000000',
                            paddingVertical: 5,
                        }}>Upgrade Account Security</Text>
                        <View>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: '500',
                                color: '#444',
                                paddingVertical: 8,
                            }}>Why upgrade?</Text>
                            <Text style={{
                                textAlign: 'justify',
                                fontSize: 13,
                                color: '#4A4A4A',
                                paddingBottom: 5,
                            }}>With this security upgrade, your account will become more secure
                                with security questions and you will also gain access to use the
                                multi-currency feature in the web wallet. Please set security
                                questions and answers to upgrade your account. These are also
                                required for you to recover your password should you forget it.</Text>
                            <Text style={{
                                textAlign: 'justify',
                                fontSize: 13,
                                color: '#4A4A4A',
                            }}>If you face any problem, please contact us at
                                <Text style={{
                                    color: '#337ab7',
                                }} onPress={()=>Linking.openURL("mailto:?to=support@flashcoin.io")}> support@flashcoin.io</Text>
                            </Text>
                        </View>
                    </View>
                    <View style={styles.profile}>
                        <View style={styles.profileRow}>
                            <Text style={styles.profileRowLabel}>Security question 1</Text>
                            <View style={styles.profileRowInputBox}>
                                <TouchableOpacity onPress={()=>this.setState({visible:true, ques: 'A'})}>
                                    <Text style={styles.profileRowInput}>
                                        {this.state.questionA || "Select Security question"}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.profileRowInputBox}>
                                <TextInput
                                    ref={'answerA'}
                                    underlineColorAndroid='transparent'
                                    style={styles.profileRowInput}
                                    placeholder={'Your Answer'}
                                    returnKeyType='next'
                                    onSubmitEditing={()=>this.setState({visible:true, ques: 'B'})}
                                    onChangeText={(answerA)=>this.setState({answerA})}
                                    value={this.state.answerA}/>
                            </View>
                        </View>
                        <View style={styles.profileRow}>
                            <Text style={styles.profileRowLabel}>Security question 2</Text>
                            <View style={styles.profileRowInputBox}>
                                <TouchableOpacity onPress={()=>this.setState({visible:true, ques: 'B'})}>
                                    <Text style={styles.profileRowInput}>
                                        {this.state.questionB || "Select Security question"}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.profileRowInputBox}>
                                <TextInput
                                    ref={'answerB'}
                                    underlineColorAndroid='transparent'
                                    style={styles.profileRowInput}
                                    placeholder={'Your Answer'}
                                    returnKeyType='next'
                                    onSubmitEditing={()=>this.setState({visible:true, ques: 'C'})}
                                    onChangeText={(answerB)=>this.setState({answerB})}
                                    value={this.state.answerB}/>
                            </View>
                        </View>
                        <View style={styles.profileRow}>
                            <Text style={styles.profileRowLabel}>Security question 3</Text>
                            <View style={styles.profileRowInputBox}>
                                <TouchableOpacity onPress={()=>this.setState({visible:true, ques: 'C'})}>
                                    <Text style={styles.profileRowInput}>
                                        {this.state.questionC || "Select Security question"}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.profileRowInputBox}>
                                <TextInput
                                    ref={'answerC'}
                                    underlineColorAndroid='transparent'
                                    style={styles.profileRowInput}
                                    placeholder={'Your Answer'}
                                    returnKeyType='done'
                                    onSubmitEditing={this.checkSecurityQuestionsAnswers.bind(this)}
                                    onChangeText={(answerC)=>this.setState({answerC})}
                                    value={this.state.answerC}/>
                            </View>
                        </View>
                        <Button style={{
                            borderRadius: 25
                        }} value='Upgrade My Account' onPress={this.checkSecurityQuestionsAnswers.bind(this)} />
                    </View>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={!!this.state.visible}
                        onRequestClose={()=>this.setState({visible:false})}>
                        <View style={styles.overlayStyle}>
                            <View style={[styles.optionContainer,{height:null}]}>
                                <ScrollView keyboardShouldPersistTaps="always">
                                    <View style={{ paddingHorizontal: 10 }}>
                                        {getSecurityQuestion()[this.state.ques].map((que,index) =>
                                            <TouchableOpacity
                                                key={'_que_'+this.state.ques+'_'+index}
                                                onPress={()=>{
                                                    if(this.state.ques == 'A')
                                                        this.setState({visible:false, questionA: que})
                                                    else if(this.state.ques == 'B')
                                                        this.setState({visible:false, questionB: que})
                                                    else if(this.state.ques == 'C')
                                                        this.setState({visible:false, questionC: que})

                                                    setTimeout(()=>this.refs['answer'+this.state.ques].focus(),5);
                                                }}
                                                style={styles.optionStyle}>
                                                <Text style={styles.securityQueTextStyle}>{que}</Text>
                                            </TouchableOpacity>
                                        )}
                                    </View>
                                </ScrollView>
                            </View>
                            <View style={styles.cancelContainer}>
                                <TouchableOpacity onPress={()=>this.setState({visible:false})}>
                                    <View style={styles.cancelStyle}>
                                        <Text style={styles.canceTextStyle}>
                                            Cancel
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={!!this.state.visibleSuccess}
                        onRequestClose={()=>{}}>
                        <View style={styles.reqDetailModal}>
                            <View style={styles.reqDetailBox}>
                                <View style={styles.reqDetailHeader}>
                                    <Text style={styles.reqDetailTitle}>Success</Text>
                                </View>
                                <View style={styles.reqDetailBody}>
                                    <Text style={{
                                        fontSize: 15,
                                        color: '#333',
                                        textAlign: 'center',
                                        marginBottom: 15,
                                    }}>
                                        Account upgraded Successfully, Please login again.
                                    </Text>
                                    <Button
                                        onPress={()=>this.props.logout(false)}
                                        style={[styles.reqBtn,{marginTop:10}]}
                                        textstyle={styles.reqBtnLabel}
                                        value='OK' />
                                </View>
                            </View>
                        </View>
                    </Modal>
                </Content>
                <Loader show={this.props.loading} />
            </Container>
        );
    }
}

function mapStateToProps({params}) {
    return {
        profile: params.profile,
        loading: params.loading,
        isLoggedIn: params.isLoggedIn,
        errorMsg: params.errorMsg || null,
        successMsg: params.successMsg || null
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MigrateAccount);
