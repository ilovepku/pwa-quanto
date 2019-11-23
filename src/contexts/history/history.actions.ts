import HistoryActionTypes from "./history.types";

export const newActivity = () => ({
  type: HistoryActionTypes.NEW_ACTIVITY
});

export const pauseActivity = () => ({
  type: HistoryActionTypes.PAUSE_ACTIVITY
});

export const saveActivity = payload => ({
  type: HistoryActionTypes.SAVE_ACTIVITY,
  payload
});

export const splitActivity = payload => ({
  type: HistoryActionTypes.SPLIT_ACTIVITY,
  payload
});

export const deleteActivity = payload => ({
  type: HistoryActionTypes.DELETE_ACTIVITY,
  payload
});

export const displayNotification = payload => ({
  type: HistoryActionTypes.DISPLAY_NOTIFICATION,
  payload
});

export const purgeHistory = payload => ({
  type: HistoryActionTypes.PURGE_HISTORY,
  payload
});

export const restoreHistory = payload => ({
  type: HistoryActionTypes.RESTORE_HISTORY,
  payload
});
