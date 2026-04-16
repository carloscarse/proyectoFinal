// proyecto/frontEnd/src/api/telefono.js
import api from "./axiosConfig.js";

const API_URL = "/telefono";

/**
 * Obtener todos los teléfonos
 */
export const obtenerTelefonos = async () => {
  try {
    const res = await api.get(API_URL);
    return res.data;
  } catch (error) {
    console.error("❌ Error al obtener todos los teléfonos:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Obtener un teléfono por ID
 */
export const obtenerTelefonoPorId = async (id) => {
  try {
    const res = await api.get(`${API_URL}/${id}`);
    return res.data;
  } catch (error) {
    console.error(`❌ Error al obtener teléfono con ID ${id}:`, error.response?.data || error.message);
    throw error;
  }
};

/**
 * Obtener teléfonos por personaId
 */
export const obtenerTelefonoPorPersona = async (personaId) => {
  try {
    const res = await api.get(`${API_URL}/persona/${personaId}`);
    return res.data;
  } catch (error) {
    console.error(`❌ Error al obtener teléfonos de persona ${personaId}:`, error.response?.data || error.message);
    throw error;
  }
};

/**
 * Crear un nuevo teléfono
 */
export const agregarTelefono = async (telefonoData) => {
  try {
    console.log("📤 agregarTelefono en api recibe:", telefonoData);
    const res = await api.post(API_URL, telefonoData);
    console.log("✅ Teléfono creado:", res.data);
    return res.data;
  } catch (error) {
    console.error("❌ Error al crear teléfono:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Actualizar un teléfono por ID
 */
export const actualizarTelefono = async (id, telefonoData) => {
  try {
    console.log("🟣 actualizarTelefono recibe:", { id, telefonoData });
    const res = await api.put(`${API_URL}/${id}`, telefonoData);
    console.log("✅ actualizarTelefono: respuesta backend:", res.data);
    return res.data;
  } catch (error) {
    console.error("❌ updateTelefono error:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Eliminar un teléfono (borrado lógico)
 */
export const eliminarTelefono = async (id) => {
  try {
    const res = await api.delete(`${API_URL}/${id}`);
    console.log(`✅ Teléfono con ID ${id} eliminado (borrado lógico)`);
    return res.data;
  } catch (error) {
    console.error(`❌ Error al eliminar teléfono con ID ${id}:`, error.response?.data || error.message);
    throw error;
  }
};

/**
 * Eliminar un teléfono físicamente (solo admins)
 */
export const eliminarTelefonoFisico = async (id) => {
  try {
    const res = await api.delete(`${API_URL}/fisico/${id}`);
    console.log(`✅ Teléfono con ID ${id} eliminado físicamente`);
    return res.data;
  } catch (error) {
    console.error(`❌ Error al eliminar físicamente teléfono con ID ${id}:`, error.response?.data || error.message);
    throw error;
  }
};

/**
 * Obtener todos los teléfonos eliminados (solo admins)
 */
export const obtenerTelefonosEliminados = async () => {
  try {
    const res = await api.get(`${API_URL}/eliminados`);
    return res.data;
  } catch (error) {
    console.error("❌ Error al obtener teléfonos eliminados:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Obtener un teléfono eliminado por ID (solo admins)
 */
export const obtenerTelefonoEliminadoPorId = async (id) => {
  try {
    const res = await api.get(`${API_URL}/eliminados/${id}`);
    return res.data;
  } catch (error) {
    console.error(`❌ Error al obtener teléfono eliminado con ID ${id}:`, error.response?.data || error.message);
    throw error;
  }
};