// proyecto/frontEnd/src/pages/Admin/modules/Documentacion/Ver.jsx 👁️

import React, { useEffect, useState } from "react";
import "./Ver.css";
import { registrarMovimiento } from "../../../../api/logMovimiento";
import { useUserStore } from "../../../../stores/userStore";
import { getDocumentacionLabel } from "../../../../utils/labels/documentacion";
import { getInquilinoLabel } from "../../../../utils/labels/inquilino";
import { obtenerInquilinoPorId } from "../../../../api/inquilino";
import VerArchivo from "./VerArchivo";
import VerInquilino from "../Inquilino/Ver";

function Ver({ documentacion, onClose }) {
  const usuario = useUserStore((state) => state.user);
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
  
  const [mostrarArchivo, setMostrarArchivo] = useState(false);
  const [inquilino, setInquilino] = useState(null);
  const [inquilinoSeleccionado, setInquilinoSeleccionado] = useState(null);

  useEffect(() => {
    async function registrarConsulta() {
      if (!documentacion?.id || !usuario?.id) return;

      try {
        await registrarMovimiento({
          usuario: usuario.id,
          accion: "consulta",
          entidad: "documentacion",
          campo: "Todos",
          previo: null,
          nuevo: null,
          detalle: `consultó los datos de la documentación ${getDocumentacionLabel(documentacion)} con id ${documentacion.id}`,
        });
      } catch (err) {
        console.error("❌ Error al registrar consulta:", err.message);
      }
    }

    async function cargarRelaciones() {
      if (documentacion?.inquilino) {
        try {
          const res = await obtenerInquilinoPorId(documentacion.inquilino);
          setInquilino(res.data || res);
        } catch (err) {
          console.error("Error al cargar inquilino:", err);
          setInquilino(null);
        }
      }
    }

    if (documentacion?.id) {
      registrarConsulta();
      cargarRelaciones();
    }
  }, [documentacion, usuario]);

  if (!documentacion) return null;

  const formatearFecha = (fecha) => {
    if (!fecha) return "-";
    return new Date(fecha).toLocaleDateString("es-AR");
  };

  return (
    <>
      <div className="documentacion-ver-objeto-overlay">
        <div className="documentacion-ver-objeto-container">
          <h3 className="documentacion-ver-objeto-title">Ver Documentación</h3>

          <div className="documentacion-ver-objeto-body">
            <div className="documentacion-ver-objeto-card">
              <p><strong>ID:</strong> {documentacion.id}</p>
              <p>
                <strong>Documento:</strong>
                {documentacion.documento ? (
                  <button
                    className="documentacion-file-link-btn"
                    onClick={() => setMostrarArchivo(true)}
                  >
                    Ver archivo
                  </button>
                ) : (
                  " -"
                )}
              </p>
              <p><strong>Descripción:</strong> {documentacion.descripcion || "-"}</p>
              <p><strong>Fecha de Emisión:</strong> {formatearFecha(documentacion.emision)}</p>
              <p><strong>Fecha de Vencimiento:</strong> {formatearFecha(documentacion.vencimiento)}</p>
              <p><strong>Fecha de Presentación:</strong> {formatearFecha(documentacion.fechaPresentacion)}</p>
            </div>

            {inquilino && (
              <div className="documentacion-ver-relaciones">
                <div className="documentacion-ver-relacion-section">
                  <h4 className="documentacion-ver-relacion-title">Inquilino</h4>
                  <table className="documentacion-ver-objeto-tabla">
                    <thead>
                      <tr>
                        <th>Inquilino</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{getInquilinoLabel(inquilino)}</td>
                        <td className="documentacion-ver-objeto-acciones">
                          <button 
                            className="documentacion-ver-objeto-btn-ver"
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
              </div>
            )}
          </div>

          <div className="documentacion-ver-objeto-form-buttons">
            <button
              className="documentacion-ver-objeto-btn-aceptar"
              onClick={onClose}
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>

      {mostrarArchivo && (
        <VerArchivo 
          archivo={documentacion.documento} 
          onClose={() => setMostrarArchivo(false)} 
        />
      )}

      {inquilinoSeleccionado && (
        <VerInquilino
          inquilino={inquilinoSeleccionado}
          onClose={() => setInquilinoSeleccionado(null)}
        />
      )}
    </>
  );
}

export default Ver;