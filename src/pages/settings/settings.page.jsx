// react
import React from "react";

// material ui
import { makeStyles } from "@material-ui/core/styles";
import { List, Divider } from "@material-ui/core";

// components
import AccountSettings from "../../components/account-settings/account-settings.component";
import NotificationSettings from "../../components/notification-settings/notification-settings.component";
import ChartsSettings from "../../components/charts-settings/charts-settings.component";
import ClearDataSettings from "../../components/clear-data-settings/clear-data-settings.component";

const useStyles = makeStyles(theme => ({
  list: {
    backgroundColor: theme.palette.background.paper,
    paddingTop: 0,
    paddingBottom: "110px"
  }
}));

const SettingsPage = () => {
  const classes = useStyles();

  return (
    <List className={classes.list}>
      <AccountSettings />
      <Divider component="li" />
      <NotificationSettings />
      <Divider component="li" />
      <ChartsSettings />
      <Divider component="li" />
      <ClearDataSettings />
    </List>
  );
};

export default SettingsPage;
