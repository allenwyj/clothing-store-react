import { UserActionTypes } from './UserTypes';

// set up the initial state of user
const INITIAL_STATE = {
  currentUser: null
};

const userReducer = (state = INITIAL_STATE, action) => {
  // action.type will be a String
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER:
      // return a new object represents the newest state
      return {
        // set others state value which we don't care for this action
        ...state,
        // update the value that we care about
        currentUser: action.payload
      };
    default:
      return state;
  }
};
export default userReducer;
