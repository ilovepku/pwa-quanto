import React from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { defaultCategories, enqueueSnackbar } from "../redux/actions";

import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";

const mapDispatchToProps = dispatch =>
  bindActionCreators({ defaultCategories, enqueueSnackbar }, dispatch);

function SettingsDefaultCategoriesDialog(props) {
  const { defaultCategories, handleCloseDialog, enqueueSnackbar } = props;
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
            defaultCategories();
            handleCloseDialog();
            enqueueSnackbar({
              message: "Successfully reset.",
              options: {
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
}

export default connect(
  null,
  mapDispatchToProps
)(SettingsDefaultCategoriesDialog);
