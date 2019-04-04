import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";

import localForage from "localforage";

import { rootReducer } from "./reducers";

const persistConfig = {
  key: "root",
  storage: localForage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export const persistor = persistStore(store);
