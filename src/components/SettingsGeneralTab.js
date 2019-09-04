// react
import React, { Fragment, useState, useContext } from "react";
import { HistoryContext } from "../contexts/historyContext";
import { DISPLAY_NOTIFICATION } from "../reducers/constants.js";

// material ui
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";

// components
import SettingsPurgeHistoryDialog from "./SettingsPurgeHistoryDialog";
import SettingsDefaultCategoriesDialog from "./SettingsDefaultCategoriesDialog";
import SettingsRestoreDialog from "./SettingsRestoreDialog";
import SettingsGeneralBackup from "./SettingsGeneralBackup";

const SettingsGeneralTab = () => {
  const { dispatch } = useContext(HistoryContext);
  const [purgeDialogOpen, setPurgeDialogOpen] = useState(false);
  const [
    defaultCategoriesDialogOpen,
    setDefaultCategoriesDialogOpen
  ] = useState(false);
  const [restoreDialogOpen, setRestoreDialogOpen] = useState(false);
  const [disabled, setDisabled] = useState(
    Notification.permission === "granted" ? true : false
  );

  const handleCloseDialog = () => {
    setPurgeDialogOpen(false);
    setDefaultCategoriesDialogOpen(false);
    setRestoreDialogOpen(false);
  };

  const handlePermissionRequestClick = () => {
    Notification.requestPermission(result => {
      if (result === "granted") {
        dispatch({ TYPE: DISPLAY_NOTIFICATION });
        setDisabled(true);
      }
    });
  };

  return (
    <Fragment>
      <Card>
        <CardContent>
          Enable Notification to check/pause/add an activity without opening the
          app or even unlocking your device).
        </CardContent>
        <CardActions>
          <Button
            disabled={disabled}
            color="primary"
            onClick={() => handlePermissionRequestClick()}
          >
            {disabled ? "Notification Enabled" : "Enable Notification"}
          </Button>
        </CardActions>
      </Card>

      <SettingsGeneralBackup setRestoreDialogOpen={setRestoreDialogOpen} />

      <Card>
        <CardContent>
          Delete all history entries on and before a certain date of your choice
          (a new activity will be started if all history entries are purged).
        </CardContent>
        <CardActions>
          <Button color="secondary" onClick={() => setPurgeDialogOpen(true)}>
            Purge History
          </Button>
        </CardActions>
      </Card>

      <Card>
        <CardContent>Restore default categories</CardContent>
        <CardActions>
          <Button
            color="secondary"
            onClick={() => setDefaultCategoriesDialogOpen(true)}
          >
            DEFAULT CATEGORIES
          </Button>
        </CardActions>
      </Card>

      <Dialog open={purgeDialogOpen} onClose={handleCloseDialog}>
        <SettingsPurgeHistoryDialog handleCloseDialog={handleCloseDialog} />
      </Dialog>

      <Dialog open={defaultCategoriesDialogOpen} onClose={handleCloseDialog}>
        <SettingsDefaultCategoriesDialog
          handleCloseDialog={handleCloseDialog}
        />
      </Dialog>

      <Dialog open={restoreDialogOpen} onClose={handleCloseDialog}>
        <SettingsRestoreDialog handleCloseDialog={handleCloseDialog} />
      </Dialog>
    </Fragment>
  );
};

export default SettingsGeneralTab;
