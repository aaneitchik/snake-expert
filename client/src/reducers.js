import {combineReducers} from 'redux';

import AppReducer from './app/AppReducer';

const rootReducer = combineReducers({
	app: AppReducer
});

export default rootReducer;