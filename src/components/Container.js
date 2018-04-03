import React, { Component } from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
export default class Container extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View style={[styles.container,this.props.style]} >
                {this.props.children}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    }
});
