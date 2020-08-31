import ShopActionTypes from './ShopTypes';

export const updateCollections = collectionMap => ({
  type: ShopActionTypes.UPDATE_COLLECTIONS,
  payload: collectionMap
});
