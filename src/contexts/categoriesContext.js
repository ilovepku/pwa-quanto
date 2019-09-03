import React, { createContext, useReducer, useEffect } from "react";
import { categoriesReducer } from "../reducers/categoriesReducer";
import initialCategories from "../data/initialCategories";

export const CategoriesContext = createContext();

const CategoriesContextProvider = props => {
  const [categories, dispatch] = useReducer(categoriesReducer, [], () => {
    const localData = localStorage.getItem("categories");
    return localData ? JSON.parse(localData) : initialCategories;
  });
  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);
  return (
    <CategoriesContext.Provider value={{ categories, dispatch }}>
      {props.children}
    </CategoriesContext.Provider>
  );
};

export default CategoriesContextProvider;
