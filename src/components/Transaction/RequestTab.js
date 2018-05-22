import React, { Component } from 'react';
import {
    StyleSheet,
    Platform,
    View,
    TextInput,
    Image,
    TouchableOpacity,
    Modal,
    ViewPropTypes,
    Dimensions
} from 'react-native';
import Text from './../Text';
import Icon from 'react-native-fa-icons';
import Button from '@components/Button';
import PropTypes from "prop-types";
import * as utils from '@lib/utils';

import { PROFILE_URL } from '@src/config';

const { height, width } = Dimensions.get('window');

export default class RequestTab extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    static defaultProps = {
        req: {
            outgoing: false
        }
    }

    render() {
        return (
            <View key={'_req_'+this.props.req.id}>
                <TouchableOpacity activeOpacity={0.7} {...this.props}
                    onPress={()=>this.setState({visible:true},this.props.onPress)}
                    style={[styles.reqTab,this.props.style]}>
                    {this.props.req.type == 1?
                        <Image style={styles.reqIcon}
                            source={this.props.req.receiver_profile_pic_url?
                                {uri:PROFILE_URL+this.props.req.receiver_profile_pic_url}:
                                utils.getCurrencyIcon(this.props.req.currency)} />:
                        <Image style={styles.reqIcon}
                            source={this.props.req.sender_profile_pic_url?
                                {uri:PROFILE_URL+this.props.req.sender_profile_pic_url}:
                                utils.getCurrencyIcon(this.props.req.currency)} />
                    }
                    <View style={styles.reqDetail}>
                        <Text numberOfLines={1} style={styles.reqAmount}>
                            {this.props.req.type == 1?'+':'-'} {utils.localizeFlash(this.props.req.amount.toString())}
                        <Text style={styles.reqRecvFrom}> {this.props.req.type == 1?'to ':'from '}
                            {this.props.req.type == 1?this.props.req.receiver_display_name:
                            this.props.req.sender_display_name}</Text></Text>
                        <Text style={styles.reqDateTime}> {utils.getDisplayDateTime(this.props.req.created_ts, this.props.timezone)}</Text>
                    </View>
                    <Icon style={styles.reqDetailArrow} name='angle-right' />
                </TouchableOpacity>
                <Modal
                    transparent={true}
                    visible={!!this.state.visible}
                    onRequestClose={()=>this.setState({visible:false,
                        reject: false, accept: false, note: ''})}>
                    <View style={styles.reqDetailModal}>
                        <View style={styles.reqDetailBox}>
                            <View style={styles.reqDetailHeader}>
                                <Text style={styles.reqDetailTitle}>
                                    {this.state.reject?'Reject Request':(
                                    this.state.accept?'Confirm Transaction':
                                    'Request Details')}
                                </Text>
                                <Text style={styles.reqDetailCloseIcon}
                                onPress={()=>this.setState({visible:false})}>X</Text>
                            </View>
                            <View style={styles.reqDetailBody}>
                                {this.state.accept?<View style={styles.reqDetailRow}>
                                    <Text style={styles.reqDetailLabel}>Amount</Text>
                                    <Text selectable={true} style={styles.reqDetailText}>
                                        {utils.localizeFlash(this.props.req.amount.toString())} {utils.getCurrencyUnitUpcase(this.props.req.currency)}</Text>
                                </View>:null}
                                {(this.state.reject || this.state.accept)?<View>
                                    <View style={styles.reqDetailRow}>
                                        <Text style={styles.reqDetailLabel}>Note</Text>
                                        <View>
                                            <View style={styles.reqDetailTextInputBox}>
                                                <TextInput
                                                    style={styles.reqDetailTextInput}
                                                    multiline = {true}
                                                    numberOfLines = {4}
                                                    placeholder={'Enter note (optional)'}
                                                    underlineColorAndroid='transparent'
                                                    value={this.state.note || ''}
                                                    onChangeText={(note) => note.length <= 50 && this.setState({note})}
                                                />
                                            </View>
                                            <Text style={styles.requestRowNote}>Max Characters 50</Text>
                                        </View>
                                    </View>
                                    <Icon style={styles.reqDownArrow} name='arrow-down'/>
                                    <View style={styles.reqDetailRow}>
                                        {this.props.req.type == 2?
                                            <Image style={styles.reqDetailIcon}
                                                source={this.props.req.sender_profile_pic_url?
                                                    {uri:PROFILE_URL+this.props.req.sender_profile_pic_url}:
                                                    utils.getCurrencyIcon(this.props.req.currency)} />:
                                            <Image style={styles.reqDetailIcon}
                                                source={this.props.req.receiver_profile_pic_url?
                                                    {uri:this.props.req.receiver_profile_pic_url}:
                                                    utils.getCurrencyIcon(this.props.req.currency)} />
                                        }
                                        <View>
                                            <Text style={styles.reqDetailText}>
                                                {this.props.req.type == 1?'Recipient':'Name'}
                                                : {this.props.req.type == 1?this.props.req.receiver_display_name:
                                                this.props.req.sender_display_name}</Text>
                                            <Text selectable={true} style={styles.reqDetailText}>
                                                Email: {this.props.req.type == 1?this.props.req.receiver_email:
                                                this.props.req.sender_email}</Text>
                                        </View>
                                    </View>
                                </View>:<View>
                                    <View style={styles.reqDetailRow}>
                                        {this.props.req.type == 2?
                                            <Image style={styles.reqDetailIcon}
                                                source={this.props.req.sender_profile_pic_url?
                                                    {uri:PROFILE_URL+this.props.req.sender_profile_pic_url}:
                                                    utils.getCurrencyIcon(this.props.req.currency)} />:
                                            <Image style={styles.reqDetailIcon}
                                                source={this.props.req.receiver_profile_pic_url?
                                                    {uri:PROFILE_URL+this.props.req.receiver_profile_pic_url}:
                                                    utils.getCurrencyIcon(this.props.req.currency)} />
                                        }
                                        <View>
                                            <Text style={styles.reqDetailText}>
                                                {this.props.req.type == 1?'Recipient':'Name'}
                                                : {this.props.req.type == 1?this.props.req.receiver_display_name:
                                                this.props.req.sender_display_name}</Text>
                                            <Text selectable={true} style={styles.reqDetailText}>
                                                Email: {this.props.req.type == 1?this.props.req.receiver_email:
                                                this.props.req.sender_email}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.reqDetailRow}>
                                        <Text style={styles.reqDetailLabel}>Amount</Text>
                                        <Text selectable={true} style={styles.reqDetailText}>
                                            {utils.localizeFlash(this.props.req.amount.toString())} {utils.getCurrencyUnitUpcase(this.props.req.currency)}</Text>
                                    </View>
                                    <View style={styles.reqDetailRow}>
                                        <Text style={styles.reqDetailLabel}>Status</Text>
                                        <Text selectable={true} style={styles.reqDetailText}>
                                            {this.props.req.status == 0?(this.props.outgoing?
                                            'Awaiting Acceptance':'Pending'):
                                            (this.props.req.status == 1?'Confirmed':'Failed'
                                        )}</Text>
                                    </View>
                                    <View style={styles.reqDetailRow}>
                                        <Text style={styles.reqDetailLabel}>Note</Text>
                                        <Text selectable={true} style={styles.reqDetailTextWithBox}>
                                            {this.props.req.note || '-'}</Text>
                                    </View>
                                    <View style={styles.reqDetailRow}>
                                        <Text style={styles.reqDetailLabel}>Date/Time</Text>
                                        <Text selectable={true} style={styles.reqDetailText}>
                                            {utils.getDisplayDateTime(this.props.req.created_ts, this.props.timezone)}</Text>
                                    </View>
                                </View>}

                            </View>
                            {this.props.outgoing?
                                <Button style={[styles.reqBtn,{backgroundColor: '#D04100',width: '100%'}]}
                                    textstyle={styles.reqBtnLabel}
                                    onPress={()=>this.setState({cancelRequest:true,visible:false})}
                                    value='Cancel Request' />:((this.state.reject || this.state.accept)?
                                    <View style={{flexDirection:'row'}}>
                                        <Button style={[styles.reqBtn,{backgroundColor: '#EFEFEF'}]}
                                            textstyle={[styles.reqBtnLabel,{color:'#333'}]}
                                            onPress={()=>this.setState({reject: false, accept: false, note: ''})}
                                            value='Cancel' />
                                        <Button style={styles.reqBtn}
                                            textstyle={styles.reqBtnLabel}
                                            onPress={()=>{
                                                if(this.state.reject)
                                                    this.props.reject(this.props.req.id,
                                                        this.props.req.sender_email,
                                                        this.state.note);
                                                else if(this.state.accept)
                                                    this.props.accept(this.props.req,
                                                        this.state.note);
                                                this.setState({reject: false,
                                                    accept: false, visible:false});
                                            }}
                                            value='Send' />
                                    </View>:<View style={{flexDirection:'row'}}>
                                        <Button style={styles.reqBtn}
                                            textstyle={styles.reqBtnLabel}
                                            onPress={()=>this.setState({accept: true})}
                                            value='Accept' />
                                        <Button style={[styles.reqBtn,{backgroundColor: '#EFEFEF'}]}
                                            textstyle={[styles.reqBtnLabel,{color:'#333'}]}
                                            onPress={()=>this.setState({reject: true})}
                                            value='Reject' />
                                    </View>
                                )
                            }
                        </View>
                    </View>
                </Modal>
                <Modal
                    transparent={true}
                    visible={!!this.state.cancelRequest}
                    onRequestClose={()=>this.setState({cancelRequest:false})}>
                    <View style={styles.reqDetailModal}>
                        <View style={styles.reqDetailBox}>
                            <View style={styles.reqDetailHeader}>
                                <Text style={styles.reqDetailTitle}>Cancel Request</Text>
                                <Icon style={styles.reqDetailCloseIcon} onPress={()=>this.setState({cancelRequest:false})} name='close' />
                            </View>
                            <View style={styles.reqDetailBody}>
                                <Text style={{
                                    padding: 20,
                                    fontSize: 20,
                                    textAlign: 'center',
                                    color: '#4A4A4A'
                                }}>Are you sure you want to cancel this request?</Text>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <Button style={styles.reqBtn}
                                    textstyle={styles.reqBtnLabel}
                                    onPress={()=>this.setState({cancelRequest:false},
                                        ()=>!!this.props.onCancel && this.props.onCancel(this.props.req))}
                                    value='Yes' />
                                <Button style={[styles.reqBtn,{backgroundColor: '#E0AE27'}]}
                                    textstyle={[styles.reqBtnLabel,{color:'#000'}]}
                                    onPress={()=>this.setState({cancelRequest:false})}
                                    value='No' />
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}

