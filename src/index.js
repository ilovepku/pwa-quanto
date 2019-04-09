import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { store, persistor } from "./redux/configureStore";
import { PersistGate } from "redux-persist/integration/react";
import { addActivity, interruptActivity } from "./redux/actions";

import Button from "@material-ui/core/Button";

import { SnackbarProvider } from "notistack";

import "./index.css";

import TabViews from "./components/TabViews";

import * as serviceWorker from "./serviceWorker";

if ("serviceWorker" in navigator) {
  // Handler for messages coming from the service worker
  navigator.serviceWorker.addEventListener("message", event => {
    if (event.data === "interrupt") {
      store.dispatch(interruptActivity());
    } else if (event.data === "new") {
      store.dispatch(addActivity());
    }
  });
}

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <SnackbarProvider
        preventDuplicate
        maxSnack={1}
        dense
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        action={[
          <Button key="snackBarButton" color="primary" size="small">
            {"Dismiss"}
          </Button>
        ]}
      >
        <TabViews />
      </SnackbarProvider>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
