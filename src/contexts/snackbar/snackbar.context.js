import React, { createContext, useReducer } from "react";
import { snackbarReducer } from "./snackbar.reducer";

export const SnackbarContext = createContext();

const initialSnackbar = {
  open: false,
  msg: "Test Msg",
  variant: "success"
};

const SnackbarContextProvider = ({ children }) => {
  const [snackbar, dispatchSnackbar] = useReducer(
    snackbarReducer,
    initialSnackbar
  );

  return (
    <SnackbarContext.Provider value={{ snackbar, dispatchSnackbar }}>
      {children}
    </SnackbarContext.Provider>
  );
};

export default SnackbarContextProvider;
