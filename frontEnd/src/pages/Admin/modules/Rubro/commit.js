import { agregarRubro, actualizarRubro, eliminarRubro } from "../../../../api/rubro";
import { registrarMovimiento } from "../../../../api/logMovimiento";
import { getRubroLabel } from "../../../../utils/labels/rubro";
import { useUserStore } from "../../../../stores/userStore";

/**
 * Crear o actualizar rubro
 */
export async function commitRubro(rubroForm, rubro, onSave) {
  const usuario = useUserStore.getState().user;

  // 👇 Crear rubro nuevo
  if (!rubro?.id) {
    const nuevoRubro = await agregarRubro({
      ...rubroForm,
      borrado: 0 // 👈 inicializamos en 0
    });

    registrarMovimiento({
      usuario: usuario.id,
      accion: "alta",
      entidad: "rubro",
      campo: Object.keys(rubroForm).join(", "),
      previo: null,
      nuevo: Object.values(rubroForm).join(", "),
      detalle: `creó el rubro ${getRubroLabel(nuevoRubro)} con id ${nuevoRubro.id}`
    });

    if (onSave) onSave(nuevoRubro);
    return nuevoRubro;
  } else {
    // 👇 Actualizar rubro existente
    const rubroActualizado = await actualizarRubro(rubro.id, {
      ...rubroForm
    });

    registrarMovimiento({
      usuario: usuario.id,
      accion: "actualización",
      entidad: "rubro",
      campo: Object.keys(rubroForm).join(", "),
      previo: Object.keys(rubroForm).map(c => rubro[c]).join(", "),
      nuevo: Object.values(rubroForm).join(", "),
      detalle: `actualizó el rubro ${getRubroLabel(rubroActualizado)} con id ${rubro.id}`
    });

    if (onSave) onSave(rubroActualizado);
    return rubroActualizado;
  }
}

/**
 * Eliminar rubro
 */
export async function commitEliminarRubro(rubroId) {
  await eliminarRubro(rubroId);

  const usuario = useUserStore.getState().user;

  registrarMovimiento({
    usuario: usuario.id,
    accion: "baja",
    entidad: "rubro",
    campo: "Todos",
    previo: null,
    nuevo: null,
    detalle: `eliminó el rubro con id ${rubroId}`
  });
}