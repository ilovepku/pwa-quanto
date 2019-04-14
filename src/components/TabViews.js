import React from "react";

import { withStyles } from "@material-ui/core/styles";

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
      <React.Fragment>
        <div className={classes.view}>
          {tabIndex === 0 && <HistoryTabView />}
          {tabIndex === 1 && <ChartsTabView />}
          {tabIndex === 2 && <CategoriesTabView />}
          {tabIndex === 3 && <SettingsTabView />}
        </div>

        <AppBar className={classes.appBar}>
          <CurrentActivityToolBar />

          <BottomNavigation
            value={tabIndex}
            onChange={this.handleTabIndexChange}
            showLabels
          >
            <BottomNavigationAction label="HISTORY" icon={<HistoryIcon />} />
            <BottomNavigationAction label="CHARTS" icon={<PieChartIcon />} />
            <BottomNavigationAction
              label="CATEGORIES"
              icon={<CategoryIcon />}
            />
            <BottomNavigationAction label="SETTINGS" icon={<SettingsIcon />} />
          </BottomNavigation>
        </AppBar>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(TabViews);
