import React from 'react';
//import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { toggleCartHidden } from '../../redux/cart/CartAction';
import { selectCartItemsCount } from '../../redux/cart/CartSelector';

import { CartIconContainer, ItemIconContainer, ShoppingIconContainer} from './CartIconStyles';
//import './CartIcon.scss';

const CartIcon = ({ toggleCartHidden, itemCount }) => (
  <CartIconContainer onClick={toggleCartHidden}>
    <ShoppingIconContainer />
    <ItemIconContainer>{itemCount}</ItemIconContainer>
  </CartIconContainer>
);

// // updating the number of items in the cart
// const mapStateToProps = ({ cart: { cartItems } }) => ({
//   itemCount: cartItems.reduce(
//     (accumalatedQuantity, cartItem) => accumalatedQuantity + cartItem.quantity,
//     0
//   )
// });

// updating the number of items in the cart
const mapStateToProps = createStructuredSelector({
  itemCount: selectCartItemsCount
});

// Trigger an action to get an action object and using dispatch to find the associated reducer to change store state.
const mapDispatchToProps = dispatch => ({
  toggleCartHidden: () => dispatch(toggleCartHidden())
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
