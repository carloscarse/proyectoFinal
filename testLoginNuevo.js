const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

(async () => {
  try {
    const res = await fetch('http://localhost:8000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        usuario: 'admin4', // ← reemplazá por un usuario válido
        clave: 'admin'     // ← reemplazá por la contraseña real
      })
    });

    const data = await res.json();
    console.log('✅ Respuesta del backend:', data);
  } catch (error) {
    console.error('❌ Error al probar /login:', error);
  }
})();