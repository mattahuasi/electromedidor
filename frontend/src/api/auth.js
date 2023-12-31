import axios from "./axios";

export const loginRequest = (user) => axios.post("/login", user);

export const logoutRequest = () => axios.post("/logout");

export const verifyTokenRequest = () => axios.get("/verify");

export const updateProfileRequest = (user) => axios.put("/profile", user);

export const updatePassword = (user) =>
  axios.put("/profile/update/password", user);

export const registerRequest = (user) =>
  axios.post("/customers/register", user);
