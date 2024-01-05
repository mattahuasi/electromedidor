import axios from "./axios.js";

export const getReadingsRequest = (id) =>
  axios.get("/hardware/" + id + "/readings");
