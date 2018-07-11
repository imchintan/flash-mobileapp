/**
 * Navigation Routes defind
 */
import { createStackNavigator } from 'react-navigation';
import Dashboard from '@containers/Dashboard';
import Login from '@containers/Login';
import ForgotPassword from '@containers/ForgotPassword';
import SignUP from '@containers/SignUP';
import Verify2FA from '@containers/Verify2FA';
import MigrateAccount from '@containers/MigrateAccount';

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
    SignUP: {
        screen: SignUP,
    },
    Verify2FA: {
        screen: Verify2FA,
    },
    MigrateAccount: {
        screen: MigrateAccount,
    }
};

const routeConfig = {
    initialRouteName: 'Login',
    headerMode: 'none',
    navigationOptions: {
     gesturesEnabled: false,
   }
};

const AppNavigation = createStackNavigator(routes,routeConfig);

export default AppNavigation;
