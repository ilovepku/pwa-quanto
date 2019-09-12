import SnackbarActionTypes from "./snackbar.types";

export const snackbarReducer = (state, action) => {
  switch (action.type) {
    case SnackbarActionTypes.CLOSE_SNACKBAR:
      return {
        ...state,
        open: false
      };

    case SnackbarActionTypes.OPEN_SNACKBAR:
      return {
        ...state,
        open: true,
        msg: action.payload.msg,
        variant: action.payload.variant
      };

    default:
      return state;
  }
};
