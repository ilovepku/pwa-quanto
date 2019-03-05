import React from "react";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import FunctionsIcon from "@material-ui/icons/Functions";
import HistoryIcon from "@material-ui/icons/History";
import PieChartIcon from "@material-ui/icons/PieChart";
import SettingsIcon from "@material-ui/icons/Settings";

const styles = {
  root: {
    flexGrow: 1,
    top: "auto",
    bottom: 0
  }
};

class IconLabelTabs extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;

    return (
      <Paper square className={classes.root}>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          variant="fullWidth"
          indicatorColor="secondary"
          textColor="secondary"
        >
          <Tab icon={<HistoryIcon />} label="HISTORY" />
          <Tab icon={<FunctionsIcon />} label="STATISTICS" />
          <Tab icon={<PieChartIcon />} label="CHARTS" />
          <Tab icon={<SettingsIcon />} label="SETTINGS" />
        </Tabs>
      </Paper>
    );
  }
}

IconLabelTabs.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(IconLabelTabs);
