import { firestore } from "../../firebase/firebase";
import { cardsTypes } from "./cardsTypes";

export const setImages = (images) => ({
  type: cardsTypes.SET_IMAGES,
  payload: images,
});

export const fetchCollectionsStart = () => ({
  type: cardsTypes.FETCH_COLLECTIONS_START,
});

export const fetchCollectionsSuccess = (collectionsMap) => ({
  type: cardsTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionsMap,
});

export const fetchCollectionsFailure = (errorMessage) => ({
  type: cardsTypes.FETCH_COLLECTIONS_FAILURE,
  payload: errorMessage,
});

export const fetchCollectionsStartAsync =  () => {
  return async (dispatch) =>  {
    try {
       dispatch(fetchCollectionsStart());
       const collectionRef = await firestore.collection("collections").get();
const collectionsMap = collectionRef.docs.map((doc) => doc.data());
       dispatch(fetchCollectionsSuccess(collectionsMap));
    } catch (error) {
      dispatch(fetchCollectionsFailure(error.message));
    }
  };
};
