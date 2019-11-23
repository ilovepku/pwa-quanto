import CategoriesActionTypes from "./categories.types";

export const editActivityName = (payload: {
  activityId: string;
  name: string;
}) => ({
  type: CategoriesActionTypes.EDIT_ACTIVITY_NAME,
  payload
});

export const editDetailName = (payload: {
  activityId: string;
  detailId: string;
  name: string;
}) => ({
  type: CategoriesActionTypes.EDIT_DETAIL_NAME,
  payload
});

export const deleteActivityName = (payload: string) => ({
  type: CategoriesActionTypes.DELETE_ACTIVITY_NAME,
  payload
});

export const deleteDetailName = (payload: {
  activityId: string;
  detailId: string;
}) => ({
  type: CategoriesActionTypes.DELETE_DETAIL_NAME,
  payload
});

export const reorderCategories = (payload: object) => ({
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
