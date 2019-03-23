import React from "react";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import CssBaseline from "@material-ui/core/CssBaseline";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import SwipeableViews from "react-swipeable-views";

import HistoryIcon from "@material-ui/icons/History";
import PieChartIcon from "@material-ui/icons/PieChart";
import SettingsIcon from "@material-ui/icons/Settings";
import InfoIcon from "@material-ui/icons/Info";

import HistoryTabView from "./HistoryTabView";
import ActivityList from "./ActivityList";
import ChartsTabView from "./ChartsTabView";
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

const inlineStyles = {
  views: {
    paddingBottom: "125px"
  }
};

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
    return (
      <React.Fragment>
        <CssBaseline />

        <SwipeableViews
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
          style={inlineStyles.views}
        >
          <TabContainer>
            <HistoryTabView />
          </TabContainer>
          <TabContainer>
            <ChartsTabView />
          </TabContainer>
          <TabContainer>
            <ActivityList />
          </TabContainer>
          <TabContainer>By Sean LEE</TabContainer>
        </SwipeableViews>

        <AppBar position="fixed" color="default" className={classes.appBar}>
        
          <CurrentActivityToolBar />

          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab icon={<HistoryIcon />} label="HISTORY" />
            <Tab icon={<PieChartIcon />} label="CHARTS" />
            <Tab icon={<SettingsIcon />} label="SETTINGS" />
            <Tab icon={<InfoIcon />} label="ABOUT" />
          </Tabs>
        </AppBar>
      </React.Fragment>
    );
  }
}

SwipeableTabViews.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SwipeableTabViews);
