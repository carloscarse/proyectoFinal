// proyecto/frontEnd/src/pages/Admin/modules/Espacio/commitEditar.js

import { actualizarEspacio } from "../../../../api/espacio";
import { registrarMovimiento } from "../../../../api/logMovimiento";
import { getEspacioLabel } from "../../../../utils/labels/espacio";
import { useUserStore } from "../../../../stores/userStore";

export async function commitEditar(formData, espacioId, onSave) {
  const usuario = useUserStore.getState().user;

  // Actualizar espacio
  const espacioEditado = await actualizarEspacio(espacioId, {
    ...formData
  });

  const espacioLabel = getEspacioLabel(formData);

  // Log de edición de espacio
  registrarMovimiento({
    usuario: usuario.id,
    accion: "actualizacion", // 👈 coincide con ENUM
    entidad: "espacio",
    campo: Object.keys(formData).join(", "),
    previo: null,
    nuevo: Object.values(formData).join(", "),
    detalle: `editó el espacio ${espacioLabel} con id ${espacioId}`
  });

  if (onSave) onSave(espacioEditado);
  return espacioEditado;
}