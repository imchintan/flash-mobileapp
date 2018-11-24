/**
 * Oracle Events Container Tab
 */

import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    FlatList,
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

import * as utils from '@lib/utils';
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
                                    styles.eventTab,
                                    index == 0 && { marginTop: 15 },
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
                                        {item.company_name}
                                    </Text>
                                    <Text numberOfLines={1} style={styles.eventTabTotalBid}>
                                        Odds: {odds.p1}:{odds.p2}
                                    </Text>
                                    <Text numberOfLines={1} style={styles.eventTabTotalBid}>
                                        Vol: {utils.flashNFormatter((item.volume || 0),2)} FLASH
                                        by {item.total_wagers} Wager
                                    </Text>
                                    {expiry &&
                                    <View style={styles.eventTabExpireTime}>
                                        <Icon style={styles.eventTabExpireTimeIcon}
                                            name="clock-o"/>
                                        <Text style={styles.eventTabExpireTimeText}>
                                            {expiry}
                                        </Text>
                                    </View>}
                                    {!expiry && new Date(item.ends_on_ts)
                                        .getTime() > new Date().getTime() &&
                                    <Text style={styles.eventTabEventExpired}>
                                        Wagering time expired!
                                    </Text>}
                                    {new Date(item.ends_on_ts).getTime() < new Date().getTime() &&
                                    <Text style={item.winner?styles.eventTabResultDeclare:
                                        styles.eventTabResultWaiting}>
                                        {item.winner?(item.winner+' won!' ):'Waiting for result!'}
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
                />
            </View>
        );
    }
}

function mapStateToProps({params}) {
    return {
        nightMode: params.nightMode,
        oracleEvents: params.oracleEvents || [],
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Events);
