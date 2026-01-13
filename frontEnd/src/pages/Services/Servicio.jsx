import { useEffect, useState } from 'react';
import {
  getServicios,
  deleteServicio
} from '../../api/servicio'; // funciones de la API

function Servicio() {
  const [servicios, setServicios] = useState([]);
  const [selectedServicio, setSelectedServicio] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Cargar lista de servicios al montar
  useEffect(() => {
    cargarServicios();
  }, []);

  const cargarServicios = () => {
    getServicios()
      .then(res => setServicios(res.data))
      .catch(err => console.error(err));
  };

  // Abrir modal de "Ver"
  const handleView = (servicio) => {
    setSelectedServicio(servicio);
    setShowViewModal(true);
  };

  // Abrir modal de "Eliminar"
  const handleDeleteConfirm = (servicio) => {
    setSelectedServicio(servicio);
    setShowDeleteModal(true);
  };

  // Ejecutar eliminación
  const handleDelete = () => {
    if (!selectedServicio) return;
    deleteServicio(selectedServicio.id)
      .then(() => {
        setShowDeleteModal(false);
        setSelectedServicio(null);
        cargarServicios(); // refrescar lista
      })
      .catch(err => console.error(err));
  };

  return (
    <div style={{ padding: '20px' }}>
      {/* Botón Nuevo Servicio */}
      <div style={{ textAlign: 'right', marginBottom: '10px' }}>
        <button style={{ padding: '8px 12px', backgroundColor: '#4CAF50', color: 'white' }}>
          Nuevo Servicio
        </button>
      </div>

      {/* Título */}
      <h2>Lista de Servicios</h2>

      {/* Tabla de servicios */}
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
                {/* Tabla interna 3x1 para acciones */}
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <button onClick={() => handleView(s)}>Ver</button>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <button>Editar</button>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <button
                          style={{ backgroundColor: 'red', color: 'white' }}
                          onClick={() => handleDeleteConfirm(s)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal Ver */}
      {showViewModal && selectedServicio && (
        <div style={modalStyle}>
          <div style={modalContentStyle}>
            <h3>Detalle del Servicio</h3>
            <p><b>ID:</b> {selectedServicio.id}</p>
            <p><b>Servicio:</b> {selectedServicio.servicio}</p>
            <p><b>Cantidad:</b> {selectedServicio.cantidad}</p>
            <p><b>Precio:</b> {selectedServicio.precio}</p>
            <p><b>Factura:</b> {selectedServicio.factura}</p>
            <p><b>Nota:</b> {selectedServicio.nota}</p>
            <button onClick={() => setShowViewModal(false)}>Aceptar</button>
          </div>
        </div>
      )}

      {/* Modal Eliminar */}
      {showDeleteModal && selectedServicio && (
        <div style={modalStyle}>
          <div style={modalContentStyle}>
            <h3>¿Realmente desea eliminar este registro?</h3>
            <p><b>ID:</b> {selectedServicio.id}</p>
            <p><b>Servicio:</b> {selectedServicio.servicio}</p>
            <p><b>Cantidad:</b> {selectedServicio.cantidad}</p>
            <p><b>Precio:</b> {selectedServicio.precio}</p>
            <p><b>Factura:</b> {selectedServicio.factura}</p>
            <p><b>Nota:</b> {selectedServicio.nota}</p>
            <div style={{ marginTop: '10px' }}>
              <button onClick={() => setShowDeleteModal(false)}>Cancelar</button>
              <button
                style={{ backgroundColor: 'red', color: 'white', marginLeft: '10px' }}
                onClick={handleDelete}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Estilos simples para modales
const modalStyle = {
  position: 'fixed',
  top: 0, left: 0,
  width: '100%', height: '100%',
  backgroundColor: 'rgba(0,0,0,0.5)',
  display: 'flex', justifyContent: 'center', alignItems: 'center'
};

const modalContentStyle = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '8px',
  minWidth: '300px'
};

export default Servicio;