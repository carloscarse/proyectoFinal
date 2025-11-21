// Base URL del backend, configurable desde .env
export const ENDPOINTS = import.meta.env.VITE_API_BASE_URL;

// Axios preconfigurado
import axios from 'axios';

export const api = axios.create({
  baseURL: ENDPOINTS,
  headers: {
    'Content-Type': 'application/json'
  }
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

// Podés seguir agregando módulos así:
// ──────────────── RESERVAS ────────────────
// ──────────────── PAGOS ────────────────
// ──────────────── ESPACIOS ────────────────