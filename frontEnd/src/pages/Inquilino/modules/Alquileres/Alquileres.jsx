import FormularioAlquiler from './FormularioAlquiler';
import ListaAlquileres from './ListaAlquileres';
import './alquileres.css';

function Alquileres() {
  return (
    <section className="alquileres-container">
      <h1>Gestión de Alquileres</h1>
      <FormularioAlquiler />
      <ListaAlquileres />
    </section>
  );
}

export default Alquileres;