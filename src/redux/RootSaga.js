import { all, call } from 'redux-saga/effects';

import { userSagas } from './user/UserSagas';

import { fetchCollectionsStart } from './shop/ShopSagas';

export default function* rootSaga() {
  yield all([call(fetchCollectionsStart), call(userSagas)]);
}
