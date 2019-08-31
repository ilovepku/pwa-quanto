// react
import React, { useContext } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// material ui
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

// components
import BottomAppBar from "./BottomAppBar";
import HistoryTabView from "./HistoryTabView";
import ChartsTabView from "./ChartsTabView";
import CategoriesTabView from "./CategoriesTabView";
import SettingsTabView from "./SettingsTabView";
import { HistoryContext } from "../contexts/historyContext";

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
  },
  typography: { useNextVariants: true }
});

function TabViews() {
  const { dispatch } = useContext(HistoryContext);

  // listen for clicks on push notifications
  if ("serviceWorker" in navigator) {
    // Handler for messages coming from the service worker
    navigator.serviceWorker.addEventListener("message", e => {
      if (e.data === "interrupt") {
        dispatch({ type: "INTERRUPT_ACTIVITY" });
      } else if (e.data === "new") {
        //dispatch({ type: "ADD_ACTIVITY" });
        console.log("add");
      }
    });
  }
  return (
    <Router>
      <MuiThemeProvider theme={theme}>
        <Route path="/" exact component={HistoryTabView} />
        <Route path="/charts/" component={ChartsTabView} />
        <Route path="/categories/" component={CategoriesTabView} />
        <Route path="/settings/" component={SettingsTabView} />

        <BottomAppBar />
      </MuiThemeProvider>
    </Router>
  );
}

export default TabViews;
