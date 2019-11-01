// Action Reducer to Action Error
import { GET_ERRORS, CLEAR_ERRORS } from '../action/types'; // import type-type action to action errorReducer

// initial state (lokal state)
const initialState = {
	msg: {},
	status: null,
	id: null
}

export default function(state = initialState, action) {
	switch(action.type) {
		// handle action GET_ERRORS
		case GET_ERRORS:
		  return {
		  	msg: action.payload.msg,
		  	status: action.payload.status,
		  	id: action.payload.id
		  };
		// handle action CLEAR_ERRORS
		case CLEAR_ERRORS:
		  return {
		  	msg: {},
		  	status: null,
		  	id: null
		  };
		// default action
		default:
		  return state;
	}
}