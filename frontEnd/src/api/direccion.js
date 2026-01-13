import api from "./axiosConfig";

const API_URL = "/direccion";

// Obtener todas las direcciones de una persona
export const getDireccionesByPersona = async (personaId) => {
  const res = await api.get(`${API_URL}/${personaId}`);
  return res.data;
};

// Crear una nueva dirección para una persona
export const createDireccion = async (personaId, direccionData) => {
  const res = await api.post(`${API_URL}/${personaId}`, direccionData);
  return res.data;
};

// Actualizar una dirección por ID
export const updateDireccion = async (id, direccionData) => {
  const res = await api.put(`${API_URL}/${id}`, direccionData);
  return res.data;
};

// Eliminar una dirección por ID
export const deleteDireccion = async (id) => {
  const res = await api.delete(`${API_URL}/${id}`);
  return res.data;
};