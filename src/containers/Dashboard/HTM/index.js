/**
 * HTM Navigation Routes defind
 */
import React from 'react';
import { createStackNavigator } from 'react-navigation';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '@actions';

import HTM from './HTM';
import SetupHTMProfile from './SetupHTMProfile';
import EditHTMProfile from './EditHTMProfile';
import HTMListingMap from './HTMListingMap';
import HTMDetail from './HTMDetail';
import ChatRoom from './ChatRoom';
import ChatChannel from './ChatChannel';
import ChatHistory from './ChatHistory';
import FeedBack from './FeedBack';

const routes = {
    HTM: {
        screen: HTM,
    },
    SetupHTMProfile: {
        screen: SetupHTMProfile,
    },
    EditHTMProfile: {
        screen: EditHTMProfile,
    },
    HTMListingMap: {
        screen: HTMListingMap,
    },
    HTMDetail: {
        screen: HTMDetail,
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
};

const routeConfig = {
    initialRouteName: 'HTM',
    headerMode: 'none',
    navigationOptions: {
     gesturesEnabled: false,
   }
};

const HTMNavigation = createStackNavigator(routes,routeConfig);

const EnhancedComponent = class extends React.Component {

    componentDidMount(){
        this.props.customAction({
            HTMNavigation:this.refs.HTMNavigation._navigation
        });
    }
    componentWillUnmount(){
        this.props.customAction({
            HTMNavigation:null
        });
    }

    render() {
        return(
            <HTMNavigation ref='HTMNavigation' screenProps={{rootNavigation:this.props.navigation}}/>
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
