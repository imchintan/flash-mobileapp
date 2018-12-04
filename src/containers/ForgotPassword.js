/**
 * Forgot Password Container
 */

import React, { Component } from 'react';
import {
    BackHandler,
    WebView
} from 'react-native';
import {
    Container,
    Header,
    HeaderLeft,
    HeaderTitle,
    Icon,
    Loader,
} from '@components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '@actions';

const styles = require("@styles/app");
const url = 'https://walletstg.flashcoin.io/reset-pass.html';

class ForgotPassword extends Component<{}> {

    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
    }

    componentDidMount(){
        this.isMount=true;
        BackHandler.addEventListener('hardwareBackPress', this.backHandler.bind(this));
    }

    componentWillUnmount(){
        this.isMount=false;
        BackHandler.removeEventListener('hardwareBackPress', this.backHandler.bind(this));
    }

    backHandler(){
        this.props.navigation.goBack();
        return this.isMount;
    }

    getInjectScript(){
        return `
          (function ready() {
            $("body").css('cssText','background-color:#191714 !important;background:#191714;');
            setTimeout(()=>{
                $("#header").remove();
                $('#footer .container:first').remove();
                $(".col-lg-4.login-form-container").css({
                  'margin-top': '-50px',
                  'padding-top': '30px',
                });
            },1000);
          })();
        `
    }

    render() {
        return (
            <Container>
                <Header>
                    <HeaderLeft>
                        <Icon onPress={this.backHandler.bind(this)} style={styles.headerBackIcon} name='angle-left' />
                    </HeaderLeft>
                    <HeaderTitle>Forgot Password</HeaderTitle>
                </Header>
                <WebView
                    injectedJavaScript={this.getInjectScript()}
                    onLoadEnd={()=>setTimeout(()=>this.setState({loading:false}),1500)}
                    onNavigationStateChange={(e)=>{
                        if(e && e.url && e.url != url)
                            this.props.navigation.goBack()
                    }}
                    style={styles.webViewCreateWallet}
                    source={{uri: url}}
                />
                <Loader style={{backgroundColor: '#191714'}} show={this.state.loading} />
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {
        loading: state.params.loading,
        isLoggedIn: state.params.isLoggedIn,
        errorMsg: state.params.errorMsg || null,
        successMsg: state.params.successMsg || null
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
