import { useEffect, useState } from 'react';
import { getServicios, deleteServicio } from '../../../../api/servicio';
import FormularioServicio from './FormularioServicio';

function ListaServicios() {
  const [servicios, setServicios] = useState([]);
  const [selectedServicio, setSelectedServicio] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Nuevo: estados para formulario
  const [showFormModal, setShowFormModal] = useState(false);
  const [editingServicio, setEditingServicio] = useState(null);

  useEffect(() => {
    cargarServicios();
  }, []);

  const cargarServicios = () => {
    getServicios()
      .then(res => setServicios(res.data))
      .catch(err => console.error(err));
  };

  return (
    <div style={{ padding: '20px' }}>
      {/* Botón Nuevo Servicio */}
      <div style={{ textAlign: 'right', marginBottom: '10px' }}>
        <button
          style={{ padding: '8px 12px', backgroundColor: '#4CAF50', color: 'white' }}
          onClick={() => {
            setEditingServicio(null);   // modo nuevo
            setShowFormModal(true);     // abrir modal
          }}
        >
          Nuevo Servicio
        </button>
      </div>

      <h2>Lista de Servicios</h2>

      <table border="1" cellPadding="8" cellSpacing="0" width="100%">
        <thead>
          <tr>
            <th>ID</th>
            <th>Servicio</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Factura</th>
            <th>Nota</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {servicios.map(s => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.servicio}</td>
              <td>{s.cantidad}</td>
              <td>{s.precio}</td>
              <td>{s.factura}</td>
              <td>{s.nota}</td>
              <td>
                <table>
                  <tbody>
                    <tr>
                      <td><button onClick={() => setShowViewModal(true)}>Ver</button></td>
                    </tr>
                    <tr>
                      <td>
                        <button
                          onClick={() => {
                            setEditingServicio(s);   // modo edición
                            setShowFormModal(true);  // abrir modal
                          }}
                        >
                          Editar
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td><button style={{ backgroundColor: 'red', color: 'white' }} onClick={() => setShowDeleteModal(true)}>Eliminar</button></td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Formulario modal */}
      <FormularioServicio
        show={showFormModal}
        onClose={() => setShowFormModal(false)}
        servicio={editingServicio}
        onSaved={cargarServicios}
      />
    </div>
  );
}

export default ListaServicios;