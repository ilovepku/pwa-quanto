import CategoriesActionTypes from "./categories.types";
import categoriesReducer from "./categories.reducer";

import initialCategories from "../../data/initialCategories";

const initState = initialCategories;

describe("categoriesReducer", () => {
  it("should return init state", () => {
    expect(categoriesReducer(initState, {})).toEqual(initState);
  });

  it("should add activity name with addActivityName action", () => {
    const newState = categoriesReducer(initState, {
      type: CategoriesActionTypes.ADD_ACTIVITY_NAME,
      payload: "Test Activity"
    });
    expect(newState.activityIds.length).toBe(initState.activityIds.length + 1);
    expect(
      newState.activities[newState.activityIds[newState.activityIds.length - 1]]
    ).toEqual({
      id: newState.activityIds[newState.activityIds.length - 1],
      name: "Test Activity",
      detailIds: []
    });
  });

  it("should edit activity name with editActivityName action", () => {
    expect(
      categoriesReducer(initState, {
        type: CategoriesActionTypes.EDIT_ACTIVITY_NAME,
        payload: { activityId: "activity-1", name: "Test Activity" }
      }).activities["activity-1"].name
    ).toBe("Test Activity");
  });

  it("should delete activity name with deleteActivityName action", () => {
    const newState = categoriesReducer(initState, {
      type: CategoriesActionTypes.DELETE_ACTIVITY_NAME,
      payload: "activity-7"
    });
    expect(newState.activityIds).toEqual(
      expect.not.arrayContaining(["activity-7"])
    );
    expect(Object.keys(newState.details)).toEqual(
      expect.not.arrayContaining(["detail-18"])
    );
    expect(Object.keys(newState.details)).toEqual(
      expect.not.arrayContaining(["detail-19"])
    );
    expect(Object.keys(newState.details)).toEqual(
      expect.not.arrayContaining(["detail-20"])
    );
    expect(Object.keys(newState.details)).toEqual(
      expect.not.arrayContaining(["detail-21"])
    );
    expect(Object.keys(newState.activities)).toEqual(
      expect.not.arrayContaining(["activity-7"])
    );
  });

  it("should add detail name with addDetailName action", () => {
    const newState = categoriesReducer(initState, {
      type: CategoriesActionTypes.ADD_DETAIL_NAME,
      payload: { activityId: "activity-1", name: "Test Detail" }
    });
    expect(
      newState.details[
        newState.activities["activity-1"].detailIds[
          newState.activities["activity-1"].detailIds.length - 1
        ]
      ]
    ).toEqual({
      id:
        newState.activities["activity-1"].detailIds[
          newState.activities["activity-1"].detailIds.length - 1
        ],
      name: "Test Detail"
    });
  });

  it("should edit detail name with editDetailName action", () => {
    expect(
      categoriesReducer(initState, {
        type: CategoriesActionTypes.EDIT_DETAIL_NAME,
        payload: { detailId: "detail-1", name: "Test Detail" }
      }).details["detail-1"].name
    ).toBe("Test Detail");
  });

  it("should delete detail name with deleteDetailName action", () => {
    const newState = categoriesReducer(initState, {
      type: CategoriesActionTypes.DELETE_DETAIL_NAME,
      payload: { activityId: "activity-1", detailId: "detail-1" }
    });
    expect(newState.activities["activity-1"].detailIds).toEqual(
      expect.not.arrayContaining(["detail-1"])
    );
    expect(Object.keys(newState.details)).toEqual(
      expect.not.arrayContaining(["detail-1"])
    );
  });

  it("should return initState with reorderCategories action and no destination", () => {
    expect(
      categoriesReducer(initState, {
        type: CategoriesActionTypes.REORDER_CATEGORIES,
        payload: {
          destination: null
        }
      })
    ).toEqual(initState);
  });

  it("should return initState with reorderCategories action and same destination as source", () => {
    expect(
      categoriesReducer(initState, {
        type: CategoriesActionTypes.REORDER_CATEGORIES,
        payload: {
          destination: { index: 0, droppableId: "all-activities" },
          source: { index: 0, droppableId: "all-activities" }
        }
      })
    ).toEqual(initState);
  });

  it("should reorder activitiy names with reorderCategories action when dragging activities", () => {
    const newState = categoriesReducer(initState, {
      type: CategoriesActionTypes.REORDER_CATEGORIES,
      payload: {
        destination: { index: 1, droppableId: "all-activities" },
        source: { index: 0, droppableId: "all-activities" },
        draggableId: "activity-1",
        type: "activity"
      }
    });
    expect(newState.activityIds[0]).toBe("activity-2");
    expect(newState.activityIds[1]).toBe("activity-1");
  });

  it("should reorder detail names with reorderCategories action when dragging details within same activity", () => {
    const newState = categoriesReducer(initState, {
      type: CategoriesActionTypes.REORDER_CATEGORIES,
      payload: {
        destination: { index: 1, droppableId: "activity-1" },
        source: { index: 0, droppableId: "activity-1" },
        draggableId: "detail-1",
        type: "detail"
      }
    });
    expect(newState.activities["activity-1"].detailIds[0]).toBe("detail-2");
    expect(newState.activities["activity-1"].detailIds[1]).toBe("detail-1");
  });

  it("should reorder detail names with reorderCategories action when dragging details across different activities", () => {
    const newState = categoriesReducer(initState, {
      type: CategoriesActionTypes.REORDER_CATEGORIES,
      payload: {
        destination: { index: 4, droppableId: "activity-1" },
        source: { index: 0, droppableId: "activity-2" },
        draggableId: "detail-8",
        type: "detail"
      }
    });
    expect(newState.activities["activity-1"].detailIds[4]).toBe("detail-8");
    expect(newState.activities["activity-1"].detailIds.length).toBe(
      initState.activities["activity-1"].detailIds.length + 1
    );
    expect(newState.activities["activity-2"].detailIds.length).toBe(
      initState.activities["activity-2"].detailIds.length - 1
    );
  });

  it("should reset state to initState with defaultCategories action", () => {
    expect(
      categoriesReducer(null, {
        type: CategoriesActionTypes.DEFAULT_CATEGORIES
      })
    ).toStrictEqual(initState);
  });

  it("should return payload as newState with restoreCategories action", () => {
    expect(
      categoriesReducer(null, {
        type: CategoriesActionTypes.RESTORE_CATEGORIES,
        payload: {}
      })
    ).toStrictEqual({});
  });
});
