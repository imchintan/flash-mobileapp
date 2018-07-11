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

    componentDidMount(){
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
              setTimeout(()=>{
                  if(!!window.signup) return ;
                  window.signup = true;
                  showSignUp();
                  $("#header").remove();
                  $('#social-forum').remove();
                  $('#wallet').remove();
                  $('#footer').remove();
                  $('.page-section.topmargin-sm').remove();
                  $(".col-lg-7.d-none.d-sm-block.textcenter-sm").remove();
                  $(".back-login").remove();
                  $('#gcaptcha > div').css({'margin': '0 auto'});
              },1000);
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
