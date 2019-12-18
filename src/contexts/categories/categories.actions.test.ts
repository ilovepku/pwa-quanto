import CategoriesActionTypes from "./categories.types";
import {
  addActivityName,
  editActivityName,
  deleteActivityName,
  addDetailName,
  editDetailName,
  deleteDetailName,
  reorderCategories,
  defaultCategories,
  restoreCategories
} from "./categories.actions";

describe("addActivityName action", () => {
  it("should create the addActivityName action", () => {
    const mockPayload = "Test Activity";
    const action = addActivityName(mockPayload);
    expect(action.type).toBe(CategoriesActionTypes.ADD_ACTIVITY_NAME);
    expect(action.payload).toBe(mockPayload);
  });
});

describe("editActivityName action", () => {
  it("should create the editActivityName action", () => {
    const mockPayload = { activityId: "activity-1", name: "Test Activity" };
    const action = editActivityName(mockPayload);
    expect(action.type).toBe(CategoriesActionTypes.EDIT_ACTIVITY_NAME);
    expect(action.payload).toEqual(mockPayload);
  });
});

describe("deleteActivityName action", () => {
  it("should create the deleteActivityName action", () => {
    const mockPayload = "activity-7";
    const action = deleteActivityName(mockPayload);
    expect(action.type).toBe(CategoriesActionTypes.DELETE_ACTIVITY_NAME);
    expect(action.payload).toBe(mockPayload);
  });
});

describe("addDetailName action", () => {
  it("should create the addDetailName action", () => {
    const mockPayload = { activityId: "activity-1", name: "Test Detail" };
    const action = addDetailName(mockPayload);
    expect(action.type).toBe(CategoriesActionTypes.ADD_DETAIL_NAME);
    expect(action.payload).toEqual(mockPayload);
  });
});

describe("editDetailName action", () => {
  it("should create the editDetailName action", () => {
    const mockPayload = { detailId: "detail-1", name: "Test Detail" };
    const action = editDetailName(mockPayload);
    expect(action.type).toBe(CategoriesActionTypes.EDIT_DETAIL_NAME);
    expect(action.payload).toEqual(mockPayload);
  });
});

describe("deleteDetailName action", () => {
  it("should create the deleteDetailName action", () => {
    const mockPayload = { activityId: "activity-1", detailId: "detail-1" };
    const action = deleteDetailName(mockPayload);
    expect(action.type).toBe(CategoriesActionTypes.DELETE_DETAIL_NAME);
    expect(action.payload).toEqual(mockPayload);
  });
});

describe("reorderCategories action", () => {
  it("should create the reorderCategories action", () => {
    const mockPayload = {
      destination: { index: 1, droppableId: "activity-1" },
      source: { index: 0, droppableId: "activity-1" },
      draggableId: "detail-1",
      type: "detail",
      reason: "",
      mode: ""
    };
    const action = reorderCategories(mockPayload);
    expect(action.type).toBe(CategoriesActionTypes.REORDER_CATEGORIES);
    expect(action.payload).toEqual(mockPayload);
  });
});

describe("defaultCategories action", () => {
  it("should create defaultCategories action", () => {
    expect(defaultCategories().type).toEqual(
      CategoriesActionTypes.DEFAULT_CATEGORIES
    );
  });
});

describe("restoreCategories action", () => {
  it("should create the restoreCategories action", () => {
    const mockPayload = {};
    const action = restoreCategories(mockPayload);
    expect(action.type).toBe(CategoriesActionTypes.RESTORE_CATEGORIES);
    expect(action.payload).toEqual(mockPayload);
  });
});
