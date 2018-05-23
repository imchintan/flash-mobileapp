/**
 * Dashboard Navigation Routes defind
 */
import { StackNavigator } from 'react-navigation';
import Home from './Home';

const routes = {
    Home: {
        screen: Home,
    },
    // Lock: {
    //     screen: Lock,
    // },
    // Dashboard: {
    //     screen: Dashboard,
    // },
    // ForgotPassword: {
    //     screen: ForgotPassword,
    // },
    // SignUP: {
    //     screen: SignUP,
    // },
    // Verify2FA: {
    //     screen: Verify2FA,
    // },
    // MigrateAccount: {
    //     screen: MigrateAccount,
    // }
};

const routeConfig = {
    initialRouteName: 'Home',
    headerMode: 'none',
    navigationOptions: {
        gesturesEnabled: false,
   }
};

const DashboardNavigation = StackNavigator(routes,routeConfig);

export default DashboardNavigation;
