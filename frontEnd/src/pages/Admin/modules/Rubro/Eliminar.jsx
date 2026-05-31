// proyecto/frontEnd/src/pages/Admin/modules/Rubro/Eliminar.jsx

import React, { useState } from "react";
import "./Eliminar.css";
import { eliminarRubro } from "../../../../api/rubro.js";
import { registrarMovimiento } from "../../../../api/logMovimiento.js";

function Eliminar({ rubro, onClose, onEliminar }) {
  const [loading, setLoading] = useState(false);
  const [registrado, setRegistrado] = useState(false); // 👈 bandera

  // 👇 Función para registrar apertura del modal de eliminación
  const registrarConsulta = async () => {
    try {
      await registrarMovimiento({
        accion: "consulta",
        entidad: "rubro",
        campo: "Todos",
        previo: null,
        nuevo: null,
        detalle: `comenzó el proceso de eliminación del rubro ${rubro.rubro} con id ${rubro.id}.`
      });
    } catch (err) {
      console.error("❌ Error al registrar inicio de eliminación:", err.message);
    }
  };

  // 👇 Ejecutar solo una vez al abrir el modal
  if (rubro?.id && !registrado) {
    registrarConsulta();
    setRegistrado(true);
  }

  const handleEliminar = async () => {
    if (loading || !rubro?.id) return;
    setLoading(true);
    try {
      await eliminarRubro(rubro.id);

      // 👇 Registrar la baja
      try {
        await registrarMovimiento({
          accion: "baja",
          entidad: "rubro",
          campo: "Todos",
          previo: `rubro: ${rubro.rubro}, descripcion: ${rubro.descripcion}`,
          nuevo: null,
          detalle: `eliminó el rubro ${rubro.rubro} con id ${rubro.id}, rubro: ${rubro.rubro}, descripcion: ${rubro.descripcion}`
        });
      } catch (logError) {
        console.error("❌ Error al registrar logMovimiento de eliminación:", logError);
      }

      console.log("✅ Rubro eliminado:", rubro);
      if (onEliminar) onEliminar(); // refresca lista
      if (onClose) onClose();       // cierra modal
    } catch (error) {
      console.error("❌ Error al eliminar rubro:", error);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  if (!rubro) return null;

  return (
    <div className="rubro-eliminar-overlay">
      <div className="rubro-eliminar-container">
        <h3 className="rubro-eliminar-title">Eliminar Rubro</h3>
        <div className="rubro-eliminar-body">
          <div className="rubro-eliminar-card">
            <p><strong>ID:</strong> {rubro.id}</p>
            <p><strong>Rubro:</strong> {rubro.rubro}</p>
            <p><strong>Descripción:</strong> {rubro.descripcion}</p>
          </div>
        </div>

        <div className="rubro-eliminar-buttons">
          <button
            className="rubro-eliminar-btn-cancelar"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="rubro-eliminar-btn-eliminar"
            onClick={handleEliminar}
            disabled={loading}
          >
            {loading ? "Eliminando..." : "Eliminar"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Eliminar;