/**
 * All Transaction Container Tab
 */

import React, { Component } from 'react';
import {
    View,
    FlatList,
    RefreshControl
} from 'react-native';
import {
    Loader,
    Button,
    Text,
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

    componentDidMount(){
        this.props.getAllTransactions(0,true);
    }

    render() {
        return (
            <View style={{flex:1}}>
                <FlatList
                    refreshControl={
                        <RefreshControl
                            colors={['#191714']}
                            tintColor='#191714'
                            refreshing={false}
                            onRefresh={()=>this.props.getAllTransactions(0,true)}/>
                    }
                    style={styles.txnList}
                    showsVerticalScrollIndicator={false}
                    data={this.props.txns}
                    keyExtractor={(txn, index) => (index+'_'+txn.transaction_id)}
                    onEndReachedThreshold={2}
                    onEndReached={()=>(this.props.txns.length < this.props.total_txns) && !this.props.retrieve &&
                        this.props.getAllTransactions(this.props.txns.length)}
                    renderItem={({item, index})=>{
                        return(
                            <TransactionTab txn={item} timezone={this.props.timezone} style={[!index && {marginTop:10}]} />
                        );
                    }}
                    ListEmptyComponent={()=>{
                        return(
                            <View>
                                <Text style={styles.txnListEmpty}>
                                    You have other transactions before this date range.
                                    Please click Show All Activity to view.
                                </Text>
                                <Button value='Show All Activity'
                                    onPress={()=>this.props.updateTransactionReportDate(this.props.minDate,
                                        this.props.maxDate)}/>
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
      retrieve: params.allTxns_retrieve || false,
      timezone: params.profile.timezone || moment.tz.guess(),
      minDate: moment(params.profile.created_ts),
      maxDate: moment()
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AllTransactions);
