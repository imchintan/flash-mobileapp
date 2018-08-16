import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text as RNText } from "react-native";

RNText.defaultProps.allowFontScaling=false

export default class Text extends Component {
	render() {
		return (
			<RNText ref={c => (this._root = c)} {...this.props} style={[{fontFamily: 'Microsoft Tai Le'},this.props.style]}>
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
