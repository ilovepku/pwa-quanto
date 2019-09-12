import SettingsActionTypes from "./settings.types";

export const chartsFilterSwitch = () => ({
  type: SettingsActionTypes.CHARTS_FILTER_SWITCH
});

export const chartsFilterSet = payload => ({
  type: SettingsActionTypes.CHARTS_FILTER_SET,
  payload
});

export const prevChartsFilter = () => ({
  type: SettingsActionTypes.PREV_CHARTS_FILTER
});

export const nextChartsFilter = () => ({
  type: SettingsActionTypes.NEXT_CHARTS_FILTER
});

export const chartsExcludeSwitch = () => ({
  type: SettingsActionTypes.CHARTS_EXCLUDE_SWITCH
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
