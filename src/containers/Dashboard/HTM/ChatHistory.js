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
    Toast,
    Button,
    Loader
} from '@components';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ActionCreators} from '@actions';

import { PROFILE_URL } from '@src/config';
import * as utils from '@lib/utils';
import * as constants from '@src/constants';
import moment from 'moment-timezone';

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
                    {chatRooms.length > 0?
                    <View style={{marginHorizontal:15}}>
                        <View style={styles.tradeHistoryFilter}>
                            <TouchableOpacity style={styles.tradeHistoryFilterBtn}
                                onPress={()=>this.setState({filterBy:0})}>
                                <Icon style={styles.tradeHistoryFilterIcon}
                                    name={!this.state.filterBy || this.state.filterBy ==0?
                                        'dot-circle-o':'circle-o'}
                                />
                                <Text style={styles.tradeHistoryFilterText}>All </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.tradeHistoryFilterBtn}
                                onPress={()=>this.setState({filterBy:1})}>
                                <Icon style={styles.tradeHistoryFilterIcon}
                                    name={this.state.filterBy==1?'dot-circle-o':'circle-o'}
                                />
                                <Text style={styles.tradeHistoryFilterText}>Open trades</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.tradeHistoryFilterBtn}
                                onPress={()=>this.setState({filterBy:2})}>
                                <Icon style={styles.tradeHistoryFilterIcon}
                                    name={this.state.filterBy==2?'dot-circle-o':'circle-o'}
                                />
                                <Text style={styles.tradeHistoryFilterText}>Closed trades</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.hr,{marginBottom:15}]}/>
                    </View>:null}
                    {chatRooms.length > 0?chatRooms.map(cr=>{
                        let filterBy = (this.state.filterBy || 0);
                        let hasActiveChannel = (cr.c.filter(ch=>ch.a).length > 0);
                        if(filterBy == 1 && !hasActiveChannel)
                            return;
                        if(filterBy == 2 && hasActiveChannel)
                            return;
                        let un = cr.m[0] == this.props.htmProfile.username?cr.m[1]:cr.m[0];
                        let d = {
                            id: cr.l._id,
                            un,
                            os: (cr.os && cr.os[un]),
                            ...cr.ud[un],
                            t: moment(cr.l.t).calendar(null, {
                                sameDay: 'h:mm A',
                                nextDay: '[Tomorrow]',
                                nextWeek: 'dddd',
                                lastDay: '[Yesterday]',
                                lastWeek: 'dddd',
                                sameElse: function(now){
                                    now = moment(moment(now).format('01/01/YYYY'),moment.ISO_8601);
                                    if (this.isBefore(now)) {
                                      return 'DD MMM, YYYY';
                                    } else {
                                      return 'DD MMM';
                                    }
                                }
                            }),
                            m: cr.l?(cr.l.text?cr.l.text:'📍 Location'):'-',
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
                                        <View style={styles.chatHtmNameBox}>
                                            <Icon style={[styles.chatStatusIcon,
                                                d.os && styles.chatOnlineStatusIcon]}
                                                name={'circle'}/>
                                            <Text style={[styles.chatHtmName,
                                                d.ur && styles.chatHtmNameUnread]}
                                                numberOfLines={1}>{d.n}</Text>
                                        </View>
                                        <Text style={[styles.chatMsgTime,
                                            d.ur && styles.chatHtmNameUnread]}>{d.t}</Text>
                                    </View>
                                    <Text style={[styles.chatMsgText,
                                        d.ur && styles.chatMsgTextUnread]}
                                        numberOfLines={2}>{d.m}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    ):<View style={{ alignItems: 'center', marginTop: 100}}>
                        <Text style={{ fontSize: 20, marginBottom: 30}}>
                            No Trade initiated yet!
                        </Text>
                        <Button
                            style={[{
                                marginBottom: 20,
                            },!this.props.htmProfile.is_active && {
                                backgroundColor: '#C2C2C2',
                            }]}
                            value={'Find a Trader'}
                            onPress={()=>{
                                if(!!this.props.htmProfile.is_active)
                                    this.props.navigation.navigate('HTMListingMap')
                                else
                                    return Toast.showTop("Please enable your HTM profile!");
                            }} />
                    </View>}
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
