import { CartActionTypes } from './CartTypes';

const INITIAL_STATE = {
  hidden: true
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CartActionTypes.TOGGLE_CART_HIDDEN:
      return {
        ...state,
        // always set to the conversed status
        hidden: !state.hidden
      };
    default:
      return state;
  }
};

export default cartReducer;
