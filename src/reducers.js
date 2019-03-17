import {
  SET_ACTIVITY_DATETIME,
  SET_ACTIVITY,
  SET_DETAIL,
  SAVE_ACTIVITY,
  SPLIT_ACTIVITY,
  DELETE_ACTIVITY,
  ADD_TO_HISTORY,
  UPDATE_STATE
} from "./constants.js";
import CacheManager from "./cache";
import initialActivityList from "./initialActivityList";

const cache = new CacheManager();

const defaultActivityId = initialActivityList.activityOrder[0];
const defaultActivity = initialActivityList.activities[defaultActivityId];
const defaultActivityName = defaultActivity.title;
const defaultDetailId = defaultActivity.detailIds[0];
const defaultDetail = initialActivityList.details[defaultDetailId];
const defaultDetailName = defaultDetail.content;

const initialStateHistory = {
  fullActivityList: initialActivityList,
  history: [{ datetime: new Date(), activity: defaultActivityName, detail: defaultDetailName }]
};

export const rootReducer = (state = initialStateHistory, action = {}) => {
  let newState;
  switch (action.type) {
    case ADD_TO_HISTORY:
      newState = {
        ...state,
        history: [
          ...state.history,
          {
            datetime: new Date(),
            activity: defaultActivityName,
            detail: defaultDetailName
          }
        ]
      };
      cache.writeData("state", newState);
      return newState;
    case SET_ACTIVITY_DATETIME:
      newState = {
        ...state,
        history: state.history.map((item, index) => {
          if (index !== action.payload.index) return item;
          return {
            ...item,
            datetime: action.payload.datetime
          };
        })
      };
      cache.writeData("state", newState);
      return newState;
    case SET_ACTIVITY:
      const detail = state.activityNameList.filter(
        item => item.parent === action.payload.activity
      )[0].name;
      newState = {
        ...state,
        history: state.history.map((item, index) => {
          if (index !== action.payload.index) return item;
          return {
            ...item,
            activity: action.payload.activity,
            detail
          };
        })
      };
      cache.writeData("state", newState);
      return newState;
    case SET_DETAIL:
      newState = {
        ...state,
        history: state.history.map((item, index) => {
          if (index !== action.payload.index) return item;
          return {
            ...item,
            detail: action.payload.detail
          };
        })
      };
      cache.writeData("state", newState);
      return newState;
    case SAVE_ACTIVITY:
      newState = {
        ...state,
        history: state.history.map((item, index) => {
          if (index !== action.payload.index) return item;
          return {
            ...item,
            datetime: action.payload.datetime,
            activity: action.payload.activity,
            detail: action.payload.detail
          };
        })
      };
      cache.writeData("state", newState);
      return newState;
    case SPLIT_ACTIVITY:
      newState = {
        ...state,
        history: [
          ...state.history.slice(0, action.payload.index + 1),
          {
            datetime: action.payload.datetime,
            activity: action.payload.activity,
            detail: action.payload.detail
          },
          ...state.history.slice(action.payload.index + 1)
        ]
      };
      cache.writeData("state", newState);
      return newState;
    case DELETE_ACTIVITY:
      newState = {
        ...state,
        history: state.history.filter((item, index) => index !== action.payload)
      };
      cache.writeData("state", newState);
      return newState;
    case UPDATE_STATE:
      return action.payload;
    default:
      return state;
  }
};
