import { combineReducers } from 'redux';

import userReducer from './user/UserReducer';
import cartReducer from './cart/CartReducer';

export default combineReducers({
  // each reducer will return an JSON object
  user: userReducer,
  cart: cartReducer
});
