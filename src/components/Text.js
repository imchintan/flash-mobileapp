import React, { Component } from "react";
import _ from 'lodash';
import PropTypes from "prop-types";
import { Text as RNText, StyleSheet} from "react-native";

RNText.defaultProps.allowFontScaling=false

export default class Text extends Component {

	render() {
		let { style } = this.props;
		if (style instanceof Array) {
	      style = _.map(style, (styleObject) => StyleSheet.flatten(styleObject || {}));
	      style = Object.assign({}, ...style);
	    } else {
	      style = StyleSheet.flatten(this.props.style || {});
	    }
		if(typeof style.fontWeight === 'undefined' &&
			typeof style.fontFamily === 'undefined'){
			style.fontFamily = 'Microsoft Tai Le';
		}
		return (
			<RNText ref={c => (this._root = c)} {...this.props} style={style}>
				{this.props.children}
			</RNText>
		);
	}
}

Text.propTypes = {
	...RNText.propTypes,
	style: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
};

Text.defaultProps = {
	style: {},
};
