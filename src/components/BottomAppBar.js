import React from "react";
import { Link, withRouter } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";

import HistoryIcon from "@material-ui/icons/History";
import PieChartIcon from "@material-ui/icons/PieChart";
import CategoryIcon from "@material-ui/icons/Category";
import SettingsIcon from "@material-ui/icons/Settings";

import CurrentActivityToolBar from "./CurrentActivityToolBar";

import { withStyles } from "@material-ui/core/styles";

const styles = () => ({
  appBar: {
    position: "fixed",
    top: "auto",
    bottom: 0
  }
});

function BottomAppBar(props) {
  const {
    classes,
    location: { pathname }
  } = props;
  return (
    <AppBar className={classes.appBar}>
      <CurrentActivityToolBar />

      <BottomNavigation showLabels value={router2index(pathname)}>
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
  );
}

export default withStyles(styles)(withRouter(BottomAppBar));

function router2index(pathname) {
  switch (pathname) {
    case "/charts":
      return 1;
    case "/categories":
      return 2;
    case "/settings":
      return 3;
    default:
      return 0;
  }
}
