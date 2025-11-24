import FormularioEspacio from './FormularioEspacio';
import ListaEspacios from './ListaEspacios';
import './espacios.css';

function Espacios() {
  return (
    <section className="espacios-container">
      <h1>Gestión de Espacios</h1>
      <FormularioEspacio />
      <ListaEspacios />
    </section>
  );
}

export default Espacios;