/**
 * Chat History Container
 */

import React, {Component} from 'react';
import {
    View,
    TouchableOpacity,
    Image,
    Dimensions,
} from 'react-native';
import {
    Container,
    Content,
    Header,
    HeaderLeft,
    HeaderRight,
    HeaderTitle,
    Icon,
    Text
} from '@components';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ActionCreators} from '@actions';

const { width } = Dimensions.get('window');

const CHAT_HISTORY_DATA = [
    {
        name: 'Sebastian Grant',
        img: 'https://randomuser.me/api/portraits/men/22.jpg',
        msg: 'Yes, yes! We definitely should do it!',
        time: '2:12 PM',
        ur:true,
    },
    {
        name: 'Ramona Clark',
        img: 'https://randomuser.me/api/portraits/women/54.jpg',
        msg: 'Hello! I am Alexa, standing by to get your issues fixed and questions vanished',
        time: '1:12 PM',
        ur:true,
    },
    {
        name: 'Jerome Rivera',
        img: 'https://randomuser.me/api/portraits/men/82.jpg',
        msg: 'Hi! Thank you for chatting. This is Mary. I promise to take good care of you!',
        time: '12:03 PM',
    },
    {
        name: 'Gordon Gilbert',
        img: 'https://randomuser.me/api/portraits/men/67.jpg',
        msg: 'Hello, I’m awesome. How can I help you?. Greetings! You are chatting with Helen. Please be nice to her.',
        time: '10:48 AM',
    },
    {
        name: 'Kaylee Herrera',
        img: 'https://randomuser.me/api/portraits/women/49.jpg',
        msg: 'Hi! This is Mary. I was so bored. Thank you for saving me!',
        time: 'Yesterday',
        ur:true,
    },
    {
        name: 'Arnold Hill',
        img: 'https://randomuser.me/api/portraits/men/83.jpg',
        msg: 'Greetings! I’m Megan. Any questions? You are at the right place!',
        time: '1/8/18',
    },
    {
        name: 'Gwendolyn Ward',
        img: 'https://randomuser.me/api/portraits/women/85.jpg',
        msg: 'Hi, this is Julie. Your problems – my problems.',
        time: '25/7/18',
    },
    {
        name: 'Dennis James',
        img: 'https://randomuser.me/api/portraits/men/42.jpg',
        msg: 'Hello! This is Olivia. I know you came to chat with me! I am ready! Your problems – my problems.',
        time: '21/7/16',
    },
    {
        name: 'Lily Cunningham',
        img: 'https://randomuser.me/api/portraits/women/22.jpg',
        msg: 'Greetings! You are chatting with Helen. Please be nice to her.',
        time: '18/5/16',
    },
]

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
        const styles = (this.props.nightMode?require('@styles/nightMode/htm'):require('@styles/htm'));
        return (
            <Container>
                <Header>
                    <HeaderLeft>
                        <TouchableOpacity>
                            <Icon onPress={() => this.props.navigation.goBack()} style={styles.headerBackIcon} name='angle-left'/>
                        </TouchableOpacity>
                    </HeaderLeft>
                    <HeaderTitle>Chat History</HeaderTitle>
                </Header>
                <Content bounces={false} style={styles.content}>
                    {CHAT_HISTORY_DATA.map(data=>
                        <TouchableOpacity activeOpacity={0.5} key={'_n'+data.name} style={{
                            flexDirection: 'row',
                            marginTop: 10,
                            marginHorizontal: 10,
                            padding:10,
                            backgroundColor: !data.ur?'#EFEFEF':'#F1F1F1',
                            borderRadius: 10,
                        }}>
                            <Image style={{
                                width: 60,
                                height: 60,
                                borderRadius: 30,
                            }} source={{uri: data.img}}/>
                            <View style={{
                                marginHorizontal: 10,
                                width: width - 110
                            }}>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    marginBottom: 2,
                                }}>
                                    <Text style={{
                                        width: width - 190,
                                        color: !data.ur?'#6A6A6A':'#000',
                                        fontSize: 16,
                                        fontWeight: 'bold'
                                    }} numberOfLines={1}>{data.name}</Text>
                                    <Text style={{
                                        color: !data.ur?'#6A6A6A':'#000',
                                        fontSize: 16,
                                        fontWeight: 'bold'
                                    }}>{data.time}</Text>
                                </View>
                                <Text style={{
                                    color: !data.ur?'#787878':'#454545',
                                    fontWeight: !data.ur?'normal':'bold',
                                    fontSize: 13,
                                }} numberOfLines={2}>{data.msg}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                </Content>
            </Container>
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

export default connect(mapStateToProps, mapDispatchToProps)(ChatHistory);
