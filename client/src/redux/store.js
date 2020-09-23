import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './RootReducer';
import rootSaga from './RootSaga';

// Set up saga middleware
const sagaMiddleware = createSagaMiddleware();

// Set up our middlewares
const middlewares = [sagaMiddleware];

// only apply the logger in the dev environment
if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

// Spread all of the methods or all of the values in the array
const store = createStore(rootReducer, applyMiddleware(...middlewares));

// Register the saga function
sagaMiddleware.run(rootSaga);

// Persist version of the store
const persistor = persistStore(store);

export { store, persistor };
