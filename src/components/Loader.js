import React, { Component } from 'react';
import {
    StyleSheet,
    Platform,
    View,
    Text,
    ActivityIndicator,
    ViewPropTypes,
} from 'react-native';
import PropTypes from "prop-types";

export default class Loader extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    static defaultProps = {
        transparent: false,
        style: {},
    }

    render() {
        if(this.props.show)
            return (
                <View {...this.props} style={[styles.container, this.props.style,this.props.transparent && {backgroundColor: 'transparent'}]}>
                    <View style={[styles.loader,this.props.vertical === false && {flexDirection: 'row'}]}>
                        <ActivityIndicator size={this.props.vertical === false?"small":"large"} color="#191714" />
                        {this.props.text?<Text style={[styles.loaderText,this.props.vertical === false && {paddingTop: 0, paddingLeft: 5,}]}>{this.props.text}</Text>:null}
                    </View>
                </View>
            )
        return null;
    }
}

Loader.propTypes = {
	...ViewPropTypes,
	transparent: PropTypes.bool,
};

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0007',
        position: 'absolute',
        top:0, left: 0,
        width: '100%',
        height: '100%',
        zIndex: 100000
    },
    loader:{
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E0AE27',
        borderRadius: 5,
        ...Platform.select({
            ios: {
                shadowColor: 'rgba(0,0,0, 0.7)',
                shadowOffset: { height: 0, width: 0 },
                shadowOpacity: 0.7,
            },
            android: {
                elevation: 20,
            },
        }),
    },
    loaderText:{
        fontSize: 14,
        paddingTop: 5,
        color: '#191714',
    },
});
