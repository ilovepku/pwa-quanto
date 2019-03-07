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

const cache = new CacheManager();

/* const initialStateActivityNameList = [
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
]; */

const initialStateActivityNameList = [
  { name: "-", parent: "Eat" },
  { name: "Cook", parent: "Eat" },
  { name: "Meal", parent: "Eat" },
  { name: "-", parent: "Exercise" },
  { name: "Aerobic", parent: "Exercise" },
  { name: "Strength", parent: "Exercise" },
  { name: "-", parent: "Fun" },
  { name: "Game", parent: "Fun" },
  { name: "Movie", parent: "Fun" },
  { name: "Music", parent: "Fun" },
  { name: "Read", parent: "Fun" },
  { name: "Surfing", parent: "Fun" },
  { name: "Tourism", parent: "Fun" },
  { name: "TV", parent: "Fun" },
  { name: "-", parent: "Life" },
  { name: "Beauty", parent: "Life" },
  { name: "Groceries", parent: "Life" },
  { name: "Health", parent: "Life" },
  { name: "Housework", parent: "Life" },
  { name: "Hygiene", parent: "Life" },
  { name: "Potty", parent: "Life" },
  { name: "Shop", parent: "Life" },
  { name: "-", parent: "Social" },
  { name: "Friend", parent: "Social" },
  { name: "Partner", parent: "Social" },
  { name: "Relative", parent: "Social" },
  { name: "-", parent: "Study" },
  { name: "Coding", parent: "Study" },
  { name: "Language", parent: "Study" },
  { name: "-", parent: "Sleep" },
  { name: "Nap", parent: "Sleep" },
  { name: "Night", parent: "Sleep" },
  { name: "-", parent: "Transport" },
  { name: "Drive", parent: "Transport" },
  { name: "Intercity", parent: "Transport" },
  { name: "Public", parent: "Transport" },
  { name: "Taxi", parent: "Transport" },
  { name: "Walk", parent: "Transport" },
  { name: "-", parent: "Work" },
  { name: "Coding", parent: "Work" },
  { name: "Contact", parent: "Work" },
  { name: "Discuss", parent: "Work" },
  { name: "Job hunting", parent: "Work" },
  { name: "Meetings", parent: "Work" },
  { name: "Research", parent: "Work" }
];

const initialStateHistory = {
  activityNameList: initialStateActivityNameList,
  history: [{ datetime: new Date(), activity: "Work", detail: "-" }]
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
