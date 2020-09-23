import { createSelector } from 'reselect';

// input selector
const selectCart = state => state.cart;

// output selector
export const selectCartItems = createSelector(
  [selectCart],
  cart => cart.cartItems
);

export const selectCartHidden = createSelector(
  [selectCart],
  cart => cart.hidden
);

/*
    selectCartItemsCount will first check its inputSelector collection: selectCartItems
    selectCartItems will check its inputSelector collection: selectCart
    selectCart is taking the state argument that we passed in from selectCartItemsCount
    selectCart returns state.cart which will be taken by the selectCartItems as the 
    second argument's argument (cart).
    then, selectCartItems returns cart.cartItems to selectCartItemsCount's second argument
    cart.cartItems is cartItems
    reduce() will take cartItems and return the result to the value of property itemCount.
*/
export const selectCartItemsCount = createSelector(
  [selectCartItems],
  cartItems =>
    cartItems.reduce(
      (accumalatedQuantity, cartItem) =>
        accumalatedQuantity + cartItem.quantity,
      0
    )
);

export const selectCartItemsTotal = createSelector(
  [selectCartItems],
  cartItems =>
    cartItems.reduce(
      (accumalatedQuantity, cartItem) =>
        accumalatedQuantity + cartItem.quantity * cartItem.price,
      0
    )
);
