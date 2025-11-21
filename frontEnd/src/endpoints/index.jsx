// src/endpoints/index.js
import axios from 'axios';

export const ENDPOINTS = import.meta.env.VITE_API_BASE_URL;

export const api = axios.create({
  baseURL: ENDPOINTS,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Exportá tus rutas si las tenías acá
export const urlMostrarUsuarios = '/usuarios';
export const urlCrearUsuario = '/usuario';
export const urlMostrarUsuario = (id) => `/usuario/${id}`;
export const urlActualizarUsuario = (id) => `/usuario/${id}`;
export const urlEliminarUsuario = (id) => `/usuario/${id}`;