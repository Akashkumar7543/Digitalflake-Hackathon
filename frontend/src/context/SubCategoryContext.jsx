import { createContext, useContext, useEffect, useState } from "react";
import {
  addSubCategoryApi,
  getSubCategoriesApi,
  updateSubCategoryApi,
  getSubCategoryByIdApi,
  deleteSubCategoryApi,
} from "../api/subCategory";

const SubCategoryContext = createContext(null);

export const SubCategoryProvider = ({ children }) => {
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /* ================= FETCH ALL SUBCATEGORIES ================= */
  const fetchSubCategories = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await getSubCategoriesApi();
      setSubCategories(res.data.subCategories || []);
    } catch (err) {
      console.error("Failed to fetch subcategories", err);
      setError(err.message || "Failed to fetch subcategories");
    } finally {
      setLoading(false);
    }
  };

  /* ================= ADD SUBCATEGORY ================= */
  const addSubCategory = async (formData) => {
    try {
      setError(null);
      const res = await addSubCategoryApi(formData);
      return res.data.subCategory;
    } catch (err) {
      console.error("Failed to add subcategory", err);
      setError(err.message || "Failed to add subcategory");
      throw err;
    }
  };

  /* ================= GET SUBCATEGORY BY ID ================= */
  const getSubCategoryById = async (id) => {
    try {
      setError(null);
      const res = await getSubCategoryByIdApi(id);
      return res.data.subCategory;
    } catch (err) {
      console.error("Failed to fetch subcategory", err);
      setError(err.message || "Failed to fetch subcategory");
      throw err;
    }
  };

  /* ================= UPDATE SUBCATEGORY ================= */
  const updateSubCategory = async (id, formData) => {
    try {
      setError(null);
      const res = await updateSubCategoryApi(id, formData);
      return res.data.subCategory;
    } catch (err) {
      console.error("Failed to update subcategory", err);
      setError(err.message || "Failed to update subcategory");
      throw err;
    }
  };

  /* ================= DELETE SUBCATEGORY ================= */
  const removeSubCategory = async (id) => {
    try {
      setError(null);
      await deleteSubCategoryApi(id);
    } catch (err) {
      console.error("Failed to delete subcategory", err);
      setError(err.message || "Failed to delete subcategory");
      throw err;
    }
  };

  /* ================= AUTO FETCH ON LOAD ================= */
  useEffect(() => {
    fetchSubCategories();
  }, []);

  return (
    <SubCategoryContext.Provider
      value={{
        subCategories,
        loading,
        error,
        fetchSubCategories,
        addSubCategory,
        getSubCategoryById,
        updateSubCategory,
        removeSubCategory,
      }}
    >
      {children}
    </SubCategoryContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSubCategories = () => {
  const context = useContext(SubCategoryContext);
  if (!context) {
    throw new Error(
      "useSubCategories must be used within SubCategoryProvider"
    );
  }
  return context;
};
