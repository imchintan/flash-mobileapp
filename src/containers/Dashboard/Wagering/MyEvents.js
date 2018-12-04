/**
 * My Events Container Tab
 */

import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    FlatList,
    RefreshControl,
    Image,
    ImageBackground,
} from 'react-native';
import {
    Text
} from '@components';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '@actions';

import * as wm from './WageringModal';
import * as constants from '@src/constants';
import * as utils from '@lib/utils';
import { APP_URL } from '@src/config';

const noImg = require('@images/image-not-available.png');

class MyEvents extends Component<{}> {

    static navigationOptions = {
        header: null,
        gesturesEnabled: true,
    }
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount(){
        this.props.getMyActiveOracleEvents();
        this.refreshTime = setInterval(()=>this.setState({refreshing:new Date().getTime()}),1000);
    }
    componentWillUnmount(){
        clearInterval(this.refreshTime);
    }

    render() {
        const styles = (this.props.nightMode?
            require('@styles/nightMode/wagering'):require('@styles/wagering'));
        return (
            <View style={styles.content}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={this.props.activeOracleEvents}
                    refreshControl={
                        <RefreshControl
                            colors={['#191714']}
                            tintColor='#191714'
                            refreshing={false}
                            onRefresh={()=>{
                                this.props.getMyActiveOracleEvents(true);
                                this.props.getBalanceV2(this.props.currency_type);
                            }}/>
                    }
                    keyExtractor={(event, index) => (index+'_'+event.id)}
                    renderItem={({item, index})=>{
                        let expiry = item.status == constants.ORACLE_EVENT.ACTIVE_WAITING_FOR_RESULT?
                            utils.getExpierTime(item.expires_on_ts):null;
                        let endIn = item.status == constants.ORACLE_EVENT.ACTIVE_WAITING_FOR_RESULT
                            && !expiry?utils.getExpierTime(item.ends_on_ts):null;
                        let odds = utils.getOdds(item.p1_wagers,item.p2_wagers);
                        return(
                            <TouchableOpacity
                                onPress={()=>this.props.viewWagerEventDetail(item,
                                    ()=>this.props.screenProps.navigate('EventDetail'))}
                                style={[
                                    styles.eventTab, index == 0 && { marginTop: 15 },
                                    index == this.props.activeOracleEvents.length - 1 &&
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
                                    <Text numberOfLines={1} style={styles.eventTabCreatedBy}>
                                        By {item.company_name}
                                    </Text>
                                    <Text numberOfLines={1} style={styles.eventTabTotalBid}>
                                        Odds: {odds.p1}:{odds.p2}
                                    </Text>
                                    <Text numberOfLines={1} style={styles.eventTabTotalBid}>
                                        My Wager: {utils.flashNFormatter(item.my_total_wager,2)} FLASH
                                    </Text>
                                    <Text numberOfLines={1} style={styles.eventTabTotalBid}>
                                        Total Stake - {utils.flashNFormatter(item.volume,2)} FLASH
                                    </Text>
                                    <Text numberOfLines={1} style={styles.eventTabTotalBid}>
                                        Total Participant{item.total_wagers > 1?'s':''} - {item.total_wagers}
                                    </Text>
                                    {expiry && item.status == constants.ORACLE_EVENT.ACTIVE_WAITING_FOR_RESULT &&
                                    <Text numberOfLines={1} style={styles.eventTabTotalBid}>
                                        Wagering Closes in: <Text style={styles.eventTabExpireTimeText}>
                                            {expiry}
                                        </Text>
                                    </Text>}
                                    {endIn && item.status == constants.ORACLE_EVENT.ACTIVE_WAITING_FOR_RESULT &&
                                    <Text numberOfLines={1} style={styles.eventTabTotalBid}>
                                        Result after: <Text style={styles.eventTabEndTimeText}>
                                            {endIn}
                                        </Text>
                                    </Text>}
                                    {!expiry && item.status == constants.ORACLE_EVENT.ACTIVE_WAITING_FOR_RESULT &&
                                         item.ends_on_ts > new Date().getTime() &&
                                    <Text style={styles.eventTabEventExpired}>
                                        Wagering closed!
                                    </Text>}
                                    {(item.ends_on_ts < new Date().getTime() ||
                                        item.status !== constants.ORACLE_EVENT.ACTIVE_WAITING_FOR_RESULT) &&
                                    <Text style={item.status == constants.ORACLE_EVENT.ACTIVE_WAITING_FOR_RESULT?
                                            styles.eventTabResultWaiting:(
                                        item.status == constants.ORACLE_EVENT.WINNER_DECLARED?
                                            (item.result_amount > 0 ? styles.eventTabResultDeclare:
                                            styles.eventTabEventExpired) : (
                                        item.status == constants.ORACLE_EVENT.TIED?
                                            styles.eventTabResultTied:styles.eventTabResultCancelled
                                    ))}>
                                        {item.status == constants.ORACLE_EVENT.ACTIVE_WAITING_FOR_RESULT?
                                            'Waiting for result!':(
                                        item.status == constants.ORACLE_EVENT.WINNER_DECLARED?
                                        `You ${item.result_amount > 0 ?'won':'lost'} ${utils
                                        .flashNFormatter(Math.abs(item.result_amount),2)} FLASH`: (
                                        item.status == constants.ORACLE_EVENT.TIED?
                                            'Result is a Tie!': 'Event is cancelled!'
                                        ))}
                                    </Text>}
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                    ListEmptyComponent={()=>
                        <View>
                            <Text style={styles.eventListEmpty}>
                                There are no events.
                            </Text>
                        </View>
                    }
                    ListHeaderComponent={()=>wm.balanceHeader(this,styles)}
                />
            </View>
        );
    }
}

function mapStateToProps({params}) {
    return {
        loading: params.loading || false,
        nightMode: params.nightMode,
        activeOracleEvents: params.activeOracleEvents || [],
        balance: params.balance,
        currency_type: params.currency_type,
        sbalance: params.sbalance,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MyEvents);
