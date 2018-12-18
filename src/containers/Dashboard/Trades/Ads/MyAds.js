/**
 * HTM My Ads Container
 */

 import React, {Component} from 'react';
 import {
     View,
     Image,
     TouchableOpacity,
     RefreshControl,
     FlatList
 } from 'react-native';
 import {
     Text,
     Button,
     Loader
 } from '@components';
import * as utils from '@lib/utils';
import * as constants from '@src/constants';
import { PROFILE_URL } from '@src/config';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ActionCreators} from '@actions';

class MyAds extends Component < {} > {

    static navigationOptions = {
        header: null,
        gesturesEnabled: true,
    }

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount(){
        this.props.getHTMAds(0,true);
    }

    render() {
        const styles = (this.props.nightMode?require('@styles/nightMode/htm'):require('@styles/htm'));
        return(
            <View style={{flex:1, backgroundColor: '#FCFCFC'}}>
                <Button style={{margin: 15, marginBottom:0}}
                    value={'Post a Trade'}
                    onPress={()=>{
                        this.props.customAction({
                            htmAdCreateOrEdit: true
                        })
                        this.props.screenProps.navigate('CreateAd')
                    }}/>
                <View style={[styles.htmAdsHr,{margin:15}]}/>
                <FlatList
                    refreshControl={
                        <RefreshControl
                            colors={['#191714']}
                            tintColor='#191714'
                            refreshing={false}
                            onRefresh={()=>!this.props.htmAdCreateOrEdit && this.props.getHTMAds(0,true)}/>
                    }
                    style={styles.htmAdList}
                    showsVerticalScrollIndicator={false}
                    data={this.props.htmMyAds}
                    keyExtractor={(ad, index) => (index+'_'+ad.id)}
                    // onEndReachedThreshold={2}
                    // onEndReached={()=>!this.props.htmAdCreateOrEdit && this.props.getHTMAds(this.props.htmMyAds.length)}
                    renderItem={({item, index})=>{
                        let price_per = this.props.screenProps.getPricePer(item.buy,item.sell);
                        if(price_per > 1){
                            price_per = ((1/price_per) * (1+item.margin/100)).toFixed(8);
                            price_per = (1/Number(price_per)).toFixed(8);
                        }else{
                            price_per = (price_per * (1-item.margin/100)).toFixed(8);
                        }
                        let trade_limit = item.max > 0?
                            ('Limits: ' + utils.flashNFormatter(item.min,2) +
                            ' - ' + utils.flashNFormatter(item.max,2) +
                            ' ' + utils.getCurrencyUnitUpcase(item.sell)):(item.min > 0?
                            ('At least ' + utils.flashNFormatter(item.min,2) +
                            ' ' + utils.getCurrencyUnitUpcase(item.sell)):
                            'No limits');
                        return(
                            <TouchableOpacity activeOpacity={0.5}
                                onPress={()=>this.props.editHTMAd(item,()=>this.props.screenProps.navigate('EditAd'))}
                                style={styles.htmAdTab}>
                                <Image style={styles.htmAdUserImage} source={this.props.htmProfile.profile_pic_url?
                                    {uri:PROFILE_URL+this.props.htmProfile.profile_pic_url}:
                                    utils.getCurrencyIcon(constants.CURRENCY_TYPE.FLASH)} />
                                <View>
                                    <View style={styles.htmAdTabDetail}>
                                        <View>
                                            <Text style={styles.htmAdUserName}>
                                                {this.props.htmProfile.display_name}
                                            </Text>
                                            <Text style={styles.htmAdConversionLimits}>
                                                {trade_limit}
                                            </Text>
                                        </View>
                                        <View style={styles.htmAdPriceDetail}>
                                            <Text style={styles.htmAdPriceTitle}>
                                                Price / {utils.getCurrencyUnitUpcase(price_per > 1?item.sell:item.buy)}
                                            </Text>
                                            <Text style={styles.htmAdPriceValue}>{
                                                (price_per > 1?(1/price_per).toFixed(8):price_per) + ' ' +
                                                utils.getCurrencyUnitUpcase(price_per > 1?item.buy:item.sell)}
                                            </Text>
                                        </View>
                                    </View>
                                    <Text style={styles.htmAdConversion}>
                                        Want to sell {utils.getCurrencyUnitUpcase(item.sell) + ' against ' +
                                        utils.getCurrencyUnitUpcase(item.buy)}
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
                <Loader show={this.props.loading}/>
            </View>
        )
    }
}

function mapStateToProps({params}) {
    return {
        loading: params.loading,
        nightMode: params.nightMode,
        htmMyAds: params.htmMyAds || [],
        htmProfile: params.htmProfile || {},
        htmAdCreateOrEdit: params.htmAdCreateOrEdit || false,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAds);
