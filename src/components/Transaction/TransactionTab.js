import React, { Component } from 'react';
import {
    StyleSheet,
    Platform,
    View,
    Image,
    TouchableOpacity,
    ViewPropTypes,
    Dimensions,
    ScrollView
} from 'react-native';
import Text from './../Text';
import Modal from './../Modal';
import Loader from './../Loader';
import PropTypes from "prop-types";
import { PROFILE_URL } from '@src/config';
import * as utils from '@lib/utils';
import * as constants from '@src/constants';

const { width, height } = Dimensions.get('window');

export default class TransactionTab extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    static defaultProps = {
        txn: {},
        nightMode: false,
        sharingOut: false,
        sharingUsage: false,
        displayNote: true
    }

    render() {
        const styles = this.props.nightMode?stylesDark:stylesLight;
        return (
            <View key={'_txn_'+this.props.txn.transaction_id}>
                <TouchableOpacity activeOpacity={0.7} {...this.props}
                    onPress={()=>this.setState({visible:true},this.props.onPress)}
                    style={[styles.txnTab,this.props.style]}>
                    {this.props.txn.type == 1?
                        <Image style={styles.txnIcon}
                            source={this.props.txn.receiver_profile_pic_url?
                                {uri:PROFILE_URL+this.props.txn.receiver_profile_pic_url}:utils.getCurrencyIcon(this.props.currency_type)} />:
                        <Image style={styles.txnIcon}
                            source={this.props.txn.sender_profile_pic_url?
                                {uri:PROFILE_URL+this.props.txn.sender_profile_pic_url}:utils.getCurrencyIcon(this.props.currency_type)} />
                    }
                    <View style={styles.txnDetail}>
                        <Text numberOfLines={1} style={[styles.txnAmount,{color:this.props.txn.type == 1?'#D04100':(this.props.nightMode?'#32CD32':'#007E33')}]}>{this.props.txn.type == 1?'-':'+'} {this.props.sharingOut || this.props.sharingUsage?
                            utils.localizeFlash(this.props.txn.sharing_fee.toString()):utils.localizeFlash(this.props.txn.amount.toString())}
                        <Text style={styles.txnRecvFrom}> {this.props.txn.type == 1?'to':'from'} {this.props.txn.type == 1?
                                (this.props.txn.receiver_display_name || 'Anonymous'):(this.props.txn.sender_display_name || 'Anonymous')}</Text></Text>
                        <Text style={styles.txnDateTime}> {utils.getDisplayDateTime(this.props.txn.created_ts, this.props.timezone)}</Text>
                    </View>
                </TouchableOpacity>
                <Modal
                    transparent={true}
                    visible={!!this.state.visible}
                    onRequestClose={()=>this.setState({visible:false})}>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={()=>this.setState({visible:false})}
                        style={styles.txnDetailModal}>
                        {!this.props.txnLoader?<TouchableOpacity
                            activeOpacity={1}
                            onPress={null}
                            style={styles.txnDetailBox}>
                            <View style={styles.txnDetailHeader}>
                                <Text style={styles.txnDetailTitle}>Transaction Details</Text>
                                <Text style={styles.txnDetailCloseIcon} onPress={()=>this.setState({visible:false})} >X</Text>
                            </View>
                            <View style={styles.txnDetailBody}>
                                <ScrollView showsVerticalScrollIndicator={false}>
                                    <View style={styles.txnDetailRow}>
                                        <Text style={styles.txnDetailLabel}>Date/Time</Text>
                                        <Text selectable={true} style={styles.txnDetailText}>{utils.getDisplayDateTime(this.props.txn.created_ts, this.props.timezone)}</Text>
                                    </View>
                                    <View style={styles.txnDetailRow}>
                                        {this.props.txn.type == 2?
                                            <Image style={styles.txnDetailIcon}
                                                source={this.props.txn.sender_profile_pic_url?
                                                    {uri:PROFILE_URL+this.props.txn.sender_profile_pic_url}:utils.getCurrencyIcon(this.props.currency_type)} />:
                                            <Image style={styles.txnDetailIcon}
                                                source={this.props.txn.receiver_profile_pic_url?
                                                    {uri:PROFILE_URL+this.props.txn.receiver_profile_pic_url}:utils.getCurrencyIcon(this.props.currency_type)} />
                                        }
                                        <View>
                                            <Text style={styles.txnDetailText}>{this.props.txn.type == 1?'Recipient':'Name'}
                                                : {this.props.txn.type == 1?
                                                    (this.props.txn.receiver_display_name || 'Anonymous')
                                                    :(this.props.txn.sender_display_name || 'Anonymous')}</Text>
                                            <Text selectable={true} style={styles.txnDetailText}>Email: {this.props.txn.type == 1?
                                                (this.props.txn.receiver_email || 'Anonymous')
                                                :(this.props.txn.sender_email || 'Anonymous')}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.txnDetailRow}>
                                        <Text style={styles.txnDetailLabel}>Amount</Text>
                                        <Text selectable={true} style={[styles.txnDetailText,{fontWeight: '600'}]}>{this.props.sharingUsage?'':
                                            (this.props.txn.type == 1?'- ':'+ ')}{utils.localizeFlash(this.props.txn.amount).toString()} {utils.getCurrencyUnitUpcase(this.props.currency_type)}</Text>
                                    </View>
                                    {this.props.txn.type == 1 && !this.props.sharingUsage?
                                    <View style={styles.txnDetailRow}>
                                        <Text style={styles.txnDetailLabel}>Fee</Text>
                                        <Text selectable={true} style={styles.txnDetailText}>- {this.props.currency_type === constants.CURRENCY_TYPE.FLASH?'0.001':this.props.txnDetail.fees} {utils.getCurrencyUnitUpcase(this.props.currency_type)}</Text>
                                    </View>:null}
                                    {(this.props.txn.type == 1 || this.props.sharingUsage) && !!this.props.txn.sharing_fee?
                                    <View style={styles.txnDetailRow}>
                                        <Text style={styles.txnDetailLabel}>Sharing Fee</Text>
                                        <Text selectable={true} style={styles.txnDetailText}>{this.props.sharingUsage?'':'- '}{this.props.txn.sharing_fee} {utils.getCurrencyUnitUpcase(this.props.currency_type)}</Text>
                                    </View>:null}
                                    {this.props.txn.type == 1 && !this.props.sharingUsage?
                                    <View style={styles.txnDetailRow}>
                                        <Text style={styles.txnDetailLabel}>Total</Text>
                                        <Text selectable={true} style={styles.txnDetailText}>- {utils.localizeFlash(this.props.txn.amount +
                                            (this.props.currency_type === constants.CURRENCY_TYPE.FLASH?0.001
                                                :this.props.txnDetail.fees) + (this.props.txn.sharing_fee || 0))
                                        } {utils.getCurrencyUnitUpcase(this.props.currency_type)}</Text>
                                    </View>:null}
                                    {this.props.displayNote?
                                    <View style={styles.txnDetailRow}>
                                        <Text style={styles.txnDetailLabel}>Note</Text>
                                        <Text selectable={true} style={styles.txnDetailTextWithBox}>{this.props.txn.memo || ''}</Text>
                                    </View>:null}
                                    <View style={styles.txnDetailRow}>
                                        <Text style={styles.txnDetailLabel}>ID</Text>
                                        <Text selectable={true} style={styles.txnDetailTextWithBox}>{this.props.txn.transaction_id}</Text>
                                    </View>
                                    {this.props.sharingUsage?null:
                                    <View style={styles.txnDetailRow}>
                                        <Text style={styles.txnDetailLabel}>Status</Text>
                                        <Text selectable={true} style={styles.txnDetailText}>{this.props.txn.status}</Text>
                                    </View>}
                                    {this.props.txn.status === 'pending' &&
                                        constants.CURRENCY_TYPE.FLASH !== this.props.currency_type &&
                                        this.props.txn.type !== 1?
                                        <View style={{alignItems: 'center'}}>
                                                <Text style={{fontSize: 14, fontWeight:'bold', color: '#000000', textAlign: 'center'}}>Note:
                                                    <Text style={{ fontWeight:'normal'}}> The above Amount will be available for spending after 1 confirmation.</Text>
                                                </Text>
                                        </View>:null
                                    }
                                    {this.props.sharingUsage && Array.isArray(this.props.txnDetail)?<View>
                                            <View style={styles.recipientDetails}>
                                                <Text style={styles.txnDetailLabel}>Recipient</Text>
                                                <Text style={[styles.txnDetailLabel,{textAlign: 'right'}]}>Amount</Text>
                                            </View>
                                            <View style={styles.hr}/>
                                            {this.props.txnDetail.map((txnD,idx)=>
                                                <View key={'_txn_d_'+idx} style={[styles.recipientDetailRow,
                                                    idx % 2 !== 0 && {backgroundColor: this.props.nightMode?'#242424':'#efefef'}]}>
                                                    <Text style={styles.recipientAddress}>{txnD.receiver_public_address}</Text>
                                                    <Text style={styles.recipientAmount}>{txnD.amount}</Text>
                                                </View>
                                            )}
                                        </View>:null
                                    }
                                </ScrollView>
                            </View>
                        </TouchableOpacity>:null}
                    </TouchableOpacity>
                    <Loader show={this.props.txnLoader}/>
                </Modal>
            </View>
        )
    }
}

