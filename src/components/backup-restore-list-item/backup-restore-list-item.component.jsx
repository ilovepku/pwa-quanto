import React, { Fragment, useContext, useState } from "react";

// contexts
import { SettingsContext } from "../../contexts/settings/settings.context";
import { CategoriesContext } from "../../contexts/categories/categories.context";
import { HistoryContext } from "../../contexts/history/history.context";
import { SnackbarContext } from "../../contexts/snackbar/snackbar.context";
import { restoreCategories } from "../../contexts/categories/categories.actions";
import { restoreHistory } from "../../contexts/history/history.actions";
import { restoreSettings } from "../../contexts/settings/settings.actions";
import { openSnackbar } from "../../contexts/snackbar/snackbar.actions";

// material ui
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton
} from "@material-ui/core";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import BackupIcon from "@material-ui/icons/Backup";

// components
import ConfirmDialog from "../confirm-dialog/confirm-dialog.component";

// utils
import firebase from "../../utils/firebase.utils";

const BackupRestoreListItem = () => {
  const { categories, dispatchCategories } = useContext(CategoriesContext);
  const { history, dispatchHistory } = useContext(HistoryContext);
  const { settings, dispatchSettings } = useContext(SettingsContext);
  const { dispatchSnackbar } = useContext(SnackbarContext);
  const [backup, setBackup] = useState(null);
  const [restoreDialogOpen, setRestoreDialogOpen] = useState(false);
  const [backupDialogOpen, setBackupDialogOpen] = useState(false);

  const fetchBackup = () => {
    firebase
      .firestore()
      .collection("backup")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then(doc => {
        if (doc.exists) {
          setBackup(doc.data());
        }
      });
  };

  const handleCloseDialog = () => {
    setRestoreDialogOpen(false);
    setBackupDialogOpen(false);
  };

  const handleRestore = () => {
    if (backup) {
      dispatchHistory(restoreHistory(backup.history));
      dispatchCategories(restoreCategories(backup.categories));
      dispatchSettings(restoreSettings(backup.settings));
      dispatchSnackbar(
        openSnackbar({
          msg: "Successfully restored.",
          variant: "success"
        })
      );
    } else {
      dispatchSnackbar(
        openSnackbar({
          msg: "Backup not found.",
          variant: "error"
        })
      );
    }
  };

  const handleBackup = () => {
    const user = firebase.auth().currentUser;
    if (user) {
      firebase
        .firestore()
        .collection("backup")
        .doc(user.uid)
        .set({
          history: history,
          categories: categories,
          settings: settings,
          createdAt: new Date()
        })
        .then(() => {
          dispatchSnackbar(
            openSnackbar({ msg: "Backup complete.", variant: "success" })
          );
        })
        .catch(() => {
          dispatchSnackbar(
            openSnackbar({
              msg: "Backup error, try again later.",
              variant: "error"
            })
          );
        });
    } else {
      console.log("No user is signed in.");
    }
  };
  return (
    <Fragment>
      <ListItem alignItems="flex-start">
        <ListItemText
          primary={"Manual Backup/Restore"}
          secondary={"Backup/Restore your data"}
        />
        <ListItemSecondaryAction>
          <IconButton
            edge="end"
            onClick={() => {
              fetchBackup();
              setRestoreDialogOpen(true);
            }}
          >
            <CloudDownloadIcon />
          </IconButton>
          <IconButton
            edge="end"
            onClick={() => {
              fetchBackup();
              setBackupDialogOpen(true);
            }}
          >
            <BackupIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <ConfirmDialog
        title={"Restore Data?"}
        desc={`Your last manual backup was ${
          backup ? backup.createdAt.toDate().toLocaleString() : "not found"
        }, your current history, categories and settings will get overwritten`}
        open={restoreDialogOpen}
        handleCloseDialog={handleCloseDialog}
        handleConfirmAction={handleRestore}
      />
      <ConfirmDialog
        title={"Backup Data?"}
        desc={`Your last manual backup was ${
          backup ? backup.createdAt.toDate().toLocaleString() : "not found"
        }, which will get overwritten`}
        open={backupDialogOpen}
        handleCloseDialog={handleCloseDialog}
        handleConfirmAction={handleBackup}
      />
    </Fragment>
  );
};

export default BackupRestoreListItem;
