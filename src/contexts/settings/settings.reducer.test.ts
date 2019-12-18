import SettingsActionTypes from "./settings.types";
import settingsReducer from "./settings.reducer";

const prevState = {
  chartsDateFilter: false,
  chartsFilterDateStart: new Date(new Date().setHours(0, 0, 0, 0)),
  chartsFilterDateEnd: new Date(new Date().setHours(23, 59, 59, 999)),
  chartsKeyFilter: false,
  chartsFilterKeyList: ["Unsorted"]
};

describe("settingsReducer", () => {
  it("should return prev state", () => {
    expect(settingsReducer(prevState, {})).toEqual(prevState);
  });

  it("should toggle chartsDateFilter with toggleChartsDateFilter action", () => {
    expect(
      settingsReducer(prevState, {
        type: SettingsActionTypes.TOGGLE_CHARTS_DATE_FILTER
      }).chartsDateFilter
    ).toBe(true);
  });

  it("should toggle chartsKeyFilter with toggleChartsKeyFilter action", () => {
    expect(
      settingsReducer(prevState, {
        type: SettingsActionTypes.TOGGLE_CHARTS_KEY_FILTER
      }).chartsKeyFilter
    ).toBe(true);
  });

  it("should set chartsFilterDateStart with setChartsFilterDateStart action", () => {
    expect(
      settingsReducer(prevState, {
        type: SettingsActionTypes.SET_CHARTS_FILTER_DATE_START,
        payload: new Date(new Date("2019-05-15").setHours(0, 0, 0, 0))
      }).chartsFilterDateStart
    ).toEqual(new Date(new Date("2019-05-15").setHours(0, 0, 0, 0)));
  });

  it("should set chartsFilterDateEnd with setChartsFilterDateEnd action", () => {
    expect(
      settingsReducer(prevState, {
        type: SettingsActionTypes.SET_CHARTS_FILTER_DATE_END,
        payload: new Date(new Date("2019-05-15").setHours(23, 59, 59, 999))
      }).chartsFilterDateEnd
    ).toEqual(new Date(new Date("2019-05-15").setHours(23, 59, 59, 999)));
  });

  it("should wind back chartsFilterDates by 1 day with nextChartsFilterDate action", () => {
    const newValue = settingsReducer(prevState, {
      type: SettingsActionTypes.PREV_CHARTS_FILTER_DATE
    });
    expect(newValue.chartsFilterDateStart).toEqual(
      prevState.chartsFilterDateStart.setDate(
        prevState.chartsFilterDateStart.getDate() - 1
      )
    );
    expect(newValue.chartsFilterDateEnd).toEqual(
      prevState.chartsFilterDateEnd.setDate(
        prevState.chartsFilterDateEnd.getDate() - 1
      )
    );
  });

  it("should fast forward chartsFilterDates by 1 day with nextChartsFilterDate action", () => {
    const newValue = settingsReducer(prevState, {
      type: SettingsActionTypes.NEXT_CHARTS_FILTER_DATE
    });
    expect(newValue.chartsFilterDateStart).toEqual(
      prevState.chartsFilterDateStart.setDate(
        prevState.chartsFilterDateStart.getDate() + 1
      )
    );
    expect(newValue.chartsFilterDateEnd).toEqual(
      prevState.chartsFilterDateEnd.setDate(
        prevState.chartsFilterDateEnd.getDate() + 1
      )
    );
  });

  it("should add key to chartsFilterKeyList with addChartsFilterKey action", () => {
    const newValue = settingsReducer(prevState, {
      type: SettingsActionTypes.ADD_CHARTS_FILTER_KEY,
      payload: "Sleep"
    }).chartsFilterKeyList;
    expect(newValue.length).toBe(2);
    expect(newValue).toEqual(["Unsorted", "Sleep"]);
  });

  it("should remove key from chartsFilterKeyList with delChartsFilterKey action", () => {
    const newValue = settingsReducer(prevState, {
      type: SettingsActionTypes.DEL_CHARTS_FILTER_KEY,
      payload: 0
    }).chartsFilterKeyList;
    expect(newValue.length).toBe(0);
    expect(newValue).toEqual([]);
  });

  it("should return payload as newState with restoreSettings action", () => {
    expect(
      settingsReducer(null, {
        type: SettingsActionTypes.RESTORE_SETTINGS,
        payload: {}
      })
    ).toStrictEqual({});
  });
});
