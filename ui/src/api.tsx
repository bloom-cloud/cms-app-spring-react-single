import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
});


// ---- REQUEST INTERCEPTOR ----
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


// ---- RESPONSE INTERCEPTOR ----
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login?message=" + JSON.stringify(error.response);
    }

    return Promise.reject(error);
  }
);

export default API;
