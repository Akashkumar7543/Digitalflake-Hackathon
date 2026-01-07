import API from "./axios.js";

// ADD CATEGORY
export const addCategoryApi = async (formData) => {
  return API.post("/category/add", formData);
};

// GET ALL
export const getCategoriesApi = () => API.get("/category");

export const updateCategoryApi = (id, formData) => {
    return API.put(`/category/edit/${id}`, formData);
  };

  export const getCategoryByIdApi = (id) => {
    return API.get(`/category/edit/${id}`);
  };

// DELETE
export const deleteCategoryApi = (id) =>
  API.delete(`/category/${id}`);



export default API;
