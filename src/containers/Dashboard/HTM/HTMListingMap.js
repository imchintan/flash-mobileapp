/**
 * Merchant Listing Map Container
 */

import React, {Component} from 'react';
import {
    View,
    TouchableOpacity,
    Platform,
    Linking,
    PermissionsAndroid,
    Image
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
} from '@components';
import { Marker } from 'react-native-maps';
import MapView from 'react-native-map-clustering';
import AndroidOpenSettings from 'react-native-android-open-settings'
import moment from 'moment-timezone';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ActionCreators} from '@actions';

import * as utils from '@lib/utils';
import * as constants from '@src/constants';
import { PROFILE_URL } from '@src/config';

const mapPin = __DEV__?require('@images/map-pin-debug.png'):
    require('@images/map-pin.png');
const mapPinOnline = __DEV__?require('@images/map-pin-online-debug.png'):
    require('@images/map-pin-online.png');
const mapPinCurrentLocation = __DEV__?require('@images/current-position-debug.png'):
    require('@images/current-position.png');

class HTMListingMap extends Component < {} > {

    static navigationOptions = {
        header: null,
        gesturesEnabled: true,
    }

    constructor(props) {
        super(props);
        this.state = {
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
                onlineOnly: false,
            }
        };
    }

    componentDidMount(){
        this.mount = true;
        this.checkLocationPermission();
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

    render() {
        const styles = (this.props.nightMode?require('@styles/nightMode/htm'):
            require('@styles/htm'));

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
                    {this.props.position?<HeaderRight>
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
                {!this.props.position && this.props.location_permission
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
                {!this.props.position && this.props.location_permission
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
                {!this.props.position && !this.props.location_permission?
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
                {this.props.position?<MapView
                    onPress={()=>{
                        if(this.state.htm)this.setState({htm:null})
                        if(this.state.showFilter)this.setState({showFilter:false})
                    }}
                    style={styles.htmMap}
                    clusterColor = '#E0AE27'
                    clusterTextColor = '#191714'
                    clusterBorderColor = '#191714'
                    clusterBorderWidth = {0}
                    customMapStyle={constants.CUSTOM_MAP_STYLE}
                    followsUserLocation={true}
                    showsMyLocationButton={true}
                    onRegionChangeComplete={(region)=>{
                        if(this.state.region === region || Platform.OS !== 'ios') return;
                        setTimeout(()=>this.setState({region}),100);
                    }}
                    initialRegion={this.calculateDelta(this.props.position,
                        this.props.htms)}
                    region={this.state.region || this.calculateDelta(this.props.position,
                        this.props.htms)}>
                    {this.props.htms.map((htm,index) =>
                        <Marker
                            key={'_map_pin_'+htm.lat+'_'+htm.long}
                            coordinate={{
                                latitude: htm.lat,
                                longitude: htm.long
                            }}
                            onPress={()=>this.setState({htm})}
                            image={htm.isOnline?mapPinOnline:mapPin}/>
                    )}
                    <Marker
                        key={'_map_pin_current_location'}
                        currentLocation={true}
                        coordinate={{
                            latitude: this.props.position.latitude,
                            longitude: this.props.position.longitude
                        }}
                        image={mapPinCurrentLocation}/>
                </MapView>:null}
                {this.state.htm?
                    <TouchableOpacity
                        onPress={()=>this.props.getHTMDetail(this.state.htm.username,
                            ()=>this.setState({htm:null},
                            ()=>this.props.navigation.navigate('HTMDetail')))}
                        style={styles.htmProfileDetailTab}>
                        <Image style={styles.htmProfileDetailTabImg}
                            source={this.state.htm.profile_pic_url?
                                {uri: PROFILE_URL+this.state.htm.profile_pic_url}:
                                utils.getCurrencyIcon(constants.CURRENCY_TYPE.FLASH)}/>
                        <View style={styles.htmProfileDetailTabBox}>
                            <Text style={styles.htmProfileDetailTabLabel}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold'}}>
                                    {this.state.htm.display_name}
                                </Text>
                                {' ('+utils.flashNFormatter(this.state.htm.distance,2,100)+' '+
                                (this.props.htmProfile.show_distance_in=='kms'?
                                'km':'mile')+(this.state.htm.distance> 0?'s':'')+')'}
                            </Text>
                            <Text style={{bottom: 2}}>
                                {this.state.htm.isOnline?
                                    <Icon style={styles.htmProfileStatusIcon}
                                        name={'circle'}/>:null}
                                <Text style={styles.htmProfileStatusText}>
                                    {(this.state.htm.isOnline?' online': 'last seen '
                                        +moment(this.state.htm.last_seen_at).fromNow())}
                                </Text>
                            </Text>
                            <Text style={styles.htmProfileDetailTabCurrency}>
                                {this.state.htm.currencies.split(',')
                                .map(currency_type => utils
                                    .getCurrencyUnit(Number(currency_type))).join(', ')}
                            </Text>
                            <View style={styles.htmProfileDetailTabBuySell}>
                                <Text style={styles.htmProfileDetailTabBuySellText}>
                                    Buying @
                                </Text>
                                <Icon style={[styles.htmProfileDetailTabBuySellIcon,{
                                    bottom:(this.state.htm.buy_at < 0)?8:-4,
                                    color: (this.state.htm.buy_at < 0)?'#FF0000':'#00FF00'}]}
                                    name={(this.state.htm.buy_at < 0)?'sort-down':'sort-up'}/>
                                <Text style={[styles.htmProfileDetailTabBuySellValue,{
                                    color: (this.state.htm.buy_at < 0)?'#FF0000':'#00FF00'}]}>
                                    {Math.abs(this.state.htm.buy_at)+' %'}
                                </Text>
                            </View>
                            <View style={styles.htmProfileDetailTabBuySell}>
                                <Text style={styles.htmProfileDetailTabBuySellText}>
                                    Selling @
                                </Text>
                                <Icon style={[styles.htmProfileDetailTabBuySellIcon,{
                                    bottom:(this.state.htm.sell_at < 0)?8:-4,
                                    color: (this.state.htm.sell_at < 0)?'#FF0000':'#00FF00'}]}
                                    name={(this.state.htm.sell_at < 0)?'sort-down':'sort-up'}/>
                                <Text style={[styles.htmProfileDetailTabBuySellValue,{
                                    color: (this.state.htm.sell_at < 0)?'#FF0000':'#00FF00'}]}>
                                    {Math.abs(this.state.htm.sell_at)+' %'}
                                </Text>
                            </View>
                        </View>
                        <TouchableOpacity style={{paddingLeft: 5}}
                            onPress={()=>this.props.goToChatRoom(this.state.htm.username,
                                (feedback)=>this.setState({htm:null},
                                ()=>this.props.navigation.navigate(feedback?'FeedBack':'ChatRoom')
                            ))}>
                            <Icon style={[styles.headerFAIcon,{
                                    fontSize:40,
                                    color: this.props.nightMode?'#F2F2F2':'#333',
                                }]}
                                name='comments'/>
                        </TouchableOpacity>
                    </TouchableOpacity>:null
                }
                {this.state.showFilter?<View style={styles.htmFilter}>
                    <Icon style={styles.htmFilterArrow} name='sort-up'/>
                    <View style={styles.htmFilterContent}>
                        <View style={styles.htmFilterRow}>
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
                        <View style={styles.htmFilterRow}>
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
                        <View style={styles.htmFilterRow}>
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
                        <View style={styles.htmFilterRow}>
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
                        <View style={[styles.htmFilterRow, {
                            flexDirection: 'row',
                            alignSelf: 'center',
                            justifyContent: 'space-between',
                            width: 180,
                            marginTop: 10,
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
                    </View>
                </View>:null}
                <Loader show={this.props.loading || this.state.loading} />
            </Container>
        );
    }
}

function mapStateToProps({params}) {
    return {
        loading: params.loading,
        nightMode: params.nightMode,
        position: params.position,
        htms: params.htms || [],
        htmFilter: params.htmFilter || null,
        htmProfile: params.htmProfile,
        balances: params.balances,
        fiat_currency: params.fiat_currency,
        location_permission: params.location_permission || false,
        location_error_code: params.location_error_code || 0
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HTMListingMap);
