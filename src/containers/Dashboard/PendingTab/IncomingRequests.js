/**
 * Incoming Requests Container Tab
 */

import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TextInput,
  Modal
} from 'react-native';
import {
    Loader,
    Button,
    RequestTab,
    Icon
} from '@components';
import moment from 'moment-timezone';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '@actions';
const styles = require("@styles/pending");

class IncomingRequests extends Component<{}> {

    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillReceiveProps(nextProps){
        if(nextProps){
            if(nextProps.sendTxnSuccess){
                this.setState({sendTxnSuccess:nextProps.sendTxnSuccess, visibleMsg: true});
                this.props.resetMessages();
            }
            if(nextProps.search_wallet && nextProps.search_wallet !== this.props.search_wallet
                && this.state.req && this.state.req.sender_email == nextProps.search_wallet.email){
                this.setState({
                    visible: true,
                    isVerify:true,
                    search_wallet:nextProps.search_wallet,
                    publicAddress:nextProps.search_wallet.address
                });
            }
            if(!this.state.visible && !nextProps.loading && this.props.loading !== nextProps.loading){
                this.resetState();
            }
            if(nextProps.decryptedWallets && this.props.decryptedWallets !== nextProps.decryptedWallets){
                this.sendMoney(true);
            }
        }
    }

    resetState(){
        this.setState({
            isVerify: false,
            publicAddress: null,
            search_wallet: null,
        });
    }

    accept(req, note){
        this.setState({req,note},
            ()=>this.props.searchWallet(req.sender_email, true));
    }

    sendMoney(force=false){
        if(!force && !this.props.decryptedWallets) return this.setState({visible:false, visibleGetPassword: true});
        if(!this.state.isConfirm) return ;
        this.setState({visible:false, visibleGetPassword:false, isConfirm: false},
            ()=>{
                let receiver_bare_uid =
                    this.state.search_wallet?
                    this.state.search_wallet.email:null;
                let receiver_id =
                    this.state.search_wallet?
                    this.state.search_wallet.username:null;

                this.props.rawTransaction(this.state.req.amount,
                    this.state.publicAddress, this.state.note,
                    receiver_bare_uid, receiver_id, this.state.req.id);
        })
    }

