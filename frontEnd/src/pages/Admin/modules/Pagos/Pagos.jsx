import FormularioPago from './FormularioPago';
import ListaPagos from './ListaPagos';
import './pagos.css';

function Pagos() {
  return (
    <section className="pagos-container">
      <h1>Gestión de Pagos</h1>
      <FormularioPago />
      <ListaPagos />
    </section>
  );
}

export default Pagos;