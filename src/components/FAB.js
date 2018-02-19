import React, { Component } from 'react';
import {
    StyleSheet,
    Platform,
    TouchableOpacity,
    Text
} from 'react-native';
export default class FAB extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress || null} activeOpacity={0.5} style={[styles.btn , this.props.style]}>
                <Text style={[styles.btnText, this.props.textstyle]}>+</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    btn:{
        width: 70,
        height: 70,
        borderRadius: 35,
        position: 'absolute',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2A3263',
        bottom: 0,
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
        bottom: 25,
    },
    btnText:{
        fontSize: 35,
        bottom: 2,
        color: '#FFFFFF',
    },
});
