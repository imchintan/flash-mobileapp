/**
 * HTM Navigation Routes defind
 */
import React from 'react';
import { createStackNavigator } from 'react-navigation';
import HTM from './HTM';
import SetupHTMProfile from './SetupHTMProfile';
import EditHTMProfile from './EditHTMProfile';
import HTMListingMap from './HTMListingMap';
import MerchantDetail from './MerchantDetail';
import ChatRoom from './ChatRoom';
import ChatHistory from './ChatHistory';

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
    MerchantDetail: {
        screen: MerchantDetail,
    },
    ChatRoom: {
        screen: ChatRoom,
    },
    ChatHistory: {
        screen: ChatHistory,
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

    render() {
        return(
            <HTMNavigation screenProps={{rootNavigation:this.props.navigation}}/>
        )
    }
}

export default EnhancedComponent;
