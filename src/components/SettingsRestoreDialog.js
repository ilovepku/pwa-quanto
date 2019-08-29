// react
import React, { useState, useEffect, useContext } from "react";
import { SettingsContext } from "../contexts/settingsContext";
import { CategoriesContext } from "../contexts/categoriesContext";
import { HistoryContext } from "../contexts/historyContext";

// libs
import { firebase } from "../global/firebase";
import { useSnackbar } from "notistack";

// material ui
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

const SettingsRestoreDialog = props => {
  const [backup, setBackup] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const { dispatchSettings } = useContext(SettingsContext);
  const { dispatchCategories } = useContext(CategoriesContext);
  const { dispatchHistory } = useContext(HistoryContext);
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
  });

  const { handleCloseDialog } = props;

  const handleRestoreClick = () => {
    dispatchHistory({ type: "RESTORE_HISTORY", payload: backup.history });
    dispatchCategories({
      type: "RESTORE_CATEGORIES",
      payload: backup.categories
    });
    dispatchSettings({ type: "RESTORE_SETTINGS", payload: backup.settings });
    enqueueSnackbar("Successfully restored.", {
      variant: "success"
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
