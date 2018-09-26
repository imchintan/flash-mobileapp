/**
 * Chat Room Container
 */

import React, {Component} from 'react';
import {
    View,
    Alert,
    TouchableOpacity,
} from 'react-native';
import {
    Header,
    HeaderLeft,
    HeaderRight,
    HeaderTitle,
    Icon,
    Text,
    Loader
} from '@components';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ActionCreators} from '@actions';

import { GiftedChat } from 'react-native-gifted-chat'
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
        this.props.getChatMessages();
        this.props.markAsRead();
        Chat.addListener('nm',this._chatHandler);
    }

    componentWillUnmount(){
        Chat.removeListener('nm',this._chatHandler);
    }

    _chatHandler=(d)=>{
        this.props.receiveChatMessage(d);
        this.props.markAsRead();
    }

    render() {
        const styles = (this.props.nightMode?require('@styles/nightMode/chat'):require('@styles/chat'));
        return (
            <View style={{flex:1, paddingTop: 55}}>
                <Header>
                    <HeaderLeft>
                        <TouchableOpacity>
                            <Icon onPress={() => this.props.navigation.goBack()}
                                style={styles.headerBackIcon} name='angle-left'/>
                        </TouchableOpacity>
                    </HeaderLeft>
                    <HeaderTitle>{this.props.htm.display_name}</HeaderTitle>
                    {this.props.chatRoomChannel && (!this.props.chatRoomChannel.f ||
                        typeof this.props.chatRoomChannel.f[this.props.htmProfile.username] == 'undefined')?
                    <HeaderRight>
                        <TouchableOpacity>
                            <Icon onPress={() => {
                                Alert.alert(
                                    this.props.chatRoomChannel.name,
                                    'Are you done with this trade?',
                                    [
                                        {text: 'YES', onPress: () => this.props.navigation.navigate('FeedBack')},
                                        {text: 'NO', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                                    ],
                                    { cancelable: false }
                                )
                            }}
                                style={styles.headerFAIcon} name='check'/>
                        </TouchableOpacity>
                    </HeaderRight>:null}
                </Header>
                <GiftedChat
                    listViewProps={{
                        onEndReachedThreshold:10,
                        onEndReached:()=> !this.props.loading
                            && this.props.getChatMessages()
                    }}
                    messages={this.props.chatMessages}
                    onSend={messages => messages.map(message => !!message.text
                            && this.props.sendChatMessage(message.text))}
                    user={{
                      _id: this.props.htmProfile.id,
                    }}
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
        htm: params.htm,
        htmProfile: params.htmProfile,
        chatRoom: params.chatRoom,
        chatRoomChannel: params.chatRoomChannel,
        chatMessages: params.chatMessages || [],
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);
