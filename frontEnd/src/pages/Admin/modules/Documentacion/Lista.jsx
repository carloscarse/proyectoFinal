// proyecto/frontEnd/src/pages/Admin/modules/Documentacion/Lista.jsx  👁️ ✏️ 🗑️

import React, { useState, useEffect } from 'react';
import './Lista.css';
import { obtenerDocumentaciones } from '../../../../api/documentacion';
import { obtenerInquilinos } from '../../../../api/inquilino';
import { getInquilinoLabel } from '../../../../utils/labels/inquilino';
import Ver from './Ver';
import Editar from './Editar';
import Eliminar from './Eliminar';
import Agregar from './Agregar.jsx';
import { useUserStore } from '../../../../stores/userStore';
import { registrarMovimiento } from '../../../../api/logMovimiento';

function Lista() {
  const [documentaciones, setDocumentaciones] = useState([]);
  const [inquilinos, setInquilinos] = useState([]);

  // estados separados para cada modal
  const [showAgregar, setShowAgregar] = useState(false);
  const [showVer, setShowVer] = useState(null);
  const [showEditar, setShowEditar] = useState(null);
  const [showEliminar, setShowEliminar] = useState(null);

  const usuario = useUserStore((state) => state.user);

  const cargar = async () => {
    try {
      const [docs, inqs] = await Promise.all([
        obtenerDocumentaciones(),
        obtenerInquilinos()
      ]);
      setDocumentaciones(docs || []);
      setInquilinos(inqs || []);
    } catch (err) {
      console.error("❌ Error cargando datos:", err.message);
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  const formatearFecha = (fecha) => {
    if (!fecha) return '-';
    return new Date(fecha).toLocaleDateString('es-AR');
  };

  const getInquilinoLabelPorId = (inquilinoId) => {
    const inquilino = inquilinos.find(i => i.id === inquilinoId);
    return inquilino ? getInquilinoLabel(inquilino) : `ID: ${inquilinoId || '-'}`;
  };

  return (
    <div className="documentacion-lista-container">
      <div className="documentacion-lista-header">
        <h2 className="documentacion-lista-title">Documentación</h2>

        {usuario?.permisos?.includes("documentacion:agregar") && (
          <button
            className="documentacion-lista-btn-agregar"
            onClick={() => setShowAgregar(true)}
          >
            ➕ Nueva Documentación
          </button>
        )}
      </div>

      <div className="documentacion-lista-tabla-wrapper">
        <table className="documentacion-lista-tabla">
          <thead>
            <tr>
              <th>ID</th>
              <th>Inquilino</th>
              <th>Descripción</th>
              <th>Emisión</th>
              <th>Vencimiento</th>
              <th>Presentación</th>
              <th>Documento</th>
              <th className="documentacion-lista-acciones">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {documentaciones.map(d => (
              <tr key={d.id}>
                <td>{d.id}</td>
                <td>{getInquilinoLabelPorId(d.inquilino)}</td>
                <td>{d.descripcion}</td>
                <td>{formatearFecha(d.emision)}</td>
                <td>{formatearFecha(d.vencimiento)}</td>
                <td>{formatearFecha(d.fechaPresentacion)}</td>
                <td>{d.documento}</td>
                <td className="documentacion-lista-acciones">
                  <div className="documentacion-lista-acciones-buttons">
                    {usuario?.permisos?.includes("documentacion:ver") && (
                      <button
                        className="documentacion-lista-btn-ver"
                        onClick={async () => {
                          try {
                            await registrarMovimiento({
                              usuario: usuario.id,
                              accion: "consulta",
                              entidad: "documentacion",
                              campo: "Todos",
                              previo: null,
                              nuevo: null,
                              detalle: `consultó los datos de la documentación ${d.descripcion} con id ${d.id}`
                            });
                          } catch (err) {
                            console.error("❌ Error registrando log de ver documentación:", err.message);
                          }
                          setShowVer(d.id);
                        }}
                        title="Ver"
                      >
                        👁️
                      </button>
                    )}

                    {usuario?.permisos?.includes("documentacion:editar") && (
                      <button
                        className="documentacion-lista-btn-editar"
                        onClick={async () => {
                          try {
                            await registrarMovimiento({
                              usuario: usuario.id,
                              accion: "inicio-edicion",
                              entidad: "documentacion",
                              campo: "Todos",
                              previo: null,
                              nuevo: null,
                              detalle: `inició el proceso de edición de la documentación ${d.descripcion} con id ${d.id}`
                            });
                          } catch (err) {
                            console.error("❌ Error registrando inicio de edición:", err.message);
                          }
                          setShowEditar(d.id);
                        }}
                        title="Editar"
                      >
                        ✏️
                      </button>
                    )}

                    {usuario?.permisos?.includes("documentacion:eliminar") && (
                      <button
                        className="documentacion-lista-btn-eliminar"
                        onClick={async () => {
                          try {
                            await registrarMovimiento({
                              usuario: usuario.id,
                              accion: "inicio-eliminacion",
                              entidad: "documentacion",
                              campo: "Todos",
                              previo: null,
                              nuevo: null,
                              detalle: `inició el proceso de eliminación de la documentación ${d.descripcion} con id ${d.id}`
                            });
                          } catch (err) {
                            console.error("❌ Error registrando inicio de eliminación:", err.message);
                          }
                          setShowEliminar(d.id);
                        }}
                        title="Eliminar"
                      >
                        🗑️
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modales independientes */}
      {showAgregar && (
        <Agregar
          onClose={() => {
            setShowAgregar(false);
            cargar();
          }}
        />
      )}

      {showVer && (
        <Ver
          documentacion={documentaciones.find(d => d.id === showVer)}
          onClose={() => setShowVer(null)}
        />
      )}

      {showEditar && (
        <Editar
          documentacionInicial={documentaciones.find(d => d.id === showEditar)}
          onClose={() => {
            setShowEditar(null);
            cargar();
          }}
        />
      )}

      {showEliminar && (
        <Eliminar
          documentacion={documentaciones.find(d => d.id === showEliminar)}
          onClose={() => setShowEliminar(null)}
          onEliminar={() => {
            cargar();
          }}
        />
      )}
    </div>
  );
}

export default Lista;