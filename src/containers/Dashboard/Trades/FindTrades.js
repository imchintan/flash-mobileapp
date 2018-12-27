/**
 * Find Trades in Map Container
 */

import React, {Component} from 'react';
import {
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    PermissionsAndroid,
    Dimensions,
    Linking,
    Platform,
    AsyncStorage
} from 'react-native';
import {
    Container,
    Header,
    HeaderLeft,
    HeaderTitle,
    HeaderRight,
    Text,
    Icon,
    Button,
    Slider,
    Loader,
    Modal
} from '@components';
import { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapView from 'react-native-map-clustering';
import AndroidOpenSettings from 'react-native-android-open-settings'
import moment from 'moment-timezone';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ActionCreators} from '@actions';

import * as utils from '@lib/utils';
import * as constants from '@src/constants';
import { PROFILE_URL } from '@src/config';
import * as tm from './TradeModal';

const { width, height } = Dimensions.get('window');

const mapPin = __DEV__ && Platform.OS !== 'ios'?require('@images/map-pin-debug-circle.png'):
    require('@images/map-pin-circle.png');
const mapPinOnline = __DEV__ && Platform.OS !== 'ios'?require('@images/map-pin-online-debug-circle.png'):
    require('@images/map-pin-online-circle.png');
const mapPinCurrentLocation = __DEV__ && Platform.OS !== 'ios'?require('@images/current-position-debug.png'):
    require('@images/current-position.png');

class FindTrades extends Component < {} > {

    static navigationOptions = {
        header: null,
        gesturesEnabled: true,
    }

    constructor(props) {
        super(props);
        let location = this.props.htmProfile.show_on_map == 1 &&
        this.props.htmProfile.show_live_location ==1? null: (
            this.props.location && this.props.location.latitude?{
                latitude:this.props.location.latitude,
                longitude:this.props.location.longitude,
        }:null)
        this.state = {
            location,
            htm:null,
            loading: true,
            showFilter: false,
            filter: this.props.htmFilter?this.props.htmFilter:{
                apply: false,
                want_to: 0,
                buy_sell_at_from: -30,
                buy_sell_at_to: 30,
                upto_distance: 1000,
                currency_types: {},
                fiat_currency_codes: [],
                onlineOnly: false,
            }
        };
    }

    componentDidMount(){
        this.mount = true;
        this.currentZoomLevel = 0;
        if(this.props.htmProfile.show_on_map == 1 &&
            this.props.htmProfile.show_live_location == 1)
            this.checkLocationPermission();
        else if(this.state.location)
            this.props.findNearByHTMs(this.state.filter, true);
        setTimeout(()=>this.mount &&
            this.setState({loading:false}),200);
    }
    componentWillUnmount(){
        this.mount = false;
    }

