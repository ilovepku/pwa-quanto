import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import HistoryTabView from "./HistoryTabView";
import ChartsTabView from "./ChartsTabView";
import CategoriesTabView from "./CategoriesTabView";
import SettingsTabView from "./SettingsTabView";

import BottomAppBar from "./BottomAppBar";

import { withStyles } from "@material-ui/core/styles";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const styles = () => ({
  view: {
    marginBottom: "110px"
  }
});

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
    }
  },
  typography: { useNextVariants: true }
});

class TabViews extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Router>
        <MuiThemeProvider theme={theme}>
          <div className={classes.view}>
            <Route path="/" exact component={HistoryTabView} />
            <Route path="/charts/" component={ChartsTabView} />
            <Route path="/categories/" component={CategoriesTabView} />
            <Route path="/settings/" component={SettingsTabView} />
          </div>
          <BottomAppBar />
        </MuiThemeProvider>
      </Router>
    );
  }
}

export default withStyles(styles)(TabViews);
