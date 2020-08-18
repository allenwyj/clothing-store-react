import React from 'react';
import { Route } from 'react-router-dom';

import CollectionOverview from '../../components/collection-overview/CollectionOverview';
import CollectionPage from '../collection/CollectionPage';

import './ShopPage.scss';

// because ShopPage component is being routed inside App component
// so route will automatically pass some
// props (history, location, match...) into ShopPage component
const ShopPage = ({ match }) => (
  <div className="shop-page">
    <Route exact path={`${match.path}`} component={CollectionOverview} />
    <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
  </div>
);

export default ShopPage;
