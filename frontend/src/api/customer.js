import axios from "./axios";

export const createCustomerRequest = (customer) =>
  axios.post("/customers", customer);

export const getCustomersRequest = () => axios.get("/customers");

export const getCustomerByIdRequest = (id) => axios.get("/customers/" + id);

export const updateCustomerByIdRequest = (id, customer) =>
  axios.put("/customers/" + id, customer);

export const deleteCustomerByIdRequest = (id) =>
  axios.delete("/customers/" + id);

export const getCustomerHardwareByIdRequest = (id) =>
  axios.get("/customers/" + id + "/hardware");
