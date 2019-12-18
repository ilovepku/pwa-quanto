import CategoriesActionTypes from "./categories.types";

export const addActivityName = (payload: string) => ({
  type: CategoriesActionTypes.ADD_ACTIVITY_NAME,
  payload
});

export const editActivityName = (payload: {
  activityId: string;
  name: string;
}) => ({
  type: CategoriesActionTypes.EDIT_ACTIVITY_NAME,
  payload
});

export const deleteActivityName = (payload: string) => ({
  type: CategoriesActionTypes.DELETE_ACTIVITY_NAME,
  payload
});

export const addDetailName = (payload: {
  activityId: string;
  name: string;
}) => ({
  type: CategoriesActionTypes.ADD_DETAIL_NAME,
  payload
});

export const editDetailName = (payload: {
  detailId: string;
  name: string;
}) => ({
  type: CategoriesActionTypes.EDIT_DETAIL_NAME,
  payload
});

export const deleteDetailName = (payload: {
  activityId: string;
  detailId: string;
}) => ({
  type: CategoriesActionTypes.DELETE_DETAIL_NAME,
  payload
});

export const reorderCategories = (payload: {
  draggableId: string;
  type: string;
  source: {
    index: number;
    droppableId: string;
  };
  reason: string;
  mode: string;
  destination?: {
    index: number;
    droppableId: string;
  };
}) => ({
  type: CategoriesActionTypes.REORDER_CATEGORIES,
  payload
});

export const defaultCategories = () => ({
  type: CategoriesActionTypes.DEFAULT_CATEGORIES
});

export const restoreCategories = (payload: object) => ({
  type: CategoriesActionTypes.RESTORE_CATEGORIES,
  payload
});
