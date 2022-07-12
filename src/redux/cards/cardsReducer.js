import { cardsTypes } from "./cardsTypes";
const initialState = {
  images: [],
  collections: [],
  isFetching: false,
  errorMessage: undefined
};

const  cardsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case cardsTypes.SET_IMAGES:
      return { ...state, images: payload };
    case cardsTypes.FETCH_COLLECTIONS_START:
      return {
        ...state,
        isFetching: true,
      };
    case cardsTypes.FETCH_COLLECTIONS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        collections: payload,
      };
    case cardsTypes.FETCH_COLLECTIONS_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: payload,
      };
    default:
      return state;
  }
}
export default cardsReducer;


