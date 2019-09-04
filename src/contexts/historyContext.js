import React, { createContext, useReducer, useEffect } from "react";
import { historyReducer } from "../reducers/historyReducer";
import { ADD_ACTIVITY, INTERRUPT_ACTIVITY } from "../reducers/constants.js";

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

  // push notification action handler: dispatch with history context
  useEffect(() => {
    const channel = new BroadcastChannel("service-worker-channel");
    channel.onmessage = msg => {
      if (msg.data === "new") dispatch({ type: ADD_ACTIVITY });
      if (msg.data === "interrupt") dispatch({ type: INTERRUPT_ACTIVITY });
    };
    return channel.close;
  }, [dispatch]);

  return (
    <HistoryContext.Provider value={{ history, dispatch }}>
      {props.children}
    </HistoryContext.Provider>
  );
};

export default HistoryContextProvider;
