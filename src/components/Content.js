import React, { Component } from 'react';
import {
    StyleSheet,
    Platform,
    ScrollView
} from 'react-native';
export default class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <ScrollView
                bounces={this.props.bounces}
                style={[styles.content,this.props.style,!!this.props.hasFooter && {marginBottom: 60}]}
                contentContainerStyle={[this.props.contentContainerStyle]} >
                {this.props.children}
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    content:{
        flex:1,
        backgroundColor:'#FCFCFC',
        width: '100%',
        ...Platform.select({
            ios: {
                marginTop: 77,
            },
            android: {
                marginTop: 55,
            },
        }),
    }
});
