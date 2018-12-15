/**
 * View channel feedbacks Container
 */

 import React, {Component} from 'react';
 import {
     View,
     Image,
     TouchableOpacity,
     BackHandler
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

import { PROFILE_URL } from '@src/config';
import * as utils from '@lib/utils';
import * as constants from '@src/constants';

class ViewFeedBacks extends Component < {} > {

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
        this.mount = true;
        this.props.getHTMChannelFeedback();
        BackHandler.addEventListener('hardwareBackPress', this.backHandler.bind(this));
    }

    componentWillUnmount(){
        this.mount = false;
        BackHandler.removeEventListener('hardwareBackPress', this.backHandler.bind(this));
    }

    backHandler(){
        this.props.navigation.goBack();
        return this.mount;
    }

    render() {
        const styles = (this.props.nightMode?require('@styles/nightMode/chat'):require('@styles/chat'));
        return(
            <Container>
                <Header>
                    <HeaderLeft>
                        <TouchableOpacity>
                            <Icon onPress={() => this.props.navigation.goBack()} style={styles.headerBackIcon} name='angle-left'/>
                        </TouchableOpacity>
                    </HeaderLeft>
                    <HeaderTitle>Reviews</HeaderTitle>
                </Header>
                <Content>
                    {this.props.channelFeedbacks.map(feedback =>{
                        let img = this.props.htm.username == feedback.feedback_by_username?(this.props.htm.profile_pic_url? {uri:PROFILE_URL+this.props.htm.profile_pic_url}:
                        utils.getCurrencyIcon(constants.CURRENCY_TYPE.FLASH)):(this.props.htmProfile.profile_pic_url? {uri:PROFILE_URL+this.props.htmProfile.profile_pic_url}:
                        utils.getCurrencyIcon(constants.CURRENCY_TYPE.FLASH))
                        return (
                            <View key={feedback.channel_id + '_' + feedback.feedback_by_username}
                                style={styles.channelFeedback}>
                                <View style={styles.channelFeedbackTitle}>
                                    <Image style={styles.channelFeedbackTitleIcon}
                                        source={img} />
                                    <View>
                                        <Text style={styles.channelFeedbackTitleText}>
                                            {this.props.htm.username == feedback.feedback_by_username?
                                            this.props.htm.display_name:this.props.htmProfile.display_name + ' (You)'}
                                        </Text>
                                        <Text style={styles.channelFeedbackTitleStatus}>
                                            Mentioned trade was {feedback.is_txn_success?'':'not '}successful.
                                        </Text>
                                        <View style={styles.channelFeedbackRating}>
                                            {([1,2,3,4,5]).map(v=>
                                                <Icon key={'_start_pro_'+v} style={styles.channelfeedBackRatingIcon}
                                                    name={feedback.prof_rating>=v?'star':'star-o'}/>
                                            )}
                                        </View>
                                        {feedback.currencies_traded && feedback.currencies_traded.length > 0 && <Text
                                            style={styles.channelFeedbackCurrency}>
                                            <Text style={{color: '#121212'}}>Traded: </Text>
                                            {feedback.currencies_traded.map(currency=> utils.flashNFormatter(currency.amount,2) +' ' +
                                            utils.getCurrencyUnitUpcase(currency.currency)).join(', ')}
                                        </Text>}
                                        {feedback.comments &&
                                        <Text style={styles.channelFeedbackComment}>
                                            {feedback.comments}
                                        </Text>}
                                        <Text style={styles.channelFeedbackTime}>
                                            {moment(feedback.created_ts).calendar(null, {
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
                                            })}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        )}
                    )}
                </Content>
                <Loader show={this.props.loading} />
            </Container>
        )
    }
}

function mapStateToProps({params}) {
    return {
        loading: params.loading,
        nightMode: params.nightMode,
        htm: params.htm || {},
        htmProfile: params.htmProfile || {},
        channelFeedbacks: params.channelFeedbacks || [],
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewFeedBacks);
