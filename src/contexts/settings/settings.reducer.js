import SettingsActionTypes from "./settings.types";

export const settingsReducer = (state, action) => {
  let newState;
  switch (action.type) {
    case SettingsActionTypes.CHARTS_FILTER_SWITCH:
      newState = {
        ...state,
        chartsFilter: !state.chartsFilter
      };
      return newState;

    case SettingsActionTypes.CHARTS_FILTER_SET:
      newState = {
        ...state,
        [action.payload.type]: action.payload.date
      };
      return newState;

    case SettingsActionTypes.PREV_CHARTS_FILTER:
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

    case SettingsActionTypes.NEXT_CHARTS_FILTER:
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

    case SettingsActionTypes.CHARTS_EXCLUDE_SWITCH:
      newState = {
        ...state,
        chartsExclude: !state.chartsExclude
      };
      return newState;

    case SettingsActionTypes.ADD_CHARTS_EXCLUDE_KEY:
      newState = {
        ...state,
        chartsExcludeList: [...state.chartsExcludeList, action.payload]
      };
      return newState;

    case SettingsActionTypes.DEL_CHARTS_EXCLUDE_KEY:
      newState = {
        ...state,
        chartsExcludeList: state.chartsExcludeList.filter(
          (item, index) => index !== action.payload
        )
      };
      return newState;

    case SettingsActionTypes.RESTORE_SETTINGS:
      return action.payload;

    default:
      return state;
  }
};
