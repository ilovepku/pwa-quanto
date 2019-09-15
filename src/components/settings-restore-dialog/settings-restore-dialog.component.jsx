// react
import React, { useEffect, useState, useContext } from "react";

// contexts
import { SettingsContext } from "../../contexts/settings/settings.context";
import { CategoriesContext } from "../../contexts/categories/categories.context";
import { HistoryContext } from "../../contexts/history/history.context";
import { SnackbarContext } from "../../contexts/snackbar/snackbar.context";
import { restoreHistory } from "../../contexts/history/history.actions";
import { restoreCategories } from "../../contexts/categories/categories.actions";
import { restoreSettings } from "../../contexts/settings/settings.actions";
import { openSnackbar } from "../../contexts/snackbar/snackbar.actions";

// material ui
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

// utils
import firebase from "../../utils/firebase.utils";

const SettingsRestoreDialog = ({ handleCloseDialog }) => {
  const [backup, setBackup] = useState(null);
  const { dispatchSettings } = useContext(SettingsContext);
  const { dispatchCategories } = useContext(CategoriesContext);
  const { dispatchHistory } = useContext(HistoryContext);
  const { dispatchSnackbar } = useContext(SnackbarContext);
  useEffect(() => {
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
  }, []); // [] to run effect only once

  const handleRestoreClick = () => {
    dispatchHistory(restoreHistory(backup.history));
    dispatchCategories(restoreCategories(backup.categories));
    dispatchSettings(restoreSettings(backup.settings));
    dispatchSnackbar(
      openSnackbar({
        msg: "Successfully restored.",
        variant: "success"
      })
    );
  };
  return (
    <div className="dialog-container">
      <DialogTitle>Restore</DialogTitle>
      <DialogContent>
        <p>Your last backup was made at:</p>
        <p>
          {backup
            ? backup.createdAt.toDate().toString()
            : "Error finding previous backup."}
        </p>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog}>Cancel</Button>
        <Button
          disabled={backup ? false : true}
          onClick={() => {
            handleRestoreClick();
            handleCloseDialog();
          }}
        >
          Restore
        </Button>
      </DialogActions>
    </div>
  );
};

export default SettingsRestoreDialog;
