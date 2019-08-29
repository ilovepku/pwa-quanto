import React, { createContext, useReducer, useEffect } from "react";
import { settingsReducer } from "../reducers/settingsReducer";

export const SettingsContext = createContext();

const initialSettings = {
  chartsFilter: false,
  chartsFilterStart: new Date().setHours(0, 0, 0, 0),
  chartsFilterEnd: new Date().setHours(23, 59, 59, 999),
  chartsExclude: false,
  chartsExcludeList: ["Unsorted"]
};

const SettingsContextProvider = props => {
  const [settings, dispatch] = useReducer(settingsReducer, [], () => {
    const localData = localStorage.getItem("settings");
    return localData ? JSON.parse(localData) : initialSettings;
  });
  useEffect(() => {
    localStorage.setItem("settings", JSON.stringify(settings));
  }, [settings]);
  return (
    <SettingsContext.Provider value={{ settings, dispatch }}>
      {props.children}
    </SettingsContext.Provider>
  );
};

export default SettingsContextProvider;
