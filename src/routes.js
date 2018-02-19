/**
 * Navigation Routes defind
 */
import { StackNavigator } from 'react-navigation';
import Home from '@containers/Home';
import Login from '@containers/Login';

const routes = {
    Home: {
        screen: Home,
    },
    Login: {
        screen: Login,
    }
};

const routeConfig = {
    initialRouteName: 'Home',
    headerMode: 'none',
    navigationOptions: {
     gesturesEnabled: false,
   }
};

const AppNavigation = StackNavigator(routes,routeConfig);

export default AppNavigation;
