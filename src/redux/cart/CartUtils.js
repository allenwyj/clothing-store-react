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
