import { combineReducers } from 'redux';
import itemReducer from './ItemReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';

export default combineReducers({
	item: itemReducer,
	error: errorReducer,
	auth: authReducer
}); // export dengan flag combineReucers, karena mengimport banyak reducer

 