/**
 * Share Out Container Tab
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

class SharingOUT extends Component<{}> {

    static navigationOptions = {
        title: 'Sharing OUT',
        header: null,
    }

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount(){
        this.props.getSharingOutTransactions(0,true);
    }

    render() {
        const styles = (this.props.nightMode?require('@styles/nightMode/activity'):require('@styles/activity'));
        return (
            <View style={{flex:1}}>
                <FlatList
                    refreshControl={
                        <RefreshControl
                            colors={['#191714']}
                            tintColor='#191714'
                            refreshing={false}
                            onRefresh={()=>this.props.getSharingOutTransactions(0,true)}/>
                    }
                    style={styles.txnList}
                    showsVerticalScrollIndicator={false}
                    data={this.props.txns}
                    keyExtractor={(txn, index) => (index+'_'+txn.transaction_id)}
                    onEndReachedThreshold={2}
                    onEndReached={()=>(this.props.txns.length < this.props.total_txns) && !this.props.retrieve &&
                            this.props.getSharingOutTransactions(this.props.txns.length)}
                    renderItem={({item, index})=>{
                        return(
                            <TransactionTab txn={item}
                                nightMode={this.props.nightMode}
                                currency_type={this.props.currency_type}
                                timezone={this.props.timezone}
                                txnLoader={this.props.txnLoader}
                                sharingOut={true}
                                txnDetail={this.props.txnDetail}
                                onPress={()=>this.props.getTransactionDetail(item.transaction_id)}
                                style={[!index && {marginTop:10}]} />
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
        txns: params.sharingOutTxns || [],
        total_txns: params.sharingOutTxns_total || 0,
        txnLoader: params.txnLoader || false,
        txnDetail: params.txnDetail || {},
        loading: params.sharingOutTxns_loading || false,
        retrieve: params.sharingOutTxns_retrieve || false,
        currency_type: params.currency_type,
        timezone: params.profile.timezone || moment.tz.guess(),
        minDate: moment(params.profile.created_ts),
        maxDate: moment(),
        nightMode: params.nightMode,
    };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SharingOUT);
