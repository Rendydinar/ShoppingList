// Reducer item (Global State, Dispatch, Reducer)
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from '../action/types';

// initialState
const initialState = {
	items: [], // list item shopping list
	loading: false // loading effect to asycn
}

export default function(state = initialState, action) {
	switch(action.type) {
		// handle get all items
		case GET_ITEMS:
			return {
				...state,
				items: action.payload, 
				loading: false // ketika fetch api get sudah selesai, hilangkan efek loading
			};
		// hanle delete item
		case DELETE_ITEM:
			return {
				...state,
				items: state.items.filter(item => item._id !== action.payload)
			}
		// handle add item
		case ADD_ITEM: 
			return {
				...state,
				items: [action.payload, ...state.items]
			};
		// handle items loading
		case ITEMS_LOADING:
			return {
				...state,
				loading: true
			}
		default:
			return state
	}
} // export reducer