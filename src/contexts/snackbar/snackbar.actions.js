import SnackbarActionTypes from "./snackbar.types";

export const openSnackbar = payload => ({
  type: SnackbarActionTypes.OPEN_SNACKBAR,
  payload
});

export const closeSnackbar = () => ({
  type: SnackbarActionTypes.CLOSE_SNACKBAR
});
