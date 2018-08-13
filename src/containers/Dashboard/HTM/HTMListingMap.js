/**
 * Merchant Listing Map Container
 */

import React, {Component} from 'react';
import {
    View,
    TouchableOpacity,
    Platform,
    PermissionsAndroid
} from 'react-native';
import {
    Container,
    Content,
    Header,
    HeaderLeft,
    HeaderRight,
    HeaderTitle,
    Icon,
    Text
} from '@components';
import MapView from 'react-native-maps';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ActionCreators} from '@actions';

class HTMListingMap extends Component < {} > {

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
        if(Platform.OS !== 'ios'){
            this.checkLocationPermission();
        }
    }

    checkLocationPermission = async () =>{
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the location")
            } else {
                console.log("Camera permission denied")
            }
        } catch (err) {
            console.log(err)
        }
    }

    render() {
        const styles = (this.props.nightMode?require('@styles/nightMode/htm'):require('@styles/htm'));
        return (
            <Container>
                <Header>
                    <HeaderLeft>
                        <TouchableOpacity>
                            <Icon onPress={() => this.props.navigation.goBack()} style={styles.headerBackIcon} name='angle-left'/>
                        </TouchableOpacity>
                    </HeaderLeft>
                    <HeaderTitle>Near by HTM</HeaderTitle>
                </Header>
                    {this.props.position?<MapView
                        style={{
                            flex:1,
                            width:'100%',
                            marginTop:55,
                        }}
                        customMapStyle={
                            [
                              {
                                "elementType": "geometry",
                                "stylers": [
                                  {
                                    "color": "#212121"
                                  }
                                ]
                              },
                              {
                                "elementType": "labels.icon",
                                "stylers": [
                                  {
                                    "visibility": "off"
                                  }
                                ]
                              },
                              {
                                "elementType": "labels.text.fill",
                                "stylers": [
                                  {
                                    "color": "#757575"
                                  }
                                ]
                              },
                              {
                                "elementType": "labels.text.stroke",
                                "stylers": [
                                  {
                                    "color": "#212121"
                                  }
                                ]
                              },
                              {
                                "featureType": "administrative",
                                "elementType": "geometry",
                                "stylers": [
                                  {
                                    "color": "#757575"
                                  }
                                ]
                              },
                              {
                                "featureType": "administrative.country",
                                "elementType": "labels.text.fill",
                                "stylers": [
                                  {
                                    "color": "#9e9e9e"
                                  }
                                ]
                              },
                              {
                                "featureType": "administrative.land_parcel",
                                "stylers": [
                                  {
                                    "visibility": "off"
                                  }
                                ]
                              },
                              {
                                "featureType": "administrative.locality",
                                "elementType": "labels.text.fill",
                                "stylers": [
                                  {
                                    "color": "#bdbdbd"
                                  }
                                ]
                              },
                              {
                                "featureType": "poi",
                                "elementType": "labels.text.fill",
                                "stylers": [
                                  {
                                    "color": "#757575"
                                  }
                                ]
                              },
                              {
                                "featureType": "poi.park",
                                "elementType": "geometry",
                                "stylers": [
                                  {
                                    "color": "#181818"
                                  }
                                ]
                              },
                              {
                                "featureType": "poi.park",
                                "elementType": "labels.text.fill",
                                "stylers": [
                                  {
                                    "color": "#616161"
                                  }
                                ]
                              },
                              {
                                "featureType": "poi.park",
                                "elementType": "labels.text.stroke",
                                "stylers": [
                                  {
                                    "color": "#1b1b1b"
                                  }
                                ]
                              },
                              {
                                "featureType": "road",
                                "elementType": "geometry.fill",
                                "stylers": [
                                  {
                                    "color": "#2c2c2c"
                                  }
                                ]
                              },
                              {
                                "featureType": "road",
                                "elementType": "labels.text.fill",
                                "stylers": [
                                  {
                                    "color": "#8a8a8a"
                                  }
                                ]
                              },
                              {
                                "featureType": "road.arterial",
                                "elementType": "geometry",
                                "stylers": [
                                  {
                                    "color": "#373737"
                                  }
                                ]
                              },
                              {
                                "featureType": "road.highway",
                                "elementType": "geometry",
                                "stylers": [
                                  {
                                    "color": "#3c3c3c"
                                  }
                                ]
                              },
                              {
                                "featureType": "road.highway.controlled_access",
                                "elementType": "geometry",
                                "stylers": [
                                  {
                                    "color": "#4e4e4e"
                                  }
                                ]
                              },
                              {
                                "featureType": "road.local",
                                "elementType": "labels.text.fill",
                                "stylers": [
                                  {
                                    "color": "#616161"
                                  }
                                ]
                              },
                              {
                                "featureType": "transit",
                                "elementType": "labels.text.fill",
                                "stylers": [
                                  {
                                    "color": "#757575"
                                  }
                                ]
                              },
                              {
                                "featureType": "water",
                                "elementType": "geometry",
                                "stylers": [
                                  {
                                    "color": "#000000"
                                  }
                                ]
                              },
                              {
                                "featureType": "water",
                                "elementType": "labels.text.fill",
                                "stylers": [
                                  {
                                    "color": "#3d3d3d"
                                  }
                                ]
                              }
                            ]
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
                    </MapView>:<View>
                        <Text>Position not found</Text>
                    </View>}
            </Container>
        );
    }
}

function mapStateToProps({params}) {
    return {
        nightMode: params.nightMode,
        position: params.position,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HTMListingMap);
