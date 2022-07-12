import { UserTypes } from "./userTypes";

const initialState = {
  currentUser: null,
};

 const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case UserTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      };

    default:
      return state;
  }
}

export default userReducer;
