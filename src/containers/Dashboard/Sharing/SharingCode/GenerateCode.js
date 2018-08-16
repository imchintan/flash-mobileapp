/**
 * Generate Share Code Container Tab
 */

import React, { Component } from 'react';
import {
    TextInput,
} from 'react-native';
import {
    Container,
    Content,
    Loader,
    Button,
    Toast,
    Text,
    Footer
} from '@components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '@actions';
import * as Validation from '@lib/validation';
import * as utils from '@lib/utils';

class GenerateCode extends Component<{}> {

    constructor(props) {
        super(props);
        this.state = {
            sharing_fee: ''
        };
    }

    addAddresses(){
        if(!this.validateSharePercent()) return;
        this.props.navigation.navigate('AddAddresses',{sharing_fee:Number(this.state.sharing_fee)});
    }

    validateSharePercent(){
        this.setState({error:false});
        let res = Validation.sharePercent(this.state.sharing_fee);
        if(!res.success){
            this.setState({error:true});
            Toast.errorTop(res.message);
        }else{
            this.setState({sharing_fee:res.value});
        }
        return res.success;
    }

    render() {
        const styles = (this.props.nightMode?require('@styles/nightMode/sharing'):require('@styles/sharing'));
        return (
            <Container>
                <Content hasHeader={false} hashFooter={true} style={styles.content}>
                    <Text style={styles.payoutCodeNote}>
                        This share percentage associated with
                        My {utils.getCurrencyUnit(this.props.currency_type)} share
                        code denotes the percentage of transacted {utils.
                        getCurrencyUnitUpcase(this.props.currency_type)} which
                        will be deducted along with transacted amount while
                        your {utils.getCurrencyUnit(this.props.currency_type)} share
                        code is used.
                    </Text>
                    <TextInput
                        underlineColorAndroid='transparent'
                        style={[styles.payoutCodeInput, !!this.state.error && styles.payoutCodeInputError]}
                        placeholder={'Share Percent'}
                        keyboardType='numeric'
                        returnKeyType='next'
                        onSubmitEditing={this.addAddresses.bind(this)}
                        onBlur={this.validateSharePercent.bind(this)}
                        onChangeText={(sharing_fee)=>this.setState({sharing_fee})}
                        value={this.state.payoutCode}/>
                </Content>
                <Footer>
                    <Button value={'Next'}
                        style={{width:'100%',
                            height: '100%',
                            borderRadius: 0,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        textstyle={{
                            fontSize: 24
                        }}
                        onPress={this.addAddresses.bind(this)} />
                </Footer>
                <Loader show={this.props.loading} />
            </Container>
        );
    }
}

function mapStateToProps({params}) {
    return {
        loading: params.loading || false,
        profile: params.profile || null,
        currency_type: params.currency_type,
        nightMode: params.nightMode,
    };
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GenerateCode);
