/**
 * Outgoing Requests Container Tab
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
    RequestTab
} from '@components';
import moment from 'moment-timezone';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '@actions';
const styles = require("@styles/pending");

class OutgoingRequests extends Component<{}> {

    static navigationOptions = ({ navigation, screenProps }) =>{
        return ({
            title:'Outgoing'+(screenProps.outReqs_total > 0?` (${screenProps.outReqs_total})` :''),
        })
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
                    refreshControl={
                        <RefreshControl
                            colors={['#191714']}
                            tintColor='#191714'
                            refreshing={false}
                            onRefresh={()=>this.props.getOutgoingRequests(0,true)}/>
                    }
                    style={styles.reqList}
                    showsVerticalScrollIndicator={false}
                    data={this.props.reqs}
                    keyExtractor={(req, index) => (index+'_'+req.id)}
                    onEndReachedThreshold={5}
                    onEndReached={()=>(this.props.reqs.length < this.props.total_reqs) &&
                        this.props.getOutgoingRequests(this.props.reqs.length)}
                    renderItem={({item, index})=>
                        <RequestTab
                            outgoing={true}
                            timezone={this.props.timezone}
                            req={item}
                            onCancel={this.markCancelledMoneyRequests.bind(this)}
                            style={[!index && {marginTop:10}]} />
                    }
                    ListEmptyComponent={()=>
                        <View>
                            <Text style={styles.reqListEmpty}>
                                There is no request in this date range.
                            </Text>
                            <Button value='Show All Requests'
                                onPress={()=>this.props.updateRequestReportDate(this.props.minDate,
                                    this.props.maxDate)}/>
                        </View>
                    }
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
      timezone: params.profile.timezone || moment.tz.guess(),
      minDate: moment(params.profile.created_ts),
      maxDate: moment()
  };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(OutgoingRequests);
