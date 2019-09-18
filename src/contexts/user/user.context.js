import React, { createContext, useReducer } from "react";
import userReducer from "./user.reducer";

export const UserContext = createContext();

const INITIAL_STATE = {
  currentUser: null
};

const UserContextProvider = props => {
  const [user, dispatchUser] = useReducer(userReducer, INITIAL_STATE);
  return (
    <UserContext.Provider value={{ user, dispatchUser }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
