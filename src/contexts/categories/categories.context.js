import React, { createContext, useReducer, useEffect } from "react";
import { categoriesReducer } from "./categories.reducer";
import initialCategories from "../../data/initialCategories";

export const CategoriesContext = createContext();

const CategoriesContextProvider = ({ children }) => {
  const [categories, dispatchCategories] = useReducer(
    categoriesReducer,
    [],
    () => {
      const localData = localStorage.getItem("categories");
      return localData ? JSON.parse(localData) : initialCategories;
    }
  );
  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);
  return (
    <CategoriesContext.Provider value={{ categories, dispatchCategories }}>
      {children}
    </CategoriesContext.Provider>
  );
};

export default CategoriesContextProvider;
