// proyecto/test/testTelefono.js
require("dotenv").config({ path: "../backEnd/.env" });
const axios = require("axios");

async function probarInsertTelefono() {
  try {
    // ⚡️ Token válido
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXN1YXJpbyI6ImFkbWluIiwicm9sIjoxLCJpYXQiOjE3NzM0NjIxNTAsImV4cCI6MTc3MzQ5MDk1MH0.kV1Y5PWluNHmbJSaloiatSjHz0zKYrR0aavTj0V5Iec";

    const api = axios.create({
      baseURL: "http://localhost:8000/api",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // 1️⃣ Crear un teléfono asociado a personaId=34
    const nuevoTelefono = {
      persona: 34,   // FK obligatoria
      pais: 54,
      cArea: 381,
      numero: 1234567
    };

    const resPost = await api.post("/telefono", nuevoTelefono);
    console.log("✅ Teléfono insertado:", resPost.data);

    // 2️⃣ Consultar teléfonos de esa persona
    const resGet = await api.get(`/telefono/persona/${nuevoTelefono.persona}`);
    console.log("📞 Teléfonos de persona 34:", resGet.data);

  } catch (err) {
    console.error("❌ Error en prueba de teléfono:", err.response?.data || err.message);
  }
}

probarInsertTelefono();