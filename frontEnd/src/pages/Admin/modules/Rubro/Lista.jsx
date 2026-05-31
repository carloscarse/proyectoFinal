// proyecto/frontEnd/src/pages/Admin/modules/Rubro/Lista.jsx

import React, { useState, useEffect } from 'react';
import './Lista.css';
import { obtenerRubros } from '../../../../api/rubro.js';
import Ver from './Ver';
import Editar from './Editar';
import Eliminar from './Eliminar';
import AgregarRubro from './Agregar';
import { useUserStore } from '../../../../stores/userStore.js';
import { registrarMovimiento } from '../../../../api/logMovimiento.js';

function Lista() {
  const [rubros, setRubros] = useState([]);

  // estados separados para cada modal
  const [showAgregar, setShowAgregar] = useState(false);
  const [showVer, setShowVer] = useState(null);
  const [showEditar, setShowEditar] = useState(null);
  const [showEliminar, setShowEliminar] = useState(null);

  const usuario = useUserStore((state) => state.user);

  const cargar = async () => {
    const data = await obtenerRubros();
    setRubros(data || []);
  };

  useEffect(() => {
    cargar();
  }, []);

  return (
    <div className="rubro-lista-container">
      <div className="rubro-lista-header">
        <h2 className="rubro-lista-title">Rubros</h2>

        {usuario?.permisos?.includes("rubro:agregar") && (
          <button
            className="rubro-lista-btn-agregar"
            onClick={() => setShowAgregar(true)}
          >
            ➕ Nuevo Rubro
          </button>
        )}
      </div>

      <div className="rubro-lista-tabla-wrapper">
        <table className="rubro-lista-tabla">
          <thead>
            <tr>
              <th>ID</th>
              <th>Rubro</th>
              <th>Descripción</th>
              <th className="rubro-lista-acciones">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {rubros.map(r => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.rubro}</td>
                <td>{r.descripcion}</td>
                <td className="rubro-lista-acciones">
                  <div className="rubro-lista-acciones-buttons">
                    {usuario?.permisos?.includes("rubro:ver") && (
                      <button
                        className="rubro-lista-btn-ver"
                        onClick={async () => {
                          try {
                            await registrarMovimiento({
                              accion: "consulta",
                              entidad: "rubro",
                              campo: "Todos",
                              previo: null,
                              nuevo: null,
                              detalle: `consultó los datos del rubro ${r.rubro} con id ${r.id}`
                            });
                          } catch (err) {
                            console.error("❌ Error registrando log de ver rubro:", err.message);
                          }
                          setShowVer(r.id);
                        }}
                        title="Ver"
                      >
                        👁️
                      </button>
                    )}

                    {usuario?.permisos?.includes("rubro:editar") && (
                      <button
                        className="rubro-lista-btn-editar"
                        onClick={() => setShowEditar(r.id)}
                        title="Editar"
                      >
                        ✏️
                      </button>
                    )}

                    {usuario?.permisos?.includes("rubro:eliminar") && (
                      <button
                        className="rubro-lista-btn-eliminar"
                        onClick={() => setShowEliminar(r.id)}
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
        <AgregarRubro
          onClose={() => {
            setShowAgregar(false);
            cargar();
          }}
        />
      )}

      {showVer && (
        <Ver
          rubro={rubros.find(r => r.id === showVer)}
          onClose={() => setShowVer(null)}
        />
      )}

      {showEditar && (
        <Editar
          rubroInicial={rubros.find(r => r.id === showEditar)}
          onClose={() => {
            setShowEditar(null);
            cargar();
          }}
        />
      )}

      {showEliminar && (
        <Eliminar
          rubro={rubros.find(r => r.id === showEliminar)}
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