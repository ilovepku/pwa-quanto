import {
  SET_ACTIVITY_DATETIME,
  SET_ACTIVITY_CATEGORY,
  SET_ACTIVITY_DETAIL,
  ADD_TO_HISTORY
} from "./constants.js";

const initialStateActivityList = {
  activityList: [
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
    { name: "Housework" },
    { name: "Exercise" },
    { name: "Sports", parent: "Exercise" },
    { name: "Aerobic", parent: "Exercise" },
    { name: "Strength", parent: "Exercise" },
    { name: "Read" },
    { name: "Books", parent: "Read" },
    { name: "Newspapers", parent: "Read" },
    { name: "Magazines", parent: "Read" },
    { name: "Internet", parent: "Read" },
    { name: "TV" }
  ],
  detailList: [
    { name: "Reading", parent: "Work" },
    { name: "Meetings", parent: "Work" },
    { name: "Email", parent: "Work" },
    { name: "Phone Calls", parent: "Work" },
    { name: "Research", parent: "Work" },
    { name: "Discussion", parent: "Work" },
    { name: "Travel", parent: "Work" }
  ]
};

export const setActivityListReducer = (
  state = {
    activityList: initialStateActivityList.activityList,
    detailList: initialStateActivityList.detailList
  },
  action = {}
) => state;

const initialStateActivity = {
  datetime: new Date(),
  category: initialStateActivityList.activityList[0].name,
  detail: initialStateActivityList.detailList[0].name
};

export const setActivityReducer = (
  state = initialStateActivity,
  action = {}
) => {
  switch (action.type) {
    case SET_ACTIVITY_DATETIME:
      return { ...state, datetime: action.payload };
    case SET_ACTIVITY_CATEGORY:
      return { ...state, category: action.payload };
    case SET_ACTIVITY_DETAIL:
      return { ...state, detail: action.payload };
    default:
      return state;
  }
};

const initialStateHistory = {
  history: []
};

export const setHistoryReducer = (state = initialStateHistory, action = {}) => {
  switch (action.type) {
    case ADD_TO_HISTORY:
      return {
        history: [
          ...state.history,
          {
            datetime: action.payload.datetime,
            activity: action.payload.activity,
            detail: action.payload.detail
          }
        ]
      };
    default:
      return state;
  }
};
