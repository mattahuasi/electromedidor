import axios from "./axios.js";

export const getHardwareRequest = () => axios.get("/hardware");
