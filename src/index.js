// react
import React, { useContext, useEffect, useMemo } from "react";
import ReactDOM from "react-dom";
import SettingsContextProvider from "./contexts/settingsContext";
import CategoriesContextProvider from "./contexts/categoriesContext";
import HistoryContextProvider, {
  HistoryContext
} from "./contexts/historyContext";
import SnackbarContextProvider from "./contexts/snackbarContext";

// components
import TabViews from "./components/TabViews";

// styles
import "./index.css";

// push notification action handler: dispatch with history context
const NotificationActionHandler = () => {
  const { dispatch } = useContext(HistoryContext);
  const channel = useMemo(
    () => new BroadcastChannel("service-worker-channel"),
    []
  );
  useEffect(() => {
    channel.onmessage = msg => {
      if (msg.data === "new") dispatch({ type: "ADD_ACTIVITY" });
      if (msg.data === "interrupt") dispatch({ type: "INTERRUPT_ACTIVITY" });
    };
    return channel.close;
  }, [channel, dispatch]);
  return null;
};

ReactDOM.render(
  <HistoryContextProvider>
    <NotificationActionHandler />
    <SettingsContextProvider>
      <CategoriesContextProvider>
        <SnackbarContextProvider>
          <TabViews />
        </SnackbarContextProvider>
      </CategoriesContextProvider>
    </SettingsContextProvider>
  </HistoryContextProvider>,
  document.getElementById("root")
);
