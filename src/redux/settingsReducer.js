import { CHARTS_FILTER_SWITCH, CHARTS_FILTER_SET } from "./constants.js";

const initialSettings = {
  chartsFilter: false,
  chartsStart: new Date().setHours(0, 0, 0, 0),
  chartsEnd: new Date().setHours(23, 59, 59, 999)
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

    default:
      return state;
  }
};
