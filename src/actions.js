import {
  SET_ACTIVITY_DATETIME,
  SET_ACTIVITY_CATEGORY,
  SET_ACTIVITY_DETAIL,
  ADD_TO_HISTORY
} from "./constants.js";

export const setActivityDatetime = payload => ({
  type: SET_ACTIVITY_DATETIME,
  payload
});

export const setActivityCategory = payload => ({
  type: SET_ACTIVITY_CATEGORY,
  payload
});

export const setActivityDetail = payload => ({
  type: SET_ACTIVITY_DETAIL,
  payload
});

export const setActivityHistory = () => ({
  type: ADD_TO_HISTORY
});
