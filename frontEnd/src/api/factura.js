// proyecto/frontend/src/api/factura.js
import axios from 'axios';

// URL base de la API del backend
const API_URL = 'http://localhost:8000/api/factura';

// ✅ Funciones para consumir el backend
export const getFacturas = () => axios.get(API_URL);

export const getFacturaById = (id) => axios.get(`${API_URL}/${id}`);

export const createFactura = (data) => axios.post(API_URL, data);

export const updateFactura = (id, data) => axios.put(`${API_URL}/${id}`, data);

export const deleteFactura = (id) => axios.delete(`${API_URL}/${id}`);