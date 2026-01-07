import { createContext, useContext, useEffect, useState } from "react";
import {
    getCategoriesApi,
    addCategoryApi,
    deleteCategoryApi,
    getCategoryByIdApi,
    updateCategoryApi,
  } from "../api/categoryApi";
  

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  /* GET BY ID */
const getCategoryById = async (id) => {
    const res = await getCategoryByIdApi(id);
    return res.data.category;
  };
  
  /* UPDATE */
  const updateCategory = async (id, formData) => {
    await updateCategoryApi(id, formData);
    fetchCategories(); // keep list in sync
  };
  
  /* FETCH ALL */
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await getCategoriesApi();
      setCategories(res.data.categories);
    } catch (err) {
      console.error("Failed to fetch categories", err);
    } finally {
      setLoading(false);
    }
  };

  /* ADD */
  const addCategory = async (formData) => {
    await addCategoryApi(formData);
    fetchCategories(); // 🔥 auto refresh list
  };

  /* DELETE */
  const deleteCategory = async (id) => {
    await deleteCategoryApi(id);
    fetchCategories();
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <CategoryContext.Provider
    value={{
      categories,
      loading,
      addCategory,
      deleteCategory,
      fetchCategories,
      getCategoryById,
      updateCategory,
    }}
  >
      {children}
    </CategoryContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCategories = () => useContext(CategoryContext);
