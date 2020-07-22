import { UserActionTypes } from './UserTypes';

export const setCurrentUser = user => ({
  // type name should exactly match the name in UserReducer switch cases.
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user
});
