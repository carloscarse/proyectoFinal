import FormularioReserva from './FormularioReserva';
import ListaReservas from './ListaReservas';
import './reservas.css';

function Reservas() {
  return (
    <section className="reservas-container">
      <h1>Gestión de Reservas</h1>
      <FormularioReserva />
      <ListaReservas />
    </section>
  );
}

export default Reservas;