// Base URL del backend, configurable desde .env
export const ENDPOINTS = import.meta.env.VITE_API_BASE_URL;

// Axios preconfigurado
import axios from 'axios';

export const api = axios.create({
  baseURL: ENDPOINTS + '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para agregar el token JWT en cada request
api.interceptors.request.use((config) => {
  try {
    const raw = localStorage.getItem('usuario');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed?.token) {
        config.headers.Authorization = `Bearer ${parsed.token}`;
        return config;
      }
    }
    const rawStore = localStorage.getItem('user-storage');
    if (rawStore) {
      const parsed = JSON.parse(rawStore);
      const token = parsed?.state?.user?.token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
  } catch (_) {}
  return config;
});

// ──────────────── USUARIOS ────────────────

// Rutas sin parámetros
export const urlMostrarUsuarios = '/usuarios';       // GET
export const urlCrearUsuario = '/usuario';           // POST

// Rutas con parámetro dinámico
export const urlMostrarUsuario = (id) => `/usuario/${id}`;       // GET
export const urlActualizarUsuario = (id) => `/usuario/${id}`;    // PUT
export const urlEliminarUsuario = (id) => `/usuario/${id}`;      // DELETE

// ──────────────── CONTRATOS ────────────────

export const urlMostrarContratos = '/contratos';       // GET
export const urlCrearContrato = '/contrato';           // POST
export const urlMostrarContrato = (id) => `/contrato/${id}`;       // GET
export const urlActualizarContrato = (id) => `/contrato/${id}`;    // PUT
export const urlEliminarContrato = (id) => `/contrato/${id}`;      // DELETE

// faltan:
// ──────────────── RESERVAS ────────────────
// ──────────────── PAGOS ────────────────
// ──────────────── ESPACIOS ────────────────