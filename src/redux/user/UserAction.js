import UserActionTypes from './UserTypes';

export const setCurrentUser = user => ({
  // type name should exactly match the name in UserReducer switch cases.
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user
});

export const googleSignInStart = () => ({
  type: UserActionTypes.GOOGLE_SIGN_IN_START
});

export const googleSignInSuccess = user => ({
  type: UserActionTypes.GOOGLE_SIGN_IN_SUCCESS,
  payload: user
});

export const googleSignInFailed = error => ({
  type: UserActionTypes.GOOGLE_SIGN_IN_FAILED,
  payload: error
});

export const emailSignInStart = emailAndPassword => ({
  type: UserActionTypes.EMAIL_SIGN_IN_START,
  payload: emailAndPassword
});

export const emailSignInSuccess = user => ({
  type: UserActionTypes.EMAIL_SIGN_IN_SUCCESS,
  payload: user
});

export const emailSignInFailed = error => ({
  type: UserActionTypes.EMAIL_SIGN_IN_FAILED,
  payload: error
});
