import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";

import localForage from "localforage";

import { historyReducer } from "./historyReducer";
import { categoriesReducer } from "./categoriesReducer";
import { settingsReducer } from "./settingsReducer";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

import thunk from "redux-thunk";
import { reduxFirestore, getFirestore } from "redux-firestore";
import { reactReduxFirebase, getFirebase } from "react-redux-firebase";
import { firebase } from "../global/firebase";

const persistConfig = {
  key: "root",
  storage: localForage
};

const rootReducer = combineReducers({
  history: historyReducer,
  categories: categoriesReducer,
  settings: settingsReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    reduxFirestore(firebase),
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
export const persistor = persistStore(store);
