import React, { Component } from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
export default class HeaderRight extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View style={[styles.headerRight,this.props.style]}>{this.props.children}</View>
        )
    }
}

const styles = StyleSheet.create({
    headerRight:{
        paddingRight: 10,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '20%',
        height:'100%',
        position: 'absolute',
        right:0
    }
});
