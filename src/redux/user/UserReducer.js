import UserActionTypes from './UserTypes';

// set up the initial state of user
const INITIAL_STATE = {
  currentUser: null,
  error: null
};

const userReducer = (state = INITIAL_STATE, action) => {
  // action.type will be a String
  switch (action.type) {
    case UserActionTypes.GOOGLE_SIGN_IN_SUCCESS:
    case UserActionTypes.EMAIL_SIGN_IN_SUCCESS:
      // return a new object represents the newest state
      return {
        // set others state value which we don't care for this action
        ...state,
        // update the value that we care about
        currentUser: action.payload,
        error: null // in case, if we get an error and then retry the sign in and get success
      };
    case UserActionTypes.GOOGLE_SIGN_IN_FAILED:
    case UserActionTypes.EMAIL_SIGN_IN_FAILED:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
export default userReducer;
