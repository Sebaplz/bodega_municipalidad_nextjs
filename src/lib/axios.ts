import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.URL_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
