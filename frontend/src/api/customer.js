import axios from "./axios";

export const createCustomerRequest = (customer) =>
  axios.post("/customers", customer);

export const getCustomersRequest = () => axios.get("/customers");

export const getCustomerRequest = (id) => axios.get("/customers/" + id);

export const updateCustomerRequest = (id, customer) =>
  axios.put("/customers/" + id, customer);

export const deleteCustomerRequest = (id) => axios.delete("/customers/" + id);

export const getCustomerHardwareRequest = () =>
  axios.get("/customers/hardware");
