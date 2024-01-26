import axios from "axios";

const api = axios.create({
  baseURL: "https://estetica-db.onrender.com",
  timeout: 5000,
});

export default api;
