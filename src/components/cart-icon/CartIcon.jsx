import React from 'react';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import { connect } from 'react-redux';

import { toggleCartHidden } from '../../redux/cart/CartAction';
import { selectCartItemsCount } from '../../redux/cart/CartSelector';

import './CartIcon.scss';

const CartIcon = ({ toggleCartHidden, itemCount }) => (
  <div className="cart-icon" onClick={toggleCartHidden}>
    <ShoppingIcon className="shopping-icon" />
    <span className="item-count">{itemCount}</span>
  </div>
);

// // updating the number of items in the cart
// const mapStateToProps = ({ cart: { cartItems } }) => ({
//   itemCount: cartItems.reduce(
//     (accumalatedQuantity, cartItem) => accumalatedQuantity + cartItem.quantity,
//     0
//   )
// });

// updating the number of items in the cart
const mapStateToProps = state => ({
  itemCount: selectCartItemsCount(state)
});

// Trigger an action to get an action object and using dispatch to find the associated reducer to change store state.
const mapDispatchToProps = dispatch => ({
  toggleCartHidden: () => dispatch(toggleCartHidden())
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
