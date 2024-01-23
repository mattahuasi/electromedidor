import axios from "./axios";

export const getReadingsRequest = (id) => axios.get("/readings/" + id);

export const getReadingsDatesRequest = (id) =>
  axios.get("/readings/dates/" + id);

export const getLastReadingsRequest = (id) => axios.get("/readings/last/" + id);

export const getReadingsDayRequest = (id, date) =>
  axios.get("/readings/" + id + "/" + date);

export const deleteReadingsRequest = (id) => axios.delete("/readings/" + id);
