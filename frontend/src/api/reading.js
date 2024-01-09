import axios from "./axios";

export const getReadingsRequest = (id) =>
  axios.get("/hardware/" + id + "/readings");
