import React from 'react';

import { connect } from 'react-redux';

import { addItem } from '../../redux/cart/CartAction';

import {
  CollectionItemContainer,
  ImageContainer,
  AddButton,
  CollectionFooterContainer,
  NameContainer,
  PriceContainer
} from './CollectionItemStyles';

const CollectionItem = ({ item, addItem }) => {
  const { name, price, imageUrl } = item;

  return (
    <CollectionItemContainer>
      <ImageContainer className="image" imageUrl={imageUrl} />
      <CollectionFooterContainer>
        <NameContainer>{name}</NameContainer>
        <PriceContainer>{`$${price}`}</PriceContainer>
      </CollectionFooterContainer>
      <AddButton onClick={() => addItem(item)} inverted={true}>
        Add to cart
      </AddButton>
    </CollectionItemContainer>
  );
};

const mapDispatchToProps = dispatch => ({
  addItem: item => dispatch(addItem(item))
});

export default connect(null, mapDispatchToProps)(CollectionItem);
