import React, { Component } from 'react';
import {
    StyleSheet,
    Platform,
    View,
    ViewPropTypes,
} from 'react-native';
import PropTypes from "prop-types";

export default class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View style={styles.header}>
                {Platform.OS === 'ios'?<View style={styles.statusBar} />:null}
                <View ref={c => (this._root = c)}
                    {...this.props}
                    style={[styles.headerBox,this.props.style]} />
            </View>
        )
    }
}

Header.propTypes = {
	...ViewPropTypes,
	style: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
};

const styles = StyleSheet.create({
    header:{
        width: '100%',
        backgroundColor: '#191714',
        ...Platform.select({
            ios: {
                shadowColor: 'rgba(0,0,0, 0.5)',
                shadowOffset: { height: 1, width: 0 },
                shadowOpacity: 0.7,
            },
            android: {
                elevation: 10,
            },
        }),
        position: 'absolute',
        top :0,
        zIndex: 99999
    },
    headerBox:{
        flexDirection: 'row',
        width: '100%',
        height: 55,
    },
    statusBar:{
        width: '100%',
        height: 22,
        backgroundColor: '#000000',
    }
});
