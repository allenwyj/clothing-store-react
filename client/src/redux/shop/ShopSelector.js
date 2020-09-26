import { createSelector } from 'reselect';
import memoize from 'lodash.memoize';

const selectShop = state => state.shop;

export const selectCollections = createSelector(
  [selectShop],
  shop => shop.collections
);

export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  collections =>
    collections ? Object.keys(collections).map(key => collections[key]) : []
);

// selectCollection is a currying function (a function returns another function)
// The returned function will take the state to perform the transmission with other selectors.
// collectionUrlParam will be the value passed into from the url
//
// memoize does memorise the the returned function( the selector ), if the
// collectionUrlParam is the same, it won't return the function.
export const selectCollection = memoize(collectionUrlParam =>
  createSelector([selectCollections], collections =>
    collections ? collections[collectionUrlParam] : null
  )
);

export const selectIsCollectionFetching = createSelector(
  [selectShop],
  shop => shop.isFetching
);

export const selectIsCollectionsLoaded = createSelector(
  [selectShop],
  shop => !!shop.collections // converted falsy or truthy value to boolean value
);
