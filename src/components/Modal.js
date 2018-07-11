import React, { Component } from "react";
import {
	Modal as RNModal,
	AppState,
} from "react-native";
import PropTypes from "prop-types";

export default class Modal extends Component {

	constructor(props) {
        super(props);
        this.state = {
            appState: 'active',
        };
    }

    componentDidMount(){
		this.isMount=true;
        if(this.props.dismissWhenBackground)
			AppState.addEventListener('change', this._handleAppStateChange.bind(this));
    }

    componentWillUnmount(){
		this.isMount=false;
        if(this.props.dismissWhenBackground)
			AppState.removeEventListener('change', this._handleAppStateChange.bind(this));
    }

    _handleAppStateChange(nextAppState){
		if(!this.isMount) return ;
        if (!(this.state.appState.match(/inactive|background/) && nextAppState === 'active')){
            if(this._root.props && this._root.props.onRequestClose)this._root.props.onRequestClose();
        }
		this.setState({appState: nextAppState});
    }

	render() {
		return (
			<RNModal ref={c => (this._root = c)} {...this.props} />
		);
	}
}

Modal.propTypes = {
	...RNModal.propTypes,
	dismissWhenBackground: PropTypes.bool
};

Modal.defaultProps = {
	...RNModal.defaultProps,
	dismissWhenBackground: true
};
