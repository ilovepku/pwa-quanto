import React, { createContext, useReducer } from "react";
import { snackbarReducer } from "./snackbar.reducer";

export const SnackbarContext = createContext();

const initialSnackbar = {
  open: false,
  msg: "Test Msg",
  variant: "success"
};

const SnackbarContextProvider = props => {
  const [snackbar, dispatchSnackbar] = useReducer(snackbarReducer, initialSnackbar);

  return (
    <SnackbarContext.Provider value={{ snackbar, dispatchSnackbar }}>
      {props.children}
    </SnackbarContext.Provider>
  );
};

export default SnackbarContextProvider;
