import { NavigationActions } from 'react-navigation';

import AppNavigator from '@src/AppNavigation';
import * as types from '@actions/types';

const initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('Login'));

function navigateAction({ routeName, id }) {
  return NavigationActions.navigate({ routeName, params: { id } });
}

const navigation = (state = initialState, action) => {
    switch (action.type) {
        case 'Navigation/NAVIGATE':
            return AppNavigator.router.getStateForAction(
                navigateAction(action),
                state
            );

        case 'Navigation/BACK':
            return AppNavigator.router.getStateForAction(
                NavigationActions.back(),
                state
            );

        case types.LOGOUT:
            return AppNavigator.router.getStateForAction(
                NavigationActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({ routeName: 'Login' }),
                    ],
                }),
                state
            );

        case types.VERIFY_2FA:
            return AppNavigator.router.getStateForAction(
                NavigationActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({ routeName: 'Verify2FA' }),
                    ],
                }),
                state
            );

        case types.MIGRATE_ACCOUNT:
            return AppNavigator.router.getStateForAction(
                NavigationActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({ routeName: 'MigrateAccount' }),
                    ],
                }),
                state
            );

        // case types.VERIFY_2FA_SUCCESS:
        // case types.LOGIN_SUCCESS:
        case types.GET_PROFILE:
            return AppNavigator.router.getStateForAction(
                NavigationActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({ routeName: 'Dashboard' }),
                    ],
                }),
                state
            );

        default:
            return state;
    }
};

export default navigation;
