/**
 * Sharing Code Navigation Routes defind
 */
import React from 'react';
import { createStackNavigator } from 'react-navigation';
import CodeDetails from './CodeDetails';
import GenerateCode from './GenerateCode';
import AddAddresses from './AddAddresses';

const routes = {
    CodeDetails: {
        screen: CodeDetails,
    },
    GenerateCode: {
        screen: GenerateCode,
    },
    AddAddresses: {
        screen: AddAddresses,
    },
};

const routeConfig = {
    initialRouteName: 'CodeDetails',
    headerMode: 'none',
    navigationOptions: {
     gesturesEnabled: false,
   }
};

const SharingCodeNavigation = createStackNavigator(routes,routeConfig);

const EnhancedComponent = class extends React.Component {

    static navigationOptions = ({ navigation, screenProps }) =>{
        return ({
            title:'Share Code',
        })
    }

    render() {
        return(
            <SharingCodeNavigation />
        )
    }
}

export default EnhancedComponent;
