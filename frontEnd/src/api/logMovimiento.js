// proyecto/frontEnd/src/api/logMovimiento.js
import api from "./axiosConfig";

const API_URL = "/logmovimiento";

/**
 * Registrar un nuevo movimiento
 */
export async function registrarMovimiento({
  usuario,
  accion,
  entidad,
  campo,
  previo = null,
  nuevo = null,
  detalle
}) {
  try {
    const res = await api.post(API_URL, {
      usuario,
      accion,
      entidad,
      campo,
      previo,
      nuevo,
      detalle
    });
    return res.data;
  } catch (error) {
    console.error("❌ Error en registrarMovimiento API:", error.response?.data || error.message);
    throw error;
  }
}

/**
 * Obtener todos los movimientos
 */
export async function obtenerLogMovimientos() {
  try {
    const res = await api.get(API_URL);
    return res.data;
  } catch (error) {
    console.error("❌ Error al obtener logMovimientos:", error.response?.data || error.message);
    throw error;
  }
}

/**
 * Obtener un movimiento por ID
 */
export async function obtenerLogMovimientoPorId(id) {
  try {
    const res = await api.get(`${API_URL}/${id}`);
    return res.data;
  } catch (error) {
    console.error(`❌ Error al obtener logMovimiento con ID ${id}:`, error.response?.data || error.message);
    throw error;
  }
}

/**
 * Actualizar un movimiento por ID
 */
export async function actualizarLogMovimiento(id, movimientoData) {
  try {
    const res = await api.put(`${API_URL}/${id}`, movimientoData);
    return res.data;
  } catch (error) {
    console.error(`❌ Error al actualizar logMovimiento con ID ${id}:`, error.response?.data || error.message);
    throw error;
  }
}

/**
 * Eliminar un movimiento (borrado lógico)
 */
export async function eliminarLogMovimiento(id) {
  try {
    const res = await api.delete(`${API_URL}/${id}`);
    return res.data;
  } catch (error) {
    console.error(`❌ Error al eliminar logMovimiento con ID ${id}:`, error.response?.data || error.message);
    throw error;
  }
}

/**
 * Eliminar un movimiento físicamente (solo admins)
 */
export async function eliminarLogMovimientoFisico(id) {
  try {
    const res = await api.delete(`${API_URL}/fisico/${id}`);
    return res.data;
  } catch (error) {
    console.error(`❌ Error al eliminar físicamente logMovimiento con ID ${id}:`, error.response?.data || error.message);
    throw error;
  }
}

/**
 * Obtener todos los movimientos eliminados (solo admins)
 */
export async function obtenerLogsEliminados() {
  try {
    const res = await api.get(`${API_URL}/eliminados`);
    return res.data;
  } catch (error) {
    console.error("❌ Error al obtener logs eliminados:", error.response?.data || error.message);
    throw error;
  }
}

/**
 * Obtener un movimiento eliminado por ID (solo admins)
 */
export async function obtenerLogEliminadoPorId(id) {
  try {
    const res = await api.get(`${API_URL}/eliminados/${id}`);
    return res.data;
  } catch (error) {
    console.error(`❌ Error al obtener logMovimiento eliminado con ID ${id}:`, error.response?.data || error.message);
    throw error;
  }
}