import axios from "./axios";

export const registerRequest = (user) => axios.post("/auth/register", user);

export const loginRequest = (user) => axios.post("/auth/login", user);

export const logoutRequest = () => axios.post("/auth/logout");

export const verifyTokenRequest = () => axios.get("/auth/verify");

export const updateProfileRequest = (user) =>
  axios.put("/auth/update/profile", user);

export const updatePasswordRequest = (user) =>
  axios.put("/auth/update/password", user);
