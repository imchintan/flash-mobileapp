/**
 * Share Code Container Tab
 */

import React, { Component } from 'react';
import {
    View,
    TextInput,
    TouchableOpacity
} from 'react-native';
import {
    Container,
    Content,
    Loader,
    Button,
    Toast,
    Text,
    Icon,
    Footer
} from '@components';
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '@actions';
import * as Validation from '@lib/validation';
import * as utils from '@lib/utils';

class AddAddresses extends Component<{}> {

    constructor(props) {
        super(props);
        this.state = {
            addresses: [],
            editMode: !!this.props.navigation.state.params.editMode
        };
    }

    componentDidMount(){
        if(!this.state.editMode)
            this.addAddressRow();
        else
            this.initAddresses();
    }

    componentWillReceiveProps(nextProps){
        if(nextProps){
            if(nextProps.errorMsg){
                Toast.errorTop(nextProps.errorMsg);
                this.props.resetMessages();
            }
            if(nextProps.successMsg){
                Toast.successTop(nextProps.successMsg);
                this.props.resetMessages();
            }
            if(nextProps.sharing_code && nextProps.sharing_code != this.props.sharing_code
                    && nextProps.sharing_code.length > 0){
                const resetAction = StackActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({ routeName: 'CodeDetails' })],
                });
                this.props.navigation.dispatch(resetAction);
            }
        }
    }

    initAddresses(){
        let addresses = this.state.addresses;
        this.props.sharing_code.map((add)=>addresses.push({
            index:new Date().getTime()+utils.getSixCharString(),
            isValidAddress: true,
            isValidPer: true,
            address: add.email || add.address,
            publicAddress: add.address,
            percentage: add.percentage,
            label: add.label,
        }))
        this.setState({addresses});
    }

    addAddressRow(){
        if(this.state.addresses.length >= 10) return;
        let addresses = this.state.addresses;
        let index = new Date().getTime();
        addresses.push({
            index,
            isValidAddress: true,
            isValidPer: true,
            address: '',
            publicAddress: '',
            percentage: '',
            label: '',
        });
        this.setState({addresses},()=>this.refs['_addr_'+index].focus());
    }

    removeAddressRow(idx){
        let addresses = this.state.addresses;
        addresses.splice(idx, 1);
        this.setState({addresses});
    }

    addAddressText(address,idx){
        let addresses = this.state.addresses;
        addresses[idx].address = address;
        this.setState({addresses});
    }

    async verifyAddress(idx){
        let addresses = this.state.addresses;
        let add = addresses[idx];
        if(!add.address){
            // Toast.errorTop("Address is invalid!");
            add.isValidAddress=false;
            addresses[idx] = add;
        }else{
            let res = Validation.email(add.address);
            if(res.success){
                add.isValidAddress=true;
                if(this.props.profile.email !== add.address)
                    await this.props.isValidEmailForWallet(add.address, this.props.profile,
                        this.props.currency_type).then(data=>{
                            add.publicAddress = data.address;
                        }).catch((e)=>{
                        add.isValidAddress=false;
                    })
                else
                    add.publicAddress = this.props.wallet_address;
            }else{

                res =Validation.cryptoAddress(add.address, this.props.currency_type);
                if(!res.success){
                    // Toast.errorTop("Address is invalid!");
                    add.isValidAddress=false;
                }else{
                    add.publicAddress = add.address;
                    add.isValidAddress=true;
                }
            }
        }
        if(add.isValidAddress){
            let res = addresses.filter(addr=> addr.index !== add.index &&
                addr.publicAddress == add.publicAddress);
            if(res.length > 0){
                add.publicAddress='';
                add.isValidAddress=false;
                Toast.errorTop("Duplicate address found!");
            }
        }
        addresses[idx] = add;
        this.setState({addresses}
        /*,()=> !add.isValidAddress && this.refs['_addr_'+add.index].focus()*/);
    }

    addAddressPer(percentage,idx){
        let addresses = this.state.addresses;
        addresses[idx].percentage = percentage;
        this.setState({addresses});
    }

    validatePercentage(idx){
        let addresses = this.state.addresses;
        let add = addresses[idx];
        if(!add.percentage){
            // Toast.errorTop("Percentage is invalid!");
            add.isValidPer=false;
            addresses[idx] = add;
        }else{
            let res = Validation.sharePercent(add.percentage);
            if(!res.success){
                // Toast.errorTop("Percentage is invalid!");
                add.isValidPer = false;
                addresses[idx] = add;
            }else{
                add.isValidPer=true;
                addresses[idx] = add;
            }
        }
        this.setState({addresses});
    }

    addAddressLabel(label,idx){
        let addresses = this.state.addresses;
        addresses[idx].label = label;
        this.setState({addresses});
    }

    generateCode(){
        let addresses = this.state.addresses.filter(add =>
            !add.isValidPer || !add.isValidAddress);
        if(addresses.length > 0){
            return Toast.errorTop('Invalid address or percentage.');
        }

        let totalPer = this.state.addresses.reduce((b=0,c)=>
            (isNaN(Number(b.percentage))?b:Number(b.percentage)) + Number(c.percentage));

        if(totalPer !== 100){
            return Toast.errorTop('Sum of all share percent must be 100.');
        }

        addresses = this.state.addresses.map((a,i)=>{
            let b ={};
            b['address_'+(i+1)]= a.address;
            b['percentage_'+(i+1)]= a.percentage;
            b['label_'+(i+1)]= a.label;
            return b;
        });
        if(this.state.editMode)
            this.props.updateSharingCode(this.props.navigation.state.params.sharing_code,
                this.props.navigation.state.params.sharing_fee,addresses);
        else
            this.props.generateSharingCode(this.props.navigation.state.params.sharing_fee,
                addresses);

    }

    render() {
        const styles = (this.props.nightMode?require('@styles/nightMode/sharing'):require('@styles/sharing'));
        return (
            <Container>
                <Content hasHeader={false} hasFooter={true}>
                    <Text style={styles.payoutCodeNote}>
                        Add {utils.getCurrencyUnitUpcase(this.props.currency_type)} addresses
                        you want to share {utils.getCurrencyUnit(this.props.currency_type)} with
                        (you personally, a company, charity, etc). Give to your
                        friends for their Giveaway code and they will share
                        with these addresses.
                    </Text>
                    {this.state.addresses.map((addr,idx) =>
                        <View key={'_address_'+addr.index} style={styles.addAddressTab}>
                            <View style={styles.addAddressRow}>
                                <TextInput
                                    ref={'_addr_'+addr.index}
                                    style={[styles.addAddressInput, !addr.isValidAddress && styles.payoutCodeInputError]}
                                    underlineColorAndroid='transparent'
                                    placeholder={'Enter Flash Address'}
                                    onChangeText={address=>this.addAddressText(address,idx)}
                                    onSubmitEditing={()=>this.refs['_per_'+addr.index].focus()}
                                    onBlur={()=>this.verifyAddress(idx)}
                                    returnKeyType='next'
                                    value={addr.address}
                                />
                            </View>
                            <View style={styles.addAddressRow}>
                                <TextInput
                                    ref={'_per_'+addr.index}
                                    style={[styles.addAddressPerInput, !addr.isValidPer && styles.payoutCodeInputError]}
                                    underlineColorAndroid='transparent'
                                    placeholder='Percentage(%)'
                                    onChangeText={percentage=>this.addAddressPer(percentage,idx)}
                                    onSubmitEditing={()=>this.refs['_remark_'+addr.index].focus()}
                                    onBlur={()=>this.validatePercentage(idx)}
                                    keyboardType='numeric'
                                    returnKeyType='next'
                                    value={addr.percentage}
                                />
                                <TextInput
                                    ref={'_remark_'+addr.index}
                                    style={styles.addAddressRemarkInput}
                                    underlineColorAndroid='transparent'
                                    placeholder={'Enter Remark'}
                                    onChangeText={label=>this.addAddressLabel(label,idx)}
                                    maxLength={50}
                                    returnKeyType='done'
                                    value={addr.label}
                                />
                                {this.state.addresses.length > 1?
                                <TouchableOpacity style={styles.addAddressRemoveBtn}
                                    onPress={()=>this.removeAddressRow(idx)}>
                                    <Icon style={styles.addAddressRemoveBtnIcon} name={'trash'}/>
                                </TouchableOpacity>: <TouchableOpacity activeOpacity={1} style={styles.addAddressRemoveDisBtn}>
                                    <Icon style={styles.addAddressRemoveDisBtnIcon} name={'trash'}/>
                                </TouchableOpacity>}
                            </View>
                        </View>
                    )}
                    <Button value={'Add Row'}
                        style={{
                            marginBottom:20,
                            backgroundColor: '#191714'
                        }}
                        textstyle={{
                            color: '#E0AE27'
                        }}
                        onPress={this.addAddressRow.bind(this)} />
                </Content>
                <Footer>
                    <Button value={'Back'}
                        style={{
                            width:'50%',
                            height: '100%',
                            borderRadius: 0,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#fff'
                        }}
                        textstyle={{
                            fontSize: 24
                        }}
                        onPress={()=>this.props.navigation.goBack()}/>
                    <Button value={this.state.editMode?'Update':'Generate'}
                        style={{
                            width:'50%',
                            height: '100%',
                            borderRadius: 0,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        textstyle={{
                            fontSize: 24,
                        }}
                        onPress={this.generateCode.bind(this)}/>
                </Footer>
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
        currency_type: params.currency_type,
        sharing_code: params.sharing_code || [],
        wallet_address: params.wallet_address,
        nightMode: params.nightMode,
    };
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddAddresses);
