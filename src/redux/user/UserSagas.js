import { takeLatest, put, all, call } from 'redux-saga/effects';

import UserActionTypes from './UserTypes';

import { signInSuccess, signInFailed } from './UserAction';

import {
  auth,
  googleProvider,
  createUserProfileDocument
} from '../../firebase/FirebaseUtils';

export function* getSnapshotFromUserAuth(userAuth) {
  try {
    // Getting user reference object from the firebase
    const userRef = yield call(createUserProfileDocument, userAuth);
    const userSnapshot = yield userRef.get();
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* signInWithGoogle() {
  try {
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
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* onGoogleSignInStart() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

// Compose all user sagas together and put them into root sagas.
export function* userSagas() {
  yield all([call(onGoogleSignInStart), call(onEmailSignInStart)]);
}
