import React, { Component } from "react";

import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import SettingsGeneralTab from "./SettingsGeneralTab";
import SettingsChartsTab from "./SettingsChartsTab";
import SettingsAboutTab from "./SettingsAboutTab";

class SettingsTabView extends Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;
    return (
      <React.Fragment>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange} centered>
            <Tab label="General" />
            <Tab label="Charts" />
            <Tab label="About" />
          </Tabs>
        </AppBar>
        {value === 0 && <SettingsGeneralTab />}
        {value === 1 && <SettingsChartsTab />}
        {value === 2 && <SettingsAboutTab />}
      </React.Fragment>
    );
  }
}

export default SettingsTabView;
