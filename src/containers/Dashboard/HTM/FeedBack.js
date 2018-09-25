/**
 * Chat Channel Container
 */

import React, {Component} from 'react';
import {
    View,
    TouchableOpacity,
    TextInput,
    Image
} from 'react-native';
import {
    Container,
    Content,
    Header,
    HeaderLeft,
    HeaderRight,
    HeaderTitle,
    Icon,
    Button,
    Text,
    Toast,
    Loader
} from '@components';
import { StackActions, NavigationActions } from 'react-navigation';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ActionCreators} from '@actions';

import { PROFILE_URL } from '@src/config';
import * as utils from '@lib/utils';
import * as constants from '@src/constants';

class FeedBack extends Component < {} > {

    static navigationOptions = {
        header: null,
        gesturesEnabled: true,
    }

    constructor(props) {
        super(props);
        this.state = {
            prof_rating: 0,
            vfm_rating: 0,
            comments: '',
        };
    }

    submit(){
        let data = {
            prof_rating:this.state.prof_rating,
            vfm_rating:this.state.vfm_rating,
            comments:this.state.comments.trim(),
        };
        if(typeof this.state.is_txn_success == 'undefined')
            return Toast.errorTop("Please give the answer of requird fields!");
        data.is_txn_success = this.state.is_txn_success;

        if(typeof this.state.is_trustworthy == 'undefined')
            return Toast.errorTop("Please give the answer of requird fields!");
        data.is_trustworthy = this.state.is_trustworthy;
        this.props.submitFeedback(data,()=>{
            const resetAction = StackActions.reset({
                index: 2,
                actions: [
                    NavigationActions.navigate({ routeName: 'HTM' }),
                    NavigationActions.navigate({ routeName: 'ChatHistory' }),
                    NavigationActions.navigate({ routeName: 'ChatChannel' })
                ],
            });
            this.props.navigation.dispatch(resetAction);
        });
    }

    render() {
        const styles = (this.props.nightMode?require('@styles/nightMode/chat'):require('@styles/chat'));
        return (
            <Container>
                <Header>
                    <HeaderLeft>
                        <TouchableOpacity>
                            <Icon onPress={() => this.props.navigation.goBack()} style={styles.headerBackIcon} name='angle-left'/>
                        </TouchableOpacity>
                    </HeaderLeft>
                    <HeaderTitle>Feedback</HeaderTitle>
                    <HeaderRight>
                        <Image
                            style={{
                                width: 40,
                                height: 40,
                                borderRadius: 20,
                            }}
                            source={this.props.htm.profile_pic_url?
                                {uri:PROFILE_URL+this.props.htm.profile_pic_url}:
                                utils.getCurrencyIcon(constants.CURRENCY_TYPE.FLASH)} />
                    </HeaderRight>
                </Header>
                <Content style={styles.content}>
                    <View style={{marginHorizontal: 20}}>
                        <Text style={styles.feedbackNote}>
                            Lorem Ipsum is simply <Text style={{fontWeight:'bold'}}> {this.props.htm.display_name} </Text> of the
                            printing industry. Lorem Ipsum has been dummy text.
                        </Text>
                        <Text style={styles.label}>
                            Was trading successful?
                            <Text style={styles.mandatoryField}>*</Text>
                        </Text>
                        <View style={styles.hr}/>
                        <View style={styles.feedBackValueRow}>
                            <TouchableOpacity style={styles.feedBacRadioBtn}
                                onPress={()=>this.setState({is_txn_success:true})}>
                                <Icon style={styles.feedBacRadioBtnIcon}
                                    name={this.state.is_txn_success !== true?
                                        "circle-o":"dot-circle-o"}/>
                                <Text style={styles.feedBacRadioBtnText}>Yes</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.feedBacRadioBtn}
                                onPress={()=>this.setState({is_txn_success:false})}>
                                <Icon style={styles.feedBacRadioBtnIcon}
                                    name={this.state.is_txn_success !== false?
                                        "circle-o":"dot-circle-o"}/>
                                <Text style={styles.feedBacRadioBtnText}>No</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.label}>
                            Is trustworthy?
                            <Text style={styles.mandatoryField}>*</Text>
                        </Text>
                        <View style={styles.hr}/>
                        <View style={styles.feedBackValueRow}>
                            <TouchableOpacity style={styles.feedBacRadioBtn}
                                onPress={()=>this.setState({is_trustworthy:true})}>
                                <Icon style={styles.feedBacRadioBtnIcon}
                                    name={this.state.is_trustworthy !== true?
                                        "circle-o":"dot-circle-o"}/>
                                <Text style={styles.feedBacRadioBtnText}>Yes</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.feedBacRadioBtn}
                                onPress={()=>this.setState({is_trustworthy:false})}>
                                <Icon style={styles.feedBacRadioBtnIcon}
                                    name={this.state.is_trustworthy !== false?
                                        "circle-o":"dot-circle-o"}/>
                                <Text style={styles.feedBacRadioBtnText}>No</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.label}>How professional was the HTM?</Text>
                        <View style={styles.hr}/>
                        <View style={[styles.feedBackValueRow,styles.feedBackRatingBtnGrp]}>
                            {([1,2,3,4,5]).map(v=>
                                <TouchableOpacity key={'_start_'+v} activeOpacity={0.7}
                                    style={styles.feedBackRatingBtn}
                                    onPress={()=>this.setState({prof_rating:v})}>
                                    <Icon style={styles.feedBackRatingBtnIcon}
                                        name={this.state.prof_rating>=v?'star':'star-o'}/>
                                </TouchableOpacity>
                            )}
                        </View>
                        <Text style={styles.label}>How was the value for money?</Text>
                        <View style={styles.hr}/>
                        <View style={[styles.feedBackValueRow,styles.feedBackRatingBtnGrp]}>
                            {([1,2,3,4,5]).map(v=>
                                <TouchableOpacity key={'_start_'+v} activeOpacity={0.7}
                                    style={styles.feedBackRatingBtn}
                                    onPress={()=>this.setState({vfm_rating:v})}>
                                    <Icon style={styles.feedBackRatingBtnIcon}
                                        name={this.state.vfm_rating>=v?'star':'star-o'}/>
                                </TouchableOpacity>
                            )}
                        </View>
                        <Text style={styles.label}>Comments</Text>
                        <View style={styles.hr}/>
                        <TextInput
                            multiline={true}
                            underlineColorAndroid='transparent'
                            style={styles.feedBackCommentBox}
                            placeholder={'Enter comments'}
                            autoCapitalize={'none'}
                            autoCorrect={false}
                            value={this.state.comments}
                            onChangeText={(comments)=>this.setState({comments})}
                        />
                        <Button
                            onPress={this.submit.bind(this)}
                            style={{margin: 20}}
                            value={'SUBMIT'} />
                    </View>
                </Content>
                <Loader show={this.props.loading} />
            </Container>
        );
    }
}

function mapStateToProps({params}) {
    return {
        loading: params.loading,
        nightMode: params.nightMode,
        htm: params.htm,
        htmProfile: params.htmProfile,
        chatRoom: params.chatRoom,
        chatRoomChannel: params.chatRoomChannel,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedBack);
