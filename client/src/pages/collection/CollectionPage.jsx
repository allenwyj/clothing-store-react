import React from 'react';
import { connect } from 'react-redux';

import { selectCollection } from '../../redux/shop/ShopSelector';
import CollectionItem from '../../components/collection-item/CollectionItem';

//import './CollectionPage.scss';
import {
  CollectionPageContainer,
  CollectionTitle,
  CollectionItemsContainer
} from './CollectionPageStyles';

const CollectionPage = ({ collection }) => {
  let container;

  if (collection) {
    const { title, items } = collection;
    container = (
      <div>
        <CollectionTitle>{title}</CollectionTitle>
        <CollectionItemsContainer>
          {items.map(item => (
            <CollectionItem key={item.id} item={item} />
          ))}
        </CollectionItemsContainer>
      </div>
    );
  } else {
    container = <h2>Sorry, we can't find any product under your search. </h2>;
  }

  return <CollectionPageContainer>{container}</CollectionPageContainer>;
};

const mapStateToProps = (state, ownProps) => ({
  collection: selectCollection(ownProps.match.params.collectionId)(state)
});

export default connect(mapStateToProps)(CollectionPage);
