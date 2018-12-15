/**
 * HTM Home Container
 */

import React, {Component} from 'react';
import {
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
    HeaderTitle,
    Icon,
    Button,
    Toast,
    Loader,
    Footer,
    Text
} from '@components';
import moment from 'moment-timezone';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ActionCreators} from '@actions';

import { PROFILE_URL } from '@src/config';
import * as constants from '@src/constants';
import * as utils from '@lib/utils';

class Profile extends Component < {} > {

    static navigationOptions = {
        header: null,
        gesturesEnabled: true,
    }

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount(){
        this.props.getCoinGeckoExchangeRates();
        this.props.getFavoriteHTMs();
        this.props.getHTMProfile();
    }

    render() {
        const styles = (this.props.nightMode?require('@styles/nightMode/htm'):require('@styles/htm'));
        return (
            <Container>
                <Header>
                    <HeaderLeft>
                        <TouchableOpacity>
                            <Icon onPress={()=>this.props.screenProps.rootNavigation.goBack()}
                                style={styles.headerBackIcon} name='angle-left' />
                        </TouchableOpacity>
                    </HeaderLeft>
                    <HeaderTitle>P2P Marketplace</HeaderTitle>
                    <HeaderRight>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('ChatHistory')}>
                            <Icon style={styles.headerFAIcon}
                                name='comments'/>
                            {this.props.chatUnreadMsgCount>0?<View style={styles.htmChatBadge}>
                                <Text style={styles.htmChatBadgeText}>
                                    {this.props.chatUnreadMsgCount}
                                </Text>
                            </View>:null}
                        </TouchableOpacity>
                    </HeaderRight>
                </Header>
                <Content bounces={false} hasFooter={true} style={styles.content}>
                    <View style={styles.htmProfileDetail}>
                        <Image
                            style={styles.htmProfileImage}
                            source={this.props.htmProfile.show_profile_pic
                                &&  this.props.profile.profile_pic_url?
                                {uri:PROFILE_URL+this.props.profile.profile_pic_url}:
                                utils.getCurrencyIcon(constants.CURRENCY_TYPE.FLASH)} />
                        <View style={styles.htmProfileName}>
                            <Text style={styles.htmProfileNameText}>
                                {this.props.htmProfile.display_name ||
                                this.props.profile.display_name}</Text>
                            <TouchableOpacity onPress={()=>this.props
                                .navigation.navigate('EditProfile')}>
                                <Icon style={styles.htmProfileEditIcon} name={'edit'}/>
                            </TouchableOpacity>
                        </View>
                        <View style={{marginBottom: 15,alignItems: 'center'}}>
                            {this.props.htmProfile.email?
                                <View style={styles.htmProfileEmail}>
                                    <Icon style={styles.htmProfileEmailIcon}
                                        name={'envelope'}/>
                                    <Text style={styles.htmProfileEmailText}>
                                        {this.props.htmProfile.email}
                                    </Text>
                                </View>: null
                            }
                            <View style={styles.htmProfileEmail}>
                                <Icon style={[styles.htmProfileEmailIcon,
                                        {fontSize: 20, top: 0}
                                    ]}
                                    name={'map-marker'}/>
                                <Text style={styles.htmProfileEmailText}>
                                    {this.props.htmProfile.country || ''}
                                </Text>
                            </View>
                            {this.props.htmProfile.total_txns > 0? <View style={{alignItems:'center'}}>
                                <View style={styles.htmProfileRating}>
                                    {([1,2,3,4,5]).map(v=>
                                        <Icon key={'_start_'+v} style={styles.htmProfileRatingIcon}
                                            name={this.props.htmProfile.avg_rating>=v?'star':
                                            (this.props.htmProfile.avg_rating>=(v-0.5)?'star-half-o':'star-o')}/>
                                    )}
                                </View>
                                <Text style={styles.htmProfileReview}
                                    onPress={()=>this.props.navigation.navigate('Reviews')}>
                                    Reviews
                                </Text>
                                {this.props.htmProfile.success_txns>0?<Text
                                    style={styles.htmProfileEmailText}>
                                    {this.props.htmProfile.success_txns} successful trades (
                                        {Math.round(this.props.htmProfile.success_txns/this.props.htmProfile.total_txns*100)}
                                    %)
                                </Text>:null}
                                {this.props.htmProfile.trusted_by > 0 &&
                                <Text style={styles.htmProfileEmailText}>
                                    Trusted by {this.props.htmProfile.trusted_by} {this.props.htmProfile.trusted_by>1?
                                        'traders':'trader'}
                                </Text>}
                            </View>:null}
                        </View>
                    </View>
                    <Text style={styles.htmProfileDetailTitle}>
                        Welcome to P2P Marketplace!
                    </Text>
                    <Text style={styles.htmProfileDetailNote}>
                        {"Find cryptocurrency traders from around the globe."}
                    </Text>
                    <Button
                        style={[{
                            marginBottom: 20,
                            width: 270,
                            alignItems: 'center'
                        },!this.props.htmProfile.is_active && {
                            backgroundColor: '#C2C2C2',
                        }]}
                        textstyle={{fontSize: 18}}
                        value={'HTM'}
                        onPress={()=>{
                            if(!!this.props.htmProfile.is_active)
                                this.props.navigation.navigate('FindTrades')
                            else
                                return Toast.showTop("Please enable your Trade Profile!");
                        }} />
                    <Button
                        style={[{
                            marginBottom: 20,
                            width: 270,
                            alignItems: 'center'
                        },!this.props.htmProfile.is_active && {
                            backgroundColor: '#C2C2C2',
                        }]}
                        textstyle={{fontSize: 18}}
                        value={'Trust based Online Trades'}
                        onPress={()=>this.props.navigation.navigate('Ads')} />
                    <Button
                        style={[{
                            marginBottom: 20,
                            width: 270,
                            alignItems: 'center'
                        },!this.props.htmProfile.is_active && {
                            backgroundColor: '#C2C2C2',
                        }]}
                        textstyle={{fontSize: 18}}
                        value={'Trade History'}
                        onPress={()=>this.props.navigation.navigate('ChatHistory')} />
                    {this.props.favorite_htms.length > 0?
                    <View style={{marginHorizontal: 20}}>
                        <Text style={styles.label}>Favorite Traders</Text>
                        <View style={styles.hr}/>
                        {this.props.favorite_htms.map((htm)=>
                            <TouchableOpacity
                                key={'_htm_'+htm.username}
                                onPress={()=>this.props.getHTMDetail(htm.username,
                                    ()=>this.setState({htm:null},
                                    ()=>this.props.navigation.navigate('TradeDetail')))}
                                style={styles.htmDetailTab}>
                                <Image style={styles.htmProfileDetailTabImg}
                                    source={htm.profile_pic_url?
                                        {uri: PROFILE_URL+htm.profile_pic_url}:
                                        utils.getCurrencyIcon(constants.CURRENCY_TYPE.FLASH)}/>
                                <View style={styles.htmProfileDetailTabBox}>
                                    <Text style={styles.htmProfileDetailTabLabel}>
                                        <Text style={{ fontSize: 16, fontWeight: 'bold'}}>
                                            {htm.display_name}
                                        </Text>
                                    </Text>
                                    <Text style={{bottom: 2}}>
                                        {htm.isOnline?
                                            <Icon style={styles.htmProfileStatusIcon}
                                                name={'circle'}/>:null}
                                        <Text style={styles.htmProfileStatusText}>
                                            {(htm.isOnline?' online': 'last seen '
                                                +moment(htm.last_seen_at).fromNow())}
                                        </Text>
                                    </Text>
                                    <View style={styles.htmProfileDetailTabBuySell}>
                                        <Text style={styles.htmProfileDetailTabBuySellText}>
                                            Buying @
                                        </Text>
                                        <Icon style={[styles.htmProfileDetailTabBuySellIcon,{
                                            bottom:(htm.buy_at < 0)?8:-4,
                                            color: (htm.buy_at < 0)?'#FF0000':'#00FF00'}]}
                                            name={(htm.buy_at < 0)?'sort-down':'sort-up'}/>
                                        <Text style={[styles.htmProfileDetailTabBuySellValue,{
                                            color: (htm.buy_at < 0)?'#FF0000':'#00FF00'}]}>
                                            {Math.abs(htm.buy_at)+' %'}
                                        </Text>
                                    </View>
                                    <View style={styles.htmProfileDetailTabBuySell}>
                                        <Text style={styles.htmProfileDetailTabBuySellText}>
                                            Selling @
                                        </Text>
                                        <Icon style={[styles.htmProfileDetailTabBuySellIcon,{
                                            bottom:(htm.sell_at < 0)?8:-4,
                                            color: (htm.sell_at < 0)?'#FF0000':'#00FF00'}]}
                                            name={(htm.sell_at < 0)?'sort-down':'sort-up'}/>
                                        <Text style={[styles.htmProfileDetailTabBuySellValue,{
                                            color: (htm.sell_at < 0)?'#FF0000':'#00FF00'}]}>
                                            {Math.abs(htm.sell_at)+' %'}
                                        </Text>
                                    </View>
                                </View>
                                <TouchableOpacity style={{paddingLeft: 5}}
                                    onPress={()=>this.props.goToChatRoom(htm.username,
                                        (feedback)=>this.setState({htm:null},
                                        ()=>this.props.navigation.navigate(feedback?'FeedBack':'ChatRoom')
                                    ))}>
                                    <Icon style={[styles.headerFAIcon,{
                                            fontSize:40,
                                            color: this.props.nightMode?'#F2F2F2':'#333',
                                        }]}
                                        name='comments'/>
                                </TouchableOpacity>
                            </TouchableOpacity>
                        )}
                    </View>:null}
                </Content>
                <Footer>
                    <Text style={styles.htmRiskWarningText}>
                        {"It's recommended to trade with a new trade user only "+
                         "after meeting in person. FLASH is not responsible for "+
                         "any fraud by the trade users."}
                    </Text>
                </Footer>
                {!this.props.loading && !this.props.htmProfile.is_active?
                    <View style={styles.htmProfileSetup}>
                        <Text style={styles.htmProfileSetupTitle}>
                            Welcome to P2P Marketplace!
                        </Text>
                        <Text style={styles.htmProfileSetupNote}>
                            {"Find cryptocurrency traders from around the globe."}
                        </Text>
                        <Button
                            value={this.props.htmProfile.display_name?
                                'Activate HTM Profile':'Setup Trade Profile'}
                            onPress={()=>{
                                if(this.props.htmProfile.display_name)
                                    this.props.enableHTMProfile();
                                else
                                    this.props.navigation.navigate('SetupProfile');
                            }} />
                    </View>:null
                }
                <Loader show={this.props.loading} />
            </Container>
        );
    }
}

function mapStateToProps({params}) {
    return {
        loading: params.loading || false,
        nightMode: params.nightMode,
        profile: params.profile,
        htmProfile: params.htmProfile || {},
        chatUnreadMsgCount: params.chatUnreadMsgCount || 0,
        favorite_htms: params.favorite_htms || [],
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
