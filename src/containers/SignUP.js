/**
 * SignUP Container
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

    componentDidMount(){
        this.isMount = true;
        BackHandler.addEventListener('hardwareBackPress', this.backHandler.bind(this));
    }

    componentWillUnmount(){
        this.isMount = false;
        BackHandler.removeEventListener('hardwareBackPress', this.backHandler.bind(this));
    }

    backHandler(){
        this.props.navigation.goBack();
        return this.isMount
    }

    getInjectScript(){
        return `
          (function ready() {
              setTimeout(()=>{
                  if(!!window.signup) return ;
                  window.signup = true;
                  showSignUp();
                  $("#header").remove();
                  $('#notify-check').remove();
                  $('.col-lg-12.login-form').remove();
                  $(".about-flash-section.page-section").remove();
                  $('#social-forum').remove();
                  $('#wallet').remove();
                  $('#footer').remove();
                  $(".back-login").remove();
                  $(".col-lg-4.login-form-container").css({
                    'margin-top': '-25px',
                    'padding-bottom': '5px',
                    'padding-top': '15px'
                  });
                  $('.row.clearfix > div.col-lg-4:first').remove();
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
                    <HeaderTitle>Create Wallet</HeaderTitle>
                </Header>
                <WebView
                    injectedJavaScript={this.getInjectScript()}
                    onLoadEnd={()=>setTimeout(()=>this.setState({loading:false}),1500)}
                    onError={(e)=>console.log(e)}
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
