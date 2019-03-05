import {
  SET_ACTIVITY_DATETIME,
  SET_ACTIVITY,
  SET_DETAIL,
  SAVE_ACTIVITY,
  ADD_TO_HISTORY,
  UPDATE_STATE
} from "./constants.js";
import CacheManager from "./cache";

const cache = new CacheManager();

const initialStateActivityNameList = [
  { name: "Reading", parent: "Work" },
  { name: "Meetings", parent: "Work" },
  { name: "Email", parent: "Work" },
  { name: "Phone Calls", parent: "Work" },
  { name: "Research", parent: "Work" },
  { name: "Discussion", parent: "Work" },
  { name: "Travel", parent: "Work" },
  { name: "Night", parent: "Sleep" },
  { name: "Nap", parent: "Sleep" },
  { name: "Breakfast", parent: "Eat" },
  { name: "Brunch", parent: "Eat" },
  { name: "Lunch", parent: "Eat" },
  { name: "Dinner", parent: "Eat" },
  { name: "Snack", parent: "Eat" },
  { name: "-", parent: "Commute" },
  { name: "-", parent: "Housework" },
  { name: "Sports", parent: "Exercise" },
  { name: "Aerobic", parent: "Exercise" },
  { name: "Strength", parent: "Exercise" },
  { name: "Books", parent: "Read" },
  { name: "Newspapers", parent: "Read" },
  { name: "Magazines", parent: "Read" },
  { name: "Internet", parent: "Read" },
  { name: "-", parent: "TV" }
];

const initialStateHistory = {
  activityNameList: initialStateActivityNameList,
  history: []
};

export const rootReducer = (state = initialStateHistory, action = {}) => {
  let newState;
  switch (action.type) {
    case ADD_TO_HISTORY:
      const defaultActivity = [
        ...new Set(state.activityNameList.map(item => item.parent))
      ][0];
      const defaultDetail = state.activityNameList.filter(
        item => item.parent === defaultActivity
      )[0].name;
      newState = {
        ...state,
        history: [
          ...state.history,
          {
            datetime: new Date(),
            activity: defaultActivity,
            detail: defaultDetail
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
    case UPDATE_STATE:
      return action.payload;
    default:
      return state;
  }
};
