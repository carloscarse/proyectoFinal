// URL base del backend, configurable desde .env de Vite para evitar exponer el puerto.
export const ENDPOINTS = import.meta.env.VITE_API_BASE_URL;

// Rutas sin parámetros
export const urlMostrarUsuarios = '/usuarios';
export const urlCrearUsuario = '/usuario';

// Rutas con parámetro dinámico (funciones) recomendado en la documentación de react.
export const urlMostrarUsuario = (id) => `/usuario/${id}`;
export const urlActualizarUsuario = (id) => `/usuario/${id}`;
export const urlEliminarUsuario = (id) => `/usuario/${id}`;