// ProductContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import {
  getProductApi,
  addProductApi,
  deleteProduct,
  updateProductApi,
  getProductByIdApi,
} from "../api/product";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /* ================= FETCH ALL PRODUCTS ================= */
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getProductApi();
      setProducts(res.data.products || []);
    } catch (err) {
      console.error("Failed to fetch products", err);
      setError(err.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  /* ================= ADD PRODUCT ================= */
  const addProduct = async (formData) => {
    try {
      setError(null);
      const res = await addProductApi(formData);
      // Optimistic update
      setProducts(prev => [...prev, res.data.product]);
      return res.data.product;
    } catch (err) {
      console.error("Failed to add product", err);
      setError(err.message || "Failed to add product");
      throw err;
    }
  };

  /* ================= DELETE PRODUCT ================= */
  const removeProduct = async (id) => {
    try {
      setError(null);
      await deleteProduct(id);
      // Optimistic update
      setProducts(prev => prev.filter(p => p._id !== id));
    } catch (err) {
      console.error("Failed to delete product", err);
      setError(err.message || "Failed to delete product");
      throw err;
    }
  };

  /* ================= GET PRODUCT BY ID ================= */
  const getProductById = async (id) => {
    try {
      setError(null);
      const res = await getProductByIdApi(id);
      return res.data.product;
    } catch (err) {
      console.error("Failed to fetch product", err);
      setError(err.message || "Failed to fetch product");
      throw err;
    }
  };

  /* ================= UPDATE PRODUCT ================= */
  const updateProduct = async (id, formData) => {
    try {
      setError(null);
      const res = await updateProductApi(id, formData);
      // Optimistic update
     
      return res.data.product;
    } catch (err) {
      console.error("Failed to update product", err);
      setError(err.message || "Failed to update product");
      throw err;
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        fetchProducts,
        addProduct,
        removeProduct,
        getProductById,
        updateProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within ProductProvider");
  }
  return context;
};