import axios from "./axios";

export const employeeLoginRequest = (employee) =>
  axios.post("/auth/employees/login", employee);

export const employeeLogoutRequest = () => axios.post("/auth/employees/logout");

export const employeeVerifyTokenRequest = () =>
  axios.get("/auth/employees/verify");

export const employeeUpdateProfileRequest = (employee) =>
  axios.put("/auth/employees/update/profile", employee);

export const employeeUpdatePasswordRequest = (employee) =>
  axios.put("/auth/employees/update/password", employee);
