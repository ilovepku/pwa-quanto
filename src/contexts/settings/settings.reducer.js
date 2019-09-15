import SettingsActionTypes from "./settings.types";

export const settingsReducer = (state, action) => {
  let chartsDateFilterStart, chartsDateFilterEnd;

  switch (action.type) {
    case SettingsActionTypes.CHARTS_DATE_FILTER_SWITCH:
      return {
        ...state,
        chartsDateFilter: !state.chartsDateFilter
      };

    case SettingsActionTypes.CHARTS_DATE_FILTER_SET:
      return {
        ...state,
        [action.payload.type]: action.payload.date
      };

    case SettingsActionTypes.PREV_CHARTS_DATE_FILTER:
      chartsDateFilterStart = new Date(state.chartsDateFilterStart);
      chartsDateFilterEnd = new Date(state.chartsDateFilterEnd);

      return {
        ...state,
        chartsDateFilterStart: chartsDateFilterStart.setDate(
          chartsDateFilterStart.getDate() - 1
        ),
        chartsDateFilterEnd: chartsDateFilterEnd.setDate(
          chartsDateFilterEnd.getDate() - 1
        )
      };

    case SettingsActionTypes.NEXT_CHARTS_DATE_FILTER:
      chartsDateFilterStart = new Date(state.chartsDateFilterStart);
      chartsDateFilterEnd = new Date(state.chartsDateFilterEnd);
      return {
        ...state,
        chartsDateFilterStart: chartsDateFilterStart.setDate(
          chartsDateFilterStart.getDate() + 1
        ),
        chartsDateFilterEnd: chartsDateFilterEnd.setDate(
          chartsDateFilterEnd.getDate() + 1
        )
      };

    case SettingsActionTypes.CHARTS_KEY_EXCLUDE_SWITCH:
      return {
        ...state,
        chartsKeyExclude: !state.chartsKeyExclude
      };

    case SettingsActionTypes.ADD_CHARTS_EXCLUDE_KEY:
      return {
        ...state,
        chartsExcludeKeysList: [...state.chartsExcludeKeysList, action.payload]
      };

    case SettingsActionTypes.DEL_CHARTS_EXCLUDE_KEY:
      return {
        ...state,
        chartsExcludeKeysList: state.chartsExcludeKeysList.filter(
          (item, index) => index !== action.payload
        )
      };

    case SettingsActionTypes.RESTORE_SETTINGS:
      return action.payload;

    default:
      return state;
  }
};
