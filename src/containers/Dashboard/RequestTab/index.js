/**
 * Request Container
 */

import React, { Component } from 'react';
import {
    View,
    Image,
    Text,
    Modal,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import {
    Container,
    Content,
    Header,
    HeaderLeft,
    HeaderTitle,
    HeaderRight,
    Icon,
    Button,
    Toast,
} from '@components';
import moment from 'moment-timezone';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '@actions';

const styles = require("@styles/request");

class RequestTab extends Component<{}> {

    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillReceiveProps(nextProps){
        // if(nextProps){
        //     if(nextProps.errorMsg){
        //         Toast.errorTop(nextProps.errorMsg);
        //     }
        //     if(nextProps.successMsg){
        //         Toast.successTop(nextProps.successMsg);
        //     }
        // }
    }

    render() {
        return (
            <Container>
                <Header>
                    {/*<HeaderLeft>
                        <Icon onPress={()=>this.props.navigation.goBack()} style={styles.headerBackIcon} name='angle-left' />
                    </HeaderLeft>*/}
                    <HeaderTitle>Request</HeaderTitle>
                </Header>
                <Content bounces={false}>

                </Content>
            </Container>
        );
    }
}

function mapStateToProps({params}) {
    return {
        loading: params.loading,
        isLoggedIn: params.isLoggedIn,
        errorMsg: params.errorMsg || null,
        successMsg: params.successMsg || null,
        currencyType: params.currencyType,
        wallet_address: params.wallet_address || null,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestTab);
