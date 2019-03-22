import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import SwipeableViews from "react-swipeable-views";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import FunctionsIcon from "@material-ui/icons/Functions";
import HistoryIcon from "@material-ui/icons/History";
import PieChartIcon from "@material-ui/icons/PieChart";
import SettingsIcon from "@material-ui/icons/Settings";
import Typography from "@material-ui/core/Typography";
import HistoryPanels from "./HistoryPanels";
import ActivityList from "./ActivityList";
import ChartsTab from "./ChartsTab";
import ButtonToolBar from "./ButtonToolBar";

function TabContainer({ children }) {
  return (
    <Typography component="div" style={{ padding: 5 }}>
      {children}
    </Typography>
  );
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

class FullWidthTabs extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <SwipeableViews
          animateHeight
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
          style={inlineStyles.views}
        >
          <TabContainer>
            <HistoryPanels />
          </TabContainer>
          <TabContainer>Testing</TabContainer>
          <TabContainer>
            <ChartsTab />
          </TabContainer>
          <TabContainer>
            <ActivityList />
          </TabContainer>
        </SwipeableViews>
        <AppBar position="fixed" color="default" className={classes.appBar}>
          <ButtonToolBar />
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab icon={<HistoryIcon />} label="HISTORY" />
            <Tab icon={<FunctionsIcon />} label="STATISTICS" />
            <Tab icon={<PieChartIcon />} label="CHARTS" />
            <Tab icon={<SettingsIcon />} label="SETTINGS" />
          </Tabs>
        </AppBar>
      </React.Fragment>
    );
  }
}

FullWidthTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(FullWidthTabs);
