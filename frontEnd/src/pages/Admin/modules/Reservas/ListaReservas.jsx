import { useEffect, useState } from 'react';
import { api } from '../../../../endpoints/endpoints';
import EditarReserva from './EditarReserva';
import VerReserva from './VerReserva';
import './ListaReserva.css';

function ListaReservas() {
  const [reservas, setReservas] = useState([]);
  const [reservaEditando, setReservaEditando] = useState(null);
  const [reservaViendo, setReservaViendo] = useState(null);

  const formatoFechaHora = (iso) => {
    if (!iso || isNaN(Date.parse(iso))) return '';
    const f = new Date(iso);
    const dd = String(f.getDate()).padStart(2, '0');
    const mm = String(f.getMonth() + 1).padStart(2, '0');
    const yyyy = f.getFullYear();
    const hh = String(f.getHours()).padStart(2, '0');
    const min = String(f.getMinutes()).padStart(2, '0');
    const ss = String(f.getSeconds()).padStart(2, '0');
    return `${dd}/${mm}/${yyyy} ${hh}:${min}:${ss}`;
  };

  const cargarReservas = async () => {
    try {
      const res = await api.get('/reserva');
      const data = Array.isArray(res.data) ? res.data : [];
      setReservas(data);
    } catch (err) {
      console.error('❌ Error al obtener reservas:', err);
    }
  };

  useEffect(() => {
    cargarReservas();

    // Escuchar evento de refresco
    const handler = () => cargarReservas();
    window.addEventListener('reservas:refresh', handler);

    return () => {
      window.removeEventListener('reservas:refresh', handler);
    };
  }, []);

  const handleEliminar = async (id) => {
    if (!window.confirm('¿Eliminar esta reserva?')) return;
    try {
      await api.delete(`/reserva/${id}`);
      setReservas((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      console.error('❌ Error al eliminar reserva:', err);
    }
  };

  const handleEditar = (reserva) => {
    setReservaEditando(reserva);
  };

  const handleCerrarEdicion = () => {
    setReservaEditando(null);
    cargarReservas();
  };

  const handleVer = (reserva) => {
    setReservaViendo(reserva);
  };

  const handleCerrarVer = () => {
    setReservaViendo(null);
  };

  return (
    <div className="reservas-lista">
      <h2 className="text-center mb-3">Gestión de Reservas</h2>

      <table className="tabla-reservas">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Espacio</th>
            <th>Inquilino</th>
            <th>Tipo</th>
            <th>Actividad</th>
            <th>Inicio</th>
            <th>Fin</th>
            <th>Adelanto</th>
            <th>Estado</th>
            <th>Nota</th>
            <th className="col-acciones">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {reservas.map((r) => (
            <tr key={r.id}>
              <td>{formatoFechaHora(r.fecha)}</td>
              <td>{r.espacio}</td>
              <td>{r.inquilino}</td>
              <td>{r.tipo}</td>
              <td>{r.actividad}</td>
              <td>{formatoFechaHora(r.diaInicio)}</td>
              <td>{formatoFechaHora(r.diaFin)}</td>
              <td>${r.adelanto}</td>
              <td>{r.estado}</td>
              <td>{r.nota}</td>
              <td>
                <button
                  className="btn btn-outline-primary btn-sm me-2"
                  onClick={() => handleVer(r)}
                >
                  👁 Ver
                </button>
                <button
                  className="btn btn-outline-warning btn-sm me-2"
                  onClick={() => handleEditar(r)}
                >
                  ✏️ Editar
                </button>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => handleEliminar(r.id)}
                >
                  🗑️ Eliminar
                </button>
              </td>
            </tr>
          ))}
          {reservas.length === 0 && (
            <tr>
              <td colSpan={11} className="text-center text-muted">
                No hay reservas registradas
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {reservaEditando && (
        <EditarReserva reserva={reservaEditando} onClose={handleCerrarEdicion} />
      )}

      {reservaViendo && (
        <VerReserva
          reserva={reservaViendo}
          onClose={handleCerrarVer}
          formatoFechaHora={formatoFechaHora}
        />
      )}
    </div>
  );
}

export default ListaReservas;