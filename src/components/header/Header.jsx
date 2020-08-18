import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { auth } from '../../firebase/FirebaseUtils';

import { ReactComponent as Logo } from '../../assets/crown.svg';
import CartIcon from '../cart-icon/CartIcon';
import CartDropdown from '../cart-dropdown/CartDropdown';
import { selectCartHidden } from '../../redux/cart/CartSelector';
import { selectCurrentUser } from '../../redux/user/UserSelectors';

import {
  HeaderContainer,
  LogoContainer,
  OptionsContainer,
  OptionLink
} from './HeaderStyles';

const Header = ({ currentUser, hidden }) => (
  <HeaderContainer>
    <LogoContainer to="/">
      <Logo className="logo" />
    </LogoContainer>
    <OptionsContainer>
      <OptionLink to="/shop">SHOP</OptionLink>
      <OptionLink to="/contact">CONTACT</OptionLink>
      {currentUser ? (
        <OptionLink as="div" onClick={() => auth.signOut()}>
          SIGN OUT
        </OptionLink>
      ) : (
        <OptionLink to="/sign-in">SIGN IN</OptionLink>
      )}
      <CartIcon />
    </OptionsContainer>
    {hidden ? null : <CartDropdown />}
  </HeaderContainer>
);

/**
 * A standard function in redux, which deals with returning the redux store's state
 * @param {Object} state the value will come from the reducer. state is the combinedReducers object
 * @return {object} returns will be passed into this component
 */
// const mapStateToProps = ({ user: { currentUser }, cart: { hidden } }) => ({
//   // combinedReducers -> userReducer (the value of the user key) -> currentUser (userReducer returns)
//   currentUser,
//   hidden
// });
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden
});

export default connect(mapStateToProps)(Header);
