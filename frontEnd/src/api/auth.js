import axios from 'axios';

const API_URL = 'http://localhost:8000/api/auth';

export const login = async (usuario, clave) => {
  try {
    const res = await axios.post(`${API_URL}/login`, { usuario, clave });
    return res.data; // { token, usuario, rol }
  } catch (error) {
    console.error('❌ Error en login API:', error);
    throw error.response?.data || { error: 'Error de conexión con el servidor' };
  }
};