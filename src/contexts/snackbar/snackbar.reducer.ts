import SnackbarActionTypes from "./snackbar.types";

const snackbarReducer = (state, action) => {
  switch (action.type) {
    case SnackbarActionTypes.CLOSE_SNACKBAR:
      return {
        ...state,
        open: false,
        msg: "",
        variant: "info"
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

export default snackbarReducer;
