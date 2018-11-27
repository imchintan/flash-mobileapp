/**
 * Oracle Events Container Tab
 */

import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    FlatList,
    RefreshControl,
    ImageBackground,
    Image
} from 'react-native';
import {
    Text,
    Icon
} from '@components';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '@actions';

import * as wm from './WageringModal';
import * as utils from '@lib/utils';
import * as constants from '@src/constants';

import { APP_URL } from '@src/config';

const noImg = require('@images/image-not-available.png');

class Events extends Component<{}> {

    static navigationOptions = {
        header: null,
        gesturesEnabled: true,
    }
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount(){
        this.props.getOracleEvents();
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
                    refreshControl={
                        <RefreshControl
                            colors={['#191714']}
                            tintColor='#191714'
                            refreshing={false}
                            onRefresh={()=>{
                                this.props.getOracleEvents();
                                this.props.getBalance();
                            }}/>
                    }
                    showsVerticalScrollIndicator={false}
                    data={this.props.oracleEvents}
                    keyExtractor={(event, index) => (index+'_'+event.id)}
                    renderItem={({item, index})=>{
                        let expiry = utils.getExpierTime(item.expires_on_ts);
                        let odds = utils.getOdds(item.p1_wagers,item.p2_wagers);
                        return(
                            <TouchableOpacity
                                onPress={()=>this.props.viewWagerEventDetail(item,
                                    ()=>this.props.screenProps.navigate('EventDetail'))}
                                style={[
                                    styles.eventTab, index == 0 && { marginTop: 15 },
                                    index == this.props.oracleEvents.length - 1 &&
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
                                        Vol: {utils.flashNFormatter(item.volume,2)} FLASH
                                        by {item.total_wagers} player{item.total_wagers > 1?'s':''}
                                    </Text>
                                    {expiry && item.status == constants.ORACLE_EVENT.ACTIVE_WAITING_FOR_RESULT &&
                                    <View>
                                        <Text numberOfLines={1} style={styles.eventTabTotalBid}>
                                            Wagering Closes in
                                        </Text>
                                        <View style={styles.eventTabExpireTime}>
                                            <Icon style={styles.eventTabExpireTimeIcon}
                                                name="clock-o"/>
                                            <Text style={styles.eventTabExpireTimeText}>
                                                {expiry}
                                            </Text>
                                        </View>
                                    </View>}
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
                                            'Tie!': 'Event is canelled!'
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
        nightMode: params.nightMode,
        oracleEvents: params.oracleEvents || [],
        balance: params.balance,
        currency_type: params.currency_type,
        sbalance: params.sbalance,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Events);
