import React, { Component } from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import Text from './../Text';
export default class HeaderTitle extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View style={[styles.headerTitle,this.props.style]}><Text numberOfLines={1} style={[styles.headerTitleText,this.props.textstyle]}>{this.props.children}</Text></View>
        )
    }
}

const styles = StyleSheet.create({
    headerTitle:{
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '60%',
        height:'100%',
        position: 'absolute',
        left: '20%'
    },
    headerTitleText:{
        fontSize: 22,
        fontWeight: '500',
        color: '#FFFFFF'
    },
});
