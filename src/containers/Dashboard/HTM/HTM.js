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
    Text
} from '@components';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ActionCreators} from '@actions';

import { PROFILE_URL } from '@src/config';
import * as constants from '@src/constants';
import * as utils from '@lib/utils';

class HTM extends Component < {} > {

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
                    <HeaderTitle>HTM</HeaderTitle>
                    <HeaderRight>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('ChatHistory')}>
                            <Icon style={[styles.headerFAIcon,{
                                    fontSize:24,
                                    paddingHorizontal: 12
                                }]}
                                name='send'/>
                            {this.props.chatUnreadMsgCount>0?<View style={styles.htmChatBadge}>
                                <Text style={styles.htmChatBadgeText}>
                                    {this.props.chatUnreadMsgCount}
                                </Text>
                            </View>:null}
                        </TouchableOpacity>
                    </HeaderRight>
                </Header>
                <Content bounces={false} style={styles.content}>
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
                                .navigation.navigate('EditHTMProfile')}>
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
                                {this.props.htmProfile.avg_rating>0?<View style={styles.htmProfileRating}>
                                    {([1,2,3,4,5]).map(v=>
                                        <Icon key={'_start_'+v} style={styles.htmProfileRatingIcon}
                                            name={this.props.htmProfile.avg_rating>=v?'star':
                                            (this.props.htmProfile.avg_rating>=(v-0.5)?'star-half-o':'star-o')}/>
                                    )}
                                </View>:null}
                                {this.props.htmProfile.success_txns>0?<Text
                                    style={styles.htmProfileEmailText}>
                                    {this.props.htmProfile.success_txns} successful trades (
                                        {Math.round(this.props.htmProfile.success_txns/this.props.htmProfile.total_txns*100)}
                                    %)
                                </Text>:null}
                                <Text style={styles.htmProfileEmailText}>
                                    Trusted by {this.props.htmProfile.trusted_by} {this.props.htmProfile.trusted_by>1?
                                        'traders':'trader'}
                                </Text>
                            </View>:null}
                        </View>
                    </View>
                    <Text style={styles.htmProfileDetailNote}>
                        {"Lorem Ipsum is simply dummy text of the printing and "+
                            "typesetting industry. Lorem Ipsum has been the industry's "+
                            "standard dummy text ever, when an unknown "+
                            "printer took a galley of type it to make "+
                            "a type specimen book."}
                    </Text>
                    <Button
                        style={[{
                            marginBottom: 20,
                        },!this.props.htmProfile.is_active && {
                            backgroundColor: '#C2C2C2',
                        }]}
                        value={'Find Trade'}
                        onPress={()=>{
                            if(!!this.props.htmProfile.is_active)
                                this.props.navigation.navigate('HTMListingMap')
                            else
                                return Toast.showTop("Please enable your HTM profile!");
                        }} />
                </Content>
                {!this.props.loading && !this.props.htmProfile.is_active?
                    <View style={styles.htmProfileSetup}>
                        <Text style={styles.htmProfileSetupNote}>
                            {"Lorem Ipsum has been the industry's standard "+
                            "dummy text ever since the 1500s"}
                        </Text>
                        <Button
                            value={this.props.htmProfile.display_name?
                                'Activate HTM Profile':'Setup HTM Profile'}
                            onPress={()=>{
                                if(this.props.htmProfile.display_name)
                                    this.props.enableHTMProfile();
                                else
                                    this.props.navigation.navigate('SetupHTMProfile');
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
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HTM);
