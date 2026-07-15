// proyecto/frontEnd/src/api/espacio.js

import api from "./axiosConfig.js";

const API_URL = "/espacio";

/**
 * Obtener todos los espacios
 */
export const obtenerEspacios = async () => {
  try {
    const res = await api.get(API_URL);
    return res.data;
  } catch (error) {
    console.error("❌ Error al obtener todos los espacios:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Obtener un espacio por ID
 */
export const obtenerEspacioPorId = async (id) => {
  try {
    const res = await api.get(`${API_URL}/${id}`);
    return res.data;
  } catch (error) {
    console.error(`❌ Error al obtener espacio con ID ${id}:`, error.response?.data || error.message);
    throw error;
  }
};

/**
 * Crear un nuevo espacio
 */
export const agregarEspacio = async (espacioData) => {
  try {
    const res = await api.post(API_URL, espacioData);
    return res.data;
  } catch (error) {
    console.error("❌ Error al crear espacio:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Actualizar un espacio por ID
 */
export const actualizarEspacio = async (id, espacioData) => {
  try {
    const res = await api.put(`${API_URL}/${id}`, espacioData);
    return res.data;
  } catch (error) {
    console.error(`❌ Error al actualizar espacio con ID ${id}:`, error.response?.data || error.message);
    throw error;
  }
};

/**
 * Eliminar un espacio (borrado lógico)
 */
export const eliminarEspacio = async (id) => {
  try {
    const res = await api.delete(`${API_URL}/${id}`);
    console.log(`✅ Espacio con ID ${id} eliminado (borrado lógico)`);
    return res.data;
  } catch (error) {
    console.error(`❌ Error al eliminar espacio con ID ${id}:`, error.response?.data || error.message);
    throw error;
  }
};

/**
 * Eliminar un espacio físicamente (solo admins)
 */
export const eliminarEspacioFisico = async (id) => {
  try {
    const res = await api.delete(`${API_URL}/fisico/${id}`);
    console.log(`✅ Espacio con ID ${id} eliminado físicamente`);
    return res.data;
  } catch (error) {
    console.error(`❌ Error al eliminar físicamente espacio con ID ${id}:`, error.response?.data || error.message);
    throw error;
  }
};

/**
 * Obtener todos los espacios eliminados (solo admins)
 */
export const obtenerEspaciosEliminados = async () => {
  try {
    const res = await api.get(`${API_URL}/eliminados`);
    return res.data;
  } catch (error) {
    console.error("❌ Error al obtener espacios eliminados:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Obtener un espacio eliminado por ID (solo admins)
 */
export const obtenerEspacioEliminadoPorId = async (id) => {
  try {
    const res = await api.get(`${API_URL}/eliminados/${id}`);
    return res.data;
  } catch (error) {
    console.error(`❌ Error al obtener espacio eliminado con ID ${id}:`, error.response?.data || error.message);
    throw error;
  }
};