/**
 * Payment Recevied Container Tab
 */

import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  FlatList
} from 'react-native';
import {
    TransactionTab
} from '@components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '@actions';
const styles = require("@styles/activity");

class PaymentReceived extends Component<{}> {

    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount(){
        this.props.getReceivedTransactions();
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
                        this.props.getReceivedTransactions(this.props.txns.length)}
                renderItem={({item, index})=>{
                    return(
                        <TransactionTab txn={item} style={[!index && {marginTop:10}]} />
                    );
                }}
            />
        );
    }
}

function mapStateToProps({params}) {
  return {
      txns: params.receivedTxns || [],
      total_txns: params.receivedTxns_total || 0,
  };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentReceived);
