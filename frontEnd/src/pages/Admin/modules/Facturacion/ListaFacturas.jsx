import { useEffect, useState } from 'react';
import { api } from '../../../../endpoints/endpoints';
import EditarFactura from './EditarFactura';
import VerFactura from './VerFactura';

function ListaFacturas() {
  const [facturas, setFacturas] = useState([]);
  const [facturaEditando, setFacturaEditando] = useState(null);
  const [facturaViendo, setFacturaViendo] = useState(null);

  const cargarFacturas = async () => {
    try {
      const res = await api.get('/factura');
      console.log('Facturas recibidas:', res.data);
      const data = Array.isArray(res.data) ? res.data : [];
      setFacturas(data);
    } catch (err) {
      console.error('❌ Error al obtener facturas:', err);
    }
  };

  useEffect(() => {
    cargarFacturas();
    const handler = () => cargarFacturas();
    window.addEventListener('facturas:refresh', handler);
    return () => window.removeEventListener('facturas:refresh', handler);
  }, []);

  const handleEliminar = async (id) => {
    if (!window.confirm('¿Eliminar esta factura?')) return;
    try {
      await api.delete(`/factura/${id}`);
      setFacturas((prev) => prev.filter((f) => f.id !== id));
    } catch (err) {
      console.error('❌ Error al eliminar factura:', err);
    }
  };

  const handleEditar = (factura) => {
    setFacturaEditando(factura);
  };

  const handleCerrarEdicion = () => {
    setFacturaEditando(null);
    window.dispatchEvent(new CustomEvent('facturas:refresh'));
  };

  const handleVer = (factura) => {
    setFacturaViendo(factura);
  };

  const handleCerrarVer = () => {
    setFacturaViendo(null);
  };

  const formatoFechaHora = (iso) => {
    if (!iso || isNaN(Date.parse(iso))) return '';
    const f = new Date(iso);
    return f.toLocaleString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="container-fluid px-3">
      <h2 className="mb-3">Facturas registradas</h2>

      <div className="table-responsive">
        <table className="table table-sm table-bordered align-middle">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Número</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Inquilino</th>
              <th>Nota</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {facturas.map((f) => (
              <tr key={f.id}>
                <td>{f.id}</td>
                <td>#{f.numero}</td>
                <td>{formatoFechaHora(f.fecha)}</td>
                <td>{f.estado}</td>
                <td>{f.inquilinoNombre ?? f.inquilino}</td>
                <td>{f.nota || '—'}</td>
                <td>
                  <div className="d-flex flex-column gap-2">
                    <button
                      className="btn btn-outline-info btn-sm"
                      onClick={() => handleVer(f)}
                    >
                      👁️ Ver
                    </button>
                    <button
                      className="btn btn-outline-warning btn-sm"
                      onClick={() => handleEditar(f)}
                    >
                      ✏️ Editar
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleEliminar(f.id)}
                    >
                      🗑️ Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {facturas.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center text-muted">
                  No hay facturas registradas
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {facturaEditando && (
        <EditarFactura factura={facturaEditando} onClose={handleCerrarEdicion} />
      )}

      {facturaViendo && (
        <VerFactura factura={facturaViendo} onClose={handleCerrarVer} />
      )}
    </div>
  );
}

export default ListaFacturas;