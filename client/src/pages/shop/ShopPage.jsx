import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CollectionOverviewContainer from '../../components/collection-overview/CollectionOverviewContainer';
import CollectionPageContainer from '../collection/CollectionContainer';

import { fetchCollectionsStart } from '../../redux/shop/ShopActions';

import { ShopPageContainer } from './ShopPageStyles';

// because ShopPage component is being routed inside App component
// so route will automatically pass some
// props (history, location, match...) into ShopPage component
const ShopPage = ({ fetchCollectionsStart, match }) => {
  useEffect(() => {
    fetchCollectionsStart();
  }, [fetchCollectionsStart]);

  return (
    <ShopPageContainer>
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
    </ShopPageContainer>
  );
};

const mapDispatchToProps = dispatch => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
});

export default connect(null, mapDispatchToProps)(ShopPage);
