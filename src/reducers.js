import {
  SET_ACTIVITY_DATETIME,
  SET_ACTIVITY_CATEGORY,
  SET_ACTIVITY_DETAIL,
  ADD_TO_HISTORY
} from "./constants.js";

const initialStateActivityNameList = [
  { name: "Work" },
  { name: "Reading", parent: "Work" },
  { name: "Meetings", parent: "Work" },
  { name: "Email", parent: "Work" },
  { name: "Phone Calls", parent: "Work" },
  { name: "Research", parent: "Work" },
  { name: "Discussion", parent: "Work" },
  { name: "Travel", parent: "Work" },
  { name: "Sleep" },
  { name: "Night", parent: "Sleep" },
  { name: "Nap", parent: "Sleep" },
  { name: "Eat" },
  { name: "Breakfast", parent: "Eat" },
  { name: "Brunch", parent: "Eat" },
  { name: "Lunch", parent: "Eat" },
  { name: "Dinner", parent: "Eat" },
  { name: "Snack", parent: "Eat" },
  { name: "Commute" },
  { name: "-", parent: "Commute" },
  { name: "Housework" },
  { name: "-", parent: "Housework" },
  { name: "Exercise" },
  { name: "Sports", parent: "Exercise" },
  { name: "Aerobic", parent: "Exercise" },
  { name: "Strength", parent: "Exercise" },
  { name: "Read" },
  { name: "Books", parent: "Read" },
  { name: "Newspapers", parent: "Read" },
  { name: "Magazines", parent: "Read" },
  { name: "Internet", parent: "Read" },
  { name: "TV" },
  { name: "-", parent: "TV" }
];

export const setActivityListReducer = (
  state = {
    activityList: initialStateActivityNameList
  },
  action = {}
) => state;

const initialStateActivity = {
  datetime: new Date(),
  category: "Work",
  detail: "Reading"
};

export const setActivityReducer = (
  state = initialStateActivity,
  action = {}
) => {
  switch (action.type) {
    case SET_ACTIVITY_CATEGORY:
      const detailList = initialStateActivityNameList.filter(
        item => item.parent === action.payload
      );
      return {
        ...state,
        category: action.payload,
        detail: detailList.length ? detailList[0].name : "-" // set detail to activity default
      };
    case SET_ACTIVITY_DETAIL:
      return { ...state, detail: action.payload };
    default:
      return state;
  }
};

const initialStateHistory = {
  activityNameList: initialStateActivityNameList,
  history: [{ datetime: new Date(), activity: "Work", detail: "Reading" }]
};

export const setHistoryReducer = (state = initialStateHistory, action = {}) => {
  switch (action.type) {
    case ADD_TO_HISTORY:
      const activity = state.activityNameList.filter(item => !item.parent)[0]
        .name;
      const detail = state.activityNameList.filter(
        item => item.parent === activity
      )[0].name;
      return {
        ...state,
        history: [...state.history, { datetime: new Date(), activity, detail }]
      };
    case SET_ACTIVITY_DATETIME:
      console.log(action.payload);
      return {
        ...state,
        history: state.history.map((item, index) => {
          if (index !== action.payload.index) return item;
          return {
            ...item,
            datetime: action.payload.datetime
          };
        })
      };
    default:
      return state;
  }
};
