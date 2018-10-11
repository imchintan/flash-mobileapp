import {
    AsyncStorage
} from 'react-native';
import * as types from '@actions/types';
import * as apis from '@flashAPIs';
import * as htm from '@actions/htm';
import _ from 'lodash';
import { PROFILE_URL, APP_SECRET } from '@src/config';
import * as utils from '@lib/utils';
import * as constants from '@src/constants';
import notifcationHelper from '@helpers/notifcationHelper';
import CryptoJS from "react-native-crypto-js";

const Toast =  require('@components/Toast');

export const getChatRooms = () => {
    return (dispatch,getState) => {
        dispatch({ type: types.LOADING_START });
        let params = getState().params;
        apis.getRooms(params.profile.auth_version, params.profile.sessionToken)
        .then((d)=>{
            if(d.rc !== 1){
                Toast.errorTop(d.reason);
                dispatch({
                    type: types.GET_CHAT_ROOMS,
                    payload: { loading: false }
                });
            }else{
                let chatRooms = d.rooms.filter(room=> !!room.l)
                    .map(chatRoom => decryptChatRoomMSG(chatRoom));
                dispatch({
                    type: types.GET_CHAT_ROOMS,
                    payload: {
                        loading: false,
                        chatRooms: chatRooms
                    }
                });
                if(chatRooms.length){
                    dispatch(updateChatRoom(chatRooms[0]));
                    dispatch(checkTradingFeedBack());
                    setTimeout(()=>notifcationHelper.chatAction(),1000);
                }
            }
        }).catch(e=>{
            console.log(e);
            Toast.errorTop(e.message);
            dispatch({
                type: types.GET_CHAT_ROOMS,
                payload: { loading: false }
            });
        })
    }
}

export const goToChatRoom = (username,cb) => {
    return (dispatch,getState) => {
        let params = getState().params;
        let rooms =  params.chatRooms || [];
        let room = rooms.filter(r => r.m[0] == username || r.m[1] == username)
        let chatRoom = room.length == 0?null:room[0];
        let chatRoomChannel = null;
        if(chatRoom){
            let activeChannel = room[0].c.filter(ch=>ch.a || !ch.f
                || typeof ch.f[params.htmProfile.username] == 'undefined');
            if(activeChannel.length > 0)
                chatRoomChannel = activeChannel[0];
        }
        let _cb = () =>{
            dispatch({
                type: types.GO_TO_CHAT_ROOM,
                payload: {
                    chatMessages:[],
                    chatRoom,
                    chatRoomChannel,
                    chatNotification: null,
                    isLoadAllPreviousMesages:false
                }
            });
            if(cb)cb((chatRoomChannel && !chatRoomChannel.a));
        }
        if(!params.htm || params.htm.username !== username)
            dispatch(htm.getHTMDetail(username,_cb));
        else
            _cb();
    }
}

export const checkTradingFeedBack = () => {
    return (dispatch,getState) => {
        let params = getState().params;
        let chatRooms = params.chatRooms || [];

        if(!params.htmProfile)
            return setTimeout(()=>dispatch(checkTradingFeedBack),500);

        let hasFeedBackRemainChatRooms = chatRooms.filter((chatRoom)=>{
            let feedBackRemains = chatRoom.c.filter((ch)=>!ch.a && (!ch.f
                || typeof ch.f[params.htmProfile.username] == 'undefined'));
            return feedBackRemains.length
        });
        if(hasFeedBackRemainChatRooms.length == 0) return;
        let chatRoom = hasFeedBackRemainChatRooms[0];
        let username = (chatRoom.m[0] == params.profile.username)?
            chatRoom.m[1]:chatRoom.m[0];
        if(!params.HTMNavigation)
            params.DashboardNavigation.navigate('HTM');
        let _cb = () =>{
            params = getState().params;
            let hasFeedBackRemain = chatRoom.c.filter((ch)=>!ch.a && (!ch.f
                || typeof ch.f[params.htmProfile.username] == 'undefined'));
            let chatRoomChannel = hasFeedBackRemain.length > 0?hasFeedBackRemain[0]:null;
            if(!chatRoomChannel) return ;
            dispatch({
                type: types.CHECK_TRADING_FEEDBACK,
                payload: {
                    chatMessages:[],
                    isLoadAllPreviousMesages: false,
                    chatRoom,
                    chatRoomChannel,
                    forceFeedBack: true
                }
            });
            dispatch(updateRoomMemberDetail());
            params.HTMNavigation.navigate('FeedBack');
        }
        if(!params.htm || params.htm.username !== username)
            dispatch(htm.getHTMDetail(username,_cb));
        else _cb();
    }
}

