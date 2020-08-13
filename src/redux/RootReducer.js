import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './user/UserReducer';
import cartReducer from './cart/CartReducer';
import directoryReducer from './directory/DirectoryReducer';
import shopReducer from './shop/ShopReducer';

// defining the new persist config
const persistConfig = {
  key: 'root', // storing from the root.
  storage, // pointing the storage object that we imported from redux
  whitelist: ['cart']
};

const rootReducer = combineReducers({
  // each reducer will return an JSON object
  user: userReducer,
  cart: cartReducer,
  directory: directoryReducer,
  shop: shopReducer
});

export default persistReducer(persistConfig, rootReducer);
