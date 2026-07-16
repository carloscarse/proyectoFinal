// proyecto/frontEnd/src/api/documentacion.js

import api from "./axiosConfig.js";

const API_URL = "/documentacion";

/**
 * Obtener todas las documentaciones
 */
export const obtenerDocumentaciones = async () => {
  try {
    const res = await api.get(API_URL);
    return res.data;
  } catch (error) {
    console.error("❌ Error al obtener todas las documentaciones:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Obtener una documentación por ID
 */
export const obtenerDocumentacionPorId = async (id) => {
  try {
    const res = await api.get(`${API_URL}/${id}`);
    return res.data;
  } catch (error) {
    console.error(`❌ Error al obtener documentación con ID ${id}:`, error.response?.data || error.message);
    throw error;
  }
};

/**
 * Crear una nueva documentación
 * Acepta FormData para upload de archivos
 */
export const agregarDocumentacion = async (documentacionData) => {
  try {
    // Si es FormData, Axios setea el Content-Type automáticamente con boundary
    const config = documentacionData instanceof FormData 
      ? { headers: { 'Content-Type': 'multipart/form-data' } }
      : {};
    
    const res = await api.post(API_URL, documentacionData, config);
    return res.data;
  } catch (error) {
    console.error("❌ Error al crear documentación:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Actualizar una documentación por ID
 * Acepta FormData para upload de archivos
 */
export const actualizarDocumentacion = async (id, documentacionData) => {
  try {
    const config = documentacionData instanceof FormData 
      ? { headers: { 'Content-Type': 'multipart/form-data' } }
      : {};
    
    const res = await api.put(`${API_URL}/${id}`, documentacionData, config);
    return res.data;
  } catch (error) {
    console.error("❌ Error al actualizar documentación:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Eliminar una documentación (borrado lógico)
 */
export const eliminarDocumentacion = async (id) => {
  try {
    const res = await api.delete(`${API_URL}/${id}`);
    console.log(`✅ Documentación con ID ${id} eliminada (borrado lógico)`);
    return res.data;
  } catch (error) {
    console.error(`❌ Error al eliminar documentación con ID ${id}:`, error.response?.data || error.message);
    throw error;
  }
};

/**
 * Eliminar una documentación físicamente (solo admins)
 */
export const eliminarDocumentacionFisico = async (id) => {
  try {
    const res = await api.delete(`${API_URL}/fisico/${id}`);
    console.log(`✅ Documentación con ID ${id} eliminada físicamente`);
    return res.data;
  } catch (error) {
    console.error(`❌ Error al eliminar físicamente documentación con ID ${id}:`, error.response?.data || error.message);
    throw error;
  }
};

/**
 * Obtener todas las documentaciones eliminadas (solo admins)
 */
export const obtenerDocumentacionesEliminadas = async () => {
  try {
    const res = await api.get(`${API_URL}/eliminadas`);
    return res.data;
  } catch (error) {
    console.error("❌ Error al obtener documentaciones eliminadas:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Obtener una documentación eliminada por ID (solo admins)
 */
export const obtenerDocumentacionEliminadaPorId = async (id) => {
  try {
    const res = await api.get(`${API_URL}/eliminadas/${id}`);
    return res.data;
  } catch (error) {
    console.error(`❌ Error al obtener documentación eliminada con ID ${id}:`, error.response?.data || error.message);
    throw error;
  }
};