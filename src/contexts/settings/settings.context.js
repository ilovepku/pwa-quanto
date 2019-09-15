import React, { createContext, useReducer, useEffect } from "react";
import { settingsReducer } from "./settings.reducer";

export const SettingsContext = createContext();

const initialSettings = {
  chartsDateFilter: false,
  chartsDateFilterStart: new Date(new Date().setHours(0, 0, 0, 0)),
  chartsDateFilterEnd: new Date(new Date().setHours(23, 59, 59, 999)),
  chartsKeyExclude: false,
  chartsExcludeKeysList: ["Unsorted"]
};

const SettingsContextProvider = ({ children }) => {
  const [settings, dispatchSettings] = useReducer(settingsReducer, [], () => {
    const localData = localStorage.getItem("settings");
    return localData ? JSON.parse(localData) : initialSettings;
  });
  useEffect(() => {
    localStorage.setItem("settings", JSON.stringify(settings));
  }, [settings]);
  return (
    <SettingsContext.Provider value={{ settings, dispatchSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsContextProvider;
