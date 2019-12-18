import HistoryActionTypes from "./history.types";
import {
  newActivity,
  pauseActivity,
  saveActivity,
  splitActivity,
  deleteActivity,
  displayNotification,
  purgeHistory,
  restoreHistory
} from "./history.actions";

describe("newActivity action", () => {
  it("should create the newActivity action", () => {
    expect(newActivity().type).toEqual(HistoryActionTypes.NEW_ACTIVITY);
  });
});

describe("pauseActivity action", () => {
  it("should create the pauseActivity action", () => {
    expect(pauseActivity().type).toEqual(HistoryActionTypes.PAUSE_ACTIVITY);
  });
});

describe("saveActivity action", () => {
  it("should create the saveActivity action", () => {
    const mockPayload = {
      index: 1,
      datetime: new Date("2019-10-28"),
      activity: "Health",
      detail: "Exercise",
      nextItemDatetime: new Date("2019-12-03")
    };
    const action = saveActivity(mockPayload);
    expect(action.type).toBe(HistoryActionTypes.SAVE_ACTIVITY);
    expect(action.payload).toEqual(mockPayload);
  });
});

describe("splitActivity action", () => {
  it("should create the splitActivity action", () => {
    const mockPayload = {
      index: 0,
      splitDatetime: new Date("2019-12-03")
    };
    const action = splitActivity(mockPayload);
    expect(action.type).toBe(HistoryActionTypes.SPLIT_ACTIVITY);
    expect(action.payload).toEqual(mockPayload);
  });
});

describe("deleteActivity action", () => {
  it("should create the deleteActivity action", () => {
    const mockPayload = 0;
    const action = deleteActivity(mockPayload);
    expect(action.type).toBe(HistoryActionTypes.DELETE_ACTIVITY);
    expect(action.payload).toBe(mockPayload);
  });
});

describe("displayNotification action", () => {
  it("should create the displayNotification action", () => {
    const mockPayload = "05:15";
    const action = displayNotification(mockPayload);
    expect(action.type).toBe(HistoryActionTypes.DISPLAY_NOTIFICATION);
    expect(action.payload).toBe(mockPayload);
  });
});

describe("purgeHistory action", () => {
  it("should create the purgeHistory action", () => {
    const mockPayload = new Date("2019-12-04");
    const action = purgeHistory(mockPayload);
    expect(action.type).toBe(HistoryActionTypes.PURGE_HISTORY);
    expect(action.payload).toEqual(mockPayload);
  });
});

describe("restoreHistory action", () => {
  it("should create the restoreHistory action", () => {
    const mockPayload = {};
    const action = restoreHistory(mockPayload);
    expect(action.type).toBe(HistoryActionTypes.RESTORE_HISTORY);
    expect(action.payload).toEqual(mockPayload);
  });
});
