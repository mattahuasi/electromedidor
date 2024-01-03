import axios from "./axios.js";

export const createCategoryRequest = (category) =>
  axios.post("/categories", category);

export const getCategoriesRequest = () => axios.get("/categories");

export const getCategoryByIdRequest = (id) => axios.get("/categories/" + id);

export const updateCategoryRequest = (id, category) =>
  axios.put("/categories/" + id, category);

export const deleteCategoryRequest = (id) => axios.delete("/categories/" + id);
