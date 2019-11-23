import UserActionTypes from "./user.types";

export const setCurrentUser = payload => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload
});
