import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { createStore } from "redux";
import { rootReducer } from "./redux/reducers";

import { SnackbarProvider } from "notistack";

import "./index.css";

import App from "./App";

import * as serviceWorker from "./serviceWorker";

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <SnackbarProvider
      maxSnack={3}
      dense
      anchorOrigin={{
        vertical: "top",
        horizontal: "left"
      }}
    >
      <App />
    </SnackbarProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
