/**
 * Merchant Listing Map Container
 */

import React, {Component} from 'react';
import {
    View,
    TouchableOpacity,
    Platform,
    Linking,
    Dimensions,
    PermissionsAndroid,
    Image
} from 'react-native';
import {
    Container,
    Header,
    HeaderLeft,
    HeaderTitle,
    Text,
    Icon,
    Button,
    Loader,
} from '@components';
import { Marker } from 'react-native-maps';
import MapView from 'react-native-map-clustering';
import AndroidOpenSettings from 'react-native-android-open-settings'

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ActionCreators} from '@actions';

import * as utils from '@lib/utils';

const { width } = Dimensions.get('window');

const mapPin = __DEV__?require('@images/map-pin-debug.png'):require('@images/map-pin.png');

class HTMListingMap extends Component < {} > {

    static navigationOptions = {
        header: null,
        gesturesEnabled: true,
    }

    constructor(props) {
        super(props);
        this.state = {
            htmMerchant:null,
            loading: true,
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
                    location_error_code: 3
                }),500);
            } else {
                this.props.getCurrentPosition();
            }
        } catch (err) {
            console.log(err);
            this.props.customAction({lockApp:false});
            setTimeout(()=>this.props.customAction({lockApp:false}),500);
        }
    }

    render() {
        const styles = (this.props.nightMode?require('@styles/nightMode/htm'):require('@styles/htm'));
        return (
            <Container>
                <Header>
                    <HeaderLeft>
                        <TouchableOpacity>
                            <Icon onPress={() => this.props.navigation.goBack()}
                            style={styles.headerBackIcon} name='angle-left'/>
                        </TouchableOpacity>
                    </HeaderLeft>
                    <HeaderTitle>Near by HTM</HeaderTitle>
                </Header>
                {!this.props.position && this.props.location_permission
                    && this.props.location_error_code == 3?
                    <View style={styles.htmMapLocationErrorNote}>
                        <Text style={styles.htmMapLocationErrorNoteText}>
                            {"We couldn't find your location may be because of poor connectivity"}
                        </Text>
                        <Button value={'Try again'}
                            onPress={()=>{
                                this.setState({loading: true});
                                this.props.getCurrentPosition();
                                setTimeout(()=>this.mount && this.setState({loading: false}),2000);
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
                                    setTimeout(()=>this.props.getCurrentPosition(),2000);
                                }
                                setTimeout(()=>this.mount && this.setState({loading: false}),2000);
                            }}/>
                    </View>:null
                }
                {!this.props.position && !this.props.location_permission?
                    <View style={styles.htmMapLocationErrorNote}>
                        <Text style={styles.htmMapLocationErrorNoteText}>
                            {"It seems you didn't allow Location permission to FLASH App. please allow it to find nearby HTMs"}
                        </Text>
                        <Button value={'Go to setting'}
                            onPress={()=>{
                                if(Platform.OS === 'ios')
                                    Linking.openURL('app-settings:');
                                else
                                    AndroidOpenSettings.appDetailsSettings();
                            }}/>
                    </View>:null
                }
                {this.props.position?<MapView
                    style={{
                        flex:1,
                        width:'100%',
                        marginTop:55,
                    }}
                    clusterColor = '#E0AE27'
                    clusterTextColor = '#191714'
                    clusterBorderColor = '#191714'
                    clusterBorderWidth = {0}
                    customMapStyle={
                        [{"elementType": "geometry","stylers": [{"color": "#212121"}]},
                         {"elementType": "labels.icon","stylers": [{"visibility": "off"}]},
                         {"elementType": "labels.text.fill","stylers": [{"color": "#757575"}]},
                         {"elementType": "labels.text.stroke","stylers": [{"color": "#212121"}]},
                         {"featureType": "administrative",
                            "elementType": "geometry","stylers": [{"color": "#757575"}]},
                         {"featureType": "administrative.country",
                            "elementType": "labels.text.fill","stylers": [{"color": "#9e9e9e"}]},
                         {"featureType": "administrative.land_parcel","stylers": [{"visibility": "off"}]},
                         {"featureType": "administrative.locality",
                            "elementType": "labels.text.fill","stylers": [{"color": "#bdbdbd"}]},
                         {"featureType": "poi",
                            "elementType": "labels.text.fill","stylers": [{"color": "#757575"}]},
                         {"featureType": "poi.park",
                            "elementType": "geometry","stylers": [{"color": "#181818"}]},
                         {"featureType": "poi.park",
                            "elementType": "labels.text.fill","stylers": [{"color": "#616161"}]},
                         {"featureType": "poi.park",
                            "elementType": "labels.text.stroke","stylers": [{"color": "#1b1b1b"}]},
                         {"featureType": "road",
                            "elementType": "geometry.fill","stylers": [{"color": "#2c2c2c"}]},
                         {"featureType": "road",
                            "elementType": "labels.text.fill","stylers": [{"color": "#8a8a8a"}]},
                         {"featureType": "road.arterial",
                            "elementType": "geometry","stylers": [{"color": "#373737"}]},
                         {"featureType": "road.highway",
                            "elementType": "geometry","stylers": [{"color": "#3c3c3c"}]},
                         {"featureType": "road.highway.controlled_access",
                            "elementType": "geometry","stylers": [{"color": "#4e4e4e"}]},
                         {"featureType": "road.local",
                            "elementType": "labels.text.fill","stylers": [{"color": "#616161"}]},
                         {"featureType": "transit",
                            "elementType": "labels.text.fill","stylers": [{"color": "#757575"}]},
                         {"featureType": "water",
                            "elementType": "geometry","stylers": [{"color": "#000000"}]},
                         {"featureType": "water",
                            "elementType": "labels.text.fill","stylers": [{"color": "#3d3d3d"}]}]
                    }
                    showsUserLocation={true}
                    followsUserLocation={true}
                    showsMyLocationButton={true}
                    region={{
                        latitude: this.props.position.latitude,
                        longitude: this.props.position.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}>
                    {this.props.htmMerchants.map((htmMerchant,index) =>
                        <Marker
                            key={'_map_pin_'+htmMerchant.latitude+'_'+htmMerchant.longitude}
                            coordinate={htmMerchant}
                            onPress={()=>this.setState({htmMerchant})}
                            image={mapPin}/>
                    )}
                </MapView>:null}
                {this.state.htmMerchant?
                    <View style={{
                        width: width-40,
                        position: 'absolute',
                        bottom: 20,
                        backgroundColor: '#FFFFFF',
                        flexDirection: 'row',
                        borderRadius: 5,
                        alignItems: 'center',
                        padding: 10,
                    }}>
                        <Image style={{
                                width: 50,
                                height: 50,
                                borderRadius: 25,
                            }}
                            source={{uri: this.state.htmMerchant.profile_pic_url}}/>
                        <View style={{
                            marginLeft: 15,
                            width: width - 180,
                        }}>
                            <Text style={{
                                fontSize: 16,
                                color: '#333333',
                            }}>{this.state.htmMerchant.display_name + ' ('+this.state.htmMerchant.distance+' km)'}</Text>
                            <Text style={{
                                fontSize: 13,
                                color: '#666666',
                            }}>Buying @
                                <Text style={{
                                    fontSize: 14,
                                    color: (this.state.htmMerchant.want_to_buy < 0)?'red':'green'
                                }}>{' '+utils.getCurrencySymbol(this.props.fiat_currency) + ' ' +
                                    (this.props.balance.per_value *
                                    (1+(this.state.htmMerchant.want_to_buy/100))).toFixed(3)}
                                </Text> / FLASH
                            </Text>
                            <Text style={{
                                fontSize: 13,
                                color: '#666666',
                            }}>Selling @
                                <Text style={{
                                    fontSize: 14,
                                    color: (this.state.htmMerchant.want_to_sell < 0)?'red':'green'
                                }}>{'  '+utils.getCurrencySymbol(this.props.fiat_currency) + ' '+
                                    (this.props.balance.per_value *
                                    (1+(this.state.htmMerchant.want_to_sell/100))).toFixed(3)}
                                </Text> / FLASH
                            </Text>
                        </View>
                        <TouchableOpacity style={{paddingLeft: 5}}
                            onPress={()=>this.props.navigation.navigate('ChatRoom', this.state.htmMerchant)}>
                            <Icon style={[styles.headerFAIcon,{
                                    fontSize:40,
                                    color: '#333',
                                }]}
                                name='comments'/>
                        </TouchableOpacity>
                    </View>:null
                }
                <Loader show={this.props.loading || this.state.loading} />
            </Container>
        );
    }
}

function mapStateToProps({params}) {
    return {
        loader: params.loading,
        nightMode: params.nightMode,
        position: params.position,
        htmMerchants: params.htmMerchants || [],
        balance: params.balances[0],
        fiat_currency: params.fiat_currency,
        location_permission: params.location_permission || false,
        location_error_code: params.location_error_code || 0
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HTMListingMap);
