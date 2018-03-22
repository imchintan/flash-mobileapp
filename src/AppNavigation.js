/**
 * Navigation Routes defind
 */
import { StackNavigator } from 'react-navigation';
import Dashboard from '@containers/Dashboard';
import Login from '@containers/Login';
import ForgotPassword from '@containers/ForgotPassword';
import Verify2FA from '@containers/Verify2FA';

const routes = {
    Login: {
        screen: Login,
    },
    Dashboard: {
        screen: Dashboard,
    },
    ForgotPassword: {
        screen: ForgotPassword,
    },
    Verify2FA: {
        screen: Verify2FA,
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
