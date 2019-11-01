// import { createStore, applyMiddleware, compose } from 'redux';
// import thunk from 'redux-thunk';
// import rootReducer from './reducers';

// const initialState = {};

// const middleware = [thunk];

// const store = createStore(
// 	rootReducer, 
// 	initialState, 
// 	compose(
// 	  applyMiddleware(...middleware),
// 	  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//     )
// );

// export default store;
// 
 
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'; // import redux-thunk
import rootReducer from './reducers'; // import reducer utama (root reducer)

const initialState = {}; // initial state

const middleware = [thunk]; // middleware 

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// buat store dengan reducer yang sudah diimport
const store = createStore( 
	rootReducer,
	// initialState, 
	compose(
	  applyMiddleware(...middleware),
	  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export default store;