// proyecto/frontEnd/src/pages/Admin/modules/Direccion/commit.js

import { agregarDireccion, actualizarDireccion, eliminarDireccion } from "../../../../api/direccion";
import { registrarMovimiento } from "../../../../api/logMovimiento";
import { useUserStore } from "../../../../stores/userStore";

/**
 * Crear o actualizar dirección asociada a una persona
 */
export async function commitDireccion(direccionForm, personaId, direccion, onSave) {
  const usuario = useUserStore.getState().user;

  // 👇 Crear dirección nueva
  if (!direccion?.id) {
    const nuevaDireccion = await agregarDireccion({
      ...direccionForm,
      personaId,   // 👈 FK hacia persona
      borrado: 0   // 👈 inicializamos en 0
    });

    registrarMovimiento({
      usuario: usuario.id,
      accion: "alta",
      entidad: "direccion",
      campo: Object.keys(direccionForm).join(", "),
      previo: null,
      nuevo: Object.values(direccionForm).join(", "),
      detalle: `creó la dirección con id ${nuevaDireccion.id} para persona ${personaId}`
    });

    if (onSave) onSave(nuevaDireccion);
    return nuevaDireccion;
  } else {
    // 👇 Actualizar dirección existente
    const direccionActualizada = await actualizarDireccion(direccion.id, {
      ...direccionForm,
      personaId
    });

    registrarMovimiento({
      usuario: usuario.id,
      accion: "actualización",
      entidad: "direccion",
      campo: Object.keys(direccionForm).join(", "),
      previo: Object.keys(direccionForm).map(c => direccion[c]).join(", "),
      nuevo: Object.values(direccionForm).join(", "),
      detalle: `actualizó la dirección con id ${direccion.id} de persona ${personaId}`
    });

    if (onSave) onSave(direccionActualizada);
    return direccionActualizada;
  }
}

/**
 * Eliminar dirección (borrado lógico)
 */
export async function commitEliminarDireccion(direccionId) {
  await eliminarDireccion(direccionId);

  const usuario = useUserStore.getState().user;

  registrarMovimiento({
    usuario: usuario.id,
    accion: "baja",
    entidad: "direccion",
    campo: "Todos",
    previo: null,
    nuevo: null,
    detalle: `eliminó la dirección con id ${direccionId}`
  });
}