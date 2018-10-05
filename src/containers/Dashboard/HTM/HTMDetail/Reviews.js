/**
 * Trading Detail Container
 */

 import React, {Component} from 'react';
 import {
     View,
     FlatList
 } from 'react-native';
 import {
     Icon,
     Text
 } from '@components';
import moment from 'moment-timezone';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ActionCreators} from '@actions';

class Reviews extends Component < {} > {

    static navigationOptions = {
        header: null,
        gesturesEnabled: true,
    }

    constructor(props) {
        super(props);
        this.state = {
            htm: this.props.htm
        };
    }
    render() {
        const styles = (this.props.nightMode?require('@styles/nightMode/htm'):require('@styles/htm'));
        return(
            <FlatList
                style={styles.htmFeedbackContent}
                data={this.props.feedbacks}
                ListEmptyComponent={<Text style={{
                    textAlign: 'center',
                    marginTop: 100,
                    fontSize: 20}}>
                    No Feedback yet!
                </Text>}
                keyExtractor={(item, index) => '_feedback_'+index+'_'+item.id}
                renderItem = {({item}) => {
                    if(!item.comments && item.prof_rating == 0
                        && item.vfm_rating == 0)
                        return null;
                    let avg_rating = ((item.prof_rating + item.vfm_rating)/2);
                    if(item.prof_rating == 0 && item.vfm_rating == 0)
                        avg_rating = 0;
                    else if(item.prof_rating == 0)
                        avg_rating = item.vfm_rating;
                    else if(item.vfm_rating == 0)
                        avg_rating = item.prof_rating;

                    let time = moment(item.created_ts).calendar(null, {
                        sameDay: '[Today], h:mm A',
                        nextDay: '[Tomorrow], h:mm A',
                        nextWeek: 'dddd, h:mm A',
                        lastDay: '[Yesterday], h:mm A',
                        lastWeek: 'dddd, h:mm A',
                        sameElse: function(now){
                            now = moment(moment(now).format('01/01/YYYY'),moment.ISO_8601)
                            if (this.isBefore(now)) {
                              return 'DD MMM, YYYY h:mm A';
                            } else {
                              return 'DD MMM, h:mm A';
                            }
                        }
                    })

                    return(
                        <View style={styles.htmFeedback}>
                            <View style={styles.htmFeedbackStatus}>
                                <Icon name={item.is_txn_success?
                                    'thumbs-up':'thumbs-down'}
                                    style={[styles.htmFeedbackStatusIcon,{
                                        color: item.is_txn_success? '#0D0':'#D00'
                                    }]} />
                            </View>
                            <View style={styles.htmFeedbackDetail}>
                                {avg_rating > 0?<View style={styles.htmFeedbackRating}>
                                    {([1,2,3,4,5]).map(v=>
                                        <Icon key={'_start_'+v+'_'+item.id}
                                            style={styles.htmProfileRatingIcon}
                                            name={avg_rating>=v?'star':
                                            (avg_rating>=(v-0.5)?'star-half-o':'star-o')}/>
                                    )}
                                </View>:null}
                                {item.comments?<Text style={styles.htmFeedbackComment}>
                                    {item.comments}
                                </Text>:null}
                                <Text style={styles.htmFeedbackTime}>
                                    {time}
                                </Text>
                            </View>
                        </View>
                    );
                }} />
        )
    }
}

function mapStateToProps({params}) {
    return {
        nightMode: params.nightMode,
        htm: params.htm,
        feedbacks: params.htm_feedbacks || [],
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Reviews);
