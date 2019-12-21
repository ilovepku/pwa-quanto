import React, { Dispatch, createContext, useReducer } from "react";

import snackbarReducer from "./snackbar.reducer";

interface ContextProps {
  snackbar: { open: boolean; msg: string; variant: string };
  dispatchSnackbar: Dispatch<{ type: string; payload?: string | object }>;
}

export const SnackbarContext = createContext<Partial<ContextProps>>({});

const initialSnackbar = {
  open: false,
  msg: "",
  variant: "warning"
};

export const SnackbarContextProvider = ({ children }) => {
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
