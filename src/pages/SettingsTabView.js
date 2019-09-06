// react
import React, { Component } from "react";

// material ui
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

// components
import SettingsGeneralTab from "./SettingsGeneralTab";
import SettingsChartsTab from "./SettingsChartsTab";
import SettingsAboutTab from "./SettingsAboutTab";

const theme = createMuiTheme({
  overrides: {
    MuiAppBar: {
      colorPrimary: {
        backgroundImage:
          "linear-gradient(to top, #d5d4d0 0%, #d5d4d0 1%,  #efeeec 75%, #e9e9e7 100%)",
        color: "rgb(0,0,0,0.8)"
      }
    },
    MuiTabs: {
      indicator: {
        display: "none"
      }
    },
    MuiTab: {
      root: {
        minHeight: "35px",
        borderRadius: "5px",
        marginTop: "5px"
      },
      wrapper: {
        border: "1px solid rgb(0,0,0,0.1)",
        borderRadius: "5px"
      },
      textColorInherit: {
        boxShadow: "3px 3px 10px RGB(192,178,131,0.6)",
        "&$selected": {
          background: "linear-gradient(15deg, #85754E 0%, #c8ad7f 74%)",
          color: "#f8f8fa"
        }
      }
    },
    MuiCard: {
      root: {
        background:
          "linear-gradient(180deg, rgb(221,221,221,0.5), rgb(248,248,250,0.3))",
        boxShadow: "0 0 5px #dddddd",
        marginBottom: "2px"
      }
    },
    MuiCardContent: {
      root: {
        padding: "10px"
      }
    }
  }
});

const styles = () => ({
  view: {
    paddingTop: "40px",
    paddingBottom: "110px"
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
      <MuiThemeProvider theme={theme}>
        <AppBar>
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
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles, { withTheme: true })(SettingsTabView);
