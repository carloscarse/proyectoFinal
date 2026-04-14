// proyecto/frontEnd/src/api/direccion.js

import api from "./axiosConfig.js";

const API_URL = "/direccion";

/**
 * Obtener todas las direcciones
 */
export const obtenerDirecciones = async () => {
  try {
    const res = await api.get(API_URL);
    return res.data;
  } catch (error) {
    console.error("❌ Error al obtener todas las direcciones:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Obtener una dirección por ID
 */
export const obtenerDireccionPorId = async (id) => {
  try {
    const res = await api.get(`${API_URL}/${id}`);
    return res.data;
  } catch (error) {
    console.error(`❌ Error al obtener dirección con ID ${id}:`, error.response?.data || error.message);
    throw error;
  }
};

/**
 * Obtener direcciones por personaId
 */
export const obtenerDireccionPorPersona = async (personaId) => {
  try {
    const res = await api.get(`${API_URL}/persona/${personaId}`);
    return res.data;
  } catch (error) {
    console.error(`❌ Error al obtener direcciones de persona ${personaId}:`, error.response?.data || error.message);
    throw error;
  }
};

/**
 * Crear una nueva dirección
 */
export const agregarDireccion = async (direccionData) => {
  try {
    console.log("📤 agregarDireccion en api recibe:", direccionData);
    const res = await api.post(API_URL, direccionData);
    console.log("✅ Dirección creada:", res.data);
    return res.data;
  } catch (error) {
    console.error("❌ Error al crear dirección:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Eliminar una dirección por ID
 */
export const eliminarDireccion = async (id) => {
  try {
    const res = await api.delete(`${API_URL}/${id}`);
    console.log(`✅ Dirección con ID ${id} eliminada`);
    return res.data;
  } catch (error) {
    console.error(`❌ Error al eliminar dirección con ID ${id}:`, error.response?.data || error.message);
    throw error;
  }
};

/**
 * Actualizar una dirección por ID
 */
export const actualizarDireccion = async (id, direccionData) => {
  try {
    console.log("🟣 actualizarDireccion recibe:", { id, direccionData });
    const res = await api.put(`${API_URL}/${id}`, direccionData);
    console.log("✅ actualizarDireccion: respuesta backend:", res.data);
    return res.data;
  } catch (error) {
    console.error("❌ updateDireccion error:", error.response?.data || error.message);
    throw error;
  }
};