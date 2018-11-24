/**
 * HTM Navigation Routes defind
 */
import React from 'react';
import { createStackNavigator } from 'react-navigation';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '@actions';

import Profile from './Profile';
import SetupProfile from './SetupProfile';
import EditProfile from './EditProfile';
import FindTrades from './FindTrades';
import TradeDetail from './TradeDetail';
import Reviews from './Reviews';

import ChatRoom from './Chat/ChatRoom';
import ChatChannel from './Chat/ChatChannel';
import ChatHistory from './Chat/ChatHistory';
import FeedBack from './Chat/FeedBack';
import ViewFeedBacks from './Chat/ViewFeedBacks';
import ShareLocation from './Chat/ShareLocation';

import Ads from './Ads';
import CreateAd from './Ads/CreateAd';
import EditAd from './Ads/EditAd';

const routes = {
    Profile: {
        screen: Profile,
    },
    SetupProfile: {
        screen: SetupProfile,
    },
    EditProfile: {
        screen: EditProfile,
    },
    FindTrades: {
        screen: FindTrades,
    },
    TradeDetail: {
        screen: TradeDetail,
    },
    ChatRoom: {
        screen: ChatRoom,
    },
    ChatChannel: {
        screen: ChatChannel,
    },
    ChatHistory: {
        screen: ChatHistory,
    },
    FeedBack: {
        screen: FeedBack,
    },
    ViewFeedBacks: {
        screen: ViewFeedBacks,
    },
    Reviews: {
        screen: Reviews,
    },
    ShareLocation: {
        screen: ShareLocation,
    },
    Ads: {
        screen: Ads,
    },
    CreateAd: {
        screen: CreateAd,
    },
    EditAd: {
        screen: EditAd,
    },
};

const routeConfig = {
    initialRouteName: 'Profile',
    headerMode: 'none',
    navigationOptions: {
        gesturesEnabled: false,
   }
};

const TradesNavigation = createStackNavigator(routes,routeConfig);

const EnhancedComponent = class extends React.Component {

    componentDidMount(){
        this.props.customAction({
            TradesNavigation:this.refs.TradesNavigation._navigation
        });
    }
    componentWillUnmount(){
        this.props.customAction({
            TradesNavigation:null
        });
    }

    render() {
        return(
            <TradesNavigation ref='TradesNavigation' screenProps={{rootNavigation:this.props.navigation}}/>
        )
    }
}

function mapStateToProps({params}) {
    return {
        isLoggedIn: params.isLoggedIn,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EnhancedComponent)
