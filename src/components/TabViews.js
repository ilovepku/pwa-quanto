import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import AppBar from "@material-ui/core/AppBar";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";

import HistoryIcon from "@material-ui/icons/History";
import PieChartIcon from "@material-ui/icons/PieChart";
import CategoryIcon from "@material-ui/icons/Category";
import SettingsIcon from "@material-ui/icons/Settings";

import HistoryTabView from "./HistoryTabView";
import ChartsTabView from "./ChartsTabView";
import CategoriesTabView from "./CategoriesTabView";
import SettingsTabView from "./SettingsTabView";
import CurrentActivityToolBar from "./CurrentActivityToolBar";

const styles = () => ({
  appBar: {
    position: "fixed",
    top: "auto",
    bottom: 0
  },
  view: {
    marginBottom: "100px"
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
  state = {
    tabIndex: 0
  };

  handleTabIndexChange = (event, tabIndex) => {
    this.setState({ tabIndex });
  };

  render() {
    const { classes } = this.props;
    const { tabIndex } = this.state;
    return (
      <Router>
        <MuiThemeProvider theme={theme}>
          <div className={classes.view}>
            <Route path="/" exact component={HistoryTabView} />
            <Route path="/charts/" component={ChartsTabView} />
            <Route path="/categories/" component={CategoriesTabView} />
            <Route path="/settings/" component={SettingsTabView} />
          </div>

          <AppBar className={classes.appBar}>
            <CurrentActivityToolBar />

            <BottomNavigation
              value={tabIndex}
              onChange={this.handleTabIndexChange}
              showLabels
            >
              <BottomNavigationAction
                label="HISTORY"
                icon={<HistoryIcon />}
                component={Link}
                to="/"
              />
              <BottomNavigationAction
                label="CHARTS"
                icon={<PieChartIcon />}
                component={Link}
                to="/charts"
              />
              <BottomNavigationAction
                label="CATEGORIES"
                icon={<CategoryIcon />}
                component={Link}
                to="/categories"
              />
              <BottomNavigationAction
                label="SETTINGS"
                icon={<SettingsIcon />}
                component={Link}
                to="/settings"
              />
            </BottomNavigation>
          </AppBar>
        </MuiThemeProvider>
      </Router>
    );
  }
}

export default withStyles(styles)(TabViews);
