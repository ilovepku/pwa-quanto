import SettingsActionTypes from "./settings.types";

export const switchChartsDateFilter = () => ({
  type: SettingsActionTypes.SWITCH_CHARTS_DATE_FILTER
});

export const setChartsFilterDate = payload => ({
  type: SettingsActionTypes.SET_CHARTS_FILTER_DATE,
  payload
});

export const prevChartsFilterDate = () => ({
  type: SettingsActionTypes.PREV_CHARTS_FILTER_DATE
});

export const nextChartsFilterDate = () => ({
  type: SettingsActionTypes.NEXT_CHARTS_FILTER_DATE
});

export const switchChartsKeyFilter = () => ({
  type: SettingsActionTypes.SWITCH_CHARTS_KEY_FILTER
});

export const addChartsFilterKey = payload => ({
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
