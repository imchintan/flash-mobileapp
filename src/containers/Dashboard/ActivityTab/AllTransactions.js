/**
 * All Transaction Container Tab
 */

import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  FlatList
} from 'react-native';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '@actions';
const styles = require("@styles/activity");

class AllTransactions extends Component<{}> {

    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount(){
        this.props.getAllTransactions();
    }

    render() {
        return (
            <FlatList
                style={styles.txnList}
                showsVerticalScrollIndicator={false}
                data={this.props.txns}
                keyExtractor={(txn, index) => (index+'_'+txn.transaction_id)}
                onEndReachedThreshold={2}
                onEndReached={()=>(this.props.txns.length < this.props.total_txns) &&
                        this.props.getAllTransactions(this.props.txns.length)}
                renderItem={({item, index})=>{
                    return(
                        <View style={[styles.txnTab, !index && {marginTop:10}]}>
                            <Image style={styles.txnIcon} source={item.receiver_profile_pic_url?{uri:item.receiver_profile_pic_url}:(item.type == 1?require('@images/send-icon.png'):require('@images/receive-icon.png'))} />
                            <View style={styles.txnDetail}>
                                <Text numberOfLines={1} style={styles.txnAmount}>{item.type == 1?'-':'+'} {item.amount}
                                <Text style={styles.txnRecvFrom}> {item.type == 1?'to':'from'} {item.sender_display_name}</Text></Text>
                                <Text style={styles.txnDateTime}> {moment(item.created_ts).format('MMM DD, YYYY hh:mm A')}</Text>
                            </View>
                            {item.type == 1?<View style={styles.txnTagSent}>
                                <Text style={styles.txnTagLabel}>Sent</Text>
                            </View>:<View style={styles.txnTag}>
                                <Text style={styles.txnTagLabel}>Recived</Text>
                            </View>}
                        </View>
                    )
                }}
            />
        );
    }
}

function mapStateToProps({params}) {
  return {
      txns: params.allTxns || [],
      total_txns: params.allTxns_total || 0,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AllTransactions);
