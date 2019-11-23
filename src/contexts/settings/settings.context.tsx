import React, { Dispatch, createContext, useReducer, useEffect } from "react";
import { settingsReducer } from "./settings.reducer";

export const SettingsContext = createContext<Partial<ContextProps>>({});

const initialSettings = {
  chartsDateFilter: false,
  chartsFilterDateStart: new Date(new Date().setHours(0, 0, 0, 0)),
  chartsFilterDateEnd: new Date(new Date().setHours(23, 59, 59, 999)),
  chartsKeyFilter: false,
  chartsFilterKeyList: ["Unsorted"]
};

interface ContextProps {
  settings: {
    chartsDateFilter: boolean;
    chartsFilterDateStart: number;
    chartsFilterDateEnd: number;
    chartsKeyFilter: boolean;
    chartsFilterKeyList: string[];
  };
  dispatchSettings: Dispatch<{ type: string; payload?: string | object }>;
}

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
