import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { persistStore } from 'redux-persist';

import rootReducer from './RootReducer';

// Set up our middlewares
const middlewares = [logger];

// Spread all of the methods or all of the values in the array
const store = createStore(rootReducer, applyMiddleware(...middlewares));

// Persist version of the store
const persistor = persistStore(store);

export { store, persistor };