import axios from "./axios";

export const getHardwareRequest = () => axios.get("/hardware");
