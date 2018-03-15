import React, { Component } from 'react';
import {
    StyleSheet,
    Platform,
    View,
    Text,
    Image,
    TouchableOpacity,
    Modal,
    ViewPropTypes,
    Dimensions
} from 'react-native';
import Icon from 'react-native-fa-icons';
import Button from '@components/Button';
import moment from 'moment-timezone';
import PropTypes from "prop-types";

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
                            defaultSource={require("@images/app-icon.png")}
                            source={this.props.req.sender_profile_pic_url?
                                {uri:this.props.req.sender_profile_pic_url}:require("@images/app-icon.png")} />:
                        <Image style={styles.reqIcon}
                            defaultSource={require("@images/app-icon.png")}
                            source={this.props.req.receiver_profile_pic_url?
                                {uri:this.props.req.receiver_profile_pic_url}:require("@images/app-icon.png")} />
                    }
                    <View style={styles.reqDetail}>
                        <Text numberOfLines={1} style={styles.reqAmount}>{this.props.req.type == 1?'+':'-'} {this.props.req.amount}
                        <Text style={styles.reqRecvFrom}> {this.props.req.type == 1?'to':'from'} {this.props.req.type == 1?this.props.req.receiver_display_name:this.props.req.sender_display_name}</Text></Text>
                        <Text style={styles.reqDateTime}> {moment(this.props.req.created_ts).format('MMM DD, YYYY hh:mm A')}</Text>
                    </View>
                    <Icon style={styles.reqDetailArrow} name='angle-right' />
                </TouchableOpacity>
                <Modal
                    transparent={true}
                    visible={!!this.state.visible}
                    onRequestClose={()=>this.setState({visible:false})}>
                    <View style={styles.reqDetailModal}>
                        <View style={styles.reqDetailBox}>
                            <View style={styles.reqDetailHeader}>
                                <Text style={styles.reqDetailTitle}>Request Details</Text>
                                <Icon style={styles.reqDetailCloseIcon} onPress={()=>this.setState({visible:false})} name='close' />
                            </View>
                            <View style={styles.reqDetailBody}>
                                <View style={styles.reqDetailRow}>
                                    {this.props.req.type == 1?
                                        <Image style={styles.reqDetailIcon}
                                            defaultSource={require("@images/app-icon.png")}
                                            source={this.props.req.sender_profile_pic_url?
                                                {uri:this.props.req.sender_profile_pic_url}:require('@images/app-icon.png')} />:
                                        <Image style={styles.reqDetailIcon}
                                            defaultSource={require("@images/app-icon.png")}
                                            source={this.props.req.receiver_profile_pic_url?
                                                {uri:this.props.req.receiver_profile_pic_url}:require('@images/app-icon.png')} />
                                    }
                                    <View>
                                        <Text style={styles.reqDetailText}>{this.props.req.type == 1?'Recipient':'Name'}
                                        : {this.props.req.type == 1?this.props.req.receiver_display_name:this.props.req.sender_display_name}</Text>
                                        <Text selectable={true} style={styles.reqDetailText}>Email: {this.props.req.type == 1?this.props.req.receiver_email:this.props.req.sender_email}</Text>
                                    </View>
                                </View>
                                <View style={styles.reqDetailRow}>
                                    <Text style={styles.reqDetailLabel}>Amount</Text>
                                    <Text selectable={true} style={styles.reqDetailText}>{this.props.req.amount.toFixed(2)} FLASH</Text>
                                </View>
                                <View style={styles.reqDetailRow}>
                                    <Text style={styles.reqDetailLabel}>Status</Text>
                                    <Text selectable={true} style={styles.reqDetailText}>{this.props.req.status == 0?(this.props.outgoing?'Awaiting Acceptance':'Pending'):(
                                        this.props.req.status == 1?'Confirmed':'Failed'
                                    )}</Text>
                                </View>
                                <View style={styles.reqDetailRow}>
                                    <Text style={styles.reqDetailLabel}>Note</Text>
                                    <Text selectable={true} style={styles.reqDetailTextWithBox}>{this.props.req.note || ''}</Text>
                                </View>
                                <View style={styles.reqDetailRow}>
                                    <Text style={styles.reqDetailLabel}>Date/Time</Text>
                                    <Text selectable={true} style={styles.reqDetailText}>{moment(this.props.req.created_ts).format('MMM DD, YYYY hh:mm A')}</Text>
                                </View>
                            </View>
                            {this.props.outgoing?
                                <Button style={[styles.reqBtn,{backgroundColor: '#D04100',width: '100%'}]}
                                    textstyle={styles.reqBtnLabel}
                                    onPress={()=>this.setState({cancelRequest:true,visible:false})}
                                    value='Cancel Request' />:
                                <View style={{flexDirection:'row'}}>
                                    <Button style={styles.reqBtn}
                                    textstyle={styles.reqBtnLabel}
                                    value='Accept' />
                                    <Button style={[styles.reqBtn,{backgroundColor: '#EFEFEF'}]}
                                    textstyle={[styles.reqBtnLabel,{color:'#333'}]}
                                    value='Reject' />
                                </View>
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
                                <Button style={[styles.reqBtn,{backgroundColor: '#EFEFEF'}]}
                                    textstyle={[styles.reqBtnLabel,{color:'#333'}]}
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
        fontSize: 20,
        color: '#007db6',
    },
    reqDetailHeader:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#009DE4',
        paddingHorizontal: 15,
        paddingVertical: 12,
    },
    reqDetailTitle:{
        fontSize: 16,
        fontWeight: '600',
        color: '#FFF',
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
        width: width - 160,
        fontSize: 14,
        color: '#4A4A4A',
    },
    reqDetailTextWithBox:{
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
    reqBtn:{
        backgroundColor: '#008fd0',
        width:'50%',
        borderRadius: 0,
        alignItems: 'center',
    },
    reqBtnLabel:{
        fontSize: 16,
        fontWeight: '500'
    }
});
