import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { auth } from '../../firebase/FirebaseUtils';

import { ReactComponent as Logo } from '../../assets/crown.svg';
import CartIcon from '../cart-icon/CartIcon';
import CartDropdown from '../cart-dropdown/CartDropdown';

import './Header.scss';

const Header = ({ currentUser, hidden }) => (
  <div className="header">
    <Link className="logo-container" to="/">
      <Logo className="logo" />
    </Link>
    <div className="options">
      <Link className="option" to="/shop">
        SHOP
      </Link>
      <Link className="option" to="/contact">
        CONTACT
      </Link>
      {currentUser ? (
        <div className="option" onClick={() => auth.signOut()}>
          SIGN OUT
        </div>
      ) : (
        <Link className="option" to="/sign-in">
          SIGN IN
        </Link>
      )}
      <CartIcon />
    </div>
    {hidden ? null : <CartDropdown />}
  </div>
);

/**
 * A standard function in redux, which deals with returning the redux store's state
 * @param {Object} state the value will come from the reducer. state is the combinedReducers object
 * @return {object} returns will be passed into this component
 */
const mapStateToProps = ({ user: { currentUser }, cart: { hidden } }) => ({
  // combinedReducers -> userReducer (the value of the user key) -> currentUser (userReducer returns)
  currentUser,
  hidden
});

export default connect(mapStateToProps)(Header);
