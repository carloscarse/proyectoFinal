// proyecto/test/testPersona.js
require("dotenv").config({ path: "../backEnd/.env" });
const axios = require("axios");

async function probarInsertPersona() {
  try {
    console.log("👤 Probando inserción completa de Persona con relaciones...");

    // ⚡️ Token actual
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXN1YXJpbyI6ImFkbWluIiwicm9sIjoxLCJpYXQiOjE3NzM0OTU2NjAsImV4cCI6MTc3MzUyNDQ2MH0.JNEUfIfu81FFs8YhGBpQaU7rgCcyIt60fk6N-FWVuW0";

    const api = axios.create({
      baseURL: "http://localhost:8000/api",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // 1️⃣ Crear persona con teléfonos y direcciones
    const personaData = {
      nombre: "Carlos",
      apellido: "FullTest",
      dni: "87654321",
      telefonos: [
        { pais: 54, cArea: 381, numero: 1111111 },
        { pais: 54, cArea: 381, numero: 2222222 },
        { pais: 54, cArea: 381, numero: 3333333 }
      ],
      direcciones: [
        { calle: "Av. Test Uno", numero: 100, ciudad: "Tucumán" },
        { calle: "Av. Test Dos", numero: 200, ciudad: "Tucumán" }
      ]
    };

    const resPost = await api.post("/persona", personaData);
    console.log("✅ Persona creada con relaciones:", resPost.data);

    // 2️⃣ Consultar teléfonos de esa persona
    const personaId = resPost.data.id;
    const resTel = await api.get(`/telefono/persona/${personaId}`);
    console.log(`📞 Teléfonos de persona ${personaId}:`, resTel.data);

    // 3️⃣ Consultar direcciones de esa persona
    const resDir = await api.get(`/direccion/persona/${personaId}`);
    console.log(`🏠 Direcciones de persona ${personaId}:`, resDir.data);

  } catch (err) {
    console.error("❌ Error en testPersona:", err.response?.data || err.message);
  }
}

probarInsertPersona();