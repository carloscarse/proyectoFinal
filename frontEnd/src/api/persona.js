// proyecto/frontEnd/src/api/persona.js
import api from "./axiosConfig.js";

const API_URL = "/persona";

/**
 * Obtener todas las personas
 */
export const obtenerPersonas = async () => {
  try {
    const res = await api.get(API_URL);
    return res.data;
  } catch (error) {
    console.error("❌ Error al obtener todas las personas:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Obtener una persona por ID
 */
export const obtenerPersonaPorId = async (id) => {
  try {
    const res = await api.get(`${API_URL}/${id}`);
    return res.data;
  } catch (error) {
    console.error(`❌ Error al obtener persona con ID ${id}:`, error.response?.data || error.message);
    throw error;
  }
};

/**
 * Crear una nueva persona
 */
export const agregarPersona = async (personaData) => {
  try {
    const res = await api.post(API_URL, personaData);
    return res.data;
  } catch (error) {
    console.error("❌ Error al crear persona:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Actualizar una persona por ID
 */
export const actualizarPersona = async (id, personaData) => {
  try {
    const res = await api.put(`${API_URL}/${id}`, personaData);
    return res.data;
  } catch (error) {
    console.error("❌ Error al actualizar persona:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Eliminar una persona
 */
export const eliminarPersona = async (id) => {
  try {
    const res = await api.delete(`${API_URL}/${id}`);
    console.log(`✅ Persona con ID ${id} eliminada`);
    return res.data;
  } catch (error) {
    console.error(`❌ Error al eliminar persona con ID ${id}:`, error.response?.data || error.message);
    throw error;
  }
};