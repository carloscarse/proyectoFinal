// proyecto/frontEnd/src/pages/Admin/modules/Documentacion/commitEditar.js

import { actualizarDocumentacion } from "../../../../api/documentacion";
import { registrarMovimiento } from "../../../../api/logMovimiento";
import { useUserStore } from "../../../../stores/userStore";
import { getDocumentacionLabel } from "../../../../utils/labels/documentacion";

export async function commitEditar(formData, id, inquilino, archivoFile, callback) {
  const usuario = useUserStore.getState().user;
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

  try {
    // 1. Subir archivo nuevo si existe
    let nombreArchivo = formData.documento;
    if (archivoFile) {
      const data = new FormData();
      data.append('file', archivoFile);
      
      const uploadRes = await fetch(`${API_URL}/documentacion/upload`, {
        method: 'POST',
        body: data
      });
      
      if (!uploadRes.ok) throw new Error('Error al subir archivo');
      const uploadData = await uploadRes.json();
      nombreArchivo = uploadData.filename;
    }

    // 2. Preparar datos para actualizar
    const dataToUpdate = {
      documento: nombreArchivo,
      descripcion: formData.descripcion,
      emision: formData.emision || null,
      vencimiento: formData.vencimiento || null,
      fechaPresentacion: formData.fechaPresentacion || null,
      inquilino: inquilino?.id || null
    };

    // 3. Actualizar documentación
    const res = await actualizarDocumentacion(id, dataToUpdate);

    // 4. Registrar movimiento
    await registrarMovimiento({
      usuario: usuario.id,
      accion: "edicion",
      entidad: "documentacion",
      campo: "Todos",
      previo: null,
      nuevo: null,
      detalle: `editó la documentación ${getDocumentacionLabel(res.data)} con id ${id}`
    });

    if (callback) callback(res.data);
    return res.data;
  } catch (error) {
    console.error("❌ Error en commitEditar:", error);
    throw error;
  }
}