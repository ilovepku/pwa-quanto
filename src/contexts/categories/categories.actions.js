import CategoriesActionTypes from "./categories.types";

export const editActivityName = payload => ({
  type: CategoriesActionTypes.EDIT_ACTIVITY_NAME,
  payload
});

export const editDetailName = payload => ({
  type: CategoriesActionTypes.EDIT_DETAIL_NAME,
  payload
});

export const deleteActivityName = payload => ({
  type: CategoriesActionTypes.DELETE_ACTIVITY_NAME,
  payload
});

export const deleteDetailName = payload => ({
  type: CategoriesActionTypes.DELETE_DETAIL_NAME,
  payload
});

export const reorderCategories = payload => ({
  type: CategoriesActionTypes.REORDER_CATEGORIES,
  payload
});

export const defaultCategories = () => ({
  type: CategoriesActionTypes.DEFAULT_CATEGORIES
});

export const restoreCategories = payload => ({
  type: CategoriesActionTypes.RESTORE_CATEGORIES,
  payload
});
