import HistoryActionTypes from "./history.types";
import historyReducer from "./history.reducer";
import { createUnsortedActivity } from "./history.reducer";

const mockPrevStateWithOneItem = [
  {
    datetime: new Date("2019-05-15"),
    activity: "Social",
    detail: "Family"
  }
];

const mockPrevStateWithTwoItems = [
  {
    datetime: new Date("2019-10-28"),
    activity: "Interruption",
    detail: "-"
  },
  {
    datetime: new Date("2019-05-15"),
    activity: "Social",
    detail: "Family"
  }
];

describe("createUnsortedActivity", () => {
  it("with date object as parameter", () => {
    expect(createUnsortedActivity(new Date("2019-05-15"))).toEqual({
      datetime: new Date("2019-05-15"),
      activity: "Unsorted",
      detail: "-"
    });
  });

  it("without parameter", () => {
    const createdActivity = createUnsortedActivity();
    expect(
      Object.prototype.toString.call(createdActivity.datetime) ===
        "[object Date]"
    ).toBe(true);
    expect(createdActivity.activity).toBe("Unsorted");
    expect(createdActivity.detail).toBe("-");
  });
});

describe("historyReducer", () => {
  it("should return prev state", () => {
    expect(historyReducer(mockPrevStateWithOneItem, {})).toEqual(
      mockPrevStateWithOneItem
    );
  });

  it("should add item to beginning of state array with newActivity action", () => {
    const newState = historyReducer(mockPrevStateWithOneItem, {
      type: HistoryActionTypes.NEW_ACTIVITY
    });
    expect(newState.length).toBe(mockPrevStateWithOneItem.length + 1);
    expect(
      Object.prototype.toString.call(newState[0].datetime) === "[object Date]"
    ).toBe(true);
    expect(newState[0].activity).toBe("Unsorted");
    expect(newState[0].detail).toBe("-");
  });

  it("should add interruption activity item to beginning of state array with pauseActivity action when newest activity item is interruption", () => {
    const newState = historyReducer(mockPrevStateWithOneItem, {
      type: HistoryActionTypes.PAUSE_ACTIVITY
    });
    expect(newState.length).toBe(mockPrevStateWithOneItem.length + 1);
    expect(
      Object.prototype.toString.call(newState[0].datetime) === "[object Date]"
    ).toBe(true);
    expect(newState[0].activity).toBe("Interruption");
    expect(newState[0].detail).toBe("-");
  });

  it("should resume interrupted activity (add second activity item to beginning of state array) with pauseActivity action when newest activity item is not interruption", () => {
    const newState = historyReducer(mockPrevStateWithTwoItems, {
      type: HistoryActionTypes.PAUSE_ACTIVITY
    });
    expect(newState.length).toBe(mockPrevStateWithTwoItems.length + 1);
    expect(
      Object.prototype.toString.call(newState[0].datetime) === "[object Date]"
    ).toBe(true);
    expect(newState[0].activity).toBe(newState[2].activity);
    expect(newState[0].detail).toBe(newState[2].detail);
  });

  it("should edit target and target - 1 activity items with saveActivity action when index > 0", () => {
    const newState = historyReducer(mockPrevStateWithTwoItems, {
      type: HistoryActionTypes.SAVE_ACTIVITY,
      payload: {
        index: 1,
        datetime: new Date("2019-10-28"),
        activity: "Health",
        detail: "Exercise",
        nextItemDatetime: new Date("2019-12-03")
      }
    });
    expect(newState.length).toBe(mockPrevStateWithTwoItems.length);
    expect(newState[0].datetime).toStrictEqual(new Date("2019-12-03"));
    expect(newState[1]).toEqual({
      datetime: new Date("2019-10-28"),
      activity: "Health",
      detail: "Exercise"
    });
  });

  it("should edit target and target - 1 activity items with saveActivity action when index === 0", () => {
    const newState = historyReducer(mockPrevStateWithOneItem, {
      type: HistoryActionTypes.SAVE_ACTIVITY,
      payload: {
        index: 0,
        datetime: new Date("2019-10-28"),
        activity: "Health",
        detail: "Exercise",
        nextItemDatetime: null
      }
    });
    expect(newState.length).toBe(mockPrevStateWithOneItem.length);
    expect(newState[0]).toEqual({
      datetime: new Date("2019-10-28"),
      activity: "Health",
      detail: "Exercise"
    });
  });

  it("should add activity item at index with splitActivity action", () => {
    const newState = historyReducer(mockPrevStateWithOneItem, {
      type: HistoryActionTypes.SPLIT_ACTIVITY,
      payload: {
        index: 0,
        splitDatetime: new Date("2019-12-03")
      }
    });
    expect(newState.length).toBe(mockPrevStateWithOneItem.length + 1);
    expect(newState[0]).toEqual({
      datetime: new Date("2019-12-03"),
      activity: "Unsorted",
      detail: "-"
    });
  });

  it("should remove activity item at index with deleteActivity action if more than 1 item left", () => {
    const newState = historyReducer(mockPrevStateWithTwoItems, {
      type: HistoryActionTypes.DELETE_ACTIVITY,
      payload: 0
    });
    expect(newState.length).toBe(mockPrevStateWithTwoItems.length - 1);
    expect(newState[0]).toEqual({
      datetime: new Date("2019-05-15"),
      activity: "Social",
      detail: "Family"
    });
  });

  it("should remove activity item at index and add a new one with deleteActivity action if only 1 item left", () => {
    const newState = historyReducer(mockPrevStateWithOneItem, {
      type: HistoryActionTypes.DELETE_ACTIVITY,
      payload: 0
    });
    expect(newState.length).toBe(1);
    expect(
      Object.prototype.toString.call(newState[0].datetime) === "[object Date]"
    ).toBe(true);
    expect(newState[0].activity).toBe("Unsorted");
    expect(newState[0].detail).toBe("-");
  });

  it("should purge activity items before datetime with purgeHistory action if more than 1 item left", () => {
    const newState = historyReducer(mockPrevStateWithTwoItems, {
      type: HistoryActionTypes.PURGE_HISTORY,
      payload: new Date("2019-07-01")
    });
    expect(newState.length).toBe(mockPrevStateWithTwoItems.length - 1);
    expect(newState[0]).toEqual({
      datetime: new Date("2019-10-28"),
      activity: "Interruption",
      detail: "-"
    });
  });

  it("should purge activity items before datetime with purgeHistory action if only 1 item left", () => {
    const newState = historyReducer(mockPrevStateWithTwoItems, {
      type: HistoryActionTypes.PURGE_HISTORY,
      payload: new Date("2019-12-04")
    });
    expect(newState.length).toBe(1);
    expect(
      Object.prototype.toString.call(newState[0].datetime) === "[object Date]"
    ).toBe(true);
    expect(newState[0].activity).toBe("Unsorted");
    expect(newState[0].detail).toBe("-");
  });

  it("should return payload as newState with restoreHistory", () => {
    expect(
      historyReducer(null, {
        type: HistoryActionTypes.RESTORE_HISTORY,
        payload: {}
      })
    ).toStrictEqual({});
  });

  it("should return prev state with displayNotification action", () => {
    expect(historyReducer(mockPrevStateWithOneItem, {})).toEqual(
      mockPrevStateWithOneItem
    );
  });
});
