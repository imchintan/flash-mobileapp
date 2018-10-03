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
    Icon,
    Button,
    Text
} from '@components';
import moment from 'moment-timezone'

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
        const un = this.props.chatRoom.m[0] == this.props.htmProfile.username?
            this.props.chatRoom.m[1]:this.props.chatRoom.m[0];
        const os = (this.props.chatRoom.os && this.props.chatRoom.os[un]);
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
                    <View style={styles.chatHeaderTitleBox}>
                        <Text numberOfLines={1} style={styles.chatHeaderTitle}>
                            {this.props.htm.display_name}
                        </Text>
                        <Text numberOfLines={1} style={styles.chatHeaderSubTitle}>
                            {this.props.htm.isOnline || os?
                                <Icon style={styles.chatProfileStatusIcon}
                                    name={'circle'}/>:null}
                            <Text>
                                {(this.props.htm.isOnline || os?' online': 'last seen '+moment(this.props.htm.last_seen_at).fromNow())}
                            </Text>
                        </Text>
                    </View>
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
                    </View>
                    { chatRoomChannels.map((ch,i)=>{
                        let msg = ch.l.txt?ch.l.txt:'-';
                        let ur = ch.ur?ch.ur[this.props.htmProfile.username]:0;
                        let time = moment(ch.l.t).calendar(null, {
                            sameDay: 'h:mm A',
                            nextDay: '[Tomorrow]',
                            nextWeek: 'dddd',
                            lastDay: '[Yesterday]',
                            lastWeek: 'dddd',
                            sameElse: function(now){
                                now = moment(moment(now).format('01/01/YYYY'),moment.ISO_8601)
                                if (this.isBefore(now)) {
                                  return 'DD MMM, YYYY';
                                } else {
                                  return 'DD MMM';
                                }
                            }
                        })
                        return (
                            <TouchableOpacity
                               activeOpacity={ch.a?0.5:1}
                               key={'_chat_channel_'+ch.id}
                               style={[styles.chatTab,
                                   {alignItems: 'center'},
                                   ur && styles.chatTabUnRead]}
                               onPress={()=>this.props
                                   .selectChatRoomChannel(ch, this.props.navigation.navigate)}>
                                <View style={[styles.chatProfileIcon,styles.chatChannelIconBox]}>
                                    <Icon style={!ch.f?styles.chatChannelIcon:(
                                        ch.f[this.props.htmProfile.username] === true?
                                        styles.chatChannelSuccessIcon:(
                                        ch.f[this.props.htmProfile.username] === false?
                                        styles.chatChannelFailedIcon:styles.chatChannelPendingIcon))}
                                    name={!ch.f?'exchange':(ch.f[this.props.htmProfile.username] ===true?
                                        'thumbs-up':(ch.f[this.props.htmProfile.username] ===false?
                                            'thumbs-down':'exclamation-triangle'))}/>
                                </View>
                                <View style={styles.chatMsgBox}>
                                    <View style={styles.chatMsgDetailBox}>
                                        <Text style={[styles.chatHtmName, ch.a
                                            && styles.chatHtmNameUnread]}
                                            numberOfLines={1}>Trade #{ch.name}</Text>
                                        <Text style={[styles.chatMsgTime,
                                            ur && styles.chatHtmNameUnread]}>{time}</Text>
                                    </View>
                                    <Text style={[styles.chatMsgText,
                                        ur && styles.chatMsgTextUnread]}
                                        numberOfLines={2}>{msg}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    })}
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
