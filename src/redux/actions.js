import {
  ADD_ACTIVITY,
  INTERRUPT_ACTIVITY,
  SAVE_ACTIVITY,
  SPLIT_ACTIVITY,
  DELETE_ACTIVITY,
  DISPLAY_NOTIFICATION,
  PURGE_HISTORY,
  EDIT_ACTIVITY_NAME,
  EDIT_DETAIL_NAME,
  DELETE_ACTIVITY_NAME,
  DELETE_DETAIL_NAME,
  REORDER_CATEGORIES,
  DEFAULT_CATEGORIES,
  CHARTS_FILTER_SWITCH,
  CHARTS_FILTER_SET,
  PREV_CHARTS_FILTER,
  NEXT_CHARTS_FILTER,
  CHARTS_EXCLUDE_SWITCH,
  ADD_CHARTS_EXCLUDE_KEY,
  DEL_CHARTS_EXCLUDE_KEY
} from "./constants.js";

// history related
export const addActivity = () => ({
  type: ADD_ACTIVITY
});

export const interruptActivity = () => ({
  type: INTERRUPT_ACTIVITY
});

export const saveActivity = payload => ({
  type: SAVE_ACTIVITY,
  payload
});

export const splitActivity = payload => ({
  type: SPLIT_ACTIVITY,
  payload
});

export const deleteActivity = payload => ({
  type: DELETE_ACTIVITY,
  payload
});

export const displayNotification = () => ({
  type: DISPLAY_NOTIFICATION
});

export const purgeHistory = payload => ({
  type: PURGE_HISTORY,
  payload
});

// categories related
export const editActivityName = payload => ({
  type: EDIT_ACTIVITY_NAME,
  payload
});

export const editDetailName = payload => ({
  type: EDIT_DETAIL_NAME,
  payload
});

export const deleteActivityName = payload => ({
  type: DELETE_ACTIVITY_NAME,
  payload
});

export const deleteDetailName = payload => ({
  type: DELETE_DETAIL_NAME,
  payload
});

export const reorderCategories = payload => ({
  type: REORDER_CATEGORIES,
  payload
});

export const defaultCategories = () => ({
  type: DEFAULT_CATEGORIES
});

// settings related
export const chartsFilterSwitch = () => ({
  type: CHARTS_FILTER_SWITCH
});

export const chartsFilterSet = payload => ({
  type: CHARTS_FILTER_SET,
  payload
});

export const prevChartsFilter = () => ({
  type: PREV_CHARTS_FILTER
});

export const nextChartsFilter = () => ({
  type: NEXT_CHARTS_FILTER
});

export const chartsExcludeSwitch = () => ({
  type: CHARTS_EXCLUDE_SWITCH
});

export const addChartsExcludeKey = payload => ({
  type: ADD_CHARTS_EXCLUDE_KEY,
  payload
});

export const delChartsExcludeKey = payload => ({
  type: DEL_CHARTS_EXCLUDE_KEY,
  payload
});
