import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CollectionOverview from '../../components/collection-overview/CollectionOverview';
import CollectionPage from '../collection/CollectionPage';

import {
  firestore,
  convertCollectionsSnapshotToMap
} from '../../firebase/FirebaseUtils';

import { updateCollections } from '../../redux/shop/ShopActions';
import WithSpinner from '../../components/with-spinner/WithSpinner';

const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

// because ShopPage component is being routed inside App component
// so route will automatically pass some
// props (history, location, match...) into ShopPage component
class ShopPage extends React.Component {
  // react will generate the constructor for us
  state = {
    loading: true
  };

  unsubscribeFromSnapshot = null;

  componentDidMount() {
    const { updateCollections } = this.props;
    const collectionRef = firestore.collection('collections');

    collectionRef.onSnapshot(async snapShot => {
      // convert the collection structure to match the needed structure in our App
      const collectionsMap = convertCollectionsSnapshotToMap(snapShot);
      updateCollections(collectionsMap);
      this.setState({ loading: false });
    });
  }

  render() {
    const { match } = this.props;
    const { loading } = this.props;

    return (
      <div className="shop-page">
        <Route
          exact
          path={`${match.path}`}
          render={props => (
            <CollectionOverviewWithSpinner isLoading={loading} {...props} />
          )}
        />
        <Route
          path={`${match.path}/:collectionId`}
          render={props => (
            <CollectionPageWithSpinner isLoading={loading} {...props} />
          )}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateCollections: collectionsMap =>
    dispatch(updateCollections(collectionsMap))
});

export default connect(null, mapDispatchToProps)(ShopPage);
