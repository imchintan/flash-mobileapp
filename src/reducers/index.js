import { combineReducers } from 'redux';
import navigation from '@reducers/navigation';
import login from '@reducers/login';

export default combineReducers({
    nav: navigation,
    login
});
