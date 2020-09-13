import ShopActionTypes from './ShopTypes';
import {
  firestore,
  convertCollectionsSnapshotToMap
} from '../../firebase/FirebaseUtils';

export const fetchCollectionsStart = collectionsMap => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_START,
  payload: collectionsMap
});

export const fetchCollectionsSuccess = collectionsMap => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionsMap
});

export const fetchCollectionsFailed = errorMessage => ({
  type: ShopActionTypes.fetchCollectionsFailed,
  payload: errorMessage
});

// Using for redux-thunk
export const fetchCollectionsStartAsync = () => {
  return dispatch => {
    const collectionRef = firestore.collection('collections');
    dispatch(fetchCollectionsStart());
    
    collectionRef
      .get()
      .then(snapshot => {
        const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        dispatch(fetchCollectionsSuccess(collectionsMap));
      })
      .catch(error => dispatch(fetchCollectionsFailed(error.message)));
  };
};
