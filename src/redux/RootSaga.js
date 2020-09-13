import { all, call } from 'redux-saga/effects';

import { fetchCollectionsStart } from './shop/ShopSagas';

export default function* rootSaga() {
  yield all([call(fetchCollectionsStart)]);
}
