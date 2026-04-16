// proyecto/frontEnd/src/api/usuario.js
import api from "./axiosConfig.js";

const API_URL = "/usuario";

/**
 * Obtener todos los usuarios
 */
export const obtenerUsuarios = async () => {
  try {
    const res = await api.get(API_URL);
    return res.data;
  } catch (error) {
    console.error("❌ Error al obtener usuarios:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Obtener un usuario por ID
 */
export const obtenerUsuarioPorId = async (id) => {
  try {
    const res = await api.get(`${API_URL}/${id}`);
    return res.data;
  } catch (error) {
    console.error(`❌ Error al obtener usuario con ID ${id}:`, error.response?.data || error.message);
    throw error;
  }
};

/**
 * Crear un nuevo usuario
 */
export const agregarUsuario = async (usuarioData) => {
  try {
    const res = await api.post(API_URL, usuarioData);
    return res.data;
  } catch (error) {
    console.error("❌ Error al crear usuario:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Actualizar un usuario por ID
 */
export const actualizarUsuario = async (id, usuarioData) => {
  try {
    const res = await api.put(`${API_URL}/${id}`, usuarioData);
    return res.data;
  } catch (error) {
    console.error(`❌ Error al actualizar usuario con ID ${id}:`, error.response?.data || error.message);
    throw error;
  }
};

/**
 * Eliminar un usuario (borrado lógico)
 */
export const eliminarUsuario = async (id) => {
  try {
    const res = await api.delete(`${API_URL}/${id}`);
    console.log(`✅ Usuario con ID ${id} eliminado (borrado lógico)`);
    return res.data;
  } catch (error) {
    console.error(`❌ Error al eliminar usuario con ID ${id}:`, error.response?.data || error.message);
    throw error;
  }
};

/**
 * Eliminar un usuario físicamente (solo admins)
 */
export const eliminarUsuarioFisico = async (id) => {
  try {
    const res = await api.delete(`${API_URL}/fisico/${id}`);
    console.log(`✅ Usuario con ID ${id} eliminado físicamente`);
    return res.data;
  } catch (error) {
    console.error(`❌ Error al eliminar físicamente usuario con ID ${id}:`, error.response?.data || error.message);
    throw error;
  }
};

/**
 * Obtener todos los usuarios eliminados (solo admins)
 */
export const obtenerUsuariosEliminados = async () => {
  try {
    const res = await api.get(`${API_URL}/eliminados`);
    return res.data;
  } catch (error) {
    console.error("❌ Error al obtener usuarios eliminados:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Obtener un usuario eliminado por ID (solo admins)
 */
export const obtenerUsuarioEliminadoPorId = async (id) => {
  try {
    const res = await api.get(`${API_URL}/eliminados/${id}`);
    return res.data;
  } catch (error) {
    console.error(`❌ Error al obtener usuario eliminado con ID ${id}:`, error.response?.data || error.message);
    throw error;
  }
};