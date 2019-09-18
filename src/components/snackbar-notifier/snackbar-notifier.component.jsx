// react
import React, { useContext } from "react";

// contexts
import { SnackbarContext } from "../../contexts/snackbar/snackbar.context";
import { closeSnackbar } from "../../contexts/snackbar/snackbar.actions";

// material ui
import { makeStyles } from "@material-ui/core/styles";
import { amber, green } from "@material-ui/core/colors";
import { Snackbar, SnackbarContent, IconButton } from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import WarningIcon from "@material-ui/icons/Warning";
import ErrorIcon from "@material-ui/icons/Error";
import CloseIcon from "@material-ui/icons/Close";

// libs
import clsx from "clsx";

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon
};

const useStyles = makeStyles(theme => ({
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  warning: {
    backgroundColor: amber[700]
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1)
  },
  message: {
    display: "flex",
    alignItems: "center"
  }
}));

const SnackbarNotifier = () => {
  const classes = useStyles();
  const { snackbar, dispatchSnackbar } = useContext(SnackbarContext);
  const Icon = variantIcon[snackbar.variant];

  const handleClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatchSnackbar(closeSnackbar());
  };

  return (
    <Snackbar
      open={snackbar.open}
      autoHideDuration={2000}
      onClose={handleClose}
    >
      <SnackbarContent
        className={clsx(classes[snackbar.variant])}
        aria-describedby="client-snackbar"
        message={
          <span id="client-snackbar" className={classes.message}>
            <Icon className={clsx(classes.icon, classes.iconVariant)} />
            {snackbar.msg}
          </span>
        }
        action={[
          <IconButton key="close" onClick={handleClose}>
            <CloseIcon className={classes.icon} />
          </IconButton>
        ]}
      />
    </Snackbar>
  );
};

export default SnackbarNotifier;
