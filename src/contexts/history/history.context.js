import React, { createContext, useReducer, useEffect } from "react";
import { historyReducer } from "./history.reducer";
import { newActivity, pauseActivity } from "./history.actions";

export const HistoryContext = createContext();

const initialHistory = [
  // duplicate in reducer
  {
    datetime: new Date(),
    activity: "Unsorted",
    detail: "-"
  }
];

const HistoryContextProvider = ({ children }) => {
  const [history, dispatchHistory] = useReducer(historyReducer, [], () => {
    const localData = localStorage.getItem("history");
    return localData ? JSON.parse(localData) : initialHistory;
  });
  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(history));
  }, [history]);

  // service worker notification action handler
  useEffect(() => {
    const channel = new BroadcastChannel("service-worker-channel");
    channel.onmessage = msg => {
      if (msg.data === "new") dispatchHistory(newActivity());
      if (msg.data === "pause") dispatchHistory(pauseActivity());
    };
    return () => {
      channel.close();
    };
  }, [dispatchHistory]);

  return (
    <HistoryContext.Provider value={{ history, dispatchHistory }}>
      {children}
    </HistoryContext.Provider>
  );
};

export default HistoryContextProvider;