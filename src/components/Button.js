import React, { Component } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text
} from 'react-native';
export default class Button extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress || null} activeOpacity={0.5} style={[styles.btn , this.props.style]}>
                <Text style={[styles.btnText, this.props.textstyle]}>{this.props.value}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    btn:{
        backgroundColor: '#00AFFD',
        alignSelf: 'center',
        borderRadius: 5,
        paddingHorizontal: 30,
        paddingVertical: 10,
    },
    btnText:{
        fontSize: 20,
        color: '#FFFFFF',
    },
});
