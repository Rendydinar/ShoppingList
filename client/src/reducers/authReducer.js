// Action Reducer to Auth User
import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from '../action/types'; // import type-type action to action authReducer

// initialState (local state)
const initialState = {
	token: localStorage.getItem('token'), // ambil token di localstorage browser
	isAuthenticated: null,
	isLoading: false,
	user: null
}

export default function (state = initialState, action) {
	switch(action.type) {
	  // handle action USER_LOADING
	  case USER_LOADING:
	    return {
	      ...state,
	      isLoading: true
	    };
	  // handle action USER_LOADED
	  case USER_LOADED:
	    return {
	      ...state,
	      isAuthenticated: true,
	      isLoading: false,
	       user: action.payload
	    };
	  // handle action LOGIN_SUCCESS AND REGISTER_SUCCESS
	  case LOGIN_SUCCESS:
	  case REGISTER_SUCCESS:
	  localStorage.setItem('token', action.payload.token); // set token to localstorage
	    return {
	      ...state,
	      ...action.payload,
	      isAuthenticated: true,
	      isLoading: false,
	    };
	  // handle action AUTH_ERROR, LOGIN_FAIL, LOGOUT_SUCCESS AND REGISTER_FAIL  
	  case AUTH_ERROR:
	  case LOGIN_FAIL:
	  case LOGOUT_SUCCESS:
	  case REGISTER_FAIL:
	    localStorage.removeItem('token'); // hapus token di localstorage
	    return {
	      ...state,
	      token: null,
	      user: null,
	      isAuthenticated: false,
	      isLoading: false
	    };
	  // default action
	  default:
	    return state; 
	}
}