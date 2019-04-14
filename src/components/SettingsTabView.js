import React, { Component } from "react";

import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import SettingsGeneralTab from "./SettingsGeneralTab";
import SettingsChartsTab from "./SettingsChartsTab";
import SettingsAboutTab from "./SettingsAboutTab";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  overrides: {
    MuiCard: {
      root: {
        marginTop: 5,
        marginBottom: 5
      }
    }
  },
  typography: { useNextVariants: true }
});

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
      <MuiThemeProvider theme={theme}>
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
      </MuiThemeProvider>
    );
  }
}

export default SettingsTabView;
