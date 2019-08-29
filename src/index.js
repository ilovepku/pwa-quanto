import React from "react";
import ReactDOM from "react-dom";

import App from "./components/App";

import "./index.css";

import * as serviceWorker from "./serviceWorker";

// yet to be implemented with context
/* if ("serviceWorker" in navigator) {
  // Handler for messages coming from the service worker
  navigator.serviceWorker.addEventListener("message", event => {
    if (event.data === "interrupt") {
      store.dispatch(interruptActivity());
    } else if (event.data === "new") {
      store.dispatch(addActivity());
    }
  });
} */

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
