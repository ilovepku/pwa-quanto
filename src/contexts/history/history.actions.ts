import HistoryActionTypes from "./history.types";

export const newActivity = () => ({
  type: HistoryActionTypes.NEW_ACTIVITY
});

export const pauseActivity = () => ({
  type: HistoryActionTypes.PAUSE_ACTIVITY
});

export const saveActivity = (payload: {
  index: number;
  datetime: Date;
  activity: string;
  detail: string;
  nextItemDatetime: Date;
}) => ({
  type: HistoryActionTypes.SAVE_ACTIVITY,
  payload
});

export const splitActivity = (payload: {
  index: number;
  splitDatetime: Date;
}) => ({
  type: HistoryActionTypes.SPLIT_ACTIVITY,
  payload
});

export const deleteActivity = payload => ({
  type: HistoryActionTypes.DELETE_ACTIVITY,
  payload
});

export const displayNotification = (payload: string) => ({
  type: HistoryActionTypes.DISPLAY_NOTIFICATION,
  payload
});

export const purgeHistory = (payload: Date) => ({
  type: HistoryActionTypes.PURGE_HISTORY,
  payload
});

export const restoreHistory = payload => ({
  type: HistoryActionTypes.RESTORE_HISTORY,
  payload
});
