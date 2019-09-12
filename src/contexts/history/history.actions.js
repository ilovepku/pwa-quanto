import HistoryActionTypes from "./history.types";

export const addActivity = () => ({
  type: HistoryActionTypes.ADD_ACTIVITY
});

export const interruptActivity = () => ({
  type: HistoryActionTypes.INTERRUPT_ACTIVITY
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

export const displayNotification = () => ({
  type: HistoryActionTypes.DISPLAY_NOTIFICATION
});

export const purgeHistory = payload => ({
  type: HistoryActionTypes.PURGE_HISTORY,
  payload
});

export const restoreHistory = payload => ({
  type: HistoryActionTypes.RESTORE_HISTORY,
  payload
});
