import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CollectionPreview from '../collection-preview/CollectionPreview';
import { selectCollectionsForPreview } from '../../redux/shop/ShopSelector';
//import './CollectionOverview.scss';
import { CollectionOverviewContainer } from './CollectionOverviewStyles';

const CollectionOverview = ({ collections }) => (
  <CollectionOverviewContainer>
    {collections.map(({ id, ...otherCollectionFields }) => (
      <CollectionPreview key={id} {...otherCollectionFields} />
    ))}
  </CollectionOverviewContainer>
);

const mapStateToProps = createStructuredSelector({
  collections: selectCollectionsForPreview
});

export default connect(mapStateToProps)(CollectionOverview);
