import React, { Dispatch, createContext, useReducer } from "react";
import userReducer from "./user.reducer";

export const UserContext = createContext<Partial<ContextProps>>({});

interface ContextProps {
  user: { currentUser: { displayName: string; uid: string } };
  dispatchUser: Dispatch<{ type: string; payload?: string | object }>;
}

const INITIAL_STATE = {
  currentUser: null
};

export const UserContextProvider = props => {
  const [user, dispatchUser] = useReducer(userReducer, INITIAL_STATE);
  return (
    <UserContext.Provider value={{ user, dispatchUser }}>
      {props.children}
    </UserContext.Provider>
  );
};
