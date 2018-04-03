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
const url = 'https://wallet.flashcoin.io/home.html#submit_email';

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
            setTimeout(()=>{
                $(".form-common.form-submit-email").css('margin-top','60px');
                $("a.pull-left").remove();
                $("button.btn.btn-primary").css({'background':'#E0AE27',
                    'border': 0,
                    'padding': '10px',
                    'margin-top': '10px',
                    'border-radius': '25px',
                    'height': '50px',
                    'width': '150px',
                    'color': '#000000',
                    'font-weight': '400',
                    'font-size': '22px',
                });
                $("button.btn.btn-primary").parent().css('cssText','text-align: center !important');
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
                    <HeaderTitle>Forgot Password</HeaderTitle>
                </Header>
                <WebView
                    injectedJavaScript={this.getInjectScript()}
                    onLoadEnd={()=>setTimeout(()=>this.setState({loading:false}),1500)}
                    onNavigationStateChange={(e)=>{
                        if(e && e.url && e.url != url)
                            this.props.navigation.goBack()
                    }}
                    style={styles.webViewFP}
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
