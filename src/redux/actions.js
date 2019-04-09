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
  DEFAULT_CATEGORIES
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
