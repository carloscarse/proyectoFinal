// proyecto/test/testTelefono.js
const axios = require("axios");

// Token que me pasaste
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXN1YXJpbyI6ImFkbWluIiwicm9sIjoxLCJpYXQiOjE3NzQ1NTc0MjgsImV4cCI6MTc3NDU4NjIyOH0.cJ_EPob0AkkzRvF5a3ipG171FbJjH-YhBKQLW8ZWGgY";

// Endpoint nuevo que devuelve usuario autenticado con permisos
const API_URL = "http://localhost:8000/api/auth/me";

async function testPermisosTelefono() {
  try {
    const res = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const usuario = res.data;

    console.log("👤 Usuario:", usuario.usuario);
    console.log("📌 Rol:", usuario.rol);
    console.log("🔑 Permisos:", usuario.permisos);

    // Simulamos teléfonos para ver qué acciones aparecen
    const telefonos = [
      { id: 201, pais: "54", CArea: "381", numero: "1234567" },
      { id: 202, pais: "54", CArea: "381", numero: "7654321" }
    ];

    telefonos.forEach((telefono) => {
      console.log(`\n📞 Teléfono: (+${telefono.pais}) ${telefono.CArea}-${telefono.numero}`);
      if (usuario.permisos.includes("telefono:ver")) {
        console.log("🔎 Ver teléfono:", telefono);
      }
      if (usuario.permisos.includes("telefono:editar")) {
        console.log("✏️ Editar teléfono:", telefono);
      }
      if (usuario.permisos.includes("telefono:eliminar")) {
        console.log("🗑️ Eliminar teléfono con id:", telefono.id);
      }
      if (usuario.permisos.includes("telefono:agregar")) {
        console.log("➕ Puede agregar nuevos teléfonos");
      }
    });
  } catch (error) {
    console.error("❌ Error al consultar permisos:");
    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
    } else {
      console.error("Message:", error.message);
    }
  }
}

testPermisosTelefono();