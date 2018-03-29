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
    Loader
} from '@components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '@actions';

const styles = require("@styles/app");
const url = 'https://wallet.flashcoin.io/index.html';

class SignUP extends Component<{}> {

    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
    }

    componentWillMount(){
        BackHandler.addEventListener('hardwareBackPress', this.backHandler);
    }

    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', this.backHandler);
    }

    backHandler=()=>{
        return this.props.navigation.goBack();
    }

    getInjectScript(){
        return `
          (function ready() {
            $("body").css('cssText','background-color:#191714 !important;background:#191714;');
            showSignUp();
            $(".col-xs-12.col-sm-5.logo").remove();
            $(".download-flash-link").remove();
            $(".back-login").remove();
            $("#content-slide1").css({'padding-bottom':'150px','padding-top':'50px'});
            $(".content-su.row").css('background','#191714');
            $("#create-account-btn> a.btn.btn-primary").css({'background':'#E0AE27',
                'border': 0,
                'padding': '10px',
                'border-radius': '25px',
                'height': '50px',
                'width': '200px',
                'color': '#000000',
                'font-weight': '400',
                'font-size': '22px',
            });
          })();
        `
    }

    render() {
        return (
            <Container>
                <Header>
                    <HeaderLeft>
                        <Icon onPress={()=>this.props.navigation.goBack()} style={styles.headerBackIcon} name='angle-left' />
                    </HeaderLeft>
                    <HeaderTitle>Create Wallet</HeaderTitle>
                </Header>
                <WebView
                    injectedJavaScript={this.getInjectScript()}
                    onLoadEnd={()=>setTimeout(()=>this.setState({loading:false}),1500)}
                    style={styles.webViewCreateWallet}
                    source={{uri: url}}
                />
                <Loader style={{backgroundColor: '#191714'}} show={this.state.loading} />
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUP);
