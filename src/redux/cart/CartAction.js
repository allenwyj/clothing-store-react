import CartActionTypes from './CartTypes';

export const toggleCartHidden = () => ({
  // becasue we don't need to use payload in the cartReducer, 
  // so we don't need payload property.
  type: CartActionTypes.TOGGLE_CART_HIDDEN
});
