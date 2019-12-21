import React, {
  FunctionComponent,
  Dispatch,
  createContext,
  useReducer,
  useEffect
} from "react";
import categoriesReducer from "./categories.reducer";
import initialCategories from "../../data/initialCategories";

interface ContextProps {
  categories: {
    details: {
      [key: string]: { id: string; name: string };
    };
    activities: {
      [key: string]: { id: string; name: string; detailIds: string[] };
    };
    activityIds: string[];
  };
  dispatchCategories: Dispatch<{ type: string; payload?: string | object }>;
}

export const CategoriesContext = createContext<Partial<ContextProps>>({});

export const CategoriesContextProvider: FunctionComponent = ({ children }) => {
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
