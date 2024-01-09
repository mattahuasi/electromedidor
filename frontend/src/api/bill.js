import axios from "./axios";

export const createBillRequest = (bill) => axios.post("/bills", bill);

export const getBillsRequest = () => axios.get("/bills");

export const getBillByIdRequest = (id) => axios.get("/bills/" + id);

export const updateBillByIdRequest = (id, bill) =>
  axios.put("/bills/" + id, bill);

export const deleteBillByIdRequest = (id) => axios.delete("/bills/" + id);
