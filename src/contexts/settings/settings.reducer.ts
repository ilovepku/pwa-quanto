import SettingsActionTypes from "./settings.types";

const settingsReducer = (state, action) => {
  let chartsFilterDateStart, chartsFilterDateEnd;

  switch (action.type) {
    case SettingsActionTypes.TOGGLE_CHARTS_DATE_FILTER:
      return {
        ...state,
        chartsDateFilter: !state.chartsDateFilter
      };

    case SettingsActionTypes.SET_CHARTS_FILTER_DATE_START:
      return {
        ...state,
        chartsFilterDateStart: action.payload
      };

    case SettingsActionTypes.SET_CHARTS_FILTER_DATE_END:
      return {
        ...state,
        chartsFilterDateEnd: action.payload
      };

    case SettingsActionTypes.PREV_CHARTS_FILTER_DATE:
      chartsFilterDateStart = new Date(state.chartsFilterDateStart);
      chartsFilterDateEnd = new Date(state.chartsFilterDateEnd);

      return {
        ...state,
        chartsFilterDateStart: chartsFilterDateStart.setDate(
          chartsFilterDateStart.getDate() - 1
        ),
        chartsFilterDateEnd: chartsFilterDateEnd.setDate(
          chartsFilterDateEnd.getDate() - 1
        )
      };

    case SettingsActionTypes.NEXT_CHARTS_FILTER_DATE:
      chartsFilterDateStart = new Date(state.chartsFilterDateStart);
      chartsFilterDateEnd = new Date(state.chartsFilterDateEnd);
      return {
        ...state,
        chartsFilterDateStart: chartsFilterDateStart.setDate(
          chartsFilterDateStart.getDate() + 1
        ),
        chartsFilterDateEnd: chartsFilterDateEnd.setDate(
          chartsFilterDateEnd.getDate() + 1
        )
      };

    case SettingsActionTypes.TOGGLE_CHARTS_KEY_FILTER:
      return {
        ...state,
        chartsKeyFilter: !state.chartsKeyFilter
      };

    case SettingsActionTypes.ADD_CHARTS_FILTER_KEY:
      return {
        ...state,
        chartsFilterKeyList: [...state.chartsFilterKeyList, action.payload]
      };

    case SettingsActionTypes.DEL_CHARTS_FILTER_KEY:
      return {
        ...state,
        chartsFilterKeyList: [
          ...state.chartsFilterKeyList.slice(0, action.payload),
          ...state.chartsFilterKeyList.slice(action.payload + 1)
        ]
      };

    case SettingsActionTypes.RESTORE_SETTINGS:
      return action.payload;

    default:
      return state;
  }
};

export default settingsReducer;