TransactionTab.propTypes = {
	...ViewPropTypes,
	style: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
	txn: PropTypes.object,
	txnLoader: PropTypes.bool,
	nightMode: PropTypes.bool,
	displayNote: PropTypes.bool,
	sharingOut: PropTypes.bool,
	sharingUsage: PropTypes.bool,
	txnDetail: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	timezone: PropTypes.string,
};

const stylesLight = StyleSheet.create({
    txnTab: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        alignSelf: 'center',
        alignItems: 'center',
        width: width - 40,
        height: 70,
        padding:10,
        marginBottom: 10,
        borderRadius: 5,
        ...Platform.select({
            ios: {
                shadowColor: 'rgba(0,0,0, 0.3)',
                shadowOffset: { height: 1, width: 0 },
                shadowOpacity: 0.5,
            },
            android: {
                elevation: 3,
            },
        }),
    },
    txnIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        resizeMode: 'contain',
    },
    txnDetail:{
        width: width - 120,
        marginLeft: 7
    },
    txnAmount:{
        color: '#333333',
        fontSize: 18,
        fontWeight: '600',
    },
    txnRecvFrom:{
        color: '#666666',
        fontSize: 14,
        fontStyle: 'italic',
        fontWeight: '400',
    },
    txnDateTime:{
        color: '#4A4A4A',
        fontSize: 15,
    },
    txnDetailModal:{
        backgroundColor: '#0007',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    txnDetailBox:{
        width: '100%',
        paddingHorizontal: 20,
    },
    txnDetailCloseIcon:{
        fontSize: 18,
        color: '#E0AE27',
        padding: 5,
        paddingRight: 0
    },
    txnDetailHeader:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#191714',
        paddingHorizontal: 15,
        paddingVertical: 8,
    },
    txnDetailTitle:{
        fontSize: 18,
        color: '#E0AE27',
    },
    txnDetailBody:{
        maxHeight: height*0.8,
        backgroundColor: '#FFFFFF',
        padding: 15,
    },
    txnDetailRow:{
        flexDirection: 'row',
        marginBottom: 10,
    },
    txnDetailLabel:{
        width: 85,
        fontSize: 14,
        color: '#333333',
    },
    txnDetailIcon:{
        marginRight: 35,
        width: 50,
        height: 50,
        borderRadius: 25
    },
    txnDetailText:{
        width: width - 160,
        fontSize: 14,
        color: '#4A4A4A',
    },
    txnDetailTextWithBox:{
        width: width - 160,
        minHeight: 30,
        fontSize: 14,
        color: '#4A4A4A',
        borderWidth: 1,
        borderColor: '#999999',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 10,
    },
    recipientDetails:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    hr:{
        width: '100%',
        borderBottomWidth: 1,
        borderColor: '#9F9F9F',
        marginBottom: 5,
    },
    recipientDetailRow:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 7,
        paddingBottom: 2,
        paddingHorizontal: 5,
        marginBottom: 0.5,
        borderBottomWidth: 0.5,
        borderColor: '#AFAFAF',
    },
    recipientAddress:{
        width: width - 142,
        fontSize: 13,
        color: '#4A4A4A',
    },
    recipientAmount:{
        width: 55,
        fontSize: 14,
        color: '#4A4A4A',
        textAlign: 'right',
    },
});

