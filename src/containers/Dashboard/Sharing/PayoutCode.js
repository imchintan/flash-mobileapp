/**
 * Payout Code Container Tab
 */

import React, { Component } from 'react';
import {
  View,
  TextInput,
} from 'react-native';
import {
    Container,
    Content,
    Loader,
    Button,
    Toast,
    Text
} from '@components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '@actions';
import * as Validation from '@lib/validation';

class PayoutCode extends Component<{}> {

    static navigationOptions = ({ navigation, screenProps }) =>{
        return ({
            title:'Giveaway Code',
        })
    }

    constructor(props) {
        super(props);
        this.state = {
            payoutCode: this.props.payout_code,
        };
    }

    componentWillReceiveProps(nextProps){
        if(nextProps){
            if(nextProps.errorMsg){
                Toast.errorTop(nextProps.errorMsg);
                this.props.resetMessages();
            }
            if(nextProps.payout_code !== this.state.payoutCode){
                this.setState({error:false, payoutCode: nextProps.payout_code})
            }
            if(nextProps.successMsg){
                Toast.successTop(nextProps.successMsg);
                this.props.resetMessages();
            }
        }
    }

    addCode(){
        if(!this.validateCode()) return;
        this.props.addPayoutCode(this.state.payoutCode);
    }

    validateCode(){
        this.setState({error:false});
        let res = Validation.shareCode(this.state.payoutCode);
        if(!res.success){
            this.setState({error:true});
            Toast.errorTop(res.message);
        }
        return res.success;
    }

    render() {
        const styles = (this.props.nightMode?require('@styles/nightMode/sharing'):require('@styles/sharing'));
        return (
            <Container>
                <Content hasHeader={false}>
                    <Text style={styles.payoutCodeNote}>
                        Once you add a Code here. You will be charged extra fee
                        which is  a fixed percent of your transaction amount.
                        This percent is fixed by user whose Giveaway code you
                        are adding. The extra fee is distributed among users
                        whose address is mentioned in this Giveaway code.
                    </Text>
                    <TextInput
                        editable={!this.props.payout_code}
                        underlineColorAndroid='transparent'
                        style={[styles.payoutCodeInput, !!this.state.error && styles.payoutCodeInputError]}
                        placeholder={'Enter Payout Code'}
                        returnKeyType='done'
                        autoCapitalize='characters'
                        keyboardAppearance='dark'
                        onSubmitEditing={this.addCode.bind(this)}
                        onBlur={this.validateCode.bind(this)}
                        onChangeText={(payoutCode)=>this.setState({payoutCode})}
                        value={this.state.payoutCode}/>
                    {this.props.payout_code?<Text style={styles.payoutCodeSharingFee}>
                        Sharing Fee: {this.props.payout_sharing_fee}
                    </Text>:null}
                    {this.props.payout_code_is_locked == 0?
                        <Button value={!this.props.payout_code?'Add Code':'Remove Code'}
                        onPress={()=>{
                            if(!this.props.payout_code) this.addCode();
                            else this.props.removePayoutCode();

                        }} />:null}
                </Content>
                <Loader show={this.props.loading} />
            </Container>
        );
    }
}

function mapStateToProps({params}) {
    return {
        errorMsg: params.errorMsg || null,
        successMsg: params.successMsg || null,
        loading: params.loading || false,
        profile: params.profile || null,
        payout_code: params.payout_code || null,
        payout_code_is_locked: params.payout_code_is_locked || 0,
        payout_sharing_fee: params.payout_sharing_fee || 0,
        nightMode: params.nightMode,
    };
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PayoutCode);
