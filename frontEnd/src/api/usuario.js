// proyecto/frontEnd/src/api/usuario.js

import axios from "axios";

const API_URL = "http://localhost:8000/api/usuario";

/**
 * Obtiene un usuario por su id
 * @param {number} id - ID del usuario
 * @returns {Promise<Object>} - Objeto usuario con sus datos
 */
export async function obtenerUsuarioPorId(id) {
  try {
    const response = await axios.get(`${API_URL}/${id}/`);
    return response.data;
  } catch (error) {
    console.error("❌ Error al obtener usuario por id:", error);
    throw error;
  }
}

/**
 * (Opcional) Obtener todos los usuarios
 */
export async function obtenerUsuarios() {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("❌ Error al obtener usuarios:", error);
    throw error;
  }
}