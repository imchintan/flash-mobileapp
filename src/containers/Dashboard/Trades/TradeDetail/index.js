/**
 * HTM Detail Container
 */

 import React, {Component} from 'react';
 import {
     BackHandler,
     Platform,
     View,
     Image,
     TouchableOpacity,
 } from 'react-native';
 import {
     Container,
     Content,
     Header,
     HeaderLeft,
     HeaderRight,
     Icon,
     Button,
     Text,
     Loader
 } from '@components';
 import {
     createMaterialTopTabNavigator,
 } from 'react-navigation';
import moment from 'moment-timezone';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ActionCreators} from '@actions';

import { PROFILE_URL } from '@src/config';
import * as constants from '@src/constants';
import * as utils from '@lib/utils';

import TradingDetail from './TradingDetail';
import Reviews from './Reviews';

const TabNav = createMaterialTopTabNavigator({
    Info: { screen: TradingDetail },
    Reviews: { screen: Reviews },
},{
    navigationOptions: ({ navigation, screenProps }) => ({
    }),
    tabBarOptions: {
        activeTintColor: '#E0AE27',
        indicatorStyle:{
            backgroundColor: '#E0AE27',
            height: 3,
        },
        style: {
            backgroundColor: '#27241f',
            ...Platform.select({
                ios: {
                    shadowColor: 'rgba(0,0,0, 0.5)',
                    shadowOffset: { height: 1, width: 0 },
                    shadowOpacity: 0.7,
                },
                android: {
                    elevation: 10,
                },
            }),
        },
        labelStyle: {
            fontSize: utils.FontSize(16),
            fontFamily: 'Microsoft Tai Le',
        },
    },
    showIcon: false,
    tabBarPosition: 'top',
    animationEnabled: false,
    swipeEnabled: false,
});

class TradeDetail extends Component < {} > {

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
        BackHandler.addEventListener('hardwareBackPress', this.backHandler.bind(this));
    }

    componentWillUnmount(){
        this.mount = false;
        BackHandler.removeEventListener('hardwareBackPress', this.backHandler.bind(this));
    }

    backHandler(){
        this.props.navigation.goBack();
        return this.mount;
    }

    render() {
        const isBack = this.props.navigation.state.params && this.props.navigation.state.params.isBack;
        const styles = (this.props.nightMode?require('@styles/nightMode/htm'):require('@styles/htm'));
        const os = this.props.chatRoom?(this.props.chatRoom.os && this.props.chatRoom.os[this.props.htm.username]):this.props.htm.isOnline;
        return (
            <Container>
                <Header>
                    <HeaderLeft>
                        <TouchableOpacity>
                            <Icon onPress={() => this.props.navigation.goBack()}
                                style={styles.headerBackIcon} name='angle-left'/>
                        </TouchableOpacity>
                    </HeaderLeft>
                    <View style={styles.htmHeaderTitleBox}>
                        <Text numberOfLines={1} style={styles.htmHeaderTitle}>
                            {this.props.htm.display_name}
                        </Text>
                        <Text numberOfLines={1} style={styles.htmHeaderSubTitle}>
                            {os?<Icon style={styles.htmProfileStatusIcon}
                                    name={'circle'}/>:null}
                            <Text>
                                {(os?' online': 'last seen '+moment(this.props.htm.last_seen_at).fromNow())}
                            </Text>
                        </Text>
                    </View>
                    <HeaderRight>
                        {typeof this.props.htm.is_trustworthy !== 'undefined' &&
                            <TouchableOpacity onPress={this.props.htm.is_trustworthy?
                                this.props.removeTrustedHTM:this.props.addTrustedHTM}>
                                <Image style={{width: 28, height: 28, marginRight: 2}}
                                    source={this.props.htm.is_trustworthy == 1?
                                        require('@images/shield-check-green.png'):require('@images/shield-check-white.png')}/>
                            </TouchableOpacity>}
                        <TouchableOpacity
                            onPress={this.props.htm.isFavorite?
                                this.props.removeFavoriteHTM:this.props.addFavoriteHTM}>
                            <Icon style={[styles.headerFAIcon,{
                                    fontSize:28,
                                    color: this.props.htm.isFavorite?'#FF0000':'#FFFFFF'
                                }]}
                                name='heart'/>
                        </TouchableOpacity>
                    </HeaderRight>
                </Header>
                <Content bounces={false} style={styles.content}>
                    <View style={styles.htmProfileDetail}>
                        <Image
                            style={styles.htmProfileImage}
                            source={this.props.htm.profile_pic_url?
                                {uri:PROFILE_URL+this.props.htm.profile_pic_url}:
                                utils.getCurrencyIcon(constants.CURRENCY_TYPE.FLASH)} />
                        <View style={{marginVertical: 15,alignItems: 'center'}}>
                            {this.props.htm.email?
                                <View style={styles.htmProfileEmail}>
                                    <Icon style={styles.htmProfileEmailIcon}
                                        name={'envelope'}/>
                                    <Text style={styles.htmProfileEmailText}>
                                        {this.props.htm.email}
                                    </Text>
                                </View>: null
                            }
                            <View style={styles.htmProfileEmail}>
                                <Icon style={[styles.htmProfileEmailIcon,
                                        {fontSize: 20, top: 0}
                                    ]}
                                    name={'map-marker'}/>
                                <Text style={styles.htmProfileEmailText}>
                                    {this.props.htm.country || ''}
                                </Text>
                            </View>
                            {this.props.htm.total_txns > 0? <View style={{alignItems:'center'}}>
                                {this.props.htm.avg_rating>0?<View style={styles.htmProfileRating}>
                                    {([1,2,3,4,5]).map(v=>
                                        <Icon key={'_start_'+v} style={styles.htmProfileRatingIcon}
                                            name={this.props.htm.avg_rating>=v?'star':
                                            (this.props.htm.avg_rating>=(v-0.5)?'star-half-o':'star-o')}/>
                                    )}
                                </View>:null}
                                {this.props.htm.success_txns>0?<Text
                                    style={styles.htmProfileEmailText}>
                                    {this.props.htm.success_txns} successful trades (
                                        {Math.round(this.props.htm.success_txns/this.props.htm.total_txns*100)}
                                    %)
                                </Text>:null}
                                {this.props.htm.trusted_by>0?<Text style={styles.htmProfileEmailText}>
                                    Trusted by {this.props.htm.trusted_by} {this.props.htm.trusted_by>1?
                                        'traders':'trader'}
                                </Text>:null}
                            </View>:null}
                            <Button style={{marginVertical: 10}}
                                value={'Contact for Trade'}
                                onPress={()=>isBack?this.props.navigation.goBack():
                                    this.props.goToChatRoom(this.props.htm.username,
                                    (feedback)=>this.props.navigation
                                        .navigate(feedback?'FeedBack':'ChatRoom'))}/>
                        </View>
                    </View>
                    <TabNav />
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
        balances: params.balances,
        fiat_currency: params.fiat_currency,
        exchange: params.exchange || constants.COIN_GECKO_EXCHANGES[0],
        exchange_rates: params.exchange_rates || null,
        htm: params.htm,
        chatRoom: params.chatRoom,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TradeDetail);
