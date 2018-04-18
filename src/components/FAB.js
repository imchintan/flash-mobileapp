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
                <Text ref={c => (this._root = c)}
                    {...this.props} style={[styles.btnText, this.props.textstyle]} />
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    btn:{
        width: 50,
        height: 50,
        borderRadius: 25,
        position: 'absolute',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00AFFD',
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
        fontSize: 14,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
});
