import axios from "axios";
const api = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL
});

api.interceptors.request.use((req) => {
  if (localStorage.getItem("access-token")) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("access-token"))}`;
  }
  return req;
});

export default api;
