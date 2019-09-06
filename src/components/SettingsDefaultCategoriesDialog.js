// react
import React, { useContext } from "react";
import { CategoriesContext } from "../contexts/categoriesContext";
import { SnackbarContext } from "../contexts/snackbarContext";
import { DEFAULT_CATEGORIES, OPEN_SNACKBAR } from "../contexts/constants";

// material ui
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";

const SettingsDefaultCategoriesDialog = props => {
  const { handleCloseDialog } = props;
  const { dispatch } = useContext(CategoriesContext);
  const snackbarContext = useContext(SnackbarContext);
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
            dispatch({ type: DEFAULT_CATEGORIES });
            handleCloseDialog();
            snackbarContext.dispatch({
              type: OPEN_SNACKBAR,
              payload: {
                msg: "Successfully reset.",
                variant: "success"
              }
            });
          }}
          color="secondary"
        >
          Reset
        </Button>
      </DialogActions>
    </div>
  );
};

export default SettingsDefaultCategoriesDialog;
