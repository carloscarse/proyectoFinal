// proyecto/frontEnd/src/api/permiso.js
import api from "./axiosConfig";

const API_URL = "/permiso";

/**
 * Validar acceso de un usuario a una acción
 */
export const validarPermiso = async (permisoData) => {
  try {
    const res = await api.post(`${API_URL}/validar`, permisoData);
    return res.data;
  } catch (error) {
    console.error("❌ Error al validar permiso:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Obtener todos los permisos
 */
export const obtenerPermisos = async () => {
  try {
    const res = await api.get(API_URL);
    return res.data;
  } catch (error) {
    console.error("❌ Error al obtener permisos:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Obtener un permiso por ID
 */
export const obtenerPermisoPorId = async (id) => {
  try {
    const res = await api.get(`${API_URL}/${id}`);
    return res.data;
  } catch (error) {
    console.error(`❌ Error al obtener permiso con ID ${id}:`, error.response?.data || error.message);
    throw error;
  }
};

/**
 * Crear un nuevo permiso
 */
export const agregarPermiso = async (permisoData) => {
  try {
    const res = await api.post(API_URL, permisoData);
    return res.data;
  } catch (error) {
    console.error("❌ Error al crear permiso:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Actualizar un permiso por ID
 */
export const actualizarPermiso = async (id, permisoData) => {
  try {
    const res = await api.put(`${API_URL}/${id}`, permisoData);
    return res.data;
  } catch (error) {
    console.error(`❌ Error al actualizar permiso con ID ${id}:`, error.response?.data || error.message);
    throw error;
  }
};

/**
 * Eliminar un permiso (borrado lógico)
 */
export const eliminarPermiso = async (id) => {
  try {
    const res = await api.delete(`${API_URL}/${id}`);
    return res.data;
  } catch (error) {
    console.error(`❌ Error al eliminar permiso con ID ${id}:`, error.response?.data || error.message);
    throw error;
  }
};

/**
 * Eliminar un permiso físicamente (solo admins)
 */
export const eliminarPermisoFisico = async (id) => {
  try {
    const res = await api.delete(`${API_URL}/fisico/${id}`);
    return res.data;
  } catch (error) {
    console.error(`❌ Error al eliminar físicamente permiso con ID ${id}:`, error.response?.data || error.message);
    throw error;
  }
};

/**
 * Obtener todos los permisos eliminados (solo admins)
 */
export const obtenerPermisosEliminados = async () => {
  try {
    const res = await api.get(`${API_URL}/eliminados`);
    return res.data;
  } catch (error) {
    console.error("❌ Error al obtener permisos eliminados:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Obtener un permiso eliminado por ID (solo admins)
 */
export const obtenerPermisoEliminadoPorId = async (id) => {
  try {
    const res = await api.get(`${API_URL}/eliminados/${id}`);
    return res.data;
  } catch (error) {
    console.error(`❌ Error al obtener permiso eliminado con ID ${id}:`, error.response?.data || error.message);
    throw error;
  }
};