// proyecto/frontEnd/src/api/inquilino.js

import api from "./axiosConfig.js";

const API_URL = "/inquilino";

/**
 * Obtener todos los inquilinos
 */
export const obtenerInquilinos = async () => {
  try {
    const res = await api.get(API_URL);
    return res.data;
  } catch (error) {
    console.error("❌ Error al obtener todos los inquilinos:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Obtener un inquilino por ID
 */
export const obtenerInquilinoPorId = async (id) => {
  try {
    const res = await api.get(`${API_URL}/${id}`);
    return res.data;
  } catch (error) {
    console.error(`❌ Error al obtener inquilino con ID ${id}:`, error.response?.data || error.message);
    throw error;
  }
};

/**
 * Crear un nuevo inquilino
 */
export const agregarInquilino = async (inquilinoData) => {
  try {
    const res = await api.post(API_URL, inquilinoData);
    return res.data;
  } catch (error) {
    console.error("❌ Error al crear inquilino:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Actualizar un inquilino por ID
 */
export const actualizarInquilino = async (id, inquilinoData) => {
  try {
    const res = await api.put(`${API_URL}/${id}`, inquilinoData);
    return res.data;
  } catch (error) {
    console.error(`❌ Error al actualizar inquilino con ID ${id}:`, error.response?.data || error.message);
    throw error;
  }
};

/**
 * Eliminar un inquilino (borrado lógico)
 */
export const eliminarInquilino = async (id) => {
  try {
    const res = await api.delete(`${API_URL}/${id}`);
    console.log(`✅ Inquilino con ID ${id} eliminado (borrado lógico)`);
    return res.data;
  } catch (error) {
    console.error(`❌ Error al eliminar inquilino con ID ${id}:`, error.response?.data || error.message);
    throw error;
  }
};

/**
 * Eliminar un inquilino físicamente (solo admins)
 */
export const eliminarInquilinoFisico = async (id) => {
  try {
    const res = await api.delete(`${API_URL}/fisico/${id}`);
    console.log(`✅ Inquilino con ID ${id} eliminado físicamente`);
    return res.data;
  } catch (error) {
    console.error(`❌ Error al eliminar físicamente inquilino con ID ${id}:`, error.response?.data || error.message);
    throw error;
  }
};

/**
 * Obtener todos los inquilinos eliminados (solo admins)
 */
export const obtenerInquilinosEliminados = async () => {
  try {
    const res = await api.get(`${API_URL}/eliminados`);
    return res.data;
  } catch (error) {
    console.error("❌ Error al obtener inquilinos eliminados:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Obtener un inquilino eliminado por ID (solo admins)
 */
export const obtenerInquilinoEliminadoPorId = async (id) => {
  try {
    const res = await api.get(`${API_URL}/eliminados/${id}`);
    return res.data;
  } catch (error) {
    console.error(`❌ Error al obtener inquilino eliminado con ID ${id}:`, error.response?.data || error.message);
    throw error;
  }
};