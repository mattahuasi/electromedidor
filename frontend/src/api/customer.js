import axios from "./axios.js";

export const createCustomerRequest = (customer) =>
  axios.post("/customers", customer);

export const getCustomersRequest = () => axios.get("/customers");

export const getCustomerByIdRequest = (id) => axios.get("/customers/" + id);

export const updateCustomerRequest = (id, card) =>
  axios.put("/customers/" + id, card);

export const deleteCustomerRequest = (id) => axios.delete("/customers/" + id);
