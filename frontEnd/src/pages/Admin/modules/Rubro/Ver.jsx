// proyecto/frontEnd/src/pages/Admin/modules/Rubro/Ver.jsx

import React, { useEffect } from "react";
import "./Ver.css";
import { registrarMovimiento } from "../../../../api/logMovimiento.js";
import { useUserStore } from "../../../../stores/userStore.js";

function Ver({ rubro, onClose }) {
  const usuario = useUserStore((state) => state.user);

  useEffect(() => {
    async function registrarConsulta() {
      if (!rubro?.id || !usuario?.id) return;

      try {
        await registrarMovimiento({
          usuario: usuario.id,
          accion: "consulta",
          entidad: "rubro",
          campo: "Todos",
          previo: null,
          nuevo: null,
          detalle: `consultó los datos del rubro ${rubro.rubro} con id ${rubro.id}`
        });
      } catch (err) {
        console.error("❌ Error al registrar consulta de rubro:", err.message);
      }
    }

    if (rubro?.id) {
      registrarConsulta();
    }
  }, [rubro, usuario]);

  if (!rubro) return null;

  return (
    <div className="rubro-ver-objeto-overlay">
      <div className="rubro-ver-objeto-container">
        <h3 className="rubro-ver-objeto-title">Ver Rubro</h3>

        {/* Contenedor interno con scroll */}
        <div className="rubro-ver-objeto-body">
          <div className="rubro-ver-objeto-card">
            <p><strong>ID:</strong> {rubro.id}</p>
            <p><strong>Rubro:</strong> {rubro.rubro}</p>
            <p><strong>Descripción:</strong> {rubro.descripcion}</p>
          </div>
        </div>

        <div className="rubro-ver-objeto-form-buttons">
          <button 
            className="rubro-ver-objeto-btn-aceptar" 
            onClick={onClose}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Ver;