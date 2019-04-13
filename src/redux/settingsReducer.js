import {
  CHARTS_FILTER_SWITCH,
  CHARTS_FILTER_SET,
  PREV_CHARTS_FILTER,
  NEXT_CHARTS_FILTER,
  CHARTS_EXCLUDE_SWITCH,
  ADD_CHARTS_EXCLUDE_KEY,
  DEL_CHARTS_EXCLUDE_KEY
} from "./constants.js";

const initialSettings = {
  chartsFilter: false,
  chartsFilterStart: new Date().setHours(0, 0, 0, 0),
  chartsFilterEnd: new Date().setHours(23, 59, 59, 999),
  chartsExclude: false,
  chartsExcludeList: ["Unsorted"]
};

export const settingsReducer = (state = initialSettings, action = {}) => {
  let newState;
  switch (action.type) {
    case CHARTS_FILTER_SWITCH:
      newState = {
        ...state,
        chartsFilter: !state.chartsFilter
      };
      return newState;

    case CHARTS_FILTER_SET:
      newState = {
        ...state,
        [action.payload.type]: action.payload.date
      };
      return newState;

    case PREV_CHARTS_FILTER:
      newState = {
        ...state,
        chartsFilterStart:
          state.chartsFilterStart -
          (state.chartsFilterEnd - state.chartsFilterStart + 1),
        chartsFilterEnd:
          state.chartsFilterEnd -
          (state.chartsFilterEnd - state.chartsFilterStart + 1)
      };

      return newState;

    case NEXT_CHARTS_FILTER:
      newState = {
        ...state,
        chartsFilterStart:
          state.chartsFilterStart +
          (state.chartsFilterEnd - state.chartsFilterStart + 1),
        chartsFilterEnd:
          state.chartsFilterEnd +
          (state.chartsFilterEnd - state.chartsFilterStart + 1)
      };
      return newState;

    case CHARTS_EXCLUDE_SWITCH:
      newState = {
        ...state,
        chartsExclude: !state.chartsExclude
      };
      return newState;

    case ADD_CHARTS_EXCLUDE_KEY:
      newState = {
        ...state,
        chartsExcludeList: [...state.chartsExcludeList, action.payload]
      };
      return newState;

    case DEL_CHARTS_EXCLUDE_KEY:
      newState = {
        ...state,
        chartsExcludeList: state.chartsExcludeList.filter(
          (item, index) => index !== action.payload
        )
      };
      return newState;

    default:
      return state;
  }
};
