// proyecto/frontEnd/src/api/axiosConfig.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
});

// Interceptor para agregar el token desde localStorage
api.interceptors.request.use((config) => {
  try {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (usuario?.token) {
      config.headers.Authorization = `Bearer ${usuario.token}`;
    }
  } catch (err) {
    console.error("❌ Error leyendo usuario de localStorage:", err);
  }
  return config;
});

export default api;