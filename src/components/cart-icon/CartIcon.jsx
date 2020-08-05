import React from 'react';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import { connect } from 'react-redux';

import { toggleCartHidden } from '../../redux/cart/CartAction';

import './CartIcon.scss';

const CartIcon = () => (
  <div className="cart-icon">
    <ShoppingIcon className="shopping-icon" />
    <span className="item-count">0</span>
  </div>
);

// Trigger an action to get an action object and using dispatch to find the associated reducer to change store state.
const mapDispatchToProps = dispatch => ({
  toggleCartHidden: () => dispatch(toggleCartHidden())
});

export default connect(null, mapDispatchToProps)(CartIcon);
