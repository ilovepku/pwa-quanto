import React, { Component, Fragment } from "react";

import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import SettingsGeneralTab from "./SettingsGeneralTab";
import SettingsChartsTab from "./SettingsChartsTab";
import SettingsAboutTab from "./SettingsAboutTab";

class SettingsTabView extends Component {
  state = {
    tabIndex: 0
  };

  handleTabIndexChange = (event, tabIndex) => {
    this.setState({ tabIndex });
  };

  render() {
    const { tabIndex } = this.state;
    return (
      <Fragment>
        <AppBar position="static">
          <Tabs value={tabIndex} onChange={this.handleTabIndexChange} centered>
            <Tab label="General" />
            <Tab label="Charts" />
            <Tab label="About" />
          </Tabs>
        </AppBar>
        {tabIndex === 0 && <SettingsGeneralTab />}
        {tabIndex === 1 && <SettingsChartsTab />}
        {tabIndex === 2 && <SettingsAboutTab />}
      </Fragment>
    );
  }
}

export default SettingsTabView;
