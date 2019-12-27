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

interface ConfirmDialogProps {
  title: string;
  desc: string;
  open: boolean;
  handleCloseDialog: () => void;
  handleConfirmAction: () => void;
}

const ConfirmDialog = ({
  title,
  desc,
  open,
  handleCloseDialog,
  handleConfirmAction
}: ConfirmDialogProps) => {
  return (
    <Dialog open={open} onClose={() => handleCloseDialog()}>
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {desc}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleCloseDialog()}>Cancel</Button>
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
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
