import {
  SET_ACTIVITY_DATETIME,
  SET_ACTIVITY,
  SET_DETAIL,
  SAVE_ACTIVITY,
  DELETE_ACTIVITY,
  ADD_TO_HISTORY,
  UPDATE_STATE
} from "./constants.js";

export const setActivityDatetime = payload => ({
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
});

export const saveActivity = payload => ({
  type: SAVE_ACTIVITY,
  payload
});

export const deleteActivity = payload => ({
  type: DELETE_ACTIVITY,
  payload
});

export const addToHistory = () => ({
  type: ADD_TO_HISTORY
});

export const updateState = payload => ({
  type: UPDATE_STATE,
  payload
});