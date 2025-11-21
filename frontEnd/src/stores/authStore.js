export async function loginUsuario(usuario, clave) {
  console.log('🔶 loginUsuario() llamado con:', usuario, clave);

  try {
    const res = await fetch('http://localhost:8000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usuario, clave })
    });

    console.log('📡 Respuesta HTTP:', res);

    const data = await res.json();
    console.log('📦 JSON recibido:', data);

    return data;
  } catch (error) {
    console.error('❌ Error en loginUsuario:', error);
    return null;
  }
}

export async function registrarUsuario(usuario, clave) {
  console.log('🔷 registrarUsuario() llamado con:', usuario, clave);

  try {
    const res = await fetch('http://localhost:8000/usuario', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        usuario,
        clave,
        rol: 1 // o el rol que corresponda
      })
    });

    const data = await res.json();
    console.log('📦 JSON recibido en registro:', data);

    return data;
  } catch (error) {
    console.error('❌ Error en registrarUsuario:', error);
    return null;
  }
}