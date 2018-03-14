/**
 * Navigation Routes defind
 */
import { StackNavigator } from 'react-navigation';
import MyAccount from './MyAccount';
import Home from './Home';

const routes = {
    Home: {
        screen: Home,
    },
    MyAccount: {
        screen: MyAccount,
    },
};

const routeConfig = {
    initialRouteName: 'Home',
    headerMode: 'none',
    navigationOptions: {
     gesturesEnabled: false,
   }
};

const HomeNavigation = StackNavigator(routes,routeConfig);

export default HomeNavigation;
