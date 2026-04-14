// proyecto/frontEnd/src/pages/Admin/modules/Persona/Lista.jsx

import React, { useState, useEffect } from 'react';
import './Lista.css';
import { obtenerPersonas } from '../../../../api/persona';
import Ver from './Ver';
import Editar from './Editar';
import Eliminar from './Eliminar';
import AgregarPersona from './Agregar.jsx';
import { useUserStore } from '../../../../stores/userStore';
import { getPersonaLabel } from "../../../../utils/labels/persona";
import { registrarMovimiento } from '../../../../api/logMovimiento';

function Lista() {
  const [personas, setPersonas] = useState([]);

  // estados separados para cada modal
  const [showAgregar, setShowAgregar] = useState(false);
  const [showVer, setShowVer] = useState(null);
  const [showEditar, setShowEditar] = useState(null);
  const [showEliminar, setShowEliminar] = useState(null);

  const usuario = useUserStore((state) => state.user);

  const cargar = async () => {
    const data = await obtenerPersonas();
    setPersonas(data || []);
  };

  useEffect(() => {
    cargar();
  }, []);

  return (
    <div className="persona-lista-container">
      <div className="persona-lista-header">
        <h2 className="persona-lista-title">Personas</h2>

        {usuario?.permisos?.includes("persona:agregar") && (
          <button
            className="persona-lista-btn-agregar"
            onClick={() => setShowAgregar(true)}
          >
            ➕ Nueva Persona
          </button>
        )}
      </div>

      <div className="persona-lista-tabla-wrapper">
        <table className="persona-lista-tabla">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Segundo Nombre</th>
              <th>Apellido</th>
              <th>Segundo Apellido</th>
              <th>Documento</th>
              <th>Email</th>
              <th className="persona-lista-acciones">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {personas.map(p => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.nombre}</td>
                <td>{p.segundoNombre}</td>
                <td>{p.apellido}</td>
                <td>{p.segundoApellido}</td>
                <td>{p.documento}</td>
                <td>{p.email}</td>
                <td className="persona-lista-acciones">
                  <div className="persona-lista-acciones-buttons">
                    {usuario?.permisos?.includes("persona:ver") && (
                      <button
                        className="persona-lista-btn-ver"
                        onClick={async () => {
                          try {
                            await registrarMovimiento({
                              usuario: usuario.id,
                              accion: "consulta",
                              entidad: "persona",
                              campo: "Todos",
                              previo: null,
                              nuevo: null,
                              detalle: `consultó los datos de la persona ${getPersonaLabel(p)} con id ${p.id}`
                            });
                          } catch (err) {
                            console.error("❌ Error registrando log de ver persona:", err.message);
                          }
                          setShowVer(p.id);
                        }}
                        title="Ver"
                      >
                        👁️
                      </button>
                    )}

                    {usuario?.permisos?.includes("persona:editar") && (
                      <button
                        className="persona-lista-btn-editar"
                        onClick={async () => {
                          try {
                            await registrarMovimiento({
                              usuario: usuario.id,
                              accion: "inicio-edicion",
                              entidad: "persona",
                              campo: "Todos",
                              previo: null,
                              nuevo: null,
                              detalle: `inició el proceso de edición de la persona ${getPersonaLabel(p)} con id ${p.id}`
                            });
                          } catch (err) {
                            console.error("❌ Error registrando inicio de edición:", err.message);
                          }
                          setShowEditar(p.id);
                        }}
                        title="Editar"
                      >
                        ✏️
                      </button>
                    )}

                    {usuario?.permisos?.includes("persona:eliminar") && (
                      <button
                        className="persona-lista-btn-eliminar"
                        onClick={async () => {
                          try {
                            await registrarMovimiento({
                              usuario: usuario.id,
                              accion: "inicio-eliminacion",
                              entidad: "persona",
                              campo: "Todos",
                              previo: null,
                              nuevo: null,
                              detalle: `inició el proceso de eliminación de la persona ${getPersonaLabel(p)} con id ${p.id}`
                            });
                          } catch (err) {
                            console.error("❌ Error registrando inicio de eliminación:", err.message);
                          }
                          setShowEliminar(p.id);
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
        <AgregarPersona
          onClose={() => {
            setShowAgregar(false);
            cargar();
          }}
        />
      )}

      {showVer && (
        <Ver
          persona={personas.find(p => p.id === showVer)}
          onClose={() => setShowVer(null)}
        />
      )}

      {showEditar && (
        <Editar
          personaInicial={personas.find(p => p.id === showEditar)}
          onClose={() => {
            setShowEditar(null);
            cargar();
          }}
        />
      )}

      {showEliminar && (
        <Eliminar
          persona={personas.find(p => p.id === showEliminar)}
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