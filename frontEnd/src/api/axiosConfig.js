// proyecto/frontEnd/src/api/axiosConfig.js
import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
});

// Interceptor para agregar el token desde localStorage (persistencia manejada por userStore)
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