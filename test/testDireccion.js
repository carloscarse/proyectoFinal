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

async function testPermisosDireccion() {
  try {
    const api = await crearApiAutenticada();
    const { data: usuario } = await api.get("/auth/me");

    console.log("Usuario:", usuario.usuario);
    console.log("Rol:", usuario.rolNombre || usuario.rol);
    console.log("Permisos:", usuario.permisos);

    const direccionesDemo = [
      { id: 101, calle: "San Martin", numero: "123", ciudad: "Tucuman" },
      { id: 102, calle: "Belgrano", numero: "456", ciudad: "Tafi Viejo" },
    ];

    direccionesDemo.forEach((direccion) => {
      console.log(`\nDireccion: ${direccion.calle} ${direccion.numero} - ${direccion.ciudad}`);

      if (usuario.permisos.includes("direccion:ver")) {
        console.log("Puede ver direccion:", direccion);
      }
      if (usuario.permisos.includes("direccion:editar")) {
        console.log("Puede editar direccion con id:", direccion.id);
      }
      if (usuario.permisos.includes("direccion:eliminar")) {
        console.log("Puede eliminar direccion con id:", direccion.id);
      }
      if (usuario.permisos.includes("direccion:agregar")) {
        console.log("Puede agregar nuevas direcciones");
      }
    });
  } catch (error) {
    console.error("Error en test de Direccion:");
    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
    } else {
      console.error("Message:", error.message);
    }
    process.exitCode = 1;
  }
}

testPermisosDireccion();