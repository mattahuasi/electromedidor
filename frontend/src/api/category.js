import axios from "./axios";

export const getCategoriesRequest = () => axios.get("/categories");
