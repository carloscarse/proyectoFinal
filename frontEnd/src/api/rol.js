// proyecto/frontEnd/src/api/rol.js
import api from "./axiosConfig";

const API_URL = "/rol";

/**
 * Obtener todos los roles
 */
export const obtenerRoles = async () => {
  try {
    const res = await api.get(API_URL);
    return res.data;
  } catch (error) {
    console.error("❌ Error al obtener roles:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Obtener un rol por ID
 */
export const obtenerRolPorId = async (id) => {
  try {
    const res = await api.get(`${API_URL}/${id}`);
    return res.data;
  } catch (error) {
    console.error(`❌ Error al obtener rol con ID ${id}:`, error.response?.data || error.message);
    throw error;
  }
};

/**
 * Crear un nuevo rol
 */
export const agregarRol = async (rolData) => {
  try {
    const res = await api.post(API_URL, rolData);
    return res.data;
  } catch (error) {
    console.error("❌ Error al crear rol:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Actualizar un rol por ID
 */
export const actualizarRol = async (id, rolData) => {
  try {
    const res = await api.put(`${API_URL}/${id}`, rolData);
    return res.data;
  } catch (error) {
    console.error(`❌ Error al actualizar rol con ID ${id}:`, error.response?.data || error.message);
    throw error;
  }
};

/**
 * Eliminar un rol (borrado lógico)
 */
export const eliminarRol = async (id) => {
  try {
    const res = await api.delete(`${API_URL}/${id}`);
    console.log(`✅ Rol con ID ${id} eliminado (borrado lógico)`);
    return res.data;
  } catch (error) {
    console.error(`❌ Error al eliminar rol con ID ${id}:`, error.response?.data || error.message);
    throw error;
  }
};

/**
 * Eliminar un rol físicamente (solo admins)
 */
export const eliminarRolFisico = async (id) => {
  try {
    const res = await api.delete(`${API_URL}/fisico/${id}`);
    console.log(`✅ Rol con ID ${id} eliminado físicamente`);
    return res.data;
  } catch (error) {
    console.error(`❌ Error al eliminar físicamente rol con ID ${id}:`, error.response?.data || error.message);
    throw error;
  }
};

/**
 * Obtener todos los roles eliminados (solo admins)
 */
export const obtenerRolesEliminados = async () => {
  try {
    const res = await api.get(`${API_URL}/eliminados`);
    return res.data;
  } catch (error) {
    console.error("❌ Error al obtener roles eliminados:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Obtener un rol eliminado por ID (solo admins)
 */
export const obtenerRolEliminadoPorId = async (id) => {
  try {
    const res = await api.get(`${API_URL}/eliminados/${id}`);
    return res.data;
  } catch (error) {
    console.error(`❌ Error al obtener rol eliminado con ID ${id}:`, error.response?.data || error.message);
    throw error;
  }
};