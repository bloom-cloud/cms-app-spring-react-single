import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    // Use optional chaining and cast to Record<string,string> to avoid TS issues
    const headers = config.headers as Record<string, string> | undefined;
    if (headers) {
      headers["Authorization"] = `Bearer ${token}`;
    } else {
      config.headers = { Authorization: `Bearer ${token}` } as any;
    }
  }

  return config;
});

export default API;
