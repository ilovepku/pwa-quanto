import SettingsActionTypes from "./settings.types";
import {
  toggleChartsDateFilter,
  setChartsFilterDateStart,
  setChartsFilterDateEnd,
  prevChartsFilterDate,
  nextChartsFilterDate,
  toggleChartsKeyFilter,
  addChartsFilterKey,
  delChartsFilterKey,
  restoreSettings
} from "./settings.actions";

describe("toggleChartsDateFilter action", () => {
  it("should create the toggleChartsDateFilter action", () => {
    expect(toggleChartsDateFilter().type).toEqual(
      SettingsActionTypes.TOGGLE_CHARTS_DATE_FILTER
    );
  });
});

describe("setChartsFilterDateStart action", () => {
  it("should create the setChartsFilterDateStart action", () => {
    const mockPayload = new Date(new Date("2019-05-15").setHours(0, 0, 0, 0));
    const action = setChartsFilterDateStart(mockPayload);
    expect(action.type).toBe(SettingsActionTypes.SET_CHARTS_FILTER_DATE_START);
    expect(action.payload).toEqual(mockPayload);
  });
});

describe("setChartsFilterDateEnd action", () => {
  it("should create the setChartsFilterDateEnd action", () => {
    const mockPayload = new Date(
      new Date("2019-05-15").setHours(23, 59, 59, 999)
    );
    const action = setChartsFilterDateEnd(mockPayload);
    expect(action.type).toBe(SettingsActionTypes.SET_CHARTS_FILTER_DATE_END);
    expect(action.payload).toEqual(mockPayload);
  });
});

describe("prevChartsFilterDate action", () => {
  it("should create the prevChartsFilterDate action", () => {
    expect(prevChartsFilterDate().type).toEqual(
      SettingsActionTypes.PREV_CHARTS_FILTER_DATE
    );
  });
});

describe("nextChartsFilterDate action", () => {
  it("should create the nextChartsFilterDate action", () => {
    expect(nextChartsFilterDate().type).toEqual(
      SettingsActionTypes.NEXT_CHARTS_FILTER_DATE
    );
  });
});

describe("toggleChartsKeyFilter action", () => {
  it("should create the toggleChartsKeyFilter action", () => {
    expect(toggleChartsKeyFilter().type).toEqual(
      SettingsActionTypes.TOGGLE_CHARTS_KEY_FILTER
    );
  });
});

describe("addChartsFilterKey action", () => {
  it("should create the addChartsFilterKey action", () => {
    const mockPayload = "Sleep";
    const action = addChartsFilterKey(mockPayload);
    expect(action.type).toBe(SettingsActionTypes.ADD_CHARTS_FILTER_KEY);
    expect(action.payload).toBe(mockPayload);
  });
});

describe("delChartsFilterKey action", () => {
  it("should create the delChartsFilterKey action", () => {
    const mockPayload = 0;
    const action = delChartsFilterKey(mockPayload);
    expect(action.type).toBe(SettingsActionTypes.DEL_CHARTS_FILTER_KEY);
    expect(action.payload).toBe(0);
  });
});

describe("restoreSettings action", () => {
  it("should create the restoreSettings action", () => {
    const mockPayload = {};
    const action = restoreSettings(mockPayload);
    expect(action.type).toBe(SettingsActionTypes.RESTORE_SETTINGS);
    expect(action.payload).toEqual(mockPayload);
  });
});
