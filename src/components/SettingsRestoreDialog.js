// react
import React, { useEffect, useState, useContext } from "react";
import { SettingsContext } from "../contexts/settingsContext";
import { CategoriesContext } from "../contexts/categoriesContext";
import { HistoryContext } from "../contexts/historyContext";
import { SnackbarContext } from "../contexts/snackbarContext";

// libs
import firebase from "../global/firebase";

// material ui
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

const SettingsRestoreDialog = props => {
  const [backup, setBackup] = useState(null);
  const settingsContext = useContext(SettingsContext);
  const categoriesContext = useContext(CategoriesContext);
  const historyContext = useContext(HistoryContext);
  const snackbarContext = useContext(SnackbarContext);
  useEffect(() => {
    firebase
      .firestore()
      .collection("backup")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then(doc => {
        console.log(doc);
        if (doc.exists) {
          setBackup(doc.data());
        }
      });
  }, []); // [] to run effect only once

  const { handleCloseDialog } = props;

  const handleRestoreClick = () => {
    historyContext.dispatch({
      type: "RESTORE_HISTORY",
      payload: backup.history
    });
    categoriesContext.dispatch({
      type: "RESTORE_CATEGORIES",
      payload: backup.categories
    });
    settingsContext.dispatch({
      type: "RESTORE_SETTINGS",
      payload: backup.settings
    });
    snackbarContext.dispatch({
      type: "OPEN_SNACKBAR",
      payload: {
        msg: "Successfully restored.",
        variant: "success"
      }
    });
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
          color="secondary"
        >
          Restore
        </Button>
      </DialogActions>
    </div>
  );
};

export default SettingsRestoreDialog;
