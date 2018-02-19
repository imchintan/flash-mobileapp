import React, { Component } from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
export default class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View style={[styles.footer,this.props.style]}>{this.props.children}</View>
        )
    }
}

const styles = StyleSheet.create({
    footer:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
        height: 60,
        width: '100%',
        elevation: 10,
        position:'absolute',
        bottom :0,
        zIndex: 99999
    }
});
