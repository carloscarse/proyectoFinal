import { useEffect, useState } from 'react';
import { api } from '../../../../endpoints/endpoints';
import EditarReserva from './EditarReserva';

function ListaReservas() {
  const [reservas, setReservas] = useState([]);
  const [reservaEditando, setReservaEditando] = useState(null);

  useEffect(() => {
    const cargarReservas = async () => {
      try {
        const res = await api.get('/reservas');
        const data = Array.isArray(res.data) ? res.data : [];
        setReservas(data);
      } catch (err) {
        console.error('Error al obtener reservas:', err);
      }
    };
    cargarReservas();
  }, []);

  const handleEliminar = async (id) => {
    if (!window.confirm('¿Eliminar esta reserva?')) return;
    try {
      await api.delete(`/reserva/${id}`);
      setReservas(reservas.filter((r) => r.id !== id));
    } catch (err) {
      console.error('Error al eliminar reserva:', err);
    }
  };

  const handleEditar = (reserva) => {
    setReservaEditando(reserva);
  };

  const handleCerrarEdicion = () => {
    setReservaEditando(null);
  };

  return (
    <div>
      <h2>Reservas registradas</h2>
      <ul>
        {reservas.map((r) => (
          <li key={r.id}>
            Espacio: {r.espacio} - Inquilino: {r.inquilino} - {r.diaInicio} → {r.diaFin} ({r.estado})
            <button onClick={() => handleEditar(r)}>✏️</button>
            <button onClick={() => handleEliminar(r.id)}>🗑️</button>
          </li>
        ))}
      </ul>
      {reservaEditando && (
        <EditarReserva reserva={reservaEditando} onClose={handleCerrarEdicion} />
      )}
    </div>
  );
}

export default ListaReservas;