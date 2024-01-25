import axios from "./axios";

export const createHardwareRequest = (hardware) =>
  axios.post("/hardware", hardware);

export const getHardwareRequest = () => axios.get("/hardware");

export const getOneHardwareRequest = (id) => axios.get("/hardware/" + id);

export const updateHardwareRequest = (id, hardware) =>
  axios.put("/hardware/" + id, hardware);

export const deleteHardwareRequest = (id) => axios.delete("/hardware/" + id);

export const getHardwareDebtRequest = () => axios.get("/hardware/debt");
