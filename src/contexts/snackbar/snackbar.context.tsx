import React, { Dispatch, createContext, useReducer } from "react";
import { snackbarReducer } from "./snackbar.reducer";

export const SnackbarContext = createContext<Partial<ContextProps>>({});

const initialSnackbar = {
  open: false,
  msg: "Test Msg",
  variant: "success"
};

interface ContextProps {
  snackbar: { open: boolean; msg: string; variant: string };
  dispatchSnackbar: Dispatch<{ type: string; payload?: string | object }>;
}

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
