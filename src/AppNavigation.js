/**
 * Navigation Routes defind
 */
import { StackNavigator } from 'react-navigation';
import Dashboard from '@containers/Dashboard';
import Login from '@containers/Login';

const routes = {
    Login: {
        screen: Login,
    },
    Dashboard: {
        screen: Dashboard,
    }
};

const routeConfig = {
    initialRouteName: 'Login',
    headerMode: 'none',
    navigationOptions: {
     gesturesEnabled: false,
   }
};

const AppNavigation = StackNavigator(routes,routeConfig);

export default AppNavigation;
