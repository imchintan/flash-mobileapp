/**
 * Chat Room Container
 */

import React, {Component} from 'react';
import {
    View,
    Alert,
    TouchableOpacity,
    Platform,
    BackHandler
} from 'react-native';
import {
    Header,
    HeaderLeft,
    HeaderRight,
    Icon,
    Text,
    Loader
} from '@components';
import moment from 'moment-timezone'
import CustomView from './CustomView';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ActionCreators} from '@actions';

import { GiftedChat, Actions } from 'react-native-gifted-chat'
import Chat from '@helpers/chatHelper';

class ChatRoom extends Component < {} > {

    static navigationOptions = {
        header: null,
        gesturesEnabled: true,
    }

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        this.mount = true;
        this.props.getChatMessages();
        this.props.markAsRead();
        Chat.addListener('nm',this._chatHandler);
        BackHandler.addEventListener('hardwareBackPress', this.backHandler.bind(this));
    }

    componentWillUnmount(){
        this.mount = false;
        Chat.removeListener('nm',this._chatHandler);
        BackHandler.removeEventListener('hardwareBackPress', this.backHandler.bind(this));
        if(!this.props.forceFeedBack)
            global.store.dispatch({
                type: 'RESET_CHAT_OBJECT',
                payload: {
                    chatRoomChannel: null
                }
            })
    }

    backHandler(){
        this.props.navigation.goBack();
        return this.mount;
    }

    _chatHandler=(d)=>{
        this.props.receiveChatMessage(d);
        this.props.markAsRead();
    }

    renderCustomActions(props) {
        const options = {
            'Share Location': (props) => {
                this.props.navigation.navigate('ShareLocation');
            },
            'Cancel': () => {},
        };
        return (
            <Actions
                {...props}
                options={options}
            />
        );
    }

    renderCustomView(props) {
        return (
            <CustomView
                {...props}
            />
        );
    }

    render() {
        const styles = (this.props.nightMode?require('@styles/nightMode/chat'):require('@styles/chat'));
        const un = this.props.htm.username;
        const os = this.props.chatRoom?(this.props.chatRoom.os && this.props.chatRoom.os[un]):false;
        let textInputProps = {};
        if(Platform.OS !== 'ios'){
            textInputProps.value = null;
        }
        return (
            <View style={{flex:1, paddingTop: 55}}>
                <Header>
                    <HeaderLeft>
                        <TouchableOpacity>
                            <Icon onPress={this.backHandler.bind(this)}
                                style={styles.headerBackIcon} name='angle-left'/>
                        </TouchableOpacity>
                    </HeaderLeft>
                    <View style={styles.chatHeaderTitleBox}>
                        <Text numberOfLines={1} style={styles.chatHeaderTitle}>
                            {this.props.htm.display_name}
                        </Text>
                        <Text numberOfLines={1} style={styles.chatHeaderSubTitle}>
                            {os?<Icon style={styles.chatProfileStatusIcon}
                                    name={'circle'}/>:null}
                            <Text>
                                {(os?' online': 'last seen '+moment(this.props.htm.last_seen_at).fromNow())}
                            </Text>
                        </Text>
                    </View>
                    {!this.props.forceFeedBack && this.props.chatRoomChannel && (!this.props.chatRoomChannel.f ||
                        typeof this.props.chatRoomChannel.f[this.props.htmProfile.username] == 'undefined')?
                    <HeaderRight>
                        <TouchableOpacity>
                            <Icon onPress={() => {
                                if(!!this.props.chatRoomChannel.f) this.props.navigation.navigate('FeedBack');
                                else Alert.alert(
                                    'Trade #'+this.props.chatRoomChannel.name,
                                    'Are you done with this trade?',
                                    [
                                        {text: 'YES', onPress: () => this.props.navigation.navigate('FeedBack')},
                                        {text: 'NO', style: 'cancel'},
                                    ],
                                    { cancelable: false }
                                )
                            }}
                                style={styles.headerFAIcon} name='check'/>
                        </TouchableOpacity>
                    </HeaderRight>:null}
                    {this.props.chatRoomChannel && this.props.chatRoomChannel.f &&
                        typeof this.props.chatRoomChannel.f[this.props.htmProfile.username] !== 'undefined'?
                    <HeaderRight>
                        <TouchableOpacity>
                            <Icon onPress={() => this.props.navigation.navigate('ViewFeedBacks')}
                                style={styles.headerFAIcon} name='info-circle'/>
                        </TouchableOpacity>
                    </HeaderRight>:null}
                </Header>
                <GiftedChat
                    renderActions={this.renderCustomActions.bind(this)}
                    renderCustomView={this.renderCustomView.bind(this)}
                    listViewProps={{
                        onEndReachedThreshold:10,
                        onEndReached:()=> !this.props.loading
                            && this.props.getChatMessages()
                    }}
                    textInputProps={textInputProps}
                    messages={[
                        ...this.props.chatMessages,
                        {
                            _id: 2,
                            text: "🔒 Messages to this chat are secured with end-to-end encryption.",
                            system: true,
                        },
                        {
                            _id: 1,
                            text: "It's strongly recommended to trade with an unknown HTM user only after meeting at a safe public place.",
                            system: true,
                        }
                    ]}
                    onSend={messages => messages.map(message => !!message.text
                            && this.props.sendChatMessage(message.text))}
                    user={{
                      _id: this.props.htmProfile.id,
                    }}
                    renderSystemMessage={({currentMessage})=>
                        <Text style={styles.chatSystemMessage}>
                            {currentMessage.text}
                        </Text>
                    }
                    renderInputToolbar={(this.props.chatRoomChannel &&
                        !this.props.chatRoomChannel.a)?()=>
                        <Text style={styles.closeChat}>
                            This trade is closed!
                        </Text>:null}/>
            <Loader show={this.props.loading} style={{marginTop:55}} />
            </View>
        );
    }
}

function mapStateToProps({params}) {
    return {
        loading: params.loading,
        nightMode: params.nightMode,
        htm: params.htm || {},
        htmProfile: params.htmProfile,
        chatRoom: params.chatRoom,
        chatRoomChannel: params.chatRoomChannel,
        chatMessages: params.chatMessages || [],
        forceFeedBack: params.forceFeedBack || false,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);
