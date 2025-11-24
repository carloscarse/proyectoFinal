const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

(async () => {
  try {
    const res = await fetch('http://localhost:8000/inquilino', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        persona: 2, // ← reemplazá con un ID válido
        alta: '2025-11-24'
      })
    });

    const data = await res.json();
    console.log('✅ Respuesta del backend:', data);
  } catch (error) {
    console.error('❌ Error al probar /inquilino:', error);
  }
})();