/**
 * Wagering Navigation Component
 */
import React from 'react';
import { createStackNavigator } from 'react-navigation';
import Wagering from './Wagering';
import SetupProfile from './Profile/Setup';
import EditProfile from './Profile/Edit';
import CreateEvent from './Event/Create';
import EventDetail from './Event/Detail';
const routes = {
    Wagering: {
        screen: Wagering,
    },
    SetupProfile: {
        screen: SetupProfile,
    },
    EditProfile: {
        screen: EditProfile,
    },
    CreateEvent: {
        screen: CreateEvent,
    },
    EventDetail: {
        screen: EventDetail,
    },
};

const routeConfig = {
    initialRouteName: 'Wagering',
    headerMode: 'none',
    navigationOptions: {
    gesturesEnabled: false,
   }
};

const MyWageringNavigation = createStackNavigator(routes,routeConfig);

const EnhancedComponent = class extends React.Component {

    static navigationOptions = {
        header: null,
        gesturesEnabled: true,
    }

    render() {
        return(
            <MyWageringNavigation screenProps={{navigation:this.props.navigation}} />
        )
    }
}

export default EnhancedComponent;
