/**
 * Outgoing Requests Container Tab
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
    RequestTab
} from '@components';
import moment from 'moment-timezone';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '@actions';
const styles = require("@styles/pending");

class OutgoingRequests extends Component<{}> {

    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);
        this.state = {};
    }

    markCancelledMoneyRequests(req){
        this.props.markCancelledMoneyRequests(req.id,req.receiver_email);
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
                            this.props.getOutgoingRequests(this.props.reqs.length)}
                    renderItem={({item, index})=>{
                        return(
                            <RequestTab
                                outgoing={true}
                                req={item}
                                onCancel={this.markCancelledMoneyRequests.bind(this)}
                                style={[!index && {marginTop:10}]} />
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
                <Loader show={this.props.loading} />
            </View>
        );
    }
}

function mapStateToProps({params}) {
  return {
      reqs: params.outReqs || [],
      total_reqs: params.outReqs_total || 0,
      loading: params.outReqs_loading || false,
      minDate: moment(params.profile.created_ts),
      maxDate: moment()
  };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(OutgoingRequests);
