/**
 * Security Question Container
 */

import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Modal,
    ScrollView
} from 'react-native';
import {
    Container,
    Content,
    Header,
    HeaderLeft,
    HeaderTitle,
    Icon,
    Button,
    Loader,
    Toast
} from '@components';
import { getSecurityQuestion } from '@lib/utils';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '@actions';
import Premium from 'Premium';
import secrets from 'secrets.js-grempe';

const styles = require("@styles/myAccount");

class SecurityQuestion extends Component<{}> {

    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);
        this.state = {
            visible:false,
            ques: 'A',
            answerA: '',
            answerB: '',
            answerC: '',
            password: ''
        };
    }

    componentWillReceiveProps(nextProps){
        if(nextProps && nextProps.successMsg && this.state.setQueAns === true){
            this.reset();
        }
    }

    reset(){
        this.setState({
            visible:false,
            ques: 'A',
            answerA: '',
            answerB: '',
            answerC: '',
            questionA: '',
            questionB: '',
            questionC: '',
            password: '',
            setQueAns: false
        })
    }

    checkSecurityQuestionsAnswers(){
        if(this.state.answerA ===  '' ||
            this.state.answerB ===  '' ||
            this.state.answerC ===  '' ||
            !this.state.questionA ||
            !this.state.questionB ||
            !this.state.questionC
        ){
            return Toast.errorTop('All security question is required to recover passowd and coin in case you foget your passowd');
        }
        this.setState({visibleGetPassword:true,errorMsg:'',password:''},()=>this.refs.password.focus());
    }

    setSecurityQuestionsAnswers(){
        if(this.state.password ==  ''){
            return this.setState({errorMsg:'Incorrect password'});
        }
        let privKeyHex;
        try{
            privKeyHex = Premium.xaesDecrypt(this.state.password, this.props.profile.privateKey);
        }catch(e){
            return Toast.errorTop('Incorrect password');
        }

        let keyByteSize = 256;

        let sc = secrets.share(privKeyHex, 3, 2);
        let answers = [this.state.answerA, this.state.answerB, this.state.answerC];

        // May hash one more time
        let checksum = answers.join('*');
        let encryptedSc1 = JSON.stringify(
          Premium.xaesEncrypt(keyByteSize, checksum, sc[0])
        );

        let params = {
          idToken: this.props.profile.idToken,
          sc1: encryptedSc1,
          sc2: sc[1],
          sc3: sc[2],
          security_question_1: this.state.questionA,
          security_question_2: this.state.questionB,
          security_question_3: this.state.questionC,
        };
        this.setState({visibleGetPassword:false, setQueAns:true},()=>this.props.setRecoveryKeys(params));
    }

    render() {
        return (
            <Container>
                <Header>
                    <HeaderLeft>
                        <TouchableOpacity>
                            <Icon onPress={()=>this.props.navigation.goBack()}
                                style={styles.headerBackIcon} name='angle-left' />
                        </TouchableOpacity>
                    </HeaderLeft>
                    <HeaderTitle>Security Questions</HeaderTitle>
                </Header>
                <Content>
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
                        <Button value='Submit' onPress={this.checkSecurityQuestionsAnswers.bind(this)} />
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
                        visible={!!this.state.visibleGetPassword}
                        onRequestClose={()=>this.setState({visibleGetPassword:false})}>
                        <View style={styles.reqDetailModal}>
                            <View style={styles.reqDetailBox}>
                                <View style={styles.reqDetailHeader}>
                                    <Text style={styles.reqDetailTitle}>Password</Text>
                                    <Text style={styles.reqDetailCloseIcon}
                                        onPress={()=>this.setState({visibleGetPassword:false})}>X</Text>
                                </View>
                                <View style={styles.reqDetailBody}>
                                    <Text style={{
                                        fontSize: 15,
                                        color: '#333',
                                        textAlign: 'center',
                                        marginBottom: 15,
                                    }}>
                                        For additional security check, Please enter your password.
                                    </Text>
                                    <View style={styles.requestRowInputBox}>
                                        <TextInput
                                            ref={'password'}
                                            underlineColorAndroid='transparent'
                                            style={styles.requestRowInput}
                                            secureTextEntry={true}
                                            placeholder={'Enter your password'}
                                            value={this.state.password || ''}
                                            onChangeText={(password) => this.setState({password})}
                                        />
                                    </View>
                                    {!!this.state.errorMsg?<Text style={styles.verifyPhoneError}>{this.state.errorMsg}</Text>:null}
                                    <Button
                                        onPress={this.setSecurityQuestionsAnswers.bind(this)}
                                        style={[styles.reqBtn,{marginTop:10}]}
                                        textstyle={styles.reqBtnLabel}
                                        value='Continue' />
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
        successMsg: params.securityQueSuccessMsg || null,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SecurityQuestion);
