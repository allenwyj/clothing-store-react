export const addItemToCart = (cartItems, newItem) => {
  const existingCartItem = cartItems.find(
    cartItem => cartItem.id === newItem.id
  );

  // If the new added item exists, we will loop through the whole array and change the quantity
  // of that item, the rest items will be just placed in the array.
  if (existingCartItem) {
    return cartItems.map(cartItem =>
      cartItem.id === newItem.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  // If the new added item doesn't exist in the array, then we just add it and assign the quantity.
  return [...cartItems, { ...newItem, quantity: 1 }];
};

export const removeItemFromCart = (cartItems, removeItem) => {
  // find the item that user selected
  const existingCartItem = cartItems.find(
    cartItem => cartItem.id === removeItem.id
  );

  // if the quantity of item that we want to remove is 1, then we remove the whole item from the cart.
  if (existingCartItem.quantity === 1) {
    return cartItems.filter(cartItem => cartItem.id !== removeItem.id);
  }

  return cartItems.map(cartItem =>
    // if the item is matched, decrease 1 quantity
    cartItem.id === removeItem.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};
