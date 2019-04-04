import { createStore } from "redux";
import { persistStore, persistReducer, createTransform } from "redux-persist";
// import storage from "redux-persist/lib/storage"; // defaults to localStorage for web and AsyncStorage for react-native
import localForage from "localforage";

import { rootReducer } from "./reducers";

const dateTransform = createTransform(
  // transform state being rehydrated
  (outboundState, key) => {
    // convert datetime string back to a date object
    if (Array.isArray(outboundState)) {
      // check if it's the history state
      const newOutboundState = outboundState.map(item => {
        return {
          ...item,
          datetime: new Date(item.datetime)
        };
      });
      return newOutboundState;
    } else {
      return outboundState;
    }
  }
);

const persistConfig = {
  key: "root",
  storage: localForage,
  transforms: [dateTransform]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export const persistor = persistStore(store);
