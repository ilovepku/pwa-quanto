import SettingsActionTypes from "./settings.types";

export const chartsDateFilterSwitch = () => ({
  type: SettingsActionTypes.CHARTS_DATE_FILTER_SWITCH
});

export const chartsDateFilterSet = payload => ({
  type: SettingsActionTypes.CHARTS_DATE_FILTER_SET,
  payload
});

export const prevChartsFilter = () => ({
  type: SettingsActionTypes.PREV_CHARTS_DATE_FILTER
});

export const nextChartsFilter = () => ({
  type: SettingsActionTypes.NEXT_CHARTS_DATE_FILTER
});

export const chartsKeyExcludeSwitch = () => ({
  type: SettingsActionTypes.CHARTS_KEY_EXCLUDE_SWITCH
});

export const addChartsExcludeKey = payload => ({
  type: SettingsActionTypes.ADD_CHARTS_EXCLUDE_KEY,
  payload
});

export const delChartsExcludeKey = payload => ({
  type: SettingsActionTypes.DEL_CHARTS_EXCLUDE_KEY,
  payload
});

export const restoreSettings = payload => ({
  type: SettingsActionTypes.RESTORE_SETTINGS,
  payload
});
