import FormularioServicio from './FormularioServicio';
import ListaServicios from './ListaServicios';
import './servicios.css';

function Servicios() {
  return (
    <section className="servicios-container">
      <h1>Gestión de Servicios Facturados</h1>
      <FormularioServicio />
      <ListaServicios />
    </section>
  );
}

export default Servicios;
