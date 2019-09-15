// react
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// material ui
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

// components
import withContexts from "../../components/with-contexts/with-contexts.hoc";
import HistoryTab from "../history-tab/history-tab.page";
import ChartsTab from "../charts-tab/charts-tab.page";
import CategoriesTab from "../categories-tab/categories-tab.page";
import SettingsTab from "../settings-tab/settings-tab.page";
import BottomBar from "../../components/bottom-bar/bottom-bar.component";
import SnackbarNotifier from "../../components/snackbar-notifier/snackbar-notifier.component";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#96774c"
    }
  }
});

/* const theme = createMuiTheme({
  overrides: {
    MuiCard: {
      root: {
        marginTop: 5,
        marginBottom: 5
      }
    },
    MuiList: {
      padding: {
        paddingTop: 0,
        paddingBottom: 0
      }
    }
  }
}); */

function TabPanel() {
  return (
    <Router>
      <MuiThemeProvider theme={theme}>
        <Route exact path="/" component={HistoryTab} />
        <Route exact path="/charts/" component={ChartsTab} />
        <Route exact path="/categories/" component={CategoriesTab} />
        <Route exact path="/settings/" component={SettingsTab} />
        <BottomBar />
        <SnackbarNotifier />
      </MuiThemeProvider>
    </Router>
  );
}

export default withContexts(TabPanel);
