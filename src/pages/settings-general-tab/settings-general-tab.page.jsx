// react
import React, { Fragment, useState } from "react";

// material ui
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Dialog
} from "@material-ui/core";

// components
import SettingsPurgeHistoryDialog from "../../components/settings-purge-history-dialog/settings-purge-history-dialog.component";
import SettingsDefaultCategoriesDialog from "../../components/settings-default-categories-dialog/settings-default-categories-dialog.component";
import SettingsRestoreDialog from "../../components/settings-restore-dialog/settings-restore-dialog.component";
import SettingsBackupCard from "../../components/settings-backup-card/settings-backup-card.component";

const SettingsGeneralTab = () => {
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

  return (
    <Fragment>
      <SettingsBackupCard setRestoreDialogOpen={setRestoreDialogOpen} />

      <Card>
        <CardContent>
          Delete all history entries on and before a certain date of your choice
          (a new activity will be started if all history entries are purged).
        </CardContent>
        <CardActions>
          <Button onClick={() => setPurgeDialogOpen(true)}>
            Purge History
          </Button>
        </CardActions>
      </Card>

      <Card>
        <CardContent>Restore default categories</CardContent>
        <CardActions>
          <Button onClick={() => setDefaultCategoriesDialogOpen(true)}>
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
