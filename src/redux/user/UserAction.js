import UserActionTypes from './UserTypes';

// export const setCurrentUser = user => ({
//   // type name should exactly match the name in UserReducer switch cases.
//   type: UserActionTypes.SET_CURRENT_USER,
//   payload: user
// });

export const googleSignInStart = () => ({
  type: UserActionTypes.GOOGLE_SIGN_IN_START
});

export const emailSignInStart = emailAndPassword => ({
  type: UserActionTypes.EMAIL_SIGN_IN_START,
  payload: emailAndPassword
});

export const signInSuccess = user => ({
  type: UserActionTypes.SIGN_IN_SUCCESS,
  payload: user
});

export const signInFailed = error => ({
  type: UserActionTypes.SIGN_IN_FAILED,
  payload: error
});
