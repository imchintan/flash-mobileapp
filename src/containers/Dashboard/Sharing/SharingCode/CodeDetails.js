/**
 * Share Code  Detail Container Tab
 */

import React, { Component } from 'react';
import {
    View,
    Clipboard,
    Share,
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
import * as utils from '@lib/utils';

class CodeDetails extends Component<{}> {

    constructor(props) {
        super(props);
        this.state = {
            sharing_fee: ''
        };
    }

    componentDidMount(){
        if(!this.props.sharing_code || this.props.sharing_code.length == 0){
            const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'GenerateCode' })],
            });
            this.props.navigation.dispatch(resetAction);
        }
    }

    render() {
        const styles = (this.props.nightMode?require('@styles/nightMode/sharing'):require('@styles/sharing'));
        return (
            <Container>
                {this.props.sharing_code && this.props.sharing_code.length > 0 ?
                <Content hasHeader={false} hasFooter={true}
                    style={styles.content}
                    contentContainerStyle={{marginHorizontal: 20}}>
                    <Text style={styles.label}>Share Code & Percentage</Text>
                    <View style={styles.hr}/>
                    <View style={styles.shareCodeDetail}>
                        <View style={styles.shareCodeBox}>
                            <Text selectable={true} style={styles.shareCodeText}>
                                {this.props.sharing_code[0].code}
                            </Text>
                        </View>
                        <View style={styles.shareCodePer}>
                            <Text style={styles.shareCodePerText}>
                                {this.props.sharing_code[0].sharing_fee}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.shareCodeActionLinkTab}>
                        <TouchableOpacity style={styles.shareCodeActionLink}
                            onPress={()=>{
                                Clipboard.setString(this.props.sharing_code[0].code);
                                Toast.showTop('Share code copied!');
                            }}>
                            <Icon style={styles.shareCodeActionLinkIcon} name='copy'/>
                            <Text  style={styles.shareCodeActionLinkLabel}>Copy</Text>
                        </TouchableOpacity>
                        <Text style={styles.shareCodeActionLinkDiv}> / </Text>
                        <TouchableOpacity style={styles.shareCodeActionLink}
                            onPress={()=>Share.share({message:this.props.sharing_code[0].code,
                                title: utils.getCurrencyUnitUpcase(this.props.currency_type)})}>
                            <Icon style={styles.shareCodeActionLinkIcon} name='share-alt'/>
                            <Text style={styles.shareCodeActionLinkLabel}>Share</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={styles.label}>
                            {utils.getCurrencyUnit(this.props.currency_type)} Address
                        </Text>
                        <Text style={styles.label}>Per (%)</Text>
                    </View>
                    <View style={styles.hr}/>
                    {this.props.sharing_code.map((addr,idx)=>
                        <View key={'_address_'+addr.address} style={styles.shareCodeAddressTab}>
                            <View style={styles.shareCodeAddressRow}>
                                <Text selectable={true} numberOfLines={1}
                                    style={styles.shareCodeAddress}>
                                    {addr.email || addr.address}
                                </Text>
                                <Text numberOfLines={2} style={styles.shareCodeAddressRemark}>
                                    {addr.label}
                                </Text>
                            </View>
                            <Text style={styles.shareCodeAddressPer}>{addr.percentage}</Text>
                        </View>
                    )}
                </Content>:null}
                <Footer>
                    <Button value={'Edit Addresses'}
                        style={{width:'100%',
                            height: '100%',
                            borderRadius: 0,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        textstyle={{
                            fontSize: 24
                        }}
                        onPress={()=>this.props.navigation.navigate(
                            'AddAddresses',{
                                editMode: true,
                                sharing_code:this.props.sharing_code[0].code,
                                sharing_fee:Number(this.props.sharing_code[0].sharing_fee)
                            })}/>
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
        sharing_code: params.sharing_code || [],
        nightMode: params.nightMode,
    };
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CodeDetails);
