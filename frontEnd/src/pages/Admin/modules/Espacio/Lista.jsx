// proyecto/frontEnd/src/pages/Admin/modules/Espacio/Lista.jsx

import React, { useState, useEffect } from 'react';
import './Lista.css';
import { obtenerEspacios } from '../../../../api/espacio.js';
import Ver from './Ver';
import Editar from './Editar';
import Eliminar from './Eliminar';
import AgregarEspacio from './Agregar';
import { useUserStore } from '../../../../stores/userStore.js';
import { registrarMovimiento } from '../../../../api/logMovimiento.js';
import { getEspacioLabel } from "../../../../utils/labels/espacio";

function Lista() {
  const [espacios, setEspacios] = useState([]);

  // estados separados para cada modal
  const [showAgregar, setShowAgregar] = useState(false);
  const [showVer, setShowVer] = useState(null);
  const [showEditar, setShowEditar] = useState(null);
  const [showEliminar, setShowEliminar] = useState(null);

  const usuario = useUserStore((state) => state.user);

  const cargar = async () => {
    const data = await obtenerEspacios();
    setEspacios(data || []);
  };

  useEffect(() => {
    cargar();
  }, []);

  return (
    <div className="espacio-lista-container">
      <div className="espacio-lista-header">
        <h2 className="espacio-lista-title">Espacios</h2>

        {usuario?.permisos?.includes("espacio:agregar") && (
          <button
            className="espacio-lista-btn-agregar"
            onClick={() => setShowAgregar(true)}
          >
            ➕ Nuevo Espacio
          </button>
        )}
      </div>

      <div className="espacio-lista-tabla-wrapper">
        <table className="espacio-lista-tabla">
          <thead>
            <tr>
              <th>ID</th>
              <th>Espacio</th>
              <th>Estado</th>
              <th>Precio</th>
              <th className="espacio-lista-acciones">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {espacios.map(e => (
              <tr key={e.id}>
                <td>{e.id}</td>
                <td>{getEspacioLabel(e)}</td>
                <td>{e.estado}</td>
                <td>{e.precio}</td>
                <td className="espacio-lista-acciones">
                  <div className="espacio-lista-acciones-buttons">
                    {usuario?.permisos?.includes("espacio:ver") && (
                      <button
                        className="espacio-lista-btn-ver"
                        onClick={async () => {
                          try {
                            await registrarMovimiento({
                              usuario: usuario.id,
                              accion: "consulta",
                              entidad: "espacio",
                              campo: "Todos",
                              previo: null,
                              nuevo: null,
                              detalle: `consultó los datos del espacio ${getEspacioLabel(e)} con id ${e.id}`
                            });
                          } catch (err) {
                            console.error("❌ Error registrando log de ver espacio:", err.message);
                          }
                          setShowVer(e.id);
                        }}
                        title="Ver"
                      >
                        👁️
                      </button>
                    )}

                    {usuario?.permisos?.includes("espacio:editar") && (
                      <button
                        className="espacio-lista-btn-editar"
                        onClick={() => setShowEditar(e.id)}
                        title="Editar"
                      >
                        ✏️
                      </button>
                    )}

                    {usuario?.permisos?.includes("espacio:eliminar") && (
                      <button
                        className="espacio-lista-btn-eliminar"
                        onClick={() => setShowEliminar(e.id)}
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
        <AgregarEspacio
          onClose={() => {
            setShowAgregar(false);
            cargar();
          }}
        />
      )}

      {showVer && (
        <Ver
          espacio={espacios.find(e => e.id === showVer)}
          onClose={() => setShowVer(null)}
        />
      )}

      {showEditar && (
        <Editar
          espacioInicial={espacios.find(e => e.id === showEditar)}
          onClose={() => {
            setShowEditar(null);
            cargar();
          }}
        />
      )}

      {showEliminar && (
        <Eliminar
          espacio={espacios.find(e => e.id === showEliminar)}
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