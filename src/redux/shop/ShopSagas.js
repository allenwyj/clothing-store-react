import { call, put, takeLatest } from 'redux-saga/effects';

import {
  firestore,
  convertCollectionsSnapshotToMap
} from '../../firebase/FirebaseUtils';

import { fetchCollectionsSuccess, fetchCollectionsFailed } from './ShopActions';

import ShopActionTypes from './ShopTypes';

export function* fetchCollectionsAsync() {
  try {
    const collectionRef = firestore.collection('collections');
    const snapshot = yield collectionRef.get();
    // snapshot will be the arg for convertCollectionsSnapshotToMap
    const collectionsMap = yield call(
      convertCollectionsSnapshotToMap,
      snapshot
    );
    yield put(fetchCollectionsSuccess(collectionsMap));
  } catch (error) {
    yield put(fetchCollectionsFailed(error.message));
  }
}

// takeEvery will create a non-blocking call in order to not stop our application to continue running
// we can control or cancel other sagas
export function* fetchCollectionsStart() {
  // takeEvery() will take two parameter,
  // the first one will be the action type that we are expecting
  // the second one will be another generator function that we want to perform.
  // yield takeEvery(
  //   ShopActionTypes.FETCH_COLLECTIONS_START,
  //   fetchCollectionsAsync
  // );

  // we don't want the API call triggered multiple times.
  yield takeLatest(
    ShopActionTypes.FETCH_COLLECTIONS_START,
    fetchCollectionsAsync
  );
}
