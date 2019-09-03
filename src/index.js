// react
import React from "react";
import ReactDOM from "react-dom";
import SettingsContextProvider from "./contexts/settingsContext";
import CategoriesContextProvider from "./contexts/categoriesContext";
import HistoryContextProvider from "./contexts/historyContext";
import SnackbarContextProvider from "./contexts/snackbarContext";

// components
import App from "./components/App";

// styles
import "./index.css";

ReactDOM.render(
  <SettingsContextProvider>
    <CategoriesContextProvider>
      <HistoryContextProvider>
        <SnackbarContextProvider>
          <App />
        </SnackbarContextProvider>
      </HistoryContextProvider>
    </CategoriesContextProvider>
  </SettingsContextProvider>,
  document.getElementById("root")
);
