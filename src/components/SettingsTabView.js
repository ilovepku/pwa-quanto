import React, { Component, Fragment } from "react";

import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import SettingsGeneralTab from "./SettingsGeneralTab";
import SettingsChartsTab from "./SettingsChartsTab";
import SettingsAboutTab from "./SettingsAboutTab";

import { withStyles } from "@material-ui/core/styles";

const styles = () => ({
  view: {
    paddingTop: "40px",
    paddingBottom: "110px"
  },
  appBar: {
    position: "fixed",
    top: 0
  }
});

class SettingsTabView extends Component {
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
      <Fragment>
        <AppBar className={classes.appBar}>
          <Tabs value={tabIndex} onChange={this.handleTabIndexChange} centered>
            <Tab label="General" />
            <Tab label="Charts" />
            <Tab label="About" />
          </Tabs>
        </AppBar>
        <div className={classes.view}>
          {tabIndex === 0 && <SettingsGeneralTab />}
          {tabIndex === 1 && <SettingsChartsTab />}
          {tabIndex === 2 && <SettingsAboutTab />}
        </div>
      </Fragment>
    );
  }
}

export default withStyles(styles)(SettingsTabView);
