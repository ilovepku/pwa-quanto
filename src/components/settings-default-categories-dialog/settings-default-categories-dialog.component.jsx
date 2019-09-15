// react
import React, { useContext } from "react";

// contexts
import { CategoriesContext } from "../../contexts/categories/categories.context";
import { SnackbarContext } from "../../contexts/snackbar/snackbar.context";
import { defaultCategories } from "../../contexts/categories/categories.actions";
import { openSnackbar } from "../../contexts/snackbar/snackbar.actions";

// material ui
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";

const SettingsDefaultCategoriesDialog = ({ handleCloseDialog }) => {
  const { dispatchCategories } = useContext(CategoriesContext);
  const { dispatchSnackbar } = useContext(SnackbarContext);
  return (
    <div className="dialog-container">
      <DialogTitle>Reset Default Categories</DialogTitle>
      <DialogContent>
        <DialogContentText>
          This will remove all your customary category changes, are you sure?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog}>Cancel</Button>
        <Button
          onClick={() => {
            dispatchCategories(defaultCategories());
            dispatchSnackbar(
              openSnackbar({
                msg: "Successfully reset.",
                variant: "success"
              })
            );
            handleCloseDialog();
          }}
        >
          Reset
        </Button>
      </DialogActions>
    </div>
  );
};

export default SettingsDefaultCategoriesDialog;
