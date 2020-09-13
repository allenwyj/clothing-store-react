import { takeLatest, put, all, call } from 'redux-saga/effects';

import UserActionTypes from './UserTypes';

import { googleSignInSuccess, googleSignInFailed } from './UserAction';

import {
  auth,
  googleProvider,
  createUserProfileDocument
} from '../../firebase/FirebaseUtils';

export function* signInWithGoogle() {
  try {
    // We put this auth.signInWIthPopup() instead of doing this in FIrebaseUtils.js is because
    // we want to access the value that gets returned when the success happens with our signInWithPopup
    const { user } = yield auth.signInWithPopup(googleProvider);
    // Getting user reference object from the firebase
    const userRef = yield call(createUserProfileDocument, user);
    const userSnapshot = yield userRef.get();
    yield put(
      googleSignInSuccess({ id: userSnapshot.id, ...userSnapshot.data() })
    );
  } catch (error) {
    yield put(googleSignInFailed(error));
  }
}

export function* onGoogleSignInStart() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

// Compose all user sagas together and put them into root sagas.
export function* userSagas() {
  yield all([call(onGoogleSignInStart)]);
}