    render() {
        return (
            <View style={{flex:1}}>
                <FlatList
                    style={styles.reqList}
                    showsVerticalScrollIndicator={false}
                    data={this.props.reqs}
                    keyExtractor={(req, index) => (index+'_'+req.id)}
                    onEndReachedThreshold={5}
                    onEndReached={()=>(this.props.reqs.length < this.props.total_reqs) &&
                            this.props.getIncomingRequests(this.props.reqs.length)}
                    renderItem={({item, index})=>{
                        return(
                            <RequestTab req={item} style={[!index && {marginTop:10}]}
                                reject={this.props.markRejectedMoneyRequests}
                                accept={this.accept.bind(this)}
                            />
                        );
                    }}
                    ListEmptyComponent={()=>{
                        return(
                            <View>
                                <Text style={styles.reqListEmpty}>
                                    There is no request in this date range.
                                </Text>
                                <Button
                                    onPress={()=>this.props.updateRequestReportDate(this.props.minDate,
                                        this.props.maxDate)}
                                    style={styles.reqShowAllBtn}
                                    textstyle={styles.reqShowAllBtnText}
                                    value='Show All Requests' />
                            </View>
                        )
                    }}
                />
                <Modal
                    transparent={true}
                    visible={!!this.state.visible}
                    onRequestClose={()=>this.setState({visible:false}, this.resetState.bind(this))}>
                    <View style={styles.reqDetailModal}>
                        <View style={styles.reqDetailBox}>
                            <View style={styles.reqDetailHeader}>
                                <Text style={styles.reqDetailTitle}>Confirm Transaction</Text>
                                <Icon style={styles.reqDetailCloseIcon}
                                    onPress={()=>this.setState({visible:false})} name='close' />
                            </View>
                            <View style={styles.reqDetailBody}>
                                <Text style={styles.reqAmtText}>{this.state.req?this.state.req.amount:0.00} FLASH</Text>
                                <Text style={styles.reqFeeText}>
                                    + 0.001 FLASH transaction fee
                                </Text>
                                <Icon style={styles.reqDownArrow} name='arrow-down'/>
                                <View style={styles.reqDetailRow}>
                                    <Image style={styles.reqDetailIcon}
                                        defaultSource={require("@images/app-icon.png")}
                                        source={this.state.search_wallet?
                                            (this.state.search_wallet.profile_pic_url?
                                            {uri:this.state.search_wallet.profile_pic_url}:
                                            require('@images/app-icon.png'))
                                            :require('@images/app-icon.png')} />
                                    <View>
                                        {this.state.search_wallet?
                                            <Text style={styles.reqDetailText}>
                                                {this.state.search_wallet?this.state.search_wallet.display_name:''}
                                            </Text>:null
                                        }
                                        <Text style={styles.reqDetailText}>
                                            {this.state.req?this.state.req.sender_email:''}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <Button
                                    onPress={()=>this.setState({visible:false},this.resetState.bind(this))}
                                    style={[styles.reqBtn,{backgroundColor: '#EFEFEF'}]}
                                    textstyle={[styles.reqBtnLabel,{color:'#333'}]}
                                    value='Cancel' />
                                <Button
                                    onPress={()=>this.setState({isConfirm: true},this.sendMoney.bind(this))}
                                    style={styles.reqBtn}
                                    textstyle={styles.reqBtnLabel}
                                    value='Send' />
                            </View>
                        </View>
                    </View>
                </Modal>
                <Modal
                    transparent={true}
                    visible={!!this.state.visibleGetPassword}
                    onRequestClose={()=>this.setState({visibleGetPassword:false})}>
                    <View style={styles.reqDetailModal}>
                        <View style={styles.reqDetailBox}>
                            <View style={styles.reqDetailHeader}>
                                <Text style={styles.reqDetailTitle}>Password</Text>
                                <Icon style={styles.reqDetailCloseIcon}
                                    onPress={()=>this.setState({visibleGetPassword:false})} name='close' />
                            </View>
                            <View style={styles.reqDetailBody}>
                                <Text style={{
                                    fontSize: 15,
                                    color: '#333',
                                    textAlign: 'center',
                                    marginBottom: 15,
                                }}>
                                    For additional security check, Please enter your password.
                                </Text>
                                <View style={styles.requestRowInputBox}>
                                    <TextInput
                                        underlineColorAndroid='transparent'
                                        style={styles.requestRowInput}
                                        placeholder={'Enter your password'}
                                        secureTextEntry={true}
                                        value={this.state.password || ''}
                                        onChangeText={(password) => this.setState({password})}
                                    />
                                </View>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <Button
                                    onPress={()=>this.setState({visibleGetPassword:false})}
                                    style={[styles.reqBtn,{backgroundColor: '#EFEFEF'}]}
                                    textstyle={[styles.reqBtnLabel,{color:'#333'}]}
                                    value='Cancel' />
                                <Button
                                    onPress={()=>{
                                        if(!this.state.password){
                                            return Toast.errorTop("Password is invalid!");
                                        }
                                        this.setState({visibleGetPassword:false},
                                            ()=>this.props.decryptWallets(this.state.password));
                                    }}
                                    style={styles.reqBtn}
                                    textstyle={styles.reqBtnLabel}
                                    value='Send' />
                            </View>
                        </View>
                    </View>
                </Modal>
                <Modal
                    transparent={true}
                    visible={!!this.state.visibleMsg}
                    onRequestClose={()=>this.setState({visibleMsg:false})}>
                    <View style={styles.reqDetailModal}>
                        <View style={styles.reqDetailBox}>
                            <View style={styles.reqDetailHeader}>
                                <Text style={styles.reqDetailTitle}>Transaction Successful</Text>
                                <Icon style={styles.reqDetailCloseIcon}
                                    onPress={()=>this.setState({visibleMsg:false})} name='close' />
                            </View>
                        </View>
                        <View style={styles.reqDetailBody}>
                            <Text style={{
                                fontSize: 15,
                                color: '#333',
                                marginBottom: 25,
                            }}>
                                Processing time: {this.state.sendTxnSuccess?
                                        Number(this.state.sendTxnSuccess.processing_duration)
                                        .toFixed(3):'0.000'} second(s){"\n\n"}
                                Your transaction will appear in your activity tab shortly.
                            </Text>
                            <Button
                                onPress={()=>this.setState({visibleMsg:false,sendTxnSuccess:null})}
                                style={styles.reqBtn}
                                textstyle={styles.reqBtnLabel}
                                value='Close' />
                        </View>
                    </View>
                </Modal>
                <Loader show={this.props.inReqs_loading} />
            </View>
        );
    }
}

function mapStateToProps({params}) {
  return {
      reqs: params.inReqs || [],
      total_reqs: params.inReqs_total || 0,
      inReqs_loading: params.inReqs_loading || false,
      loading: params.loading || false,
      search_wallet: params.search_wallet || null,
      sendTxnSuccess: params.sendTxnSuccess || null,
      decryptedWallets: params.decryptedWallets || null,
      minDate: moment(params.profile.created_ts),
      maxDate: moment()
  };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(IncomingRequests);
