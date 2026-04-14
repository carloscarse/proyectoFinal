// frontEnd/src/api/rubro.js
import api from "./axiosConfig";

const API_URL = "/rubro";

// Obtener todos los rubros
export const getAllRubros = async () => {
  const res = await api.get(API_URL);
  return res.data;
};

// Obtener un rubro por ID
export const getRubroById = async (id) => {
  const res = await api.get(`${API_URL}/${id}`);
  return res.data;
};

// Crear un nuevo rubro
export const createRubro = async (rubroData) => {
  const res = await api.post(API_URL, rubroData);
  return res.data;
};

// Eliminar un rubro por ID
export const deleteRubro = async (id) => {
  const res = await api.delete(`${API_URL}/${id}`);
  return res.data;
};

// Actualizar un rubro por ID
export const updateRubro = async (id, rubroData) => {
  const res = await api.put(`${API_URL}/${id}`, rubroData);
  return res.data;
};