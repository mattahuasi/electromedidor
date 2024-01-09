import axios from "./axios";

export const createEmployeeRequest = (user) => axios.post("/employees", user);

export const getEmployeesRequest = () => axios.get("/employees");

export const getEmployeeByIdRequest = (id) => axios.get("/employees/" + id);

export const updateEmployeeByIdRequest = (id, user) =>
  axios.put("/employees/" + id, user);

export const deleteEmployeeByIdRequest = (id) =>
  axios.delete("/employees/" + id);
