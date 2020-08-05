import { CartActionTypes } from './CartTypes';
import { addItemToCart } from './CartUtils';

const INITIAL_STATE = {
  hidden: true,
  cartItems: []
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CartActionTypes.TOGGLE_CART_HIDDEN:
      return {
        ...state,
        // always set to the conversed status
        hidden: !state.hidden
      };
    case CartActionTypes.ADD_ITEM:
      return {
        ...state,
        // adding the existing items into the array and adding the new items in the following.
        cartItems: addItemToCart(state.cartItems, action.payload)
      };
    default:
      return state;
  }
};

export default cartReducer;
