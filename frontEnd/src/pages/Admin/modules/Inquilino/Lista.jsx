// proyecto/frontEnd/src/pages/Admin/modules/Inquilino/Lista.jsx

import React, { useState, useEffect } from 'react';
import './Lista.css';
import { obtenerInquilinos } from '../../../../api/inquilino.js';
import Ver from './Ver';
import Editar from './Editar';
import Eliminar from './Eliminar';
import AgregarInquilino from './Agregar';
import { useUserStore } from '../../../../stores/userStore.js';
import { registrarMovimiento } from '../../../../api/logMovimiento.js';
import { getInquilinoLabel } from "../../../../utils/labels/inquilino";
import { formatDate } from "../../../../utils/dateFormat"; // 👈 importamos la utilidad

function Lista() {
  const [inquilinos, setInquilinos] = useState([]);

  // estados separados para cada modal
  const [showAgregar, setShowAgregar] = useState(false);
  const [showVer, setShowVer] = useState(null);
  const [showEditar, setShowEditar] = useState(null);
  const [showEliminar, setShowEliminar] = useState(null);

  const usuario = useUserStore((state) => state.user);

  const cargar = async () => {
    const data = await obtenerInquilinos();
    setInquilinos(data || []);
  };

  useEffect(() => {
    cargar();
  }, []);

  return (
    <div className="inquilino-lista-container">
      <div className="inquilino-lista-header">
        <h2 className="inquilino-lista-title">Inquilinos</h2>

        {usuario?.permisos?.includes("inquilino:agregar") && (
          <button
            className="inquilino-lista-btn-agregar"
            onClick={() => setShowAgregar(true)}
          >
            ➕ Nuevo Inquilino
          </button>
        )}
      </div>

      <div className="inquilino-lista-tabla-wrapper">
        <table className="inquilino-lista-tabla">
          <thead>
            <tr>
              <th>ID</th>
              <th>Inquilino</th>
              <th>Fecha de Alta</th>
              <th className="inquilino-lista-acciones">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {inquilinos.map(i => (
              <tr key={i.id}>
                <td>{i.id}</td>
                <td>{getInquilinoLabel(i)}</td>
                <td>{formatDate(i.alta)}</td> {/* 👈 usamos formatDate */}
                <td className="inquilino-lista-acciones">
                  <div className="inquilino-lista-acciones-buttons">
                    {usuario?.permisos?.includes("inquilino:ver") && (
                      <button
                        className="inquilino-lista-btn-ver"
                        onClick={async () => {
                          try {
                            await registrarMovimiento({
                              usuario: usuario.id,
                              accion: "consulta",
                              entidad: "inquilino",
                              campo: "Todos",
                              previo: null,
                              nuevo: null,
                              detalle: `consultó los datos del inquilino ${getInquilinoLabel(i)} con id ${i.id}`
                            });
                          } catch (err) {
                            console.error("❌ Error registrando log de ver inquilino:", err.message);
                          }
                          setShowVer(i.id);
                        }}
                        title="Ver"
                      >
                        👁️
                      </button>
                    )}

                    {usuario?.permisos?.includes("inquilino:editar") && (
                      <button
                        className="inquilino-lista-btn-editar"
                        onClick={() => setShowEditar(i.id)}
                        title="Editar"
                      >
                        ✏️
                      </button>
                    )}

                    {usuario?.permisos?.includes("inquilino:eliminar") && (
                      <button
                        className="inquilino-lista-btn-eliminar"
                        onClick={() => setShowEliminar(i.id)}
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
        <AgregarInquilino
          onClose={() => {
            setShowAgregar(false);
            cargar();
          }}
        />
      )}

      {showVer && (
        <Ver
          inquilino={inquilinos.find(i => i.id === showVer)}
          onClose={() => setShowVer(null)}
        />
      )}

      {showEditar && (
        <Editar
          inquilinoInicial={inquilinos.find(i => i.id === showEditar)}
          onClose={() => {
            setShowEditar(null);
            cargar();
          }}
        />
      )}

      {showEliminar && (
        <Eliminar
          inquilino={inquilinos.find(i => i.id === showEliminar)}
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