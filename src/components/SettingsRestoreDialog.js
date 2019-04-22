import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import { restore } from "../redux/actions";

import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

const mapDispatchToProps = dispatch => {
  return {
    restore: () => dispatch(restore())
  };
};

class SettingsRestoreDialog extends Component {
  render() {
    const { restore, handleCloseDialog } = this.props;
    return (
      <Fragment>
        <DialogTitle>Restore</DialogTitle>
        <DialogContent>Restore history and categories</DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={() => {
              restore();
              handleCloseDialog();
            }}
            color="secondary"
          >
            Restore
          </Button>
        </DialogActions>
      </Fragment>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(SettingsRestoreDialog);
