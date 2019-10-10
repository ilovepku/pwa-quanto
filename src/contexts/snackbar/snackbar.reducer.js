import SnackbarActionTypes from "./snackbar.types";

export const snackbarReducer = (state, action) => {
  switch (action.type) {
    case SnackbarActionTypes.CLOSE_SNACKBAR:
      return {
        ...state,
        open: false
      };

    case SnackbarActionTypes.OPEN_SNACKBAR:
      const { msg, variant } = action.payload;
      return {
        ...state,
        open: true,
        msg,
        variant
      };

    default:
      return state;
  }
};