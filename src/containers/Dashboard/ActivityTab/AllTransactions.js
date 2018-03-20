/**
 * All Transaction Container Tab
 */

import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList
} from 'react-native';
import {
    Loader,
    Button,
    TransactionTab
} from '@components';
import moment from 'moment-timezone';
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

    render() {
        return (
            <View style={{flex:1}}>
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
                            <TransactionTab txn={item} style={[!index && {marginTop:10}]} />
                        );
                    }}
                    ListEmptyComponent={()=>{
                        return(
                            <View>
                                <Text style={styles.txnListEmpty}>
                                    You have other transactions before this date range.
                                    Please click Show All Activity to view.
                                </Text>
                                <Button
                                    onPress={()=>this.props.updateTransactionReportDate(this.props.minDate,
                                        this.props.maxDate)}
                                    style={styles.txnShowAllBtn}
                                    textstyle={styles.txnShowAllBtnText}
                                    value='Show All Activity' />
                            </View>
                        )
                    }}
                />
                <Loader show={this.props.loading} />
            </View>
        );
    }
}

function mapStateToProps({params}) {
  return {
      txns: params.allTxns || [],
      total_txns: params.allTxns_total || 0,
      loading: params.allTxns_loading || false,
      minDate: moment(params.profile.created_ts),
      maxDate: moment()
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AllTransactions);
