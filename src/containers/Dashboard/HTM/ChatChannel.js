/**
 * Chat Channel Container
 */

import React, {Component} from 'react';
import {
    View,
    TouchableOpacity,
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
    Text
} from '@components';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ActionCreators} from '@actions';

import { PROFILE_URL } from '@src/config';
import * as utils from '@lib/utils';
import * as constants from '@src/constants';

class ChatChannel extends Component < {} > {

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

    render() {
        const styles = (this.props.nightMode?
            require('@styles/nightMode/chat'):require('@styles/chat'));
        const hasActiveChannel = (this.props.chatRoom.c.filter(ch=>ch.a).length > 0);
        let chatRoomChannels =  this.props.chatRoom.c.filter(ch=>!!ch.l)
        chatRoomChannels = chatRoomChannels.sort((a,b) => a.id < b.id?1:-1);
        return (
            <Container>
                <Header>
                    <HeaderLeft>
                        <TouchableOpacity>
                            <Icon onPress={() => this.props.navigation.goBack()} style={styles.headerBackIcon} name='angle-left'/>
                        </TouchableOpacity>
                    </HeaderLeft>
                    <HeaderTitle>{this.props.htm.display_name}</HeaderTitle>
                    <HeaderRight>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('HTMDetail')}>
                            <Image
                                style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 20,
                                }}
                                source={this.props.htm.profile_pic_url?
                                    {uri:PROFILE_URL+this.props.htm.profile_pic_url}:
                                    utils.getCurrencyIcon(constants.CURRENCY_TYPE.FLASH)} />
                        </TouchableOpacity>
                    </HeaderRight>
                </Header>
                <Content style={styles.content}>
                    <View style={{marginHorizontal: 20}}>
                        <Text style={styles.label}>Trades</Text>
                        <View style={styles.hr}/>
                        {!hasActiveChannel?<Button
                            style={{marginBottom: 5}}
                            value={'Start New Trade'}
                            onPress={()=>this.props.goToChatRoom(this.props.htm.username,
                                (feedback)=>this.props.navigation.navigate(feedback?'FeedBack':'ChatRoom'))}
                        />:null}
                        { chatRoomChannels.map((ch,i)=>{
                            let msg = ch.l?ch.l.txt:'-';
                            let ur = ch.ur?ch.ur[this.props.htmProfile.username]:0;
                            return(
                                <TouchableOpacity
                                    activeOpacity={ch.a?0.5:1}
                                    key={'_chat_channel_'+ch.id}
                                    style={[styles.chatTab,
                                        {alignItems: 'center'},
                                        ch.a && styles.chatTabUnRead]}
                                    onPress={()=>this.props
                                        .selectChatRoomChannel(ch, this.props.navigation.navigate)}>
                                    <View style={styles.chatMsgBox}>
                                        <Text style={[styles.chatHtmName, ch.a
                                            && styles.chatHtmNameUnread]}>{ch.name}</Text>
                                        <Text style={[styles.chatMsgText,
                                            {marginRight: 15},
                                            ur && styles.chatMsgTextUnread]}
                                            numberOfLines={1}>{msg}</Text>
                                    </View>
                                    <Icon style={{
                                        color: ch.a?'#00FF00':'#E2E2E2',
                                        right: 10,
                                    }} name={'circle'}/>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </Content>
            </Container>
        );
    }
}

function mapStateToProps({params}) {
    return {
        nightMode: params.nightMode,
        htm: params.htm,
        htmProfile: params.htmProfile,
        chatRoom: params.chatRoom,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatChannel);
