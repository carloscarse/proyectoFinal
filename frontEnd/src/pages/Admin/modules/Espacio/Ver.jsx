// proyecto/frontEnd/src/pages/Admin/modules/Espacio/Ver.jsx

import React, { useState, useEffect } from "react";
import "./Ver.css";
import { registrarMovimiento } from "../../../../api/logMovimiento"; 
import { useUserStore } from "../../../../stores/userStore";
import { getEspacioLabel } from "../../../../utils/labels/espacio";
import { getInquilinoLabel } from "../../../../utils/labels/inquilino";
import { getRubroLabel } from "../../../../utils/labels/rubro";
import { obtenerInquilinoPorId } from "../../../../api/inquilino";
import { obtenerRubroPorId } from "../../../../api/rubro";
import VerInquilino from "../Inquilino/Ver";
import VerRubro from "../Rubro/Ver";

function Ver({ espacio, onClose }) {
  const [inquilino, setInquilino] = useState(null);
  const [rubro, setRubro] = useState(null);
  const [inquilinoSeleccionado, setInquilinoSeleccionado] = useState(null);
  const [rubroSeleccionado, setRubroSeleccionado] = useState(null);

  const usuario = useUserStore((state) => state.user);

  useEffect(() => {
    async function registrarConsulta() {
      if (!espacio?.id || !usuario?.id) return;

      try {
        await registrarMovimiento({
          usuario: usuario.id,
          accion: "consulta",
          entidad: "espacio",
          campo: "Todos",
          previo: null,
          nuevo: null,
          detalle: `consultó los datos del espacio ${getEspacioLabel(espacio)} con id ${espacio.id}`
        });
      } catch (err) {
        console.error("❌ Error al registrar consulta:", err.message);
      }
    }

    async function cargarRelaciones() {
      // Consultar inquilino si existe
      if (espacio?.inquilino) {
        try {
          const inq = await obtenerInquilinoPorId(espacio.inquilino);
          setInquilino(inq);
        } catch {
          setInquilino(null);
        }
      }

      // Consultar rubro si existe
      if (espacio?.rubro) {
        try {
          const rub = await obtenerRubroPorId(espacio.rubro);
          setRubro(rub);
        } catch {
          setRubro(null);
        }
      }
    }

    if (espacio?.id) {
      registrarConsulta();
      cargarRelaciones();
    }
  }, [espacio, usuario]);

  if (!espacio) return null;

  return (
    <div className="espacio-ver-objeto-overlay">
      <div className="espacio-ver-objeto-container">
        <h3 className="espacio-ver-objeto-title">Ver Espacio</h3>

        {/* Contenedor interno con scroll */}
        <div className="espacio-ver-objeto-body">
          <div className="espacio-ver-objeto-card">
            <p><strong>ID:</strong> {espacio.id}</p>
            <p><strong>Nombre:</strong> {espacio.nombre}</p>
            <p><strong>Tipo:</strong> {espacio.tipo}</p>
            <p><strong>Estado:</strong> {espacio.estado}</p>
            <p><strong>Ancho:</strong> {espacio.ancho} m</p>
            <p><strong>Largo:</strong> {espacio.largo} m</p>
            <p><strong>Superficie:</strong> {(espacio.ancho * espacio.largo).toFixed(2)} m²</p>
            <p><strong>Precio:</strong> ${espacio.precio}</p>
            <p><strong>Recargo Ubicación:</strong> ${espacio.recargoUbicacion}</p>
            <p><strong>Descripción:</strong> {espacio.descripcion}</p>
          </div>

          <div className="espacio-ver-relaciones">
            {inquilino && (
              <div className="espacio-ver-relacion-section">
                <h4 className="espacio-ver-relacion-title">Inquilino</h4>
                <table className="espacio-ver-objeto-tabla">
                  <thead>
                    <tr>
                      <th>Inquilino</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{getInquilinoLabel(inquilino)}</td>
                      <td className="espacio-ver-objeto-acciones">
                        <button 
                          className="espacio-ver-objeto-btn-ver"
                          onClick={() => setInquilinoSeleccionado(inquilino)}
                          title="Ver"
                        >
                          👁️
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {rubro && (
              <div className="espacio-ver-relacion-section">
                <h4 className="espacio-ver-relacion-title">Rubro</h4>
                <table className="espacio-ver-objeto-tabla">
                  <thead>
                    <tr>
                      <th>Rubro</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{getRubroLabel(rubro)}</td>
                      <td className="espacio-ver-objeto-acciones">
                        <button 
                          className="espacio-ver-objeto-btn-ver"
                          onClick={() => setRubroSeleccionado(rubro)}
                          title="Ver"
                        >
                          👁️
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        <div className="espacio-ver-objeto-form-buttons">
          <button 
            className="espacio-ver-objeto-btn-aceptar" 
            onClick={onClose}
          >
            Cerrar
          </button>
        </div>
      </div>

      {/* Modales de ver relaciones */}
      {inquilinoSeleccionado && (
        <VerInquilino
          inquilino={inquilinoSeleccionado}
          onClose={() => setInquilinoSeleccionado(null)}
        />
      )}
      {rubroSeleccionado && (
        <VerRubro
          rubro={rubroSeleccionado}
          onClose={() => setRubroSeleccionado(null)}
        />
      )}
    </div>
  );
}

export default Ver;