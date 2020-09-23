import { all, call } from 'redux-saga/effects';

import { userSagas } from './user/UserSagas';
import { cartSagas } from './cart/CartSagas';
import { shopSagas } from './shop/ShopSagas';

// Register all of our sagas
export default function* rootSaga() {
  yield all([call(shopSagas), call(userSagas), call(cartSagas)]);
}
