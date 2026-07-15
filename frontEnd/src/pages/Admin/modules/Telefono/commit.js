import { agregarTelefono, actualizarTelefono, eliminarTelefono } from "../../../../api/telefono";
import { registrarMovimiento } from "../../../../api/logMovimiento";
import { useUserStore } from "../../../../stores/userStore";

/**
 * Crear o actualizar teléfono
 */
export async function commitTelefono(telefonoForm, telefono, onSave) {
  const usuario = useUserStore.getState().user;

  // 👇 Crear teléfono nuevo
  if (!telefono?.id) {
    const nuevoTelefono = await agregarTelefono({
      ...telefonoForm,
      borrado: 0 // 👈 inicializamos en 0
    });

    registrarMovimiento({
      usuario: usuario.id,
      accion: "alta",
      entidad: "telefono",
      campo: Object.keys(telefonoForm).join(", "),
      previo: null,
      nuevo: Object.values(telefonoForm).join(", "),
      detalle: `creó el teléfono con id ${nuevoTelefono.id}`
    });

    if (onSave) onSave(nuevoTelefono);
    return nuevoTelefono;
  } else {
    // 👇 Actualizar teléfono existente
    const telefonoActualizado = await actualizarTelefono(telefono.id, {
      ...telefonoForm
    });

    registrarMovimiento({
      usuario: usuario.id,
      accion: "actualización",
      entidad: "telefono",
      campo: Object.keys(telefonoForm).join(", "),
      previo: Object.keys(telefonoForm).map(c => telefono[c]).join(", "),
      nuevo: Object.values(telefonoForm).join(", "),
      detalle: `actualizó el teléfono con id ${telefono.id}`
    });

    if (onSave) onSave(telefonoActualizado);
    return telefonoActualizado;
  }
}

/**
 * Eliminar teléfono
 */
export async function commitEliminarTelefono(telefonoId) {
  await eliminarTelefono(telefonoId);

  const usuario = useUserStore.getState().user;

  registrarMovimiento({
    usuario: usuario.id,
    accion: "baja",
    entidad: "telefono",
    campo: "Todos",
    previo: null,
    nuevo: null,
    detalle: `eliminó el teléfono con id ${telefonoId}`
  });
}