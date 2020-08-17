import { CartActionTypes } from './CartTypes';
import { addItemToCart, removeItemFromCart } from './CartUtils';

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
    // decreasing the quantity of the cart item by 1
    case CartActionTypes.REMOVE_ITEM:
      return {
        ...state,
        cartItems: removeItemFromCart(state.cartItems, action.payload)
      };
    case CartActionTypes.CLEAR_ITEM_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          // delete cart item if they have the same id
          cartItem => cartItem.id !== action.payload.id
        )
      };
    case CartActionTypes.CLEAR_CART:
      return {
        ...state,
        cartItems: []
      }
    default:
      return state;
  }
};

export default cartReducer;
