import React, { Component } from 'react';
import {
    StyleSheet,
    Platform,
    ScrollView
} from 'react-native';
import PropTypes from "prop-types";

export default class Content extends Component {

    static defaultProps = {
        hasHeader: true,
        showsVerticalScrollIndicator: false
    }

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        let _style = [styles.content];
        if(!!this.props.hasFooter){ _style.push({marginBottom: 60})}
        if(!this.props.hasHeader){ _style.push({marginTop: 0})}

        return (
            <ScrollView
                automaticallyAdjustContentInsets={false}
                ref={c => (this._root = c)}
				{...this.props}
                style={[_style,this.props.style]} />
        )
    }
}

Content.propTypes = {
	...ScrollView.propTypes,
	style: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
	hasHeader: PropTypes.bool,
	hasFooter: PropTypes.bool,
};


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
