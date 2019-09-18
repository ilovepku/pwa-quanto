// react
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// material ui
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

// components
import withContexts from "./components/with-contexts/with-contexts.hoc";
import HistoryPage from "./pages/history/history.page";
import ChartsPage from "./pages/charts/charts.page";
import CategoriesPage from "./pages/categories/categories.page";
import SettingsPage from "./pages/settings/settings.page";
import BottomBar from "./components/bottom-bar/bottom-bar.component";
import SnackbarNotifier from "./components/snackbar-notifier/snackbar-notifier.component";

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

function App() {
  return (
    <Router>
      <MuiThemeProvider theme={theme}>
        <Route exact path="/" component={HistoryPage} />
        <Route exact path="/charts/" component={ChartsPage} />
        <Route exact path="/categories/" component={CategoriesPage} />
        <Route exact path="/settings/" component={SettingsPage} />
        <BottomBar />
        <SnackbarNotifier />
      </MuiThemeProvider>
    </Router>
  );
}

export default withContexts(App);