RequestTab.propTypes = {
	...ViewPropTypes,
	style: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
	req: PropTypes.object,
	outgoing: PropTypes.bool,
    timezone: PropTypes.string,
};

const styles = StyleSheet.create({
    reqTab: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: width - 40,
        height: 70,
        padding:10,
        marginBottom: 10,
        borderRadius: 10,
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
    reqIcon: {
        width: 36,
        height: 36,
        borderRadius: 18,
        resizeMode: 'contain',
    },
    reqDetail:{
        width: width - 145,
    },
    reqAmount:{
        color: '#333333',
        fontSize: 15,
        fontWeight: '600',
    },
    reqRecvFrom:{
        color: '#666666',
        fontSize: 12,
        fontStyle: 'italic',
        fontWeight: '400',
    },
    reqDateTime:{
        paddingTop: 2,
        color: '#4A4A4A',
        fontSize: 13,
    },
    reqDetailArrow:{
        fontSize: 40,
        color: '#B9B9B9',
        paddingRight:3
    },
    reqStatus:{
        width: 90,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#EE517C',
        alignItems: 'center',
        justifyContent: 'center'
    },
    reqStatusLabel:{
        color: '#FFFFFF',
        fontSize: 13,
        fontWeight: 'bold',
    },
    reqDetailModal:{
        backgroundColor: '#0007',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    reqDetailBox:{
        width: '100%',
        paddingHorizontal: 20,
    },
    reqDetailCloseIcon:{
        fontSize: 18,
        color: '#E0AE27',
        padding: 5,
        paddingRight: 0
    },
    reqDetailHeader:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#191714',
        paddingHorizontal: 15,
        paddingVertical: 8,
    },
    reqDetailTitle:{
        fontSize: 18,
        color: '#E0AE27',
    },
    reqDetailBody:{
        backgroundColor: '#FFFFFF',
        padding: 15,
    },
    reqDetailRow:{
        flexDirection: 'row',
        marginBottom: 10,
    },
    reqDetailLabel:{
        width: 85,
        fontSize: 14,
        color: '#333333',
    },
    reqDetailIcon:{
        marginRight: 35,
        width: 50,
        height: 50,
        borderRadius: 25
    },
    reqDetailText:{
        fontSize: 14,
        color: '#4A4A4A',
    },
    reqDetailTextInputBox:{
        justifyContent: 'center',
        width: width - 160,
        height: 100,
        paddingVertical: 5,
        marginTop: 5,
        paddingHorizontal: 15,
        borderWidth: 1.5,
        borderRadius:10,
        borderColor: '#ddd'
    },
    reqDetailTextInput:{
        width: width - 160,
        fontSize: 14,
        color: '#4A4A4A',
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    reqDetailTextWithBox:{
        width: width - 160,
        fontSize: 14,
        color: '#4A4A4A',
        // borderWidth: 1,
        // borderColor: '#999999',
        paddingVertical: 5,
        // paddingHorizontal: 10,
        // borderRadius: 10,
    },
    reqBtn:{
        backgroundColor: '#191714',
        width:'50%',
        borderRadius: 0,
        alignItems: 'center',
    },
    reqBtnLabel:{
        fontSize: 18,
        color: '#FFFFFF',
    },
    reqDownArrow:{
        fontSize: 20,
        color: '#d55',
        alignSelf: 'center',
        marginTop: 5,
        marginBottom: 10,
    },
    requestRowNote:{
        fontSize: 13,
        paddingHorizontal: 5,
        color: '#9B9B9B'
    },
});
