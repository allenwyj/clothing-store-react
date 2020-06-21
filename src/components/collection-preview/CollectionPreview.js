import React from 'react';

import CollectionItem from '../collection-item/CollectionItem';

import './CollectionPreview.scss';

// title and items are destructured from otherCollectionFields
// TODO: This will have performance concern due to filter() when re-rendering.
const CollectionPreview = ({ title, items }) => (
  <div className="collection-preview">
    <h1 className="title">{title.toUpperCase()}</h1>
    <div className="preview">
      {items
        .filter((item, idx) => idx < 4) // preview only display 4 items
        .map(({ id, ...otherItemFields }) => (
          <CollectionItem key={id} {...otherItemFields} />
        ))}
    </div>
  </div>
);

export default CollectionPreview;
