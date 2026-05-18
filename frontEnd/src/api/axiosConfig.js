// proyecto/frontEnd/src/api/axiosConfig.js
import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
});

// Interceptor para agregar el token desde localStorage (persistencia manejada por userStore)
api.interceptors.request.use((config) => {
  try {
    // Primero intenta la clave que guarda Login.jsx
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (usuario?.token) {
      config.headers.Authorization = `Bearer ${usuario.token}`;
      return config;
    }
    // Fallback: clave que usa Zustand persist
    const zustand = JSON.parse(localStorage.getItem("user-storage"));
    const token = zustand?.state?.user?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (err) {
    console.error("❌ Error leyendo usuario de localStorage:", err);
  }
  return config;
});

export default api;