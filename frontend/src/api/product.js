import API from "./axios";

/* GET ALL PRODUCTS */
export const getProductApi = () => API.get("/products");

/* ADD */
export const addProductApi = (formData) =>
  API.post("/products/add", formData);

/* GET BY ID */
export const getProductByIdApi = (id) =>
  API.get(`/products/productsByID/${id}`);

/* UPDATE */
export const updateProductApi = (id, formData) =>
  API.put(`/products/edit/${id}`, formData);

/* DELETE */
export const deleteProduct = (id) =>
  API.delete(`/products/${id}`);
