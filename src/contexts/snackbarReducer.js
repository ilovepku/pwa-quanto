import { CLOSE_SNACKBAR, OPEN_SNACKBAR } from "./constants.js";

export const snackbarReducer = (state, action) => {
  switch (action.type) {
    case CLOSE_SNACKBAR:
      return {
        ...state,
        open: false
      };

    case OPEN_SNACKBAR:
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
