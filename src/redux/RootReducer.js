import { combineReducers } from 'redux';

import userReducer from './user/UserReducer';

export default combineReducers({
  // each reducer will return an JSON object
  user: userReducer
});
