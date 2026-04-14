// proyecto/test/testUsuarioBack.js
import UsuarioServicio from "../backEnd/services/usuario.js"; // ajustá la ruta según tu estructura

async function testUsuarioBack() {
  try {
    const usuario = await UsuarioServicio.obtenerUsuarioPorId(1);
    console.log("✅ Usuario recuperado desde el back:");
    console.log(usuario);

    console.log("Campo usuario:", usuario?.usuario);
    console.log("Campo label:", usuario?.label);
  } catch (error) {
    console.error("❌ Error al consultar usuario desde back:", error.message);
  }
}

testUsuarioBack();