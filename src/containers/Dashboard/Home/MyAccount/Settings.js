/**
 * Settings Container
 */

import React, { Component } from 'react';
import {
  View,
  Text,
  Dimensions
} from 'react-native';
import {
    Content,
    QRCode
} from '@components';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '@actions';
const { height, width } = Dimensions.get('window');
const styles = require("@styles/myAccount");

class Settings extends Component<{}> {

    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        console.log(this.props.wallet_address);
        return (
            <Content hasHeader={false}>
                <View style={styles.profile}>
                    <View style={styles.profileRow}>
                        <Text style={styles.profileRowLabel}>Wallet Address</Text>
                        <View style={styles.profileRowQRBox}>
                            <QRCode
                                value={'flashcoin:'+this.props.wallet_address}
                                size={width-70}
                                bgColor='#000'
                                fgColor='#fff'/>
                        </View>
                        <View style={[styles.profileRowInputBox,{marginTop: 15}]}>
                            <Text selectable={true} style={[styles.profileRowInput,{fontSize:14, textAlign:'center'}]}>{this.props.wallet_address}</Text>
                        </View>
                    </View>
                </View>
            </Content>
        );
    }
}

function mapStateToProps({params}) {
    return {
        profile: params.profile,
        wallet_address: params.wallet_address || null,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
