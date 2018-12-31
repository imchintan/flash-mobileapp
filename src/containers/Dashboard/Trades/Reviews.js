/**
 * HTM reviews Container
 */

 import React, {Component} from 'react';
 import {
     View,
     FlatList,
     TouchableOpacity
 } from 'react-native';
 import {
     Container,
     Content,
     Header,
     HeaderLeft,
     HeaderTitle,
     Icon,
     Text,
     Loader
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
        };
    }

    componentDidMount(){
        this.props.getHTMFeedbacks(false);
    }

    render() {
        const styles = (this.props.nightMode?require('@styles/nightMode/htm'):require('@styles/htm'));
        return(
            <Container>
                <Header>
                    <HeaderLeft>
                        <TouchableOpacity>
                            <Icon onPress={()=>this.props.navigation.goBack()}
                                style={styles.headerBackIcon} name='angle-left' />
                        </TouchableOpacity>
                    </HeaderLeft>
                    <HeaderTitle>Reviews</HeaderTitle>
                </Header>
                <Content>
                    <View style={styles.htmProfileContent}>
                        {this.props.feedbacks.length > 0 && <View>
                            <View style={styles.tradeReviewFilter}>
                                <TouchableOpacity style={styles.tradeReviewFilterBtn}
                                    onPress={()=>this.setState({filterBy:0})}>
                                    <Icon style={styles.tradeReviewFilterIcon}
                                        name={!this.state.filterBy || this.state.filterBy ==0?
                                            'dot-circle-o':'circle-o'}
                                    />
                                    <Text style={styles.tradeReviewFilterText}>All</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.tradeReviewFilterBtn}
                                    onPress={()=>this.setState({filterBy:1})}>
                                    <Icon style={styles.tradeReviewFilterIcon}
                                        name={this.state.filterBy==1?'dot-circle-o':'circle-o'}
                                    />
                                    <Text style={styles.tradeReviewFilterText}>Successful</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.tradeReviewFilterBtn}
                                    onPress={()=>this.setState({filterBy:2})}>
                                    <Icon style={styles.tradeReviewFilterIcon}
                                        name={this.state.filterBy==2?'dot-circle-o':'circle-o'}
                                    />
                                    <Text style={styles.tradeReviewFilterText}>Unsuccessful</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.hr}/>
                        </View>}
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

                                let filterBy = (this.state.filterBy || 0);
                                if(filterBy == 1 && !item.is_txn_success)
                                    return ;
                                if(filterBy == 2 && item.is_txn_success)
                                    return ;

                                if(!item.comments && item.prof_rating == 0)
                                    return null;

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
                                                'check':'exclamation'}
                                                style={[styles.htmFeedbackStatusIcon,{
                                                    color: item.is_txn_success? '#0D0':'#F80'
                                                }]} />
                                        </View>
                                        <View style={styles.htmFeedbackDetail}>
                                            <Text style={styles.htmFeedbackTitleText}>
                                                {item.display_name || ''}
                                            </Text>
                                            {item.prof_rating > 0?<View style={styles.htmFeedbackRating}>
                                                {([1,2,3,4,5]).map(v=>
                                                    <Icon key={'_start_'+v+'_'+item.id}
                                                        style={styles.htmProfileRatingIcon}
                                                        name={item.prof_rating>=v?'star':
                                                        (item.prof_rating>=(v-0.5)?'star-half-o':'star-o')}/>
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
                            }}
                        />
                    </View>
                </Content>
                <Loader show={this.props.loading &&
                    this.props.feedbacks.length == 0}/>
            </Container>
        )
    }
}

function mapStateToProps({params}) {
    return {
        loading: params.loading,
        nightMode: params.nightMode,
        feedbacks: params.feedbacks || [],
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Reviews);
