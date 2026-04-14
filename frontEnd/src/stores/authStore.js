// proyecto/frontEnd/src/stores/authStore.js
import { useUserStore } from './userStore';

export async function loginUsuario(usuario, clave) {
  try {
    const res = await fetch('http://localhost:8000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usuario, clave })
    });

    const data = await res.json();

    if (data?.token) {
      localStorage.setItem('token', data.token);
    }

    if (data?.id) {
      // Guardar usuario completo en el store
      const setUser = useUserStore.getState().setUser;
      setUser({ ...data, token: data.token });
    }

    return data;
  } catch (error) {
    console.error('❌ Error en loginUsuario:', error.message);
    return null;
  }
}

export async function registrarUsuario(usuario, clave) {
  try {
    const res = await fetch('http://localhost:8000/api/usuario', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        usuario,
        clave,
        rol: 1 // o el rol que corresponda
      })
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('❌ Error en registrarUsuario:', error.message);
    return null;
  }
}