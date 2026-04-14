// proyecto/frontEnd/src/utils/labels/usuario.js

import { obtenerUsuarioPorId } from "../../api/usuario";

/**
 * Devuelve el label del usuario a partir de su id.
 * Ejemplo: "admin" o "Super Administrador"
 */
export async function getUsuarioLabel(usuarioId) {
  if (!usuarioId) return "desconocido";

  try {
    const usuario = await obtenerUsuarioPorId(usuarioId);
    // El backend devuelve "usuario" y también "label"
    return usuario?.label || usuario?.usuario || "desconocido";
  } catch (err) {
    console.error("❌ Error al obtener usuario:", err.message);
    return "desconocido";
  }
}