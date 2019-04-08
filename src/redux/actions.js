import {
  /* SET_ACTIVITY_DATETIME,
  SET_ACTIVITY,
  SET_DETAIL, */
  SAVE_ACTIVITY,
  SPLIT_ACTIVITY,
  DELETE_ACTIVITY,
  ADD_TO_HISTORY,
  ADD_INTERRUPTION,
  EDIT_ACTIVITY_NAME,
  EDIT_DETAIL_NAME,
  DELETE_ACTIVITY_NAME,
  DELETE_DETAIL_NAME,
  REORDER_ACTIVITY_LIST,
  UPDATE_STATE,
  DISPLAY_NOTIFICATION,
  DEFAULT_ACTIVITY_LIST,
  PURGE_HISTORY
} from "./constants.js";

/* export const setActivityDatetime = payload => ({
  type: SET_ACTIVITY_DATETIME,
  payload
});

export const setActivity = payload => ({
  type: SET_ACTIVITY,
  payload
});

export const setDetail = payload => ({
  type: SET_DETAIL,
  payload
}); */

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

export const addToHistory = () => ({
  type: ADD_TO_HISTORY
});

export const addInterruption = () => ({
  type: ADD_INTERRUPTION
});

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

export const reorderActivityList = payload => ({
  type: REORDER_ACTIVITY_LIST,
  payload
});

export const updateState = payload => ({
  type: UPDATE_STATE,
  payload
});

export const displayNotification = () => ({
  type: DISPLAY_NOTIFICATION
});

export const defaultActivityList = () => ({
  type: DEFAULT_ACTIVITY_LIST
});

export const purgeHistory = payload => ({
  type: PURGE_HISTORY,
  payload
});
