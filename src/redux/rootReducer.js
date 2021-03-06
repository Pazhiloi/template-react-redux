import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import cardsReducer from "./cards/cardsReducer";
import userReducer from "./user/userReducer";
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "cards"],
};

const rootReducer = combineReducers({
  cards: cardsReducer,
  user: userReducer,
});

export default persistReducer(persistConfig, rootReducer);