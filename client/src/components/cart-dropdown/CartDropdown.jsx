import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

import CartItem from '../cart-item/CartItem';
import { selectCartItems } from '../../redux/cart/CartSelector';
import { toggleCartHidden } from '../../redux/cart/CartAction';

import {
  CartDropdownContainer,
  CartDropdownButton,
  CartItemsContainer,
  EmptyMessageContainer
} from './CartDropdownStyles';
//import './CartDropdown.scss';

const CartDropdown = ({ cartItems, history, dispatch }) => (
  <CartDropdownContainer>
    <CartItemsContainer>
      {cartItems.length ? (
        cartItems.map(cartItem => (
          <CartItem key={cartItem.id} item={cartItem} />
        ))
      ) : (
        <EmptyMessageContainer>Your cart is empty.</EmptyMessageContainer>
      )}
    </CartItemsContainer>
    <CartDropdownButton
      onClick={() => {
        history.push('./checkout');
        dispatch(toggleCartHidden());
      }}
    >
      CHECKOUT
    </CartDropdownButton>
  </CartDropdownContainer>
);

// const mapStateToProps = state => ({
//   cartItems: state.cart.cartItems
// });

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems
});

export default withRouter(connect(mapStateToProps)(CartDropdown));
