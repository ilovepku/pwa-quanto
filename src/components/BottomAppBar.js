import React from "react";
import { Link, withRouter } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";

import HistoryIcon from "@material-ui/icons/History";
import PieChartIcon from "@material-ui/icons/PieChart";
import CategoryIcon from "@material-ui/icons/Category";
import SettingsIcon from "@material-ui/icons/Settings";

import CurrentActivityCard from "./CurrentActivityCard";

import { withStyles } from "@material-ui/core/styles";

const styles = () => ({
  appBar: {
    position: "fixed",
    top: "auto",
    bottom: 0,
    background:
      "linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.15) 100%), radial-gradient(at top center, rgba(255,255,255,0.40) 0%, rgba(0,0,0,0.40) 90%) #7a7a7a",
    backgroundBlendMode: "multiply,multiply"
  }
});

function BottomAppBar(props) {
  const {
    classes,
    location: { pathname }
  } = props;
  return (
    <AppBar className={classes.appBar}>
      <CurrentActivityCard />
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
