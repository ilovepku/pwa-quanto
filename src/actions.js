import {
  SET_ACTIVITY_DATETIME,
  SET_ACTIVITY,
  SET_DETAIL,
  ADD_TO_HISTORY
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

export const setActivityHistory = () => ({
  type: ADD_TO_HISTORY
});
