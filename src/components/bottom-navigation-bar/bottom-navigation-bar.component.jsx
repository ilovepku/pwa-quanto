// react
import React, { useState } from "react";
import { Link } from "react-router-dom";

// material ui
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import HistoryIcon from "@material-ui/icons/History";
import PieChartIcon from "@material-ui/icons/PieChart";
import CategoryIcon from "@material-ui/icons/Category";
import SettingsIcon from "@material-ui/icons/Settings";

const useStyles = makeStyles({
  bottomNav: {
    "& a": {
      paddingLeft: 0,
      paddingRight: 0,
      backgroundColor: "#f8f8fa",
      color: "#989898"
    }
  }
});

const BottomNavigationBar = () => {
  const classes = useStyles();
  const [value, setValue] = useState("history");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      className={classes.bottomNav}
    >
      <BottomNavigationAction
        label="HISTORY"
        value="history"
        icon={<HistoryIcon />}
        component={Link}
        to="/"
      />
      <BottomNavigationAction
        label="CHARTS"
        value="charts"
        icon={<PieChartIcon />}
        component={Link}
        to="/charts"
      />
      <BottomNavigationAction
        label="CATEGORIES"
        value="categories"
        icon={<CategoryIcon />}
        component={Link}
        to="/categories"
      />
      <BottomNavigationAction
        label="SETTINGS"
        value="settings"
        icon={<SettingsIcon />}
        component={Link}
        to="/settings"
      />
    </BottomNavigation>
  );
};

export default BottomNavigationBar;
