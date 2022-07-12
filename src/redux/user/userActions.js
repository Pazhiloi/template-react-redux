import { UserTypes } from "./userTypes";

export const setCurrentUser = (user) => ({
  type: UserTypes.SET_CURRENT_USER,
  payload: user,
});


