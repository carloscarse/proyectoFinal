import api from "./axiosConfig";

const API_URL = "/telefono";

// Obtener todos los teléfonos de una persona
export const getTelefonosByPersona = async (personaId) => {
  const res = await api.get(`${API_URL}/${personaId}`);
  return res.data;
};

// Obtener un teléfono por ID
export const getTelefonoById = async (id) => {
  const res = await api.get(`${API_URL}/detalle/${id}`);
  return res.data;
};

// Crear un nuevo teléfono para una persona
export const createTelefono = async (personaId, telefonoData) => {
  const res = await api.post(`${API_URL}/${personaId}`, telefonoData);
  return res.data;
};

// Actualizar un teléfono por ID
export const updateTelefono = async (id, telefonoData) => {
  const res = await api.put(`${API_URL}/${id}`, telefonoData);
  return res.data;
};

// Eliminar un teléfono por ID
export const deleteTelefono = async (id) => {
  const res = await api.delete(`${API_URL}/${id}`);
  return res.data;
};