import { takeLatest, put, all, call } from 'redux-saga/effects';

import UserActionTypes from './UserTypes';

import {
  signInSuccess,
  signInFailed,
  signOutSuccess,
  signOutFailed,
  signUpFailed,
  signUpSuccess,
  fetchingStart
} from './UserAction';

import {
  auth,
  googleProvider,
  createUserProfileDocument,
  getCurrentUser
} from '../../firebase/FirebaseUtils';

export function* getSnapshotFromUserAuth(userAuth, additionalData) {
  try {
    // Getting user reference object from the firebase
    const userRef = yield call(
      createUserProfileDocument,
      userAuth,
      additionalData
    );
    const userSnapshot = yield userRef.get();
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* signInWithGoogle() {
  try {
    yield put(fetchingStart());
    // We put this auth.signInWIthPopup() instead of doing this in FIrebaseUtils.js is because
    // we want to access the value that gets returned when the success happens with our signInWithPopup
    const { user } = yield auth.signInWithPopup(googleProvider);
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

// This saga generator takes the action object which is being dispatched.
export function* signInWithEmail({ payload: { email, password } }) {
  try {
    yield put(fetchingStart());
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* isUserAuthenticated() {
  try {
    yield put(fetchingStart());
    const userAuth = yield getCurrentUser();
    // If there is no user session, end this function
    if (!userAuth) return;

    yield getSnapshotFromUserAuth(userAuth);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* signOut() {
  try {
    yield put(fetchingStart());
    yield auth.signOut();
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailed(error));
  }
}

export function* signUpWithUserProfile({
  payload: { email, password, displayName }
}) {
  try {
    yield put(fetchingStart());
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    // PAssing user object and adding displayName field into the new object
    yield put(signUpSuccess({ user, additionalData: { displayName } }));
  } catch (error) {
    yield put(signUpFailed(error));
    alert(error);
  }
}

export function* signInAfterSignUpSuccess({
  payload: { user, additionalData }
}) {
  yield getSnapshotFromUserAuth(user, additionalData);
}

export function* onGoogleSignInStart() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onCheckUserSession() {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onSignOutStart() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

export function* onSignUpStart() {
  yield takeLatest(UserActionTypes.SIGN_UP_START, signUpWithUserProfile);
}

export function* onSignUpSuccess() {
  yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUpSuccess);
}

// Compose all user sagas together and put them into root sagas.
export function* userSagas() {
  yield all([
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onCheckUserSession),
    call(onSignOutStart),
    call(onSignUpStart),
    call(onSignUpSuccess)
  ]);
}
