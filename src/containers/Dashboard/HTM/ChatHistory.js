/**
 * Chat History Container
 */

import React, {Component} from 'react';
import {
    View,
    TouchableOpacity,
    Image,
} from 'react-native';
import {
    Container,
    Content,
    Header,
    HeaderLeft,
    HeaderTitle,
    Icon,
    Text,
    Loader
} from '@components';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ActionCreators} from '@actions';

import { PROFILE_URL } from '@src/config';
import * as utils from '@lib/utils';
import * as constants from '@src/constants';
import moment from 'moment-timezone'

class ChatHistory extends Component < {} > {

    static navigationOptions = {
        header: null,
        gesturesEnabled: true,
    }

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const styles = (this.props.nightMode?require('@styles/nightMode/chat'):require('@styles/chat'));
        let chatRooms = (this.props.chatRooms || []);
        chatRooms.sort((a,b) => a.l.t < b.l.t? 1:-1);
        return (
            <Container>
                <Header>
                    <HeaderLeft>
                        <TouchableOpacity>
                            <Icon onPress={() => this.props.navigation.goBack()} style={styles.headerBackIcon} name='angle-left'/>
                        </TouchableOpacity>
                    </HeaderLeft>
                    <HeaderTitle>Trade History</HeaderTitle>
                </Header>
                <Content bounces={false} style={styles.content}>
                    {chatRooms.map(cr=>{
                        let un = cr.m[0] == this.props.htmProfile.username?cr.m[1]:cr.m[0];
                        let d = {
                            id: cr.l._id,
                            un,
                            ...cr.ud[un],
                            t: moment(cr.l.t).calendar(null, {
                                sameDay: 'h:mm A',
                                nextDay: '[Tomorrow]',
                                nextWeek: 'dddd',
                                lastDay: '[Yesterday]',
                                lastWeek: 'dddd',
                                sameElse: 'DD/MM/YYYY'
                            }),
                            m: cr.l?cr.l.txt:'-',
                            ur: cr.c[cr.c.length-1].uc?
                                cr.c[cr.c.length-1].uc[this.props.htmProfile.username]:0
                        }
                        return (
                            <TouchableOpacity activeOpacity={0.5}
                                key={'_n'+d.id+'_'+this.props.chatRoomsLastUpdate}
                                style={[styles.chatTab, d.ur && styles.chatTabUnRead]}
                                onPress={()=>this.props
                                    .selectChatRoom(d.un, cr, this.props.navigation.navigate)}>
                                <Image style={styles.chatProfileIcon}
                                    source={d.dp? {uri:PROFILE_URL+d.dp}:
                                    utils.getCurrencyIcon(constants.CURRENCY_TYPE.FLASH)} />
                                <View style={styles.chatMsgBox}>
                                    <View style={styles.chatMsgDetailBox}>
                                        <Text style={[styles.chatHtmName,
                                            d.ur && styles.chatHtmNameUnread]}
                                            numberOfLines={1}>{d.n}</Text>
                                        <Text style={[styles.chatMsgTime,
                                            d.ur && styles.chatHtmNameUnread]}>{d.t}</Text>
                                    </View>
                                    <Text style={[styles.chatMsgText,
                                        d.ur && styles.chatMsgTextUnread]}
                                        numberOfLines={2}>{d.m}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    )}
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
        chatRooms: params.chatRooms,
        htmProfile: params.htmProfile,
        chatRoomsLastUpdate: params.chatRoomsLastUpdate,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatHistory);
