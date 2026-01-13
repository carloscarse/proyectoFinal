import React, { useEffect, useState } from 'react';
import {
  getAllPersonas,
  deletePersona,
  createPersona,
  updatePersona
} from '../../../../api/persona';
import {
  getDireccionesByPersona
} from '../../../../api/direccion';
import { useUserStore } from '../../../../Store/userStore';
import './ListaPersona.css';

import EliminarPersona from './EliminarPersona';
import VerPersona from './VerPersona';
import AgregarPersona from './AgregarPersona';
import EditarPersona from './EditarPersona';
import { formatDate } from '../../../../utils/dateFormat';

const ListaPersona = () => {
  const [personas, setPersonas] = useState([]);
  const [selectedPersona, setSelectedPersona] = useState(null);
  const [personaVer, setPersonaVer] = useState(null);
  const [direccionesPersona, setDireccionesPersona] = useState([]);
  const [personaEditar, setPersonaEditar] = useState(null);
  const [showAgregar, setShowAgregar] = useState(false);

  const token = useUserStore((state) => state.user?.token);

  const cargarPersonas = async () => {
    try {
      const data = await getAllPersonas();
      setPersonas(data);
    } catch (error) {
      console.error('❌ Error al cargar personas:', error);
    }
  };

  useEffect(() => {
    cargarPersonas();
  }, []);

  const handleEliminar = async (id) => {
    try {
      await deletePersona(id);
      setPersonas(personas.filter((p) => p.id !== id));
      setSelectedPersona(null);
    } catch (error) {
      console.error('❌ Error al eliminar persona:', error);
    }
  };

  const handleAgregar = async (nuevaPersona) => {
    try {
      await createPersona(nuevaPersona);
      await cargarPersonas();
      setShowAgregar(false);
    } catch (error) {
      console.error('❌ Error al crear persona:', error);
    }
  };

  const handleEditar = async (id, datosActualizados) => {
    try {
      await updatePersona(id, datosActualizados);
      await cargarPersonas();
      setPersonaEditar(null);
    } catch (error) {
      console.error('❌ Error al editar persona:', error);
    }
  };

  const handleVer = async (persona) => {
    try {
      setPersonaVer(persona);
      const dirs = await getDireccionesByPersona(persona.id);
      setDireccionesPersona(dirs || []);
    } catch (error) {
      console.error('❌ Error al cargar direcciones:', error);
      setDireccionesPersona([]);
    }
  };

  return (
    <div className="lista-persona-container">
      <div className="lista-persona-header">
        <h2>Personas</h2>
        <button className="btn-nueva-persona" onClick={() => setShowAgregar(true)}>
          Nueva Persona
        </button>
      </div>

      <h3 className="lista-persona-title">Lista de Personas</h3>

      <table className="tabla-personas">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Segundo Nombre</th>
            <th>Apellido</th>
            <th>Segundo Apellido</th>
            <th>Documento</th>
            <th>Nacimiento</th>
            <th>Sexo</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {personas.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.nombre}</td>
              <td>{p.segundoNombre}</td>
              <td>{p.apellido}</td>
              <td>{p.segundoApellido}</td>
              <td>{p.documento}</td>
              <td>{formatDate(p.nacimiento)}</td>
              <td>{p.sexo}</td>
              <td>{p.email}</td>
              <td>
                <div className="acciones">
                  <button onClick={() => handleVer(p)}>Ver</button>
                  <button onClick={() => setPersonaEditar(p)}>Editar</button>
                  <button onClick={() => setSelectedPersona(p)}>Eliminar</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedPersona && (
        <EliminarPersona
          persona={selectedPersona}
          onCancel={() => setSelectedPersona(null)}
          onConfirm={() => handleEliminar(selectedPersona.id)}
        />
      )}

      {personaVer && (
        <VerPersona
          persona={personaVer}
          direcciones={direccionesPersona}
          onClose={() => setPersonaVer(null)}
        />
      )}

      {showAgregar && (
        <AgregarPersona
          onClose={() => setShowAgregar(false)}
          onSave={handleAgregar}
        />
      )}

      {personaEditar && (
        <EditarPersona
          persona={personaEditar}
          onClose={() => setPersonaEditar(null)}
          onSave={handleEditar}
        />
      )}
    </div>
  );
};

export default ListaPersona;