    checkLocationPermission = async () =>{
        try {
            if(this.props.position){
                this.props.findNearByHTMs(this.state.filter, true);
                return;
            }
            if(Platform.OS !== 'ios'){
                this.props.customAction({lockApp:true});
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
                )
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    this.props.getCurrentPosition();
                }
                setTimeout(()=>this.props.customAction({
                    lockApp:false,
                    location_permission:(granted === PermissionsAndroid.RESULTS.GRANTED),
                    location_error_code: 3,
                }),500);
            } else {
                this.props.getCurrentPosition();
            }
        } catch (e) {
            console.log(e);
            this.props.customAction({lockApp:false});
            setTimeout(()=>this.props.customAction({lockApp:false}),500);
        }
    }

    findNearByHTMs(){
        let filter = this.state.filter;
        filter.apply = true;
        this.props.findNearByHTMs(filter, true);
        this.setState({filter, showFilter: false});
    }

    resetFilter(){
        let filter = {
            apply: false,
            want_to: 0,
            buy_sell_at_from: -30,
            buy_sell_at_to: 30,
            upto_distance: 1000,
            currency_types: {},
            onlineOnly: false,
            fiat_currency_codes: []
        };
        this.setState({filter, showFilter: false});
        this.props.findNearByHTMs(filter, true);
    }

    calculateDelta(current, htms) {
        let minX, maxX, minY, maxY;

        // init first point
        minX = current.latitude;
        maxX = current.latitude;
        minY = current.longitude;
        maxY = current.longitude;

        // calculate rect
        if(htms.length > 0){
            minX = Math.min(minX, htms[0].lat);
            maxX = Math.max(maxX, htms[0].lat);
            minY = Math.min(minY, htms[0].long);
            maxY = Math.max(maxY, htms[0].long);
        }

        let deltaX = (maxX - minX)*3;
        let deltaY = (maxY - minY)*3;

        return {
            latitude: current.latitude,
            longitude: current.longitude,
            latitudeDelta: Math.min(Math.max(deltaX,0.0922),50),
            longitudeDelta:Math.min(Math.max(deltaY,0.0421),50)
        };
    }

    tradeCaution(){
        if(this.state.do_not_show){
            AsyncStorage.setItem('tradeCaution','true');
        }
        this.props.customAction({
            tradeCaution: true
        });
    }

    render() {
        const styles = (this.props.nightMode?require('@styles/nightMode/htm'):
            require('@styles/htm'));
        let markers = [];
        if(this.props.position || this.state.location){
            markers = this.props.htms.map((htm,index) =>
                <Marker
                    key={'_map_pin_'+htm.lat+'_'+htm.long}
                    coordinate={{
                        latitude: htm.lat,
                        longitude: htm.long
                    }}
                    htm={htm}
                    onPress={()=>this.setState({htm})}
                    image={htm.isOnline?mapPinOnline:mapPin}/>
            );
            if(this.props.position)
                markers.push(<Marker
                    key={'_map_pin_current_location'}
                    currentLocation={true}
                    coordinate={this.props.position}
                    image={mapPinCurrentLocation}/>);
        }

        return (
            <Container>
                <Header>
                    <HeaderLeft>
                        <TouchableOpacity>
                            <Icon onPress={() => this.props.navigation.goBack()}
                            style={styles.headerBackIcon} name='angle-left'/>
                        </TouchableOpacity>
                    </HeaderLeft>
                    <HeaderTitle>Find Trade</HeaderTitle>
                    {this.props.position || this.state.location?<HeaderRight>
                        <TouchableOpacity
                            onPress={()=>this.setState({showFilter:!this.state.showFilter,
                                htm:null})}>
                            <Icon style={[styles.headerFAIcon,{
                                    fontSize:28,
                                    color: this.state.filter.apply?'#E0AE27':'#FFFFFF'
                                }]}
                                name='filter'/>
                        </TouchableOpacity>
                    </HeaderRight>:null}
                </Header>
                {!this.props.position && !this.state.location && this.props.location_permission
                    && this.props.location_error_code == 3?
                    <View style={styles.htmMapLocationErrorNote}>
                        <Text style={styles.htmMapLocationErrorNoteText}>
                            {"We couldn't find your location may be "+
                                "because of poor connectivity"}
                        </Text>
                        <Button value={'Try again'}
                            onPress={()=>{
                                this.setState({loading: true});
                                this.props.getCurrentPosition();
                                setTimeout(()=>this.mount &&
                                    this.setState({loading: false}),3000);
                            }}/>
                    </View>:null
                }
                {!this.props.position && !this.state.location && this.props.location_permission
                    && this.props.location_error_code == 2?
                    <View style={styles.htmMapLocationErrorNote}>
                        <Text style={styles.htmMapLocationErrorNoteText}>
                            {"Please enable location service to find nearby HTMs"}
                        </Text>
                        <Button value={'Try again'}
                            onPress={()=>{
                                this.setState({loading: true});
                                if(Platform.OS === 'ios'){
                                    this.props.getCurrentPosition();
                                }else{
                                    AndroidOpenSettings.locationSourceSettings();
                                    this.props.navigation.goBack();
                                    setTimeout(()=>this.props.getCurrentPosition(),1000);
                                }
                                setTimeout(()=>this.mount &&
                                    this.setState({loading: false}),3000);
                            }}/>
                    </View>:null
                }
                {!this.props.position && !this.state.location && !this.props.location_permission?
                    <View style={styles.htmMapLocationErrorNote}>
                        <Text style={styles.htmMapLocationErrorNoteText}>
                            {"It seems you didn't allow Location permission "+
                                "to FLASH App. please allow it to find nearby HTMs"}
                        </Text>
                        <Button value={'Go to setting'}
                            onPress={()=>{
                                if(Platform.OS === 'ios')
                                    Linking.openURL('app-settings:');
                                else
                                    AndroidOpenSettings.appDetailsSettings();
                                    this.props.navigation.goBack();
                            }}/>
                    </View>:null
                }
                {this.props.position || this.state.location?<MapView
                    onPress={()=>{
                        if(this.state.htm)this.setState({htm:null})
                        if(this.state.cluster_htms)this.setState({cluster_htms:null})
                        if(this.state.showFilter)this.setState({showFilter:false})
                    }}
                    provider={PROVIDER_GOOGLE}
                    style={styles.htmMap}
                    maxZoomLevel={10.5}
                    clusterColor = '#E0AE27'
                    clusterTextColor = '#191714'
                    clusterBorderColor = '#191714'
                    clusterBorderWidth = {0}
                    customMapStyle={constants.CUSTOM_MAP_STYLE}
                    followsUserLocation={true}
                    showsMyLocationButton={true}
                    onRegionChangeComplete={({longitudeDelta})=>{
                        // let zoom = Math.round(Math.log(360 / longitudeDelta) / Math.LN2)
                        this.currentZoomLevel = Number(Math.log2(360 * ((width/256) / longitudeDelta)).toFixed(2))
                    }}
                    onClusterPress={(data)=>{
                        if(this.currentZoomLevel < 10.5) return;
                        if(!data || data.zoom < 7 || !data.markers || data.markers.length == 0) return;
                        cluster_htms=data.markers.map(m=>m.props.htm);
                        this.setState({cluster_htms});
                    }}
                    initialRegion={this.calculateDelta(
                        this.props.position || this.state.location,
                        this.props.htms)}
                    region={this.state.region || this.calculateDelta(
                        this.props.position || this.state.location,
                        this.props.htms)}>
                    {markers}
                </MapView>:null}
                {this.state.htm && htmDetailTab(this,this.state.htm,styles)}
                {!this.props.loading && this.state.cluster_htms && <Modal transparent={true}
                    visible={!!this.state.cluster_htms}
                    onRequestClose={() => this.setState({htm:null,cluster_htms:null})}>
                    <TouchableOpacity activeOpacity={1}
                        onPress={() => this.setState({htm:null,cluster_htms:null})}
                        style={{paddingTop: 55,height}}>
                        <ScrollView
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                maxHeight: height-55
                            }}
                            contentContainerStyle={{
                                alignItems: 'center',
                                justifyContent: 'flex-end'
                            }}>
                            <View style={{padding: 15}}>
                                {this.state.cluster_htms
                                    .map((htm)=>htmDetailTab(this,htm,styles))}
                            </View>
                        </ScrollView>
                    </TouchableOpacity>
                </Modal>}
                {this.state.showFilter?<View style={styles.htmFilter}>
                <Icon style={styles.htmFilterArrow} name='sort-up'/>
                    <ScrollView style={[styles.htmFilterContent,{
                        height: height - 90,
                    }]}>
                        <View style={styles.htmFilterRow1}>
                            <View style={styles.htmFilterWantToTitle}>
                                <Text style={styles.htmFilterWantToLabel}>I want to?</Text>
                                <Text style={styles.htmFilterWantToVal}>
                                  {this.state.filter.buy_sell_at_from == -30 &&
                                      this.state.filter.buy_sell_at_to == 30? 'All':(
                                      this.state.filter.buy_sell_at_from > -30 &&
                                      this.state.filter.buy_sell_at_to == 30? (
                                          ' ≥ '+ this.state.filter.buy_sell_at_from ) : (
                                      this.state.filter.buy_sell_at_from == -30 &&
                                      this.state.filter.buy_sell_at_to < 30? (
                                          ' ≤ '+ this.state.filter.buy_sell_at_to ) : (
                                         this.state.filter.buy_sell_at_from + ' to '+
                                         this.state.filter.buy_sell_at_to
                                  )))+'%'}
                                </Text>
                            </View>
                            <View style={[styles.hr,{marginBottom:10}]}/>
                            <View style={styles.htmFilterWantTo}>
                                <TouchableOpacity style={styles.htmFilterWantToValue}
                                    onPress={()=>{
                                        let filter = this.state.filter;
                                        filter.want_to = 0;
                                        this.setState({filter})
                                    }}>
                                    <Icon style={styles.htmFilterWantToValueIcon}
                                        name={(this.state.filter.want_to !== 0)?"circle-o":"dot-circle-o"} />
                                    <Text style={styles.htmFilterWantToValueText}>All</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.htmFilterWantToValue}
                                    onPress={()=>{
                                        let filter = this.state.filter;
                                        filter.want_to = 1;
                                        this.setState({filter})
                                    }}>
                                    <Icon style={styles.htmFilterWantToValueIcon}
                                        name={(this.state.filter.want_to !== 1)?"circle-o":"dot-circle-o"} />
                                    <Text style={styles.htmFilterWantToValueText}>Buy</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.htmFilterWantToValue}
                                    onPress={()=>{
                                        let filter = this.state.filter;
                                        filter.want_to = 2;
                                        this.setState({filter})
                                    }}>
                                    <Icon style={styles.htmFilterWantToValueIcon}
                                        name={(this.state.filter.want_to !== 2)?
                                        "circle-o":"dot-circle-o"} />
                                    <Text style={styles.htmFilterWantToValueText}>Sell</Text>
                                </TouchableOpacity>
                            </View>
                            <Slider
                                containerStyle={styles.htmFilterSliderContainer}
                                trackStyle={styles.htmFilterSliderTrack}
                                customMarker={()=><View
                                    style={styles.htmFilterSliderCustomMarker} />}
                                min={-30}
                                max={30}
                                step={1}
                                values={[this.state.filter.buy_sell_at_from,
                                    this.state.filter.buy_sell_at_to]}
                                selectedStyle={styles.htmFilterSliderSelected}
                                onValuesChange={(v)=>{
                                    let filter = this.state.filter;
                                    this.state.filter.buy_sell_at_from = v[0];
                                    if(v.length > 1)
                                        this.state.filter.buy_sell_at_to = v[1];
                                    this.setState({filter});
                                }}
                                sliderLength={225} />
                        </View>
                        <View style={styles.htmFilterRow1}>
                            <View style={styles.htmFilterWantToTitle}>
                                <Text style={styles.htmFilterWantToLabel}>Distance</Text>
                                <Text style={styles.htmFilterWantToVal}>
                                    {this.state.filter.upto_distance < 1000?
                                        (this.state.filter.upto_distance + ' '+
                                    (this.props.htmProfile
                                        .show_distance_in == 'miles'?'Miles':'Kms')):'Anywhere'}
                                </Text>
                            </View>
                            <View style={[styles.hr,{marginBottom:10}]}/>
                            <Slider
                                containerStyle={styles.htmFilterSliderContainer}
                                trackStyle={styles.htmFilterSliderTrack}
                                customMarker={()=><View
                                    style={styles.htmFilterSliderCustomMarker} />}
                                min={5}
                                max={1000}
                                step={1}
                                values={[this.state.filter.upto_distance]}
                                selectedStyle={styles.htmFilterSliderSelected}
                                onValuesChange={(v)=>{
                                    let filter = this.state.filter;
                                    this.state.filter.upto_distance = v[0];
                                    this.setState({filter});
                                }}
                                sliderLength={225} />
                        </View>
                        <View style={styles.htmFilterRow1}>
                            <View style={styles.htmFilterWantToTitle}>
                                <Text style={styles.htmFilterWantToLabel}>
                                    Show only online HTMs
                                </Text>
                            </View>
                            <View style={[styles.hr,{marginBottom:10}]}/>
                            <View style={[styles.htmFilterWantTo,{marginBottom:10}]}>
                                <TouchableOpacity style={styles.htmFilterWantToValue}
                                    onPress={()=>{
                                        let filter = this.state.filter;
                                        filter.onlineOnly = true;
                                        this.setState({filter})
                                    }}>
                                    <Icon style={styles.htmFilterWantToValueIcon}
                                        name={!this.state.filter.onlineOnly?
                                            "circle-o":"dot-circle-o"}/>
                                    <Text style={styles.htmFilterWantToValueText}>Yes</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.htmFilterWantToValue}
                                    onPress={()=>{
                                        let filter = this.state.filter;
                                        filter.onlineOnly = false;
                                        this.setState({filter})
                                    }}>
                                    <Icon style={styles.htmFilterWantToValueIcon}
                                        name={this.state.filter.onlineOnly?
                                            "circle-o":"dot-circle-o"} />
                                    <Text style={styles.htmFilterWantToValueText}>No</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.htmFilterRow1}>
                            <View style={styles.htmFilterWantToTitle}>
                                <Text style={styles.htmFilterWantToLabel}>Currencies</Text>
                                <Text style={styles.htmFilterWantToVal}>
                                    {Object.keys(this.state.filter.currency_types)
                                        .length == 0?'All':''}
                                </Text>
                            </View>
                            <View style={[styles.hr,{marginBottom:10}]}/>
                            {this.props.balances.map(balance =>
                                <View key={'_currency_'+balance.currency_type+
                                    '_'+balance.amt}
                                    style={[styles.htmProfile,{marginBottom:2, marginLeft: 10}]}>
                                    <View style={styles.htmCurrency}>
                                        <TouchableOpacity onPress={()=>{
                                            let filter = this.state.filter;
                                            let currency_types = filter.currency_types;
                                            if(currency_types[balance.currency_type])
                                                delete currency_types[balance.currency_type];
                                            else {
                                                currency_types[balance.currency_type] = {
                                                    currency_type: balance.currency_type
                                                }
                                            }
                                            filter.currency_types = currency_types;
                                            this.setState({filter});
                                        }}>
                                            <Icon style={styles.htmCurrencyCheckIcon}
                                                name={this.state.filter
                                                .currency_types[balance.currency_type]?
                                                'check-square-o':'square-o'}/>
                                        </TouchableOpacity>
                                        <Text style={styles.htmProfileLabel}>
                                            {utils.getCurrencyName(balance.currency_type)}
                                        </Text>
                                    </View>
                                </View>
                            )}
                        </View>
                        <View style={styles.htmFilterRow1}>
                            <View style={styles.htmFilterWantToTitle}>
                                <Text style={styles.htmFilterWantToLabel}>Fiat Currencies</Text>
                                <Text style={styles.htmFilterWantToVal}>
                                    {this.state.filter.fiat_currency_codes
                                        .length == 0?'All':''}
                                </Text>
                            </View>
                            <View style={[styles.hr,{marginBottom:10}]}/>
                            <TouchableOpacity style={styles.selectFiatCurrency}
                                onPress={()=>this.setState({selectFiatCurrency:true})}>
                                <Text style={styles.selectFiatCurrencyText}>Select Fiat Currencies</Text>
                            </TouchableOpacity>
                            <View style={[styles.selectedFiatCurrencies,{marginLeft:18}]}>
                            {this.state.filter.fiat_currency_codes.map((cur,idx) =>
                                <View key={'_selected_fiat_'+idx+'_'+cur} style={styles.selectedFiatCurrency}>
                                    <Text style={styles.selectedFiatCurrencyName}>{cur}</Text>
                                    <TouchableOpacity style={styles.deselectedFiatCurrencyBtn}
                                        onPress={()=>{
                                            let filter = this.state.filter;
                                            filter.fiat_currency_codes.remove(cur);
                                            this.setState({filter});
                                        }}>
                                        <Text style={styles.deselectedFiatCurrencyBtnText}>X</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                            </View>
                        </View>
                        <View style={[styles.htmFilterRow1, {
                            flexDirection: 'row',
                            alignSelf: 'center',
                            justifyContent: 'space-between',
                            width: 180,
                            marginTop: 10,
                            marginBottom: 40
                        }]}>
                            <Button value={'Reset'}
                                style={styles.htmFilterBtn}
                                textstyle={styles.htmFilterBtnText}
                                onPress={this.resetFilter.bind(this)}/>
                            <Button value={'Apply'}
                                style={[styles.htmFilterBtn,{
                                    backgroundColor: '#E0AE27',
                                }]}
                                textstyle={styles.htmFilterBtnText}
                                onPress={this.findNearByHTMs.bind(this)}/>
                        </View>
                    </ScrollView>
                </View>:null}
                <Loader show={this.props.loading || this.state.loading} />
                <Modal
                    transparent={true}
                    visible={!this.props.tradeCaution}
                    onRequestClose={() => {
                        return true;
                }}>
                    <View style={styles.tradeCaution}>
                        <View style={styles.tradeCautionBox}>
                            <Text style={styles.label}>
                                Warning
                            </Text>
                            <View style={styles.tradeCautionHr}/>
                            <Text style={styles.tradeCautionText}>
                                {"The user reviews and other HTM stats are all "+
                                "user provided. So use the information accordingly. "+
                                "It's recommended to stay alert and use good "+
                                "judgement while trading with unknown HTM users."}
                            </Text>
                            <TouchableOpacity style={styles.tradeCautionDNS}
                                onPress={()=>this.setState({do_not_show:!this.state.do_not_show})}>
                                <Icon style={styles.tradeCautionDNSIcon}
                                    name={this.state.do_not_show === true?
                                        'check-square-o':'square-o'}/>
                                <Text style={styles.tradeCautionDNSText}>
                                    {"  Do not show again."}
                                </Text>
                            </TouchableOpacity>
                            <View style={styles.tradeCautionHr}/>
                            <TouchableOpacity style={styles.tradeCautionBtn}
                                onPress={this.tradeCaution.bind(this)}>
                                <Text style={styles.tradeCautionBtnText}>
                                    I UNDERSTAND
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                {tm.selectFiatCurrency(this,styles,true)}
            </Container>
        );
    }
}

function mapStateToProps({params}) {
    return {
        loading: params.loading,
        nightMode: params.nightMode,
        position: params.position || null,
        location: params.location || null,
        htms: params.htms || [],
        htmFilter: params.htmFilter || null,
        htmProfile: params.htmProfile,
        balances: params.balances,
        fiat_currency: params.fiat_currency,
        location_permission: params.location_permission || false,
        location_error_code: params.location_error_code || 0,
        tradeCaution: params.tradeCaution || false
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FindTrades);

export const htmDetailTab = (self,htm,styles) => <TouchableOpacity
    key={'_htm_detail_'+htm.id}
    onPress={()=>self.props.getHTMDetail(htm.username,
        ()=>self.setState({htm:null,cluster_htms:null},
        ()=>self.props.navigation.navigate('TradeDetail')))}
    style={[styles.htmProfileDetailTab, self.state.cluster_htms && {
        position: 'relative',
        bottom: 0,
        marginBottom: 20,
    }]}>
    <Image style={styles.htmProfileDetailTabImg}
        source={htm.profile_pic_url?
            {uri: PROFILE_URL+htm.profile_pic_url}:
            utils.getCurrencyIcon(constants.CURRENCY_TYPE.FLASH)}/>
    <View style={styles.htmProfileDetailTabBox}>
        <Text style={styles.htmProfileDetailTabLabel}>
            <Text style={{ fontSize: 16, fontWeight: 'bold'}}>
                {htm.display_name}
            </Text>
            {' ('+utils.flashNFormatter(htm.distance,2,100)+' '+
            (self.props.htmProfile.show_distance_in=='kms'?
            'km':'mile')+(htm.distance> 0?'s':'')+')'}
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
        <Text style={styles.htmProfileDetailTabCurrency}>
            {htm.currencies.split(',')
            .map(currency_type => utils
                .getCurrencyUnit(Number(currency_type))).join(', ')}
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
        onPress={()=>self.props.goToChatRoom(htm.username,
            (feedback)=>self.setState({htm:null,cluster_htms:null},
            ()=>self.props.navigation.navigate(feedback?'FeedBack':'ChatRoom')
        ))}>
        <Icon style={[styles.headerFAIcon,{
                fontSize:40,
                color: self.props.nightMode?'#F2F2F2':'#333',
            }]}
            name='comments'/>
    </TouchableOpacity>
</TouchableOpacity>
