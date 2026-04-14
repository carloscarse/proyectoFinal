// proyecto/test/testAuth.js
// Prueba: Auth (login/logout)

const request = require('supertest');
const app = require('../backEnd/app');
const AuthServicio = require('../backEnd/services/auth');

(async () => {
  try {
    // 1️⃣ Probar servicio directamente
    const resultServicio = await AuthServicio.login('admin', 'admin', '::1'); // 👈 ajusta usuario/clave reales
    console.log("✅ Login vía servicio:", resultServicio);

    await AuthServicio.logout('admin', '::1');
    console.log("🗑️ Logout vía servicio: OK");

    // 2️⃣ Probar controlador/ruta con Supertest
    let res = await request(app)
      .post('/api/auth/login')
      .send({ usuario: 'admin', clave: 'admin' }); // 👈 ajusta usuario/clave reales
    console.log("✅ Login vía ruta:", res.body);
    const token = res.body.token;

    res = await request(app).get('/api/auth/user/admin');
    console.log("📋 Datos de usuario vía ruta:", res.body);

    res = await request(app)
      .post('/api/auth/logout')
      .send({ usuario: 'admin' });
    console.log("🗑️ Logout vía ruta:", res.body);

  } catch (err) {
    console.error("❌ Error en prueba de Auth:", err);
  }
})();