// react
import React from "react";

// material ui
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from "@material-ui/core";

const ConfirmDialog = ({
  title,
  desc,
  open,
  handleCloseDialog,
  handleConfirmAction
}) => {
  return (
    <Dialog open={open} onClose={() => handleCloseDialog()}>
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {desc}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            handleConfirmAction();
            handleCloseDialog();
          }}
          color="secondary"
          autoFocus
        >
          CONFIRM
        </Button>
        <Button onClick={() => handleCloseDialog()}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
