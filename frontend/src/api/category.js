import axios from "./axios.js";

export const createCategoryRequest = (customer) =>
  axios.post("/categories", customer);

export const getCategoriesRequest = () => axios.get("/categories");

export const getCategoryByIdRequest = (id) => axios.get("/categories/" + id);

export const updateCategoryRequest = (id, card) =>
  axios.put("/categories/" + id, card);

export const deleteCategoryRequest = (id) => axios.delete("/categories/" + id);
