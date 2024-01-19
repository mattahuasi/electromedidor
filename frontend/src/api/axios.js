import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASEURL
  ? import.meta.env.VITE_API_BASEURL
  : "http://localhost:3000/api";

const instance = axios.create({
  baseURL: baseURL,
});

instance.defaults.headers.common["Authorization"] = getCookie("token");
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop().split(";").shift();
  }
}

export default instance;
