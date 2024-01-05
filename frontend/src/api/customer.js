import axios from "./axios.js";

export const createCustomerRequest = (customer) =>
  axios.post("/customers", customer);

export const getCustomersRequest = () => axios.get("/customers");

export const getCustomerByIdRequest = (id) => axios.get("/customers/" + id);

export const updateCustomerRequest = (id, customer) =>
  axios.put("/customers/" + id, customer);

export const deleteCustomerRequest = (id) => axios.delete("/customers/" + id);

export const getCustomerByIdHardwareRequest = (id) =>
  axios.get("/customers/" + id + "/hardware");
