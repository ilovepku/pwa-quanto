import React, { createContext, useReducer } from "react";
import { snackbarReducer } from "../reducers/snackbarReducer";

export const SnackbarContext = createContext();

const initialSnackbar = {
  open: false,
  msg: "Test Msg",
  variant: "success"
};

const SnackbarContextProvider = props => {
  const [snackbar, dispatch] = useReducer(snackbarReducer, initialSnackbar);

  return (
    <SnackbarContext.Provider value={{ snackbar, dispatch }}>
      {props.children}
    </SnackbarContext.Provider>
  );
};

export default SnackbarContextProvider;
