export const setCurrentUser = user => ({
  // type name should exactly match the name in UserReducer switch cases.
  type: 'SET_CURRENT_USER',
  payload: user
});