import React, { useEffect, lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Spinner from '../../components/spinner/spinner.component';

import { fetchCollectionsStart } from '../../redux/shop/ShopActions';

import { ShopPageContainer } from './ShopPageStyles';

// add lazy loading for these two routes.
const CollectionOverviewContainer = lazy(() =>
  import('../../components/collection-overview/CollectionOverviewContainer')
);
const CollectionPageContainer = lazy(() =>
  import('../collection/CollectionContainer')
);

// because ShopPage component is being routed inside App component
// so route will automatically pass some
// props (history, location, match...) into ShopPage component
const ShopPage = ({ fetchCollectionsStart, match }) => {
  useEffect(() => {
    fetchCollectionsStart();
  }, [fetchCollectionsStart]);

  return (
    <ShopPageContainer>
      <Suspense fallback={<Spinner />}>
        <Route
          exact
          path={`${match.path}`}
          component={CollectionOverviewContainer}
        />
        <Route
          exact
          path={`${match.path}/:collectionId`}
          component={CollectionPageContainer}
        />
      </Suspense>
    </ShopPageContainer>
  );
};

const mapDispatchToProps = dispatch => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
});

export default connect(null, mapDispatchToProps)(ShopPage);
