// react
import React from "react";
import SettingsContextProvider from "../contexts/settingsContext";
import CategoriesContextProvider from "../contexts/categoriesContext";
import HistoryContextProvider from "../contexts/historyContext";
import SnackbarContextProvider from "../contexts/snackbarContext";

// components
import TabViews from "./TabViews";

function App() {
  return (
    <SettingsContextProvider>
      <CategoriesContextProvider>
        <HistoryContextProvider>
          <SnackbarContextProvider>
            <TabViews />
          </SnackbarContextProvider>
        </HistoryContextProvider>
      </CategoriesContextProvider>
    </SettingsContextProvider>
  );
}
export default App;
