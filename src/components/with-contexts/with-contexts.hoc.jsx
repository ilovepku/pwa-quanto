import React from "react";

// contexts
import HistoryContextProvider from "../../contexts/history/history.context";
import CategoriesContextProvider from "../../contexts/categories/categories.context";
import SettingsContextProvider from "../../contexts/settings/settings.context";
import SnackbarContextProvider from "../../contexts/snackbar/snackbar.context";

const withContexts = WrappedComponent => {
  return props => {
    return (
      <HistoryContextProvider>
        <CategoriesContextProvider>
          <SettingsContextProvider>
            <SnackbarContextProvider>
              <WrappedComponent {...props} />
            </SnackbarContextProvider>
          </SettingsContextProvider>
        </CategoriesContextProvider>
      </HistoryContextProvider>
    );
  };
};

export default withContexts;
