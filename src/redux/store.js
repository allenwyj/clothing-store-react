import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import rootReducer from './RootReducer';

// Set up our middlewares
const middlewares = [logger];

// Spread all of the methods or all of the values in the array
const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;