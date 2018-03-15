/**
 * Outgoing Requests Container Tab
 */

import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  FlatList
} from 'react-native';
import {
    RequestTab
} from '@components';
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

    componentDidMount(){
        this.props.getOutgoingRequests();
    }

    markCancelledMoneyRequests(req){
        this.props.markCancelledMoneyRequests(req.id,req.receiver_email);
    }

    render() {
        return (
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
            />
        );
    }
}

function mapStateToProps({params}) {
  return {
      reqs: params.outReqs || [],
      total_reqs: params.outReqs_total || 0,
  };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(OutgoingRequests);
