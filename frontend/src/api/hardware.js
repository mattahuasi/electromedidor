import axios from "./axios.js";

export const createHardwareRequest = (id, hardware) =>
  axios.post("/hardware/" + id, hardware);

export const getHardwareRequest = () => axios.get("/hardware");

export const getHardwareByIdRequest = (id) => axios.get("/hardware/" + id);

export const updateHardwareByIdRequest = (id, hardware) =>
  axios.put("/hardware/" + id, hardware);

export const deleteHardwareByIdRequest = (id) =>
  axios.delete("/hardware/" + id);
