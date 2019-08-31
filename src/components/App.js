// react
import React from "react";
import SettingsContextProvider from "../contexts/settingsContext";
import CategoriesContextProvider from "../contexts/categoriesContext";
import HistoryContextProvider from "../contexts/historyContext";

// material ui
import { withStyles } from "@material-ui/core/styles";

// snackbar
import { SnackbarProvider } from "notistack";

// components
import TabViews from "./TabViews";

const styles = {
  success: { backgroundColor: "#6FAC9B" },
  error: { backgroundColor: "#BB4D4C" },
  label: { color: "#363636" }
};

function App(props) {
  const { classes } = props;
  return (
    <SnackbarProvider
      classes={{
        variantSuccess: classes.success,
        variantError: classes.error
      }}
      preventDuplicate
      maxSnack={1}
      dense
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left"
      }}
    >
      <SettingsContextProvider>
        <CategoriesContextProvider>
          <HistoryContextProvider>
            <TabViews />
          </HistoryContextProvider>
        </CategoriesContextProvider>
      </SettingsContextProvider>
    </SnackbarProvider>
  );
}
export default withStyles(styles)(App);
