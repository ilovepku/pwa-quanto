import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import HistoryTabView from "./HistoryTabView";
import ChartsTabView from "./ChartsTabView";
import CategoriesTabView from "./CategoriesTabView";
import SettingsTabView from "./SettingsTabView";

import BottomAppBar from "./BottomAppBar";
import Notifier from "./Notifier";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  overrides: {
    MuiBottomNavigationAction: {
      root: {
        padding: 0,
        "&$selected": {
          paddingTop: 0
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
  },
  typography: { useNextVariants: true }
});

function TabViews() {
  return (
    <Router>
      <MuiThemeProvider theme={theme}>
        <Route path="/" exact component={HistoryTabView} />
        <Route path="/charts/" component={ChartsTabView} />
        <Route path="/categories/" component={CategoriesTabView} />
        <Route path="/settings/" component={SettingsTabView} />

        <BottomAppBar />
        <Notifier />
      </MuiThemeProvider>
    </Router>
  );
}

export default TabViews;