export const selectChatRoom = (username, chatRoom, navigate) => {
    return (dispatch,getState) => {
        let params = getState().params;
        let _cb = () =>{
            let hasFeedBackRemain = chatRoom.c.filter((ch)=>!ch.a && (!ch.f
                || typeof ch.f[params.htmProfile.username] == 'undefined'));
            let chatRoomChannel = hasFeedBackRemain.length > 0?hasFeedBackRemain[0]:null;
            dispatch({
                type: types.SELECT_CHAT_ROOM,
                payload: {
                    chatMessages:[],
                    isLoadAllPreviousMesages: false,
                    chatRoom,
                    chatRoomChannel
                }
            });
            navigate(chatRoomChannel?'FeedBack':'ChatChannel');
            dispatch(updateRoomMemberDetail());
        }
        if(!params.htm || params.htm.username !== username)
            dispatch(htm.getHTMDetail(username,_cb));
        else _cb();
    }
}

export const selectChatRoomChannel = (chatRoomChannel, navigate) => {
    return (dispatch,getState) => {
        // let params = getState().params;
        dispatch({
            type: types.SELECT_CHAT_ROOM_CHANNEL,
            payload: {
                isLoadAllPreviousMesages:false,
                chatMessages:[],
                chatRoomChannel
            }
        });
        navigate('ChatRoom');
    }
}

export const markAsRead = () => {
    return (dispatch,getState) => {
        let params = getState().params;
        if(params.chatRoomChannel) apis.markAsRead(params.profile.auth_version,
            params.profile.sessionToken, params.chatRoomChannel.id);
        dispatch({
            type: types.MARK_AS_READ
        });
    }
}

export const createChannel = (receiver_username,cb=null) => {
    return (dispatch,getState) => {
        dispatch({ type: types.LOADING_START });
        let params = getState().params;
        apis.createChannel(params.profile.auth_version, params.profile.sessionToken,
            receiver_username, params.htm.display_name, params.htm.profile_pic_url,
            params.htmProfile.display_name, params.htmProfile.profile_pic_url).then((d)=>{
            if(d.rc !== 1){
                Toast.errorTop(d.reason);
                dispatch({
                    type: types.CREATE_CHAT_CHANNEL,
                    payload: { loading: false }
                });
            }else{
                let chatRooms =  params.chatRooms;
                let chatRoom = d.room;
                let chatRoomIdx = chatRooms.findIndex(r => r._id == chatRoom._id);
                if(chatRoomIdx == -1){
                    chatRooms.push(chatRoom);
                }else{
                    chatRooms[chatRoomIdx] = chatRoom;
                }

                let chatRoomChannel = chatRoom.c.filter(ch=>ch.a)[0];
                dispatch({
                    type: types.CREATE_CHAT_CHANNEL,
                    payload: {
                        loading: false,
                        isLoadAllPreviousMesages: false,
                        chatMessages:[],
                        chatRoom,
                        chatRoomChannel
                    }
                });
                if(cb)cb();
            }
        }).catch(e=>{
            console.log(e);
            Toast.errorTop(e.message);
            dispatch({
                type: types.CREATE_CHAT_CHANNEL,
                payload: { loading: false }
            });
        })
    }
}

export const updateRoomMemberDetail = () => {
    return (dispatch,getState) => {
        dispatch({ type: types.LOADING_START });
        let params = getState().params;
        apis.updateRoomMemberDetail(params.profile.auth_version, params.profile.sessionToken,
            params.chatRoom._id, params.htm.username, params.htm.display_name,
            params.htm.profile_pic_url, params.htmProfile.display_name,
            params.htmProfile.profile_pic_url).then((d)=>{
            if(d.rc !== 1){
                console.log(d.reason);
            }
            dispatch({
                type: types.UPDATE_CHAT_ROOM_MEMBER_DETAIL,
                payload: { loading: false }
            });
        }).catch(e=>{
            console.log(e);
            dispatch({
                type: types.UPDATE_CHAT_ROOM_MEMBER_DETAIL,
                payload: { loading: false }
            });
        })
    }
}

export const getChatMessages = (refresh=false) => {
    return (dispatch,getState) => {

        let params = getState().params;
        if(!params.chatRoomChannel)
            return dispatch({
                type: types.GET_CHAT_MESSAGES,
                payload: { loading: false }
            });
        let chatMessages = (params.chatMessages || []);
        let isLoadAllPreviousMesages = (params.isLoadAllPreviousMesages || false);
        if(!refresh && isLoadAllPreviousMesages) return;
        dispatch({ type: types.LOADING_START });
        let limit = 50;
        let pageNo = (refresh)?1:Math.floor(chatMessages.length / limit)+1;
        apis.getChatMessages(params.profile.auth_version, params.profile.sessionToken,
            params.chatRoomChannel.id, limit, pageNo).then((d)=>{
            if(d.rc !== 1){
                Toast.errorTop(d.reason);
                dispatch({
                    type: types.GET_CHAT_MESSAGES,
                    payload: { loading: false }
                });
            }else{
                let htm = {
                    _id     : params.htm.id,
                    name    : params.htm.display_name,
                    avatar  : params.htm.profile_pic_url?(PROFILE_URL + params.htm.profile_pic_url):
                    utils.getCurrencyIcon(constants.CURRENCY_TYPE.FLASH),
                };
                let user = {
                    _id     : params.htmProfile.id,
                    name    : params.htmProfile.display_name,
                }
                chatMessages = _.uniqBy(_.concat(chatMessages,
                    d.messages.map(m=>{
                        let decryptedMsg = JSON.parse(CryptoJS.AES
                            .decrypt(m.txt, APP_SECRET+m.c).toString(CryptoJS.enc.Utf8))
                        return ({
                            _id         : m._id,
                            createdAt   : m.t,
                            text        : decryptedMsg.text || null,
                            location    : decryptedMsg.location || null,
                            user        : m.s == params.htm.username?htm:user,
                        });
                })),'_id');
                chatMessages.sort((m1,m2)=>m1._id>m2._id?-1:1);
                dispatch({
                    type: types.GET_CHAT_MESSAGES,
                    payload: {
                        loading: false,
                        chatMessages,
                        isLoadAllPreviousMesages: (d.messages.length % limit !== 0)
                    }
                });
            }
        }).catch(e=>{
            console.log(e);
            Toast.errorTop(e.message);
            dispatch({
                type: types.GET_CHAT_MESSAGES,
                payload: { loading: false }
            });
        })
    }
}

