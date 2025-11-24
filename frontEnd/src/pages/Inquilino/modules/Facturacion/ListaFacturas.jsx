import { useEffect, useState } from 'react';
import { api } from '../../../../endpoints/endpoints';
import EditarFactura from './EditarFactura';

function ListaFacturas() {
  const [facturas, setFacturas] = useState([]);
  const [facturaEditando, setFacturaEditando] = useState(null);

  useEffect(() => {
    const cargarFacturas = async () => {
      try {
        const res = await api.get('/facturas');
        const data = Array.isArray(res.data) ? res.data : [];
        setFacturas(data);
      } catch (err) {
        console.error('Error al obtener facturas:', err);
      }
    };
    cargarFacturas();
  }, []);

  const handleEliminar = async (id) => {
    if (!window.confirm('¿Eliminar esta factura?')) return;
    try {
      await api.delete(`/factura/${id}`);
      setFacturas(facturas.filter((f) => f.id !== id));
    } catch (err) {
      console.error('Error al eliminar factura:', err);
    }
  };

  const handleEditar = (factura) => {
    setFacturaEditando(factura);
  };

  const handleCerrarEdicion = () => {
    setFacturaEditando(null);
  };

  return (
    <div>
      <h2>Facturas registradas</h2>
      <ul>
        {facturas.map((f) => (
          <li key={f.id}>
            #{f.numero} - Inquilino: {f.inquilino} - {f.fecha} ({f.estado})
            <button onClick={() => handleEditar(f)}>✏️</button>
            <button onClick={() => handleEliminar(f.id)}>🗑️</button>
          </li>
        ))}
      </ul>
      {facturaEditando && (
        <EditarFactura factura={facturaEditando} onClose={handleCerrarEdicion} />
      )}
    </div>
  );
}

export default ListaFacturas;