// react
import React from "react";
import ReactDOM from "react-dom";

// contexts
import HistoryContextProvider from "./contexts/history/history.context";
import CategoriesContextProvider from "./contexts/categories/categories.context";
import SettingsContextProvider from "./contexts/settings/settings.context";
import SnackbarContextProvider from "./contexts/snackbar/snackbar.context";

// components
import TabPanel from "./pages/tab-panel/tab-panel.page";

// styles
import "./index.css";

ReactDOM.render(
  <SettingsContextProvider>
    <CategoriesContextProvider>
      <HistoryContextProvider>
        <SnackbarContextProvider>
          <TabPanel />
        </SnackbarContextProvider>
      </HistoryContextProvider>
    </CategoriesContextProvider>
  </SettingsContextProvider>,
  document.getElementById("root")
);
