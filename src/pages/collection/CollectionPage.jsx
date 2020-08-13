import React from 'react';
import { connect } from 'react-redux';

import { selectCollection } from '../../redux/shop/ShopSelector';
import CollectionItem from '../../components/collection-item/CollectionItem';

import './CollectionPage.scss';

const CollectionPage = ({ collection }) => {
  var showPage;

  if (collection === undefined) {
    showPage = <h2>404 PAGE</h2>;
  } else {
    const { title, items } = collection;

    showPage = (
      <div className="collection-page">
        <h2 className="title">{title}</h2>
        <div className="items">
          {items.map(item => (
            <CollectionItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    );
  }

  return showPage;
};

const mapStateToProps = (state, ownProps) => ({
  collection: selectCollection(ownProps.match.params.collectionId)(state)
});

export default connect(mapStateToProps)(CollectionPage);
