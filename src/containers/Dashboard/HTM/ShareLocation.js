/**
 * Share location Container
 */

import React, {Component} from 'react';
import {
    View,
    TouchableOpacity,
    Platform,
    Linking,
    PermissionsAndroid,
    BackHandler
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
    Toast
} from '@components';
import MapView, { Marker } from 'react-native-maps';
import AndroidOpenSettings from 'react-native-android-open-settings'

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ActionCreators} from '@actions';

import * as constants from '@src/constants';

const mapPin = __DEV__?require('@images/map-pin-debug.png'):
    require('@images/map-pin.png');

class ShareLocation extends Component < {} > {

    static navigationOptions = {
        header: null,
        gesturesEnabled: true,
    }

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        };
    }

    componentDidMount(){
        this.mount = true;
        this.checkLocationPermission();
        setTimeout(()=>this.mount &&
            this.setState({loading:false}),200);

        BackHandler.addEventListener('hardwareBackPress', this.backHandler.bind(this));
    }

    componentWillUnmount(){
        this.mount = false;
        BackHandler.removeEventListener('hardwareBackPress', this.backHandler.bind(this));
    }

    backHandler(){
        this.props.navigation.goBack();
        return this.mount;

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

    render() {
        const styles = (this.props.nightMode?require('@styles/nightMode/htm'):require('@styles/htm'));
        return(
            <Container>
                <Header>
                    <HeaderLeft>
                        <TouchableOpacity>
                            <Icon onPress={() => this.backHandler.bind(this)}
                            style={styles.headerBackIcon} name='angle-left'/>
                        </TouchableOpacity>
                    </HeaderLeft>
                    <HeaderTitle>Share Location</HeaderTitle>
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
                                    this.backHandler();
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
                                    this.backHandler();
                            }}/>
                    </View>:null
                }
                {this.props.position?<MapView
                    style={styles.htmMap}
                    onMapReady={()=>Toast.showTop("Hold and move PIN to share other than your current location",{
                        duration: 10000
                    })}
                    clusterColor = '#E0AE27'
                    clusterTextColor = '#191714'
                    clusterBorderColor = '#191714'
                    clusterBorderWidth = {0}
                    customMapStyle={constants.CUSTOM_MAP_STYLE}
                    showsUserLocation={true}
                    followsUserLocation={true}
                    showsMyLocationButton={true}
                    onRegionChangeComplete={(region)=>{
                        if(this.state.region === region || Platform.OS !== 'ios') return;
                        setTimeout(()=>this.setState({region}),100);
                    }}
                    initialRegion={{
                        latitude: this.props.position.latitude,
                        longitude: this.props.position.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    region={this.state.region || {
                        latitude: this.props.position.latitude,
                        longitude: this.props.position.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}>
                    <Marker
                        draggable={true}
                        onDragEnd={(e)=>this.setState({location:e.nativeEvent.coordinate})}
                        key={'_map_pin_current_location'}
                        coordinate={{
                            latitude: this.props.position.latitude,
                            longitude: this.props.position.longitude
                        }}
                        image={mapPin}/>
                </MapView>:null}
                {this.props.position && <Button
                    onPress={()=>{
                        this.setState({loading:true});
                        let cb = (success)=>{
                            if(success) this.backHandler();
                            else this.setState({loading:false});
                        };
                        if(this.state.location)
                            this.props.sendChatMessage(null,this.state.location,cb)
                        else
                            this.props.sendChatMessage(null,{
                                latitude: this.props.position.latitude,
                                longitude: this.props.position.longitude
                            },cb)
                    }}
                    style={{position: 'absolute', bottom: 20}}
                    value={'Share Location'}/>}
                <Loader show={this.props.loading || this.state.loading} />
            </Container>
        )
    }
}

function mapStateToProps({params}) {
    return {
        loading: params.loading,
        nightMode: params.nightMode,
        position: params.position,
        location_permission: params.location_permission || false,
        location_error_code: params.location_error_code || 0,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ShareLocation);
