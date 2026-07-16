// proyecto/frontEnd/src/pages/Admin/modules/Documentacion/Eliminar.jsx 👁️

import React, { useEffect, useState } from "react";
import "./Eliminar.css";
import { eliminarDocumentacion } from "../../../../api/documentacion";
import { registrarMovimiento } from "../../../../api/logMovimiento";
import { useUserStore } from "../../../../stores/userStore";
import { getDocumentacionLabel } from "../../../../utils/labels/documentacion";
import { getInquilinoLabel } from "../../../../utils/labels/inquilino";
import { obtenerInquilinoPorId } from "../../../../api/inquilino";
import { obtenerPersonaPorId } from "../../../../api/persona";
import VerArchivo from "./VerArchivo";
import VerInquilino from "../Inquilino/Ver";

function Eliminar({ documentacion, onClose, onEliminar }) {
  const usuario = useUserStore((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [registrado, setRegistrado] = useState(false);
  
  const [mostrarArchivo, setMostrarArchivo] = useState(false);
  const [inquilino, setInquilino] = useState(null);
  const [inquilinoSeleccionado, setInquilinoSeleccionado] = useState(null);

  useEffect(() => {
    async function registrarInicio() {
      if (!documentacion?.id || !usuario?.id) return;
      try {
        await registrarMovimiento({
          usuario: usuario.id,
          accion: "inicio-eliminacion",
          entidad: "documentacion",
          campo: "Todos",
          previo: null,
          nuevo: null,
          detalle: `inició el proceso de eliminación de la documentación ${getDocumentacionLabel(documentacion)} con id ${documentacion.id}`
        });
      } catch (err) {
        console.error("❌ Error al registrar inicio de eliminación:", err.message);
      }
    }

    async function cargarRelaciones() {
      if (documentacion?.inquilino) {
        try {
          const inq = await obtenerInquilinoPorId(documentacion.inquilino);
          
          let personaCompleta = inq.persona;
          if (inq.persona && typeof inq.persona === 'number') {
            const resPersona = await obtenerPersonaPorId(inq.persona);
            personaCompleta = resPersona.data || resPersona;
          }
          
          setInquilino({...inq, persona: personaCompleta });
        } catch (err) {
          console.error("Error al cargar inquilino:", err);
          setInquilino(null);
        }
      }
    }

    if (documentacion?.id && !registrado) {
      registrarInicio();
      setRegistrado(true);
      cargarRelaciones();
    }
  }, [documentacion, usuario, registrado]);

  const handleEliminar = async () => {
    if (loading || !documentacion?.id) return;
    setLoading(true);
    try {
      await eliminarDocumentacion(documentacion.id);

      await registrarMovimiento({
        usuario: usuario?.id || "sistema",
        accion: "baja",
        entidad: "documentacion",
        campo: "Todos",
        previo: `documentación: ${getDocumentacionLabel(documentacion)}`,
        nuevo: null,
        detalle: `eliminó la documentación ${getDocumentacionLabel(documentacion)} con id ${documentacion.id}`
      });

      if (onEliminar) onEliminar();
      if (onClose) onClose();
    } catch (err) {
      console.error("❌ Error al eliminar documentación:", err.message);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  if (!documentacion) return null;

  const formatearFecha = (fecha) => {
    if (!fecha) return '-';
    return new Date(fecha).toLocaleDateString('es-AR');
  };

  return (
    <>
      <div className="documentacion-eliminar-overlay">
        <div className="documentacion-eliminar-container">
          <h3 className="documentacion-eliminar-title">Eliminar Documentación</h3>

          <div className="documentacion-eliminar-body">
            <div className="documentacion-eliminar-card">
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
              <p><strong>Descripción:</strong> {documentacion.descripcion || '-'}</p>
              <p><strong>Fecha de Emisión:</strong> {formatearFecha(documentacion.emision)}</p>
              <p><strong>Fecha de Vencimiento:</strong> {formatearFecha(documentacion.vencimiento)}</p>
              <p><strong>Fecha de Presentación:</strong> {formatearFecha(documentacion.fechaPresentacion)}</p>
            </div>

            {inquilino && (
              <div className="documentacion-eliminar-relaciones">
                <div className="documentacion-eliminar-relacion-section">
                  <h4 className="documentacion-eliminar-relacion-title">Inquilino</h4>
                  <table className="documentacion-eliminar-objeto-tabla">
                    <thead>
                      <tr>
                        <th>Inquilino</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{getInquilinoLabel(inquilino)}</td>
                        <td className="documentacion-eliminar-objeto-acciones">
                          <button 
                            className="documentacion-eliminar-objeto-btn-ver"
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

          <div className="documentacion-eliminar-buttons">
            <button
              className="documentacion-eliminar-btn-cancelar"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              className="documentacion-eliminar-btn-eliminar"
              onClick={handleEliminar}
              disabled={loading}
            >
              {loading ? "Eliminando..." : "Eliminar"}
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

export default Eliminar;