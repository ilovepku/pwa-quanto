import { createStore, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";

import localForage from "localforage";

import { historyReducer } from "./historyReducer";
import { categoriesReducer } from "./categoriesReducer";
import { settingsReducer } from "./settingsReducer";

const persistConfig = {
  key: "root",
  storage: localForage
};

const rootReducer = combineReducers({
  history: historyReducer,
  categories: categoriesReducer,
  settings: settingsReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export const persistor = persistStore(store);