export const sendChatMessage = (text=null, location=null) => {
    return (dispatch,getState) => {
        let params = getState().params;
        let chatRoom = params.chatRoom;
        let chatRoomChannel = params.chatRoomChannel;
        let cb = () => {
            let params = getState().params;
            let chatRoomChannel = params.chatRoomChannel;
            let encryptedMsg = CryptoJS.AES.encrypt(JSON.stringify({text,location}),
                APP_SECRET+chatRoomChannel.id).toString();
            apis.sendChatMessage(params.profile.auth_version, params.profile.sessionToken,
                params.chatRoomChannel.id, params.chatRoom._id, encryptedMsg).then((d)=>{
                let chatMessages = params.chatMessages;
                if(d.rc !== 1){
                    Toast.errorTop(d.reason);
                }else{
                    let message = {
                        _id         : d.message._id,
                        createdAt   : d.message.t,
                        text        : text,
                        location    : location,
                        user        : {
                            _id     : params.htmProfile.id,
                            name    : params.htmProfile.display_name,
                        },
                    }
                    chatMessages = _.sortedUniqBy(_.concat([message],params.chatMessages),
                    (m)=>m._id);
                }
                dispatch({
                    type: types.SEND_CHAT_MESSAGE,
                    payload: {
                        chatMessages
                    }
                });
            }).catch(e=>{
                console.log(e);
                Toast.errorTop(e.message);
                dispatch({ type: types.SEND_CHAT_MESSAGE });
            })
        }
        if(!chatRoom || !chatRoomChannel){
            dispatch(createChannel(params.htm.username,cb))
        }else {
            cb();
        }
    }
}

export const submitFeedback = (data, cb=null) => {
    return (dispatch,getState) => {
        dispatch({ type: types.LOADING_START });
        let params = getState().params;
        apis.addFeedback(params.profile.auth_version, params.profile.sessionToken,
            params.chatRoomChannel.id, data.is_txn_success).then((d)=>{
            if(d.rc !== 1){
                Toast.errorTop(d.reason);
            }else{
                apis.submitFeedback(params.profile.auth_version, params.profile.sessionToken,
                    params.htm.username, params.chatRoomChannel.id, data).then((d)=>{
                    dispatch({
                        type: types.SUBMIT_FEEDBACK,
                        payload: {
                            loading: false,
                            forceFeedBack: (d.rc !== 1 && params.forceFeedBack)
                        }
                    });
                    if(d.rc !== 1){
                        Toast.errorTop(d.reason);
                    }else{
                        dispatch(htm.getHTMDetail(params.htm.username, null, params.htm));
                        if(cb)cb(params.forceFeedBack);
                        dispatch(checkTradingFeedBack());
                    }
                }).catch(e=>{
                    console.log(e);
                    Toast.errorTop(e.message);
                    dispatch({
                        type: types.SUBMIT_FEEDBACK,
                        payload: { loading: false }
                    });
                })
            }
        }).catch(e=>{
            console.log(e);
            Toast.errorTop(e.message);
            dispatch({
                type: types.SUBMIT_FEEDBACK,
                payload: { loading: false }
            });
        })
    }
}

export const receiveChatMessage = (msg) => {
    return (dispatch,getState) => {
        let params = getState().params;
        if(!params.chatRoomChannel || params.chatRoomChannel.id !== msg.c)
            return ;
        let htm = {
            _id     : params.htm.id,
            name    : params.htm.display_name,
            avatar  : params.htm.profile_pic_url?(PROFILE_URL + params.htm.profile_pic_url):
            utils.getCurrencyIcon(constants.CURRENCY_TYPE.FLASH),
        };
        let user = {
            _id     : params.htmProfile.id,
            name    : params.htmProfile.display_name,
        }
        let decryptedMsg = JSON.parse(CryptoJS.AES
            .decrypt(msg.txt, APP_SECRET+msg.c).toString(CryptoJS.enc.Utf8))

        let message = {
            _id         : msg._id,
            createdAt   : msg.t,
            text        : decryptedMsg.text || null,
            location    : decryptedMsg.location || null,
            user        : msg.s == params.htm.username?htm:user,
        }
        chatMessages = _.sortedUniqBy(_.concat([message],params.chatMessages),
            (m)=>m._id);
        dispatch({
            type: types.RECEIVE_CHAT_MESSAGE,
            payload: {
                chatMessages
            }
        });
    }
}

export const updateChatRoom = (room) => {
    return (dispatch,getState) => {
        if(!room.l) return ;
        let params = getState().params;
        let payload = {};
        payload.chatRooms =  params.chatRooms;
        if(!payload.chatRooms) return;
        let chatRoom = decryptChatRoomMSG(room);
        if(params.chatRoom && params.chatRoom._id == chatRoom._id){
            payload.chatRoom = chatRoom;
            if(params.chatRoomChannel){
                let chatRoomChannelIdx = chatRoom.c.findIndex(ch => ch.id == params.chatRoomChannel.id);
                if(chatRoomChannelIdx !== -1){
                    payload.chatRoomChannel = chatRoom.c[chatRoomChannelIdx];
                }
            }
        }
        let chatRoomIdx = payload.chatRooms.findIndex(r => r._id == chatRoom._id);
        if(chatRoomIdx == -1){
            payload.chatRooms.push(chatRoom);
        }else{
            payload.chatRooms[chatRoomIdx] = chatRoom;
        }

        payload.favorite_htms = (params.favorite_htms || []).map(htm=>{
            htm.isOnline = false;
            let chatRooms = payload.chatRooms.filter(ch=> ch.m
                && ch.m.includes(htm.username));
            if(chatRooms.length)
                htm.isOnline = chatRooms[0].os[htm.username];
            return htm;
        });

        payload.htms = (params.htms || []).map(htm=>{
            htm.isOnline = (htm.last_seen_at >
            (new Date().getTime() - (2 * 60 * 1000))); // 2 mints
            if(params.chatRooms){
                let chatRooms = params.chatRooms.filter(ch=> ch.m
                    && ch.m.includes(htm.username));
                if(chatRooms.length)
                    htm.isOnline = chatRooms[0].os[htm.username];
            }
            return htm;
        });

        payload.chatUnreadMsgCount = params.htmProfile?payload.chatRooms.reduce((a,b)=>{
            let urA = a || 0;
            if(isNaN(urA)){
                urA = a.c.length > 1?a.c.reduce((c,d)=>{
                    if(!d.uc) return 0;
                    let urC = c || 0;
                    if(isNaN(urC)){
                        urC = c.uc[params.htmProfile.username] || 0;
                    }
                    let urD = d.uc[params.htmProfile.username] || 0;
                    return urC + urD;
                }):(a.c[0].uc[params.htmProfile.username]||0);
            }
            let urB = b.c.length > 1?b.c.reduce((c,d)=>{
                if(!d.uc) return 0;
                let urC = c || 0;
                if(isNaN(urC)){
                    urC = c.uc[params.htmProfile.username] || 0;
                }
                let urD = d.uc[params.htmProfile.username] || 0;
                return urC + urD;
            }):(b.c[0].uc?(b.c[0].uc[params.htmProfile.username] || 0):0);
            return urA + urB;
        }):0;
        payload.chatRoomsLastUpdate = new Date().getTime();
        dispatch({
            type: types.UPDATE_CHAT_ROOM,
            payload
        });
    }
}

export const savePushToken = () => {
    return async (dispatch,getState) => {
        let params = getState().params;
        let fcmToken = await AsyncStorage.getItem('fcmToken');
        if(!fcmToken) return;
        let profile = params.isLoggedIn?params.profile:{
            auth_version: 4,
            sessionToken: null
        };
        apis.savePushToken(profile.auth_version, profile.sessionToken, fcmToken)
        .then((d)=>{
            dispatch({ type: types.SAVE_PUSH_TOKEN });
        })
        .catch(e=>{
            console.log(e);
            dispatch({ type: types.SAVE_PUSH_TOKEN });
        })
    }
}

export const decryptChatRoomMSG = (chatRoom) => {
    chatRoom.l = decryptMSG(chatRoom.l);
    let channels = chatRoom.c.filter(c=> !!c.l).map(ch=>{
        ch.l = decryptMSG(ch.l)
        return ch;
    })
    chatRoom.c = channels;
    return chatRoom;
}

export const decryptMSG = (msg) => {
    let decryptedMsg = JSON.parse(CryptoJS.AES
        .decrypt(msg.txt, APP_SECRET+msg.c)
        .toString(CryptoJS.enc.Utf8));
    msg.text = decryptedMsg.text;
    msg.location = decryptedMsg.location;
    return msg;
}
