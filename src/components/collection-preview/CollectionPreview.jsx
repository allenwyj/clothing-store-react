import React from 'react';
import { withRouter } from 'react-router-dom';

import CollectionItem from '../collection-item/CollectionItem';

import {
  CollectionPreviewContainer,
  TitleContainer,
  PreviewContainer
} from './CollectionPreviewStyles';
//import './CollectionPreview.scss';

// title and items are destructured from otherCollectionFields
// TODO: This will have performance concern due to filter() when re-rendering.
const CollectionPreview = ({ title, items, history, match, routeName }) => (
  <CollectionPreviewContainer>
    <TitleContainer onClick={() => history.push(`${match.path}/${routeName}`)}>
      {title.toUpperCase()}
    </TitleContainer>
    <PreviewContainer>
      {items
        .filter((item, idx) => idx < 4) // preview only display 4 items
        .map(item => (
          <CollectionItem key={item.id} item={item} />
        ))}
    </PreviewContainer>
  </CollectionPreviewContainer>
);

export default withRouter(CollectionPreview);
