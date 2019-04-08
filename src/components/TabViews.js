import React from "react";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";

import HistoryIcon from "@material-ui/icons/History";
import PieChartIcon from "@material-ui/icons/PieChart";
import SettingsIcon from "@material-ui/icons/Settings";
import CategoryIcon from "@material-ui/icons/Category";

import HistoryTabView from "./HistoryTabView";
import ChartsTabView from "./ChartsTabView";
import CategoriesTabView from "./CategoriesTabView";
import SettingsTabView from "./SettingsTabView";
import CurrentActivityToolBar from "./CurrentActivityToolBar";

function TabContainer({ children }) {
  return <Typography component="div">{children}</Typography>;
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

const styles = () => ({
  appBar: {
    top: "auto",
    bottom: 0
  }
});

class SwipeableTabViews extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = value => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    return (
      <React.Fragment>
        {value === 0 && (
          <TabContainer>
            <HistoryTabView />
          </TabContainer>
        )}
        {value === 1 && (
          <TabContainer>
            <ChartsTabView />
          </TabContainer>
        )}
        {value === 2 && (
          <TabContainer>
            <CategoriesTabView />
          </TabContainer>
        )}
        {value === 3 && (
          <TabContainer>
            <SettingsTabView />
          </TabContainer>
        )}

        <AppBar position="fixed" color="default" className={classes.appBar}>
          <CurrentActivityToolBar />

          <BottomNavigation
            value={value}
            onChange={this.handleChange}
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

SwipeableTabViews.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SwipeableTabViews);
