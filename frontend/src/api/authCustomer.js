import axios from "./axios";

export const customerRegisterRequest = (customer) =>
  axios.post("/auth/customers/register", customer);

export const customerLoginRequest = (customer) =>
  axios.post("/auth/customers/login", customer);

export const customerLogoutRequest = () => axios.post("/auth/employees/logout");

export const customerVerifyTokenRequest = () =>
  axios.get("/auth/customers/verify");

export const customerUpdateProfileRequest = (customer) =>
  axios.put("/auth/customers/update/profile", customer);

export const customerUpdatePasswordRequest = (customer) =>
  axios.put("/auth/customers/update/password", customer);
