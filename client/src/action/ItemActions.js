import axios from 'axios';
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from './types';
import { tokenConfig } from './authAction';
import { returnErrors } from './errorAction';

export const getItems = () => dispatch => {
	dispatch(setItemsLoading());
	// melakukan fetch API method GET ke server
	axios.get('/api/items').then(res => 
	  // jika berhasil fetch api get /api/items
	  // dispatch to action type GET_ITEMS with payload is response data
	  dispatch({
	  	type: GET_ITEMS,
	  	payload: res.data
	  }))
	  .catch(err => dispatch(returnErrors(err.response.data, err.response.status))); // jika gagal melakukan fetch api
};

export const addItem = item => (dispatch, getState) => {
	// melakukan fetch API method POST ke server
	axios.post('/api/items', item, tokenConfig(getState)).then(res =>
	  // dispatch to action type ADD_ITEM with payload is response data
	  dispatch({
	  	type: ADD_ITEM,
	  	payload: res.data
	  }))
	  .catch(err => dispatch(returnErrors(err.response.data, err.response.status))); // jika gagal melakukan fetch api
};

export const deleteItem = id => (dispatch, getState) => {
	// melakukan fetch API method DELETE ke server
	axios.delete(`/api/items/${id}`, tokenConfig(getState)).then(res =>
	  // dispatch to action type DELETE_ITEM with payload is response data
	  dispatch({
	  	type: DELETE_ITEM,
	  	payload: id
	  }))
	  .catch(err => dispatch(returnErrors(err.response.data, err.response.status))); // jika gagal melakukan fetch api
};

export const setItemsLoading = () => {
	return {
		type: ITEMS_LOADING
	};
};