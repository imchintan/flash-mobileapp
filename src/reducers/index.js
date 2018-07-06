import { combineReducers } from 'redux';
import navigation from '@reducers/navigation';
import params from '@reducers/params';

export default combineReducers({
    nav: navigation,
    params: params,
});
