import UserActionTypes from './UserTypes';

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

export const signOutStart = () => ({
  type: UserActionTypes.SIGN_OUT_START
});

export const signOutSuccess = () => ({
  type: UserActionTypes.SIGN_OUT_SUCCESS
});

export const signOutFailed = error => ({
  type: UserActionTypes.SIGN_OUT_FAILED,
  payload: error
});

export const signUpStart = userProfile => ({
  type: UserActionTypes.SIGN_UP_START,
  payload: userProfile
})

export const signUpSuccess = userProfile => ({
  type: UserActionTypes.SIGN_UP_SUCCESS,
  payload: userProfile
})

export const signUpFailed = error => ({
  type: UserActionTypes.SIGN_UP_FAILED,
  payload: error
})

export const checkUserSession = () => ({
  type: UserActionTypes.CHECK_USER_SESSION
});
