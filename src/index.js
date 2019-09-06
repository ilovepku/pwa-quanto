// react
import React from "react";
import ReactDOM from "react-dom";
import SettingsContextProvider from "./contexts/settingsContext";
import CategoriesContextProvider from "./contexts/categoriesContext";
import HistoryContextProvider from "./contexts/historyContext";
import SnackbarContextProvider from "./contexts/snackbarContext";

// components
import TabViews from "./pages/TabViews";

// styles
import "./index.css";

ReactDOM.render(
  <SettingsContextProvider>
    <CategoriesContextProvider>
      <HistoryContextProvider>
        <SnackbarContextProvider>
          <TabViews />
        </SnackbarContextProvider>
      </HistoryContextProvider>
    </CategoriesContextProvider>
  </SettingsContextProvider>,
  document.getElementById("root")
);
