// proyecto/frontEnd/src/api/auth.js
import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/auth`;

// 🔑 Login
export const login = async (usuario, clave) => {
  try {
    const res = await axios.post(`${API_URL}/login`, { usuario, clave });
    const data = res.data;
    // { id, token, usuario, rol, rolNombre, nombreCompleto, label, permisos }

    // 👉 Ya no guardamos nada en localStorage aquí.
    // El manejo de persistencia lo hace userStore.js con Zustand.

    return data;
  } catch (error) {
    console.error('❌ Error en login API:', error.message);
    throw { message: error.response?.data?.error || 'Error de conexión con el servidor' };
  }
};

// 🔑 Logout
export const logout = async () => {
  try {
    const res = await axios.post(`${API_URL}/logout`);
    return res.data;
  } catch (error) {
    console.error('❌ Error en logout API:', error.message);
    throw { message: error.response?.data?.error || 'Error de conexión con el servidor' };
  }
};

// 🚀 Usuario autenticado (requiere token)
export const me = async (token) => {
  try {
    const res = await axios.get(`${API_URL}/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  } catch (error) {
    console.error('❌ Error en me API:', error.message);
    throw { message: error.response?.data?.error || 'Error de conexión con el servidor' };
  }
};

// 🔎 Obtener usuario por nombre
export const getUserByName = async (usuario) => {
  try {
    const res = await axios.get(`${API_URL}/user/${usuario}`);
    return res.data;
  } catch (error) {
    console.error('❌ Error en getUserByName API:', error.message);
    throw { message: error.response?.data?.error || 'Error de conexión con el servidor' };
  }
};