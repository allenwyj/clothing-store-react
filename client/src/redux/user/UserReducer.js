import UserActionTypes from './UserTypes';

// set up the initial state of user
const INITIAL_STATE = {
  currentUser: null,
  error: null,
  isFetching: false
};

const userReducer = (state = INITIAL_STATE, action) => {
  // action.type will be a String
  switch (action.type) {
    case UserActionTypes.FETCHING_START:
      return {
        ...state,
        isFetching: true
      }
    case UserActionTypes.FETCHING_STOP:
      return {
        ...state,
        isFetching: false
      }
    case UserActionTypes.SIGN_IN_SUCCESS:
      // return a new object represents the newest state
      return {
        // set others state value which we don't care for this action
        ...state,
        // update the value that we care about
        currentUser: action.payload,
        error: null, // in case, if we get an error and then retry the sign in and get success
        isFetching: false
      };
    case UserActionTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
        error: null,
        isFetching: false
      };
    case UserActionTypes.SIGN_UP_FAILED:
    case UserActionTypes.SIGN_IN_FAILED:
    case UserActionTypes.SIGN_OUT_FAILED:
      return {
        ...state,
        error: action.payload,
        isFetching: false
      };
    default:
      return state;
  }
};
export default userReducer;
