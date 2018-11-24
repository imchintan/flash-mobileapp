/**
 * HTM Ad detail Container
 */

 import React, {Component} from 'react';
 import {
     View,
     Image,
     TouchableOpacity,
     RefreshControl,
     FlatList,
     ScrollView
 } from 'react-native';
 import {
     Icon,
     Text,
     Button,
     Loader,
     Modal
 } from '@components';
 import moment from 'moment-timezone';
import * as utils from '@lib/utils';
import * as constants from '@src/constants';
import { PROFILE_URL } from '@src/config';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ActionCreators} from '@actions';

class Ads extends Component < {} > {

    static navigationOptions = {
        header: null,
        gesturesEnabled: true,
    }

    constructor(props) {
        super(props);
        this.state = {
            htmAd:{}
        };
    }

    componentDidMount(){
        this.props.findHTMAds(0,true);
    }

    render() {
        const styles = (this.props.nightMode?require('@styles/nightMode/htm'):require('@styles/htm'));
        return(
            <View style={{flex:1}}>
                <FlatList
                    refreshControl={
                        <RefreshControl
                            colors={['#191714']}
                            tintColor='#191714'
                            refreshing={false}
                            onRefresh={()=>!this.props.htmAdCreateOrEdit && this.props.findHTMAds(0,true)}/>
                    }
                    style={styles.htmAdList}
                    showsVerticalScrollIndicator={false}
                    data={this.props.htmAds}
                    keyExtractor={(ad, index) => (index+'_'+ad.id)}
                    onEndReachedThreshold={2}
                    onEndReached={()=>!this.props.htmAdCreateOrEdit && this.props.findHTMAds(this.props.htmAds.length)}
                    renderItem={({item, index})=>{
                        let price_per = (this.props.screenProps.getPricePer(item.buy,item.sell) * (1+item.margin/100)).toFixed(8);
                        let trade_limit = item.max > 0?
                            ('Limits: ' + utils.flashNFormatter(item.min,2) +
                            ' - ' + utils.flashNFormatter(item.max,2) +
                            ' ' + utils.getCurrencyUnitUpcase(item.sell)):(item.min > 0?
                            ('At least ' + utils.flashNFormatter(item.min,2) +
                            ' ' + utils.getCurrencyUnitUpcase(item.sell)):
                            'No limits');
                        return(
                            <TouchableOpacity activeOpacity={0.5}
                                onPress={()=>this.props.getHTMDetail(item.username,
                                    ()=>this.setState({
                                        htmAd:{
                                            ...item,
                                            price_per,
                                            trade_limit
                                        }
                                    })
                                )}
                                style={styles.htmAdTab}>
                                <Image style={styles.htmAdUserImage}
                                    source={item.profile_pic_url?
                                    {uri:PROFILE_URL+item.profile_pic_url}:
                                    utils.getCurrencyIcon(constants.CURRENCY_TYPE.FLASH)} />
                                <View>
                                    <View style={styles.htmAdTabDetail}>
                                        <View>
                                            <View style={styles.htmAdUserTitle}>
                                                <Icon style={[styles.htmAdStatusIcon,
                                                    item.is_online && styles.htmAdOnlineStatus]}
                                                    name={'circle'}/>
                                                <Text style={styles.htmAdUserName}>
                                                    {item.display_name}
                                                </Text>
                                            </View>
                                            <Text style={styles.htmAdConversionLimits}>
                                                {trade_limit}
                                            </Text>
                                        </View>
                                        <View style={styles.htmAdPriceDetail}>
                                            <Text style={styles.htmAdPriceTitle}>
                                                Price / {utils.getCurrencyUnitUpcase(item.buy)}
                                            </Text>
                                            <Text style={styles.htmAdPriceValue}>{
                                                utils.flashNFormatter(price_per,2) + ' ' +
                                                utils.getCurrencyUnitUpcase(item.sell)}
                                            </Text>
                                        </View>
                                    </View>
                                    <Text style={styles.htmAdConversion}>
                                        Want to sell {utils.getCurrencyUnitUpcase(item.buy) + ' against ' +
                                        utils.getCurrencyUnitUpcase(item.sell)}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        );
                    }}
                    ListEmptyComponent={()=>{
                        return(
                            <View>
                                <Text style={styles.txnListEmpty}>
                                    No Trade Ads!
                                </Text>
                            </View>
                        )
                    }}
                />
                <Loader show={this.props.loading} />
                <Modal transparent={false} animationType="slide"
                    onRequestClose={() => this.setState({htmAd:{}})}
                    visible={!!this.state.htmAd.username}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        bounces={false}
                        style={styles.htmAdDetail}>
                        <Image
                            style={styles.htmProfileImage}
                            source={this.props.htm.profile_pic_url?
                                {uri:PROFILE_URL+this.props.htm.profile_pic_url}:
                                utils.getCurrencyIcon(constants.CURRENCY_TYPE.FLASH)} />
                        <Text numberOfLines={1} style={styles.htmAdFilterTitle}>
                            {this.props.htm.display_name}
                        </Text>
                        <Text numberOfLines={1} style={styles.htmAdFilterSubTitle}>
                            {this.state.htmAd.is_online?<Icon style={styles.htmProfileStatusIcon}
                                    name={'circle'}/>:null}
                            <Text style={{fontStyle: 'italic'}}>
                                {(this.state.htmAd.is_online?' online':
                                'last seen '+moment(this.props.htm.last_seen_at).fromNow())}
                            </Text>
                        </Text>
                        <View style={{marginBottom: 10,alignItems: 'center'}}>
                            {this.props.htm.email?
                                <View style={styles.htmFilterRow}>
                                    <Icon style={styles.htmAdEmailIcon}
                                        name={'envelope'}/>
                                    <Text style={styles.htmAdEmailText}>
                                        {this.props.htm.email}
                                    </Text>
                                </View>: null
                            }
                            <View style={styles.htmFilterRow}>
                                <Icon style={[styles.htmAdEmailIcon,
                                        {fontSize: 20, top: 0}
                                    ]}
                                    name={'map-marker'}/>
                                <Text style={styles.htmAdEmailText}>
                                    {this.props.htm.country || ''}
                                </Text>
                            </View>
                            {this.props.htm.total_txns > 0? <View style={{alignItems:'center'}}>
                                {this.props.htm.avg_rating>0?<View style={styles.htmAdRating}>
                                    {([1,2,3,4,5]).map(v=>
                                        <Icon key={'_start_'+v} style={styles.htmAdRatingIcon}
                                            name={this.props.htm.avg_rating>=v?'star':
                                            (this.props.htm.avg_rating>=(v-0.5)?'star-half-o':'star-o')}/>
                                    )}
                                </View>:null}
                                {this.props.htm.success_txns>0?<Text
                                    style={styles.htmAdEmailText}>
                                    {this.props.htm.success_txns} successful trades (
                                        {Math.round(this.props.htm.success_txns/this.props.htm.total_txns*100)}
                                    %)
                                </Text>:null}
                                {this.props.htm.trusted_by>0?<Text style={styles.htmAdEmailText}>
                                    Trusted by {this.props.htm.trusted_by} {this.props.htm.trusted_by>1?
                                        'traders':'trader'}
                                </Text>:null}
                            </View>:null}
                        </View>
                        <View style={styles.htmAdDetailBox}>
                            <Text style={[styles.htmAdConversion,{
                                fontSize: 16,
                                color:'#333',
                                paddingBottom: 5,
                                textAlign: 'center'
                            }]}>
                                Want to sell {utils.getCurrencyUnitUpcase(this.state.htmAd.buy) + ' against ' +
                                utils.getCurrencyUnitUpcase(this.state.htmAd.sell)}
                            </Text>
                            <View style={styles.htmFilterRow}>
                                <Text style={styles.htmAdDetailLabel}>Price</Text>
                                <Text style={styles.htmAdDetailValue}>{
                                    utils.flashNFormatter(this.state.htmAd.price_per || 0,2) + ' ' +
                                    utils.getCurrencyUnitUpcase(this.state.htmAd.sell) + ' / ' +
                                    utils.getCurrencyUnitUpcase(this.state.htmAd.buy)}
                                </Text>
                            </View>
                            <View style={styles.htmFilterRow}>
                                <Text style={styles.htmAdDetailLabel}>Trade limits</Text>
                                <Text style={styles.htmAdDetailValue}>{this.state.htmAd.trade_limit}</Text>
                            </View>
                            <View style={styles.htmFilterRow}>
                                <Text style={styles.htmAdDetailLabel}>Terms of trade</Text>
                                <Text style={styles.htmAdDetailValue}>
                                    {this.state.htmAd.terms || '-'}
                                </Text>
                            </View>
                        </View>
                        <Button style={{marginVertical: 15}}
                            value={'Contact for Trade'}
                            onPress={()=>this.setState({htmAd:{}},()=>this.props.goToChatRoom(this.props.htm.username,
                                (feedback)=>this.props.screenProps
                                    .navigate(feedback?'FeedBack':'ChatRoom')))}/>
                        <TouchableOpacity style={styles.htmActiveDeactiveLink}
                            onPress={()=>this.setState({htmAd:{}},()=>this.props.screenProps
                                .navigate('TradeDetail'))}>
                            <Text style={styles.htmActiveDeactiveLinkText}>
                                View Trader Profile
                            </Text>
                        </TouchableOpacity>
                    </ScrollView>
                    <TouchableOpacity style={styles.htmAdFilterBtn}
                        onPress={()=>this.setState({htmAd:{}})}>
                        <Text style={styles.htmAdFilterBtnText}>x</Text>
                    </TouchableOpacity>
                </Modal>
            </View>
        )
    }
}

function mapStateToProps({params}) {
    return {
        loading: params.loading,
        nightMode: params.nightMode,
        htmAds: params.htmAds || [],
        htm: params.htm || {},
        htmAdCreateOrEdit: params.htmAdCreateOrEdit || false,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Ads);
