import api from "./axiosConfig";

const API_URL = "/persona";

// Obtener todas las personas
export const getAllPersonas = async () => {
  const res = await api.get(API_URL);
  return res.data;
};

// Obtener una persona por ID
export const getPersonaById = async (id) => {
  const res = await api.get(`${API_URL}/${id}`);
  return res.data;
};

// Crear una nueva persona
export const createPersona = async (personaData) => {
  const res = await api.post(API_URL, personaData);
  return res.data;
};

// Eliminar una persona por ID
export const deletePersona = async (id) => {
  const res = await api.delete(`${API_URL}/${id}`);
  return res.data;
};

// Actualizar una persona por ID
export const updatePersona = async (id, personaData) => {
  const res = await api.put(`${API_URL}/${id}`, personaData);
  return res.data;
};