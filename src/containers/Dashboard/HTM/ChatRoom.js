/**
 * Chat Room Container
 */

import React, {Component} from 'react';
import {
    View,
    TouchableOpacity,
    Image
} from 'react-native';
import {
    Header,
    HeaderLeft,
    HeaderRight,
    HeaderTitle,
    Icon
} from '@components';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ActionCreators} from '@actions';

import { GiftedChat } from 'react-native-gifted-chat'
import { PROFILE_URL } from '@src/config';
import * as utils from '@lib/utils';
import * as constants from '@src/constants';
const uuidv4 = require('uuid/v4');

const message = [
    ["Excuse me, do you have the time?"],
    ["Do you know what time it is?"],
    ["Pardon me.","Do you know what time this place closes?"],
    ["That is a really nice hat","Can I ask where you got it?"],
    ["Do they have other colours available?"],
    ["Yeah, the shoes I have are getting worn out. It’s time to get a new pair."],
    ["I appreciate the information."],
    ["Really?","I’m a vegetarian too!","What made you decide to stop eating meat?"],
    ["I don’t know. What do you think?"]
]

class ChatRoom extends Component < {} > {

    static navigationOptions = {
        header: null,
        gesturesEnabled: true,
    }

    constructor(props) {
        super(props);
        this.state = {
            messages: [],
        };
    }

    componentDidMount() {
        this.friend = this.props.navigation.state.params;
        this.mount = true;
        this.onSend([]);
    }

    componentWillUnmount(){
        this.mount = false;
    }

    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }))
        let rand = Math.floor(Math.random()*message.length);
        message[rand].forEach(msg=> setTimeout(()=>this.mount && this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, [{
                _id: uuidv4(messages + new Date().getTime()),
                createdAt: new Date(),
                text: msg,
                user: {
                    _id: this.friend._id,
                    name: this.friend.display_name,
                    avatar: this.friend.profile_pic_url?(PROFILE_URL + this.friend.profile_pic_url):
                    utils.getCurrencyIcon(constants.CURRENCY_TYPE.FLASH),
                },
            }]),
        })),(Math.floor(Math.random()*1000)+200)))
    }

    render() {
        const styles = (this.props.nightMode?require('@styles/nightMode/htm'):require('@styles/htm'));
        return (
            <View style={{flex:1, paddingTop: 60}}>
                <Header>
                    <HeaderLeft>
                        <TouchableOpacity>
                            <Icon onPress={() => this.props.navigation.goBack()} style={styles.headerBackIcon} name='angle-left'/>
                        </TouchableOpacity>
                    </HeaderLeft>
                    <HeaderTitle>{this.friend?this.friend.display_name:''}</HeaderTitle>
                    <HeaderRight>
                        <Image style={{
                            width: 40,
                            height: 40,
                            borderRadius: 20,
                        }} source={{uri: this.friend?this.friend.profile_pic_url:''}}/>
                    </HeaderRight>
                </Header>
                <GiftedChat
                    messages={this.state.messages}
                    onSend={messages => this.onSend(messages)}
                    user={{
                      _id: 1,
                  }} />
            </View>
        );
    }
}

function mapStateToProps({params}) {
    return {
        nightMode: params.nightMode,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);
