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
  variant: "warning"
};

describe("snackbarReducer", () => {
  it("should return prev state", () => {
    expect(snackbarReducer(prevStateOpen, {})).toEqual(prevStateOpen);
  });

  it("should toggle open value to 'false' and reset msg and variant values with closeSnackbar action", () => {
    expect(
      snackbarReducer(prevStateOpen, {
        type: SnackbarActionTypes.CLOSE_SNACKBAR
      }).open
    ).toBe(false);
  });

  it("should toggle open value to 'true' and set msg and variant values with openSnackbar action", () => {
    expect(
      snackbarReducer(prevStateClosed, {
        type: SnackbarActionTypes.OPEN_SNACKBAR,
        payload: {
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