const stylesDark = {
    ...stylesLight,
    ...StyleSheet.create({
        txnTab: {
            flexDirection: 'row',
            backgroundColor: '#393939',
            alignSelf: 'center',
            alignItems: 'center',
            width: width - 40,
            height: 70,
            padding:10,
            marginBottom: 10,
            borderRadius: 5,
            ...Platform.select({
                ios: {
                    shadowColor: 'rgba(0,0,0, 0.3)',
                    shadowOffset: { height: 1, width: 0 },
                    shadowOpacity: 0.5,
                },
                android: {
                    elevation: 3,
                },
            }),
        },
        txnRecvFrom:{
            color: '#DFDFDF',
            fontSize: 14,
            fontStyle: 'italic',
            fontWeight: '400',
        },
        txnDateTime:{
            color: '#A4A4A4',
            fontSize: 15,
        },
        txnDetailBody:{
            maxHeight: height*0.8,
            backgroundColor: '#313131',
            padding: 15,
        },
        txnDetailLabel:{
            width: 85,
            fontSize: 14,
            color: '#E9E9E9',
        },
        txnDetailText:{
            width: width - 160,
            fontSize: 14,
            color: '#C2C2C2',
        },
        txnDetailTextWithBox:{
            width: width - 160,
            minHeight: 30,
            fontSize: 14,
            color: '#C2C2C2',
            borderWidth: 1,
            borderColor: '#6A6A6A',
            paddingVertical: 5,
            paddingHorizontal: 10,
            borderRadius: 10,
        },
        hr:{
            width: '100%',
            borderBottomWidth: 1,
            borderColor: '#FFB400',
            marginBottom: 5,
        },
        recipientDetailRow:{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingTop: 7,
            paddingBottom: 2,
            paddingHorizontal: 5,
            marginBottom: 0.5,
            borderBottomWidth: 0.5,
            borderColor: '#9F9F9F',
        },
        recipientAddress:{
            width: width - 142,
            fontSize: 13,
            color: '#C2C2C2',
        },
        recipientAmount:{
            width: 55,
            fontSize: 14,
            color: '#C2C2C2',
            textAlign: 'right',
        },
    })
}
