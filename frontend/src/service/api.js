import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;

const instance = axios.create({
  baseURL: baseUrl,
  header: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
export default instance;
