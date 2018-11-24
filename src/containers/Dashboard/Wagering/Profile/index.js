/**
 * My Oracle Profile Container Tab
 */

import React, { Component } from 'react';
import {
    View,
    ImageBackground,
    Image,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import {
    Container,
    Content,
    Text,
    Icon,
    Button
} from '@components';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '@actions';

import * as constants from '@src/constants';
import * as utils from '@lib/utils';
import { APP_URL } from '@src/config';

const noImg = require('@images/image-not-available.png');

class WageringProfile extends Component<{}> {

    static navigationOptions = {
        header: null,
        gesturesEnabled: true,
    }
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount(){
        this.props.getOracleProfile();
        this.props.getMyOracleEvents();
        this.refreshTime = setInterval(()=>this.setState({refreshing:new Date().getTime()}),1000);
    }

    componentWillUnmount(){
        clearInterval(this.refreshTime);
    }

    render() {
        const styles = (this.props.nightMode?
            require('@styles/nightMode/wagering'):require('@styles/wagering'));
        return (
            <Container>
                <Content bounces={false} hasHeader={false}>
                    <View style={styles.oracleProfileDetail}>
                        <Image
                            style={styles.oracleProfileImage}
                            source={utils.getCurrencyIcon(constants.CURRENCY_TYPE.FLASH)} />
                        <View style={styles.oracleProfileName}>
                            <Text style={styles.oracleProfileNameText}>
                                {this.props.oracleProfile.display_name || this.props.profile.display_name}
                            </Text>
                            <TouchableOpacity onPress={()=>this.props
                                .screenProps.navigate('EditProfile')}>
                                <Icon style={styles.oracleProfileEditIcon} name={'edit'}/>
                            </TouchableOpacity>
                        </View>
                        <View style={{alignSelf:'center'}}>
                            {this.props.oracleProfile.email &&
                            <View style={styles.oracleProfileRow}>
                                <Icon style={styles.oracleProfileEmailIcon} name={'envelope'}/>
                                <Text style={styles.oracleProfileCompanyText}>
                                    {this.props.oracleProfile.email}
                                </Text>
                            </View>}
                            {this.props.oracleProfile.company_name &&
                            <View style={styles.oracleProfileRow}>
                                <Icon style={styles.oracleProfileCompanyIcon} name={'briefcase'}/>
                                <Text style={styles.oracleProfileCompanyText}>
                                    {this.props.oracleProfile.company_name}
                                </Text>
                            </View>}
                        </View>
                    </View>
                    <Button style={styles.oracleCreateEventBtn}
                        onPress={()=>this.props.screenProps.navigate('CreateEvent')}
                        value='Create Event'/>
                    <View style={{paddingHorizontal:20}}>
                        <Text style={styles.label}>Created Events</Text>
                        <View style={styles.hr}/>
                    </View>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={this.props.myOracleEvents}
                        keyExtractor={(event, index) => (index+'_'+event.id)}
                        renderItem={({item, index})=>{
                            let expiry = utils.getExpierTime(item.expires_on_ts);
                            let odds = utils.getOdds(item.p1_wagers,item.p2_wagers);
                            return(
                                <TouchableOpacity
                                    onPress={()=>this.props.viewWagerEventDetail(item,
                                        ()=>this.props.screenProps.navigate('EventDetail'))}
                                    style={[
                                        styles.eventTab,
                                        index == this.props.myOracleEvents.length - 1 &&
                                        { marginBottom: 15 }
                                    ]}>
                                    <ImageBackground
                                        style={styles.eventTabImage}
                                        source={noImg}>
                                        {item.event_pic_url && <Image
                                            style={styles.eventTabImage}
                                            source={{uri:APP_URL+'event/'+item.event_pic_url}}/>}
                                    </ImageBackground>
                                    <View style={styles.eventTabDetail}>
                                        <Text numberOfLines={1} style={styles.eventTabTitle}>
                                            {item.event_name}
                                        </Text>
                                        <Text numberOfLines={1} style={styles.eventTabPlayers}>
                                            {item.p1} vs {item.p2}
                                        </Text>
                                        <Text numberOfLines={1} style={styles.eventTabTotalBid}>
                                            Odds: {odds.p1}:{odds.p2}
                                        </Text>
                                        <Text numberOfLines={1} style={styles.eventTabTotalBid}>
                                            Vol: {utils.flashNFormatter(item.volume,2)} FLASH
                                            by {item.total_wagers} Wager
                                        </Text>
                                        {expiry && item.status == constants.ORACLE_EVENT.ACTIVE_WAITING_FOR_RESULT &&
                                        <View style={styles.eventTabExpireTime}>
                                            <Icon style={styles.eventTabExpireTimeIcon}
                                                name="clock-o"/>
                                            <Text style={styles.eventTabExpireTimeText}>
                                                {expiry}
                                            </Text>
                                        </View>}
                                        {!expiry && item.status == constants.ORACLE_EVENT.ACTIVE_WAITING_FOR_RESULT &&
                                             item.ends_on_ts > new Date().getTime() &&
                                        <Text style={styles.eventTabEventExpired}>
                                            Wagering time ended!
                                        </Text>}
                                        {(item.ends_on_ts < new Date().getTime() ||
                                            item.status !== constants.ORACLE_EVENT.ACTIVE_WAITING_FOR_RESULT) &&
                                        <Text style={item.status == constants.ORACLE_EVENT.ACTIVE_WAITING_FOR_RESULT?
                                                styles.eventTabResultWaiting:(
                                            item.status == constants.ORACLE_EVENT.WINNER_DECLARED?
                                                styles.eventTabResultDeclare: (
                                            item.status == constants.ORACLE_EVENT.TIED?
                                                styles.eventTabResultTied:styles.eventTabResultCancelled
                                        ))}>
                                            {item.status == constants.ORACLE_EVENT.ACTIVE_WAITING_FOR_RESULT?
                                                'Waiting for result!':(
                                            item.status == constants.ORACLE_EVENT.WINNER_DECLARED?
                                                item.winner+' won!': (
                                            item.status == constants.ORACLE_EVENT.TIED?
                                                'Tie!': 'Event is canelled'
                                            ))}
                                        </Text>}
                                    </View>
                                </TouchableOpacity>
                            )
                        }}
                        ListEmptyComponent={()=>
                            <View>
                                <Text style={styles.eventListEmpty}>
                                    There are no event created yet.
                                </Text>
                            </View>
                        }
                    />
                </Content>
                {!this.props.loading && !this.props.oracleProfile.is_active?
                    <View style={styles.oracleProfileSetup}>
                        <Text style={styles.oracleProfileSetupTitle}>
                            Be an Oracle
                        </Text>
                        <Text style={styles.oracleProfileSetupNote}>
                            {"Lorem ipsum dolor sit amet, consectetur adipisicing magna aliqua. Ut enim ad minim veniam,mollit anim id est laborum."}
                        </Text>
                        <Button
                            value={this.props.oracleProfile.company_name?
                                'Activate Oracle Profile':'Setup Oracle Profile'}
                            onPress={()=>{
                                if(this.props.oracleProfile.company_name)
                                    this.props.enableOracleProfile();
                                else
                                    this.props.screenProps.navigate('SetupProfile');
                            }} />
                    </View>:null
                }
            </Container>
        );
    }
}

function mapStateToProps({params}) {
    return {
        loading: params.loading || false,
        nightMode: params.nightMode,
        profile: params.profile,
        oracleProfile: params.oracleProfile || {},
        myOracleEvents: params.myOracleEvents
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(WageringProfile);
