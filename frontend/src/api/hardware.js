import axios from "./axios.js";

export const createHardwareRequest = (id, hardware) =>
  axios.post("/hardware/" + id, hardware);

export const getHardwareRequest = () => axios.get("/hardware");

export const getHardwareByIdRequest = (id) => axios.get("/hardware/" + id);

export const updateHardwareRequest = (id, hardware) =>
  axios.put("/hardware/" + id, hardware);

export const deleteHardwareRequest = (id) => axios.delete("/hardware/" + id);
