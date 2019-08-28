import { DEFAULT_CATEGORIES, RESTORE_CATEGORIES } from "./constants.js";

import initialCategories from "../data/initialCategories";

export const categoriesReducer = (state = initialCategories, action = {}) => {
  switch (action.type) {
    case DEFAULT_CATEGORIES:
      return initialCategories;

    case RESTORE_CATEGORIES:
      return action.payload;

    default:
      return state;
  }
};
