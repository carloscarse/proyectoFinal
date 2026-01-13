// proyecto/frontend/src/api/servicio.js
import axios from 'axios';

// URL base de la API del backend
const API_URL = 'http://localhost:8000/api/servicio';

// ✅ Funciones para consumir el backend
export const getServicios = () => axios.get(API_URL);

export const getServicioById = (id) => axios.get(`${API_URL}/${id}`);

export const createServicio = (data) => axios.post(API_URL, data);

export const updateServicio = (id, data) => axios.put(`${API_URL}/${id}`, data);

export const deleteServicio = (id) => axios.delete(`${API_URL}/${id}`);