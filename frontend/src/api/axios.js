import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASEURL,
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
