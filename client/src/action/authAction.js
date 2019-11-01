// handle authentication action to reducer.
import axios from 'axios';
import { returnErrors } from './errorAction'; // import returnErrors from errorAction reducer

import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from './types'; // import type of action reducer to handle authentication

// Check token & load user 
export const loadUser = () => (dispatch, getState) => {
  // Dispatch to action type USER_LOADING
  dispatch({ type: USER_LOADING }); 

  // fetch API GET /api/auth/user ke server dengan membawa token credential user untk mendapatkan informasi user di database
  axios.get('/api/auth/user', tokenConfig(getState))
    .then(res => dispatch({
      type: USER_LOADED,
      payload: res.data // get data response
    }))
    .catch(err => {
      // Dispatch dengan informasi dispatch(action, payload) didapatkan dari nilai balik pemanggilan function returnErros
      dispatch(returnErrors(err.response.data, err.response.status));
      // Dispatch to action type AUTH_ERROR
      dispatch({
      	type: AUTH_ERROR
      }); // jalankan action authentication error
    });
};

// Handle Register user
export const register = ({ name, email, password }) => dispatch => {
  // Headers
  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  }

  // Request body
  const body = JSON.stringify({ name, email, password });

  // Fetch API POST /api/users dengan membawa request post dan content-type request
  axios.post('/api/users', body, config)
    .then(res => dispatch({
      // jika berhasil register
      // Dispatch to action type REGISTER_SUCCESS dengan payload berupa data response
      type: REGISTER_SUCCESS, 
      payload: res.data 
    })) 
    .catch(err => {
      // jika gagal register
      // Dispatch dengan informasi dispatch(action, payload) didapatkan dari nilai balik pemanggilan function returnErros dan nilai error.id adalah REGISTER_FAIL
      dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL')); 
      // Dispatch to action type REGISTER_FAIL
      dispatch({
        type: REGISTER_FAIL,
      });
    }); 
};

// Handle Logout User
export const logout = () => {
  // Dispatch to action type LOGOUT_SUCCESS
  return {
    type: LOGOUT_SUCCESS
  }
};

// Handle Login User
export const login = ({ email, password }) => dispatch => {
  // Headers
  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  }
  // Set Request body
  const body = JSON.stringify({ email, password });
  // FETCH API POST /api/auth dengan membawa request post dan headers content-type
  axios.post('/api/auth', body, config)
    .then(res => dispatch({
      // jika berhasil login
      // dispatch to action type LOGIN_SUCCESS
      type: LOGIN_SUCCESS,
      payload: res.data
    })) 
    .catch(err => {
      // Dispatch dengan informasi dispatch(action, payload) didapatkan dari nilai balik pemanggilan function returnErros dan nilai error.id adalah REGISTER_FAIL      
      dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL')); 
      // Dispatch to action type LOGIN_FAIL
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};

// Setup config/headers and token 
export const tokenConfig = getState => {
  // Get token global state
  const token = getState().auth.token;

  // Set Headers
  const config = {
  	headers: {
  		"Content-type": "application/json"
  	}
  }
 
  // If token, add to headers
  if(token) {
  	config.headers['x-auth-token'] = token;
  }
  
  return config; // return header with token
}