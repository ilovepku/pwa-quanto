import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import { defaultCategories } from "../redux/actions";

import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";

import { withSnackbar } from "notistack";

const mapDispatchToProps = dispatch => {
  return {
    defaultCategories: () => dispatch(defaultCategories())
  };
};

class SettingsDefaultCategoriesDialog extends Component {
  render() {
    const {
      defaultCategories,
      handleCloseDialog,
      enqueueSnackbar
    } = this.props;
    return (
      <Fragment>
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
              enqueueSnackbar("Successfully reset.", {
                variant: "success"
              });
            }}
            color="secondary"
          >
            Reset
          </Button>
        </DialogActions>
      </Fragment>
    );
  }
}

export default withSnackbar(
  connect(
    null,
    mapDispatchToProps
  )(SettingsDefaultCategoriesDialog)
);
