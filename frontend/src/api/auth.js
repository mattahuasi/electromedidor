import axios from "./axios.js";

export const loginRequest = (user) => axios.post("/login", user);

export const logoutRequest = () => axios.post("/logout");

export const verifyTokenRequest = () => axios.get("/verify");

export const updateProfileRequest = (user) => axios.put("/profile", user);

export const updatePassword = (user) => axios.put("/update/password", user);
