import SnackbarActionTypes from "./snackbar.types";
import snackbarReducer from "./snackbar.reducer";

const prevStateOpen = {
  open: true,
  msg: "Sample warning text.",
  variant: "warning"
};

const prevStateClosed = {
  open: false,
  msg: "",
  variant: "info"
};

describe("snackbarReducer", () => {
  it("should return prev state", () => {
    expect(snackbarReducer(prevStateOpen, {})).toEqual(prevStateOpen);
  });

  it("should toggle open value to 'false' and reset msg and variant values with closeSnackbar action", () => {
    expect(
      snackbarReducer(prevStateOpen, {
        type: SnackbarActionTypes.CLOSE_SNACKBAR
      })
    ).toEqual({
      open: false,
      msg: "",
      variant: "info"
    });
  });

  it("should toggle open value to 'true' and set msg and variant values with openSnackbar action", () => {
    expect(
      snackbarReducer(prevStateClosed, {
        type: SnackbarActionTypes.OPEN_SNACKBAR,
        payload: {
          open: true,
          msg: "Sample warning text.",
          variant: "warning"
        }
      })
    ).toEqual({
      open: true,
      msg: "Sample warning text.",
      variant: "warning"
    });
  });
});
