/**
 * Navigation Routes defind
 */
import { StackNavigator } from 'react-navigation';
import Dashboard from '@containers/Dashboard';
import Login from '@containers/Login';
import ForgotPassword from '@containers/ForgotPassword';
import SignUP from '@containers/SignUP';
import Verify2FA from '@containers/Verify2FA';
import Lock from '@containers/Lock';

const routes = {
    Login: {
        screen: Login,
    },
    Lock: {
        screen: Lock,
    },
    Dashboard: {
        screen: Dashboard,
    },
    ForgotPassword: {
        screen: ForgotPassword,
    },
    SignUP: {
        screen: SignUP,
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
