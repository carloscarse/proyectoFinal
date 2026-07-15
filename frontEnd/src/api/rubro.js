// proyecto/frontEnd/src/api/rubro.js

import api from "./axiosConfig.js";

const API_URL = "/rubro";

/**
 * Obtener todos los rubros
 */
export const obtenerRubros = async () => {
  try {
    const res = await api.get(API_URL);
    return res.data;
  } catch (error) {
    console.error("❌ Error al obtener todos los rubros:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Obtener un rubro por ID
 */
export const obtenerRubroPorId = async (id) => {
  try {
    const res = await api.get(`${API_URL}/${id}`);
    return res.data;
  } catch (error) {
    console.error(`❌ Error al obtener rubro con ID ${id}:`, error.response?.data || error.message);
    throw error;
  }
};

/**
 * Crear un nuevo rubro
 */
export const agregarRubro = async (rubroData) => {
  try {
    const res = await api.post(API_URL, rubroData);
    return res.data;
  } catch (error) {
    console.error("❌ Error al crear rubro:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Actualizar un rubro por ID
 */
export const actualizarRubro = async (id, rubroData) => {
  try {
    const res = await api.put(`${API_URL}/${id}`, rubroData);
    return res.data;
  } catch (error) {
    console.error(`❌ Error al actualizar rubro con ID ${id}:`, error.response?.data || error.message);
    throw error;
  }
};

/**
 * Eliminar un rubro (borrado lógico)
 */
export const eliminarRubro = async (id) => {
  try {
    const res = await api.delete(`${API_URL}/${id}`);
    console.log(`✅ Rubro con ID ${id} eliminado (borrado lógico)`);
    return res.data;
  } catch (error) {
    console.error(`❌ Error al eliminar rubro con ID ${id}:`, error.response?.data || error.message);
    throw error;
  }
};

/**
 * Eliminar un rubro físicamente (solo admins)
 */
export const eliminarRubroFisico = async (id) => {
  try {
    const res = await api.delete(`${API_URL}/fisico/${id}`);
    console.log(`✅ Rubro con ID ${id} eliminado físicamente`);
    return res.data;
  } catch (error) {
    console.error(`❌ Error al eliminar físicamente rubro con ID ${id}:`, error.response?.data || error.message);
    throw error;
  }
};

/**
 * Obtener todos los rubros eliminados (solo admins)
 */
export const obtenerRubrosEliminados = async () => {
  try {
    const res = await api.get(`${API_URL}/eliminados`);
    return res.data;
  } catch (error) {
    console.error("❌ Error al obtener rubros eliminados:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Obtener un rubro eliminado por ID (solo admins)
 */
export const obtenerRubroEliminadoPorId = async (id) => {
  try {
    const res = await api.get(`${API_URL}/eliminados/${id}`);
    return res.data;
  } catch (error) {
    console.error(`❌ Error al obtener rubro eliminado con ID ${id}:`, error.response?.data || error.message);
    throw error;
  }
};