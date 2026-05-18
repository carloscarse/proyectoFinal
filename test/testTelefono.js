const axios = require("axios");

const BASE_URL = "http://localhost:8000/api";
const TEST_USER = process.env.TEST_USER || "admin";
const TEST_PASS = process.env.TEST_PASS || "admin";

async function crearApiAutenticada() {
  const loginRes = await axios.post(`${BASE_URL}/auth/login`, {
    usuario: TEST_USER,
    clave: TEST_PASS,
  });

  const token = loginRes.data?.token;
  if (!token) {
    throw new Error("No se obtuvo token en login");
  }

  return axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

async function probarInsertTelefono() {
  try {
    const api = await crearApiAutenticada();

    const personasRes = await api.get("/persona");
    const personas = Array.isArray(personasRes.data) ? personasRes.data : [];

    if (personas.length === 0) {
      throw new Error("No hay personas disponibles para asociar el telefono");
    }

    const personaId = personas[0].id;

    // 1️⃣ Crear un telefono asociado a una persona existente
    const nuevoTelefono = {
      persona: personaId,
      pais: 54,
      cArea: 381,
      numero: 1234567
    };

    const resPost = await api.post("/telefono", nuevoTelefono);
    console.log("✅ Teléfono insertado:", resPost.data);

    // 2️⃣ Consultar telefonos de esa persona
    const resGet = await api.get(`/telefono/persona/${nuevoTelefono.persona}`);
    console.log(`📞 Telefonos de persona ${personaId}:`, resGet.data);

  } catch (err) {
    console.error("❌ Error en prueba de teléfono:", err.response?.data || err.message);
    process.exitCode = 1;
  }
}

probarInsertTelefono();