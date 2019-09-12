// react
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// material ui
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

// components
import HistoryTab from "../history-tab/history-tab.page";
import ChartsTab from "../charts-tab/charts-tab.page";
import CategoriesTab from "../categories-tab/categories-tab.page";
import SettingsTab from "../settings-tab/settings-tab.page";
import BottomBar from "../../components/bottom-bar/bottom-bar.component";
import SnackbarNotifier from "../../components/snackbar-notifier/snackbar-notifier.component";

const theme = createMuiTheme({
  overrides: {
    MuiBottomNavigation: {
      root: {
        backgroundColor: "#f8f8fa"
      }
    },
    MuiBottomNavigationAction: {
      root: {
        padding: 0,
        color: "#989898",
        "&$selected": {
          paddingTop: 0,
          color: "#96774c"
        }
      }
    },
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
});

function TabPanel() {
  return (
    <Router>
      <MuiThemeProvider theme={theme}>
        <Route path="/" exact component={HistoryTab} />
        <Route path="/charts/" component={ChartsTab} />
        <Route path="/categories/" component={CategoriesTab} />
        <Route path="/settings/" component={SettingsTab} />

        <BottomBar />
        <SnackbarNotifier />
      </MuiThemeProvider>
    </Router>
  );
}

export default TabPanel;
