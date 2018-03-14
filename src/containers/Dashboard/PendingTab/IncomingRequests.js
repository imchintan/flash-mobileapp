/**
 * Incoming Requests Container Tab
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

class IncomingRequests extends Component<{}> {

    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount(){
        this.props.getIncomingRequests();
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
                        this.props.getIncomingRequests(this.props.reqs.length)}
                renderItem={({item, index})=>{
                    return(
                        <RequestTab req={item} style={[!index && {marginTop:10}]} />
                    );
                }}
            />
        );
    }
}

function mapStateToProps({params}) {
  return {
      reqs: params.inReqs || [],
      total_reqs: params.inReqs_total || 0,
  };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(IncomingRequests);
