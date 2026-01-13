import { useEffect, useState } from 'react';
import { api } from '../../../../endpoints/endpoints';
import './ListaFactura.css';

function ListaFactura() {
  const [facturas, setFacturas] = useState([]);

  const formatoFechaHora = (iso) => {
    if (!iso || isNaN(Date.parse(iso))) return '';
    const f = new Date(iso);
    const dd = String(f.getDate()).padStart(2, '0');
    const mm = String(f.getMonth() + 1).padStart(2, '0');
    const yyyy = f.getFullYear();
    const hh = String(f.getHours()).padStart(2, '0');
    const min = String(f.getMinutes()).padStart(2, '0');
    return `${dd}/${mm}/${yyyy} ${hh}:${min}`;
  };

  const fetchFacturas = async () => {
    try {
      const res = await api.get(`/factura/facturas?ts=${Date.now()}`);
      setFacturas(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error('❌ Error al obtener facturas:', err);
      setFacturas([]);
    }
  };

  useEffect(() => {
    fetchFacturas();
  }, []);

  const handleEliminar = async (id) => {
    if (!window.confirm('¿Eliminar esta factura?')) return;
    try {
      await api.delete(`/factura/${id}`);
      setFacturas((prev) => prev.filter((f) => f.id !== id));
    } catch (err) {
      console.error('❌ Error al eliminar factura:', err);
      alert('Error al eliminar la factura');
    }
  };

  return (
    <div className="facturas-lista">
      <h3 className="text-center mb-3">Gestión de Facturas</h3>

      <table className="tabla-facturas">
        <thead>
          <tr>
            <th>Número</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Pago</th>
            <th>Nota</th>
            <th className="col-acciones">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {facturas.map((f) => (
            <tr key={f.id}>
              <td>#{f.numero}</td>
              <td>{formatoFechaHora(f.fecha)}</td>
              <td>{f.estado}</td>
              <td>
                {f.pago?.id
                  ? `Pago #${f.pago.id} (${formatoFechaHora(f.pago.fecha)})`
                  : '—'}
              </td>
              <td>{f.nota || '—'}</td>
              <td>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => handleEliminar(f.id)}
                >
                  🗑 Eliminar
                </button>
              </td>
            </tr>
          ))}
          {facturas.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center text-muted">
                No hay facturas registradas
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ListaFactura;