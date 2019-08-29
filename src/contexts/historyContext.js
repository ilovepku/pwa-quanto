import React, { createContext, useReducer, useEffect } from "react";
import { historyReducer } from "../reducers/historyReducer";

export const HistoryContext = createContext();

const initialHistory = [
  // duplicate in reducer
  {
    datetime: new Date(),
    activity: "Unsorted",
    detail: "-"
  }
];

const HistoryContextProvider = props => {
  const [history, dispatch] = useReducer(historyReducer, [], () => {
    const localData = localStorage.getItem("history");
    return localData ? JSON.parse(localData) : initialHistory;
  });
  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(history));
  }, [history]);
  return (
    <HistoryContext.Provider value={{ history, dispatch }}>
      {props.children}
    </HistoryContext.Provider>
  );
};

export default HistoryContextProvider;
