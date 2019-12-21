import React, { FunctionComponent } from "react";

// contexts
import { UserContextProvider } from "../../contexts/user/user.context";
import { HistoryContextProvider } from "../../contexts/history/history.context";
import { CategoriesContextProvider } from "../../contexts/categories/categories.context";
import { SettingsContextProvider } from "../../contexts/settings/settings.context";
import { SnackbarContextProvider } from "../../contexts/snackbar/snackbar.context";

const withContexts = (WrappedComponent: FunctionComponent) => {
  return (props: object) => {
    return (
      <UserContextProvider>
        <HistoryContextProvider>
          <CategoriesContextProvider>
            <SettingsContextProvider>
              <SnackbarContextProvider>
                <WrappedComponent {...props} />
              </SnackbarContextProvider>
            </SettingsContextProvider>
          </CategoriesContextProvider>
        </HistoryContextProvider>
      </UserContextProvider>
    );
  };
};

export default withContexts;
