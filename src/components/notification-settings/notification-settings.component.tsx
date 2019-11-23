// react
import React, { Fragment, useState } from "react";

// material ui
import {
  ListItem,
  ListSubheader,
  ListItemText,
  ListItemSecondaryAction,
  Switch
} from "@material-ui/core";

const NotificationSettings = () => {
  const [notificationEnabled, setNotificationEnabled] = useState(
    Notification.permission === "granted" ? true : false
  );
  const handlePermissionRequestClick = () => {
    Notification.requestPermission(result => {
      if (result === "granted") {
        setNotificationEnabled(true);
      }
    });
  };
  return (
    <Fragment>
      <ListSubheader>Notification</ListSubheader>
      <ListItem alignItems="flex-start">
        <ListItemText
          primary="Notification"
          secondary={
            "Enable to check/pause/add activity from outside the app (Android only)"
          }
        />
        <ListItemSecondaryAction>
          <Switch
            edge="end"
            onChange={handlePermissionRequestClick}
            checked={notificationEnabled}
            disabled={notificationEnabled}
          />
        </ListItemSecondaryAction>
      </ListItem>
    </Fragment>
  );
};

export default NotificationSettings;
