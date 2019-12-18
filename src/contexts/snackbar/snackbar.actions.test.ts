import SnackbarActionTypes from "./snackbar.types";
import { openSnackbar, closeSnackbar } from "./snackbar.actions";

describe("openSnackbar action", () => {
  it("should create the openSnackbar action", () => {
    const mockPayload = {
      msg: "Sample warning text.",
      variant: "warning"
    };
    const action = openSnackbar(mockPayload);
    expect(action.type).toBe(SnackbarActionTypes.OPEN_SNACKBAR);
    expect(action.payload).toEqual(mockPayload);
  });
});

describe("closeSnackbar action", () => {
  it("should create the closeSnackbar action", () => {
    expect(closeSnackbar().type).toEqual(SnackbarActionTypes.CLOSE_SNACKBAR);
  });
});
