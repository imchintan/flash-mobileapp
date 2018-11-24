import PropTypes from 'prop-types';
import React from 'react';
import {
  View,
  Linking,
  Platform,
  StyleSheet,
  TouchableOpacity,
  ViewPropTypes,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default class CustomView extends React.Component {
  render() {
    if (this.props.currentMessage.location) {
      return (
        <TouchableOpacity style={[styles.container, this.props.containerStyle]} onPress={() => {
          const url = Platform.select({
            ios: `http://maps.apple.com/?ll=${this.props.currentMessage.location.latitude},${this.props.currentMessage.location.longitude}`,
            android: `http://maps.google.com/?q=${this.props.currentMessage.location.latitude},${this.props.currentMessage.location.longitude}`
          });
          Linking.canOpenURL(url).then(supported => {
            if (supported) {
              return Linking.openURL(url);
            }
          }).catch(err => {
            console.error('An error occurred', err);
          });
        }}>
          <MapView
            style={[styles.mapView, this.props.mapViewStyle]}
            region={{
              latitude: this.props.currentMessage.location.latitude,
              longitude: this.props.currentMessage.location.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            scrollEnabled={false}
            zoomEnabled={false}
            liteMode={true}
          >
              <Marker
                  key={'_map_pin_location'}
                  coordinate={{
                      latitude: this.props.currentMessage.location.latitude,
                      longitude: this.props.currentMessage.location.longitude,
                  }}/>
          </MapView>
          <View style={[styles.mapViewBorder,
              this.props.user._id !== this.props.currentMessage.user._id &&
              { borderColor: '#f0f0f0' }]} />
        </TouchableOpacity>
      );
    }
    return null;
  }
}

const styles = StyleSheet.create({
  container: {
  },
  mapView: {
    width: 150,
    height: 100,
    borderRadius: 13,
    margin: 3,
  },
  mapViewBorder:{
    position: 'absolute',
    width: 156,
    height: 106,
    borderRadius: 10,
    borderColor: '#0084ff',
    borderWidth: 3,
  }
});

CustomView.defaultProps = {
  currentMessage: {},
  containerStyle: {},
  mapViewStyle: {},
};

CustomView.propTypes = {
  currentMessage: PropTypes.object,
  containerStyle: ViewPropTypes.style,
  mapViewStyle: ViewPropTypes.style,
};
