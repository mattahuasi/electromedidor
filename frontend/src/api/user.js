import axios from "./axios.js";

export const createUserRequest = (user) => axios.post("/users", user);

export const getUsersRequest = () => axios.get("/users");

export const getUserByIdRequest = (id) => axios.get("/users/" + id);

export const updateUserRequest = (id, user) => axios.put("/users/" + id, user);

export const deleteUserRequest = (id) => axios.delete("/users/" + id);
