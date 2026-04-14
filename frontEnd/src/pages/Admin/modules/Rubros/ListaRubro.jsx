// frontEnd/src/pages/Admin/modules/Rubros/ListaRubro.jsx
import React, { useEffect, useState } from 'react';
import {
  getAllRubros,
  deleteRubro,
  createRubro,
  updateRubro
} from '../../../../api/rubro';
import { useUserStore } from '../../../../Store/userStore';
import './Rubro.css';

import EliminarRubro from './EliminarRubro';
import VerRubro from './VerRubro';
import AgregarRubro from './AgregarRubro';
import EditarRubro from './EditarRubro';

const ListaRubro = () => {
  const [rubros, setRubros] = useState([]);
  const [selectedRubro, setSelectedRubro] = useState(null);
  const [rubroVer, setRubroVer] = useState(null);
  const [rubroEditar, setRubroEditar] = useState(null);
  const [showAgregar, setShowAgregar] = useState(false);

  const token = useUserStore((state) => state.user?.token);

  const cargarRubros = async () => {
    try {
      const data = await getAllRubros();
      setRubros(data);
    } catch (error) {
      console.error('❌ Error al cargar rubros:', error);
    }
  };

  useEffect(() => {
    cargarRubros();
  }, []);

  const handleEliminar = async (id) => {
    try {
      await deleteRubro(id);
      setRubros(rubros.filter((r) => r.id !== id));
      setSelectedRubro(null);
    } catch (error) {
      console.error('❌ Error al eliminar rubro:', error);
    }
  };

  const handleAgregar = async (nuevoRubro) => {
    try {
      await createRubro(nuevoRubro);
      await cargarRubros();
      setShowAgregar(false);
    } catch (error) {
      console.error('❌ Error al crear rubro:', error);
    }
  };

  const handleEditar = async (id, datosActualizados) => {
    try {
      await updateRubro(id, datosActualizados);
      await cargarRubros();
      setRubroEditar(null);
    } catch (error) {
      console.error('❌ Error al editar rubro:', error);
    }
  };

  const handleVer = (rubro) => {
    setRubroVer(rubro);
  };

  return (
    <div className="lista-rubro-container">
      <div className="lista-rubro-header">
        <h2>Rubros</h2>
        <button className="btn-nuevo-rubro" onClick={() => setShowAgregar(true)}>
          Nuevo Rubro
        </button>
      </div>

      <h3 className="lista-rubro-title">Lista de Rubros</h3>

      <table className="tabla-rubros">
        <thead>
          <tr>
            <th>ID</th>
            <th>Rubro</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {rubros.map((r) => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.rubro}</td>
              <td>{r.descripcion}</td>
              <td>
                <div className="acciones">
                  <button onClick={() => handleVer(r)}>Ver</button>
                  <button onClick={() => setRubroEditar(r)}>Editar</button>
                  <button onClick={() => setSelectedRubro(r)}>Eliminar</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedRubro && (
        <EliminarRubro
          rubro={selectedRubro}
          onCancel={() => setSelectedRubro(null)}
          onConfirm={() => handleEliminar(selectedRubro.id)}
        />
      )}

      {rubroVer && (
        <VerRubro
          rubro={rubroVer}
          onClose={() => setRubroVer(null)}
        />
      )}

      {showAgregar && (
        <AgregarRubro
          onClose={() => setShowAgregar(false)}
          onSave={handleAgregar}
        />
      )}

      {rubroEditar && (
        <EditarRubro
          rubro={rubroEditar}
          onClose={() => setRubroEditar(null)}
          onSave={handleEditar}
        />
      )}
    </div>
  );
};

export default ListaRubro;