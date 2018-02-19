import React, { Component } from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
export default class HeaderLeft extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View style={[styles.headerLeft,this.props.style]}>{this.props.children}</View>
        )
    }
}

const styles = StyleSheet.create({
    headerLeft:{
        paddingLeft: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '20%',
        height:'100%',
        position: 'absolute',
        left:0,
    }
});
