import axios from "axios";

// Crear instancia de axios con baseURL del backend
const api = axios.create({
  baseURL: "http://localhost:8000/api",
});

// Interceptor para agregar token automáticamente en cada request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;