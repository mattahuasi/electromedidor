import axios from "./axios";

export const getReadingsRequest = (id) =>
  axios.get("/hardware/" + id + "/readings");

export const deleteReadingsRequest = (id) =>
  axios.get("/hardware/" + id + "/readings");
