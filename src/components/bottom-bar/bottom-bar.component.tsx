// react
import React from "react";

// material ui
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";

// components
import CurrentActivityBar from "../current-activity-bar/current-activity-bar.component";
import BottomNavigationBar from "../bottom-navigation-bar/bottom-navigation-bar.component";

const useStyles = makeStyles({
  appBar: {
    top: "auto",
    bottom: 0,
    left: 0,
    maxWidth: "576px",
    margin: "auto"
  }
});

function BottomBar() {
  const classes = useStyles({});
  return (
    <AppBar className={classes.appBar}>
      <CurrentActivityBar />
      <BottomNavigationBar />
    </AppBar>
  );
}

export default BottomBar;
