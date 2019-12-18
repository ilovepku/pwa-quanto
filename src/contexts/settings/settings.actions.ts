import SettingsActionTypes from "./settings.types";

export const toggleChartsDateFilter = () => ({
  type: SettingsActionTypes.TOGGLE_CHARTS_DATE_FILTER
});

export const setChartsFilterDateStart = (payload: Date) => ({
  type: SettingsActionTypes.SET_CHARTS_FILTER_DATE_START,
  payload
});

export const setChartsFilterDateEnd = (payload: Date) => ({
  type: SettingsActionTypes.SET_CHARTS_FILTER_DATE_END,
  payload
});

export const prevChartsFilterDate = () => ({
  type: SettingsActionTypes.PREV_CHARTS_FILTER_DATE
});

export const nextChartsFilterDate = () => ({
  type: SettingsActionTypes.NEXT_CHARTS_FILTER_DATE
});

export const toggleChartsKeyFilter = () => ({
  type: SettingsActionTypes.TOGGLE_CHARTS_KEY_FILTER
});

export const addChartsFilterKey = (payload: string) => ({
  type: SettingsActionTypes.ADD_CHARTS_FILTER_KEY,
  payload
});

export const delChartsFilterKey = payload => ({
  type: SettingsActionTypes.DEL_CHARTS_FILTER_KEY,
  payload
});

export const restoreSettings = payload => ({
  type: SettingsActionTypes.RESTORE_SETTINGS,
  payload
});
