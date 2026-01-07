import API from "./axios.js";

export const addSubCategoryApi = async (formData) => {
  return API.post("/subcategory/add", formData);
};

export const getSubCategoriesApi = () => API.get("/subcategory");

export const updateSubCategoryApi = (id, formData) => {
    return API.put(`/subcategory/edit/${id}`, formData);
  };

  export const getSubCategoryByIdApi = (id) => {
    return API.get(`/subcategory/edit/${id}`);
  };


export const deleteSubCategoryApi = (id) =>
  API.delete(`/subcategory/${id}`);

export default API;
