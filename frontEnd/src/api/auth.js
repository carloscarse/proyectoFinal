// proyecto/frontEnd/src/api/auth.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/auth';

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
    throw error.response?.data || { error: 'Error de conexión con el servidor' };
  }
};