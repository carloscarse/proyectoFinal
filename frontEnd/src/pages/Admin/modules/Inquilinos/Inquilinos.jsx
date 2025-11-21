import FormularioInquilino from './FormularioInquilino';
import ListaInquilinos from './ListaInquilinos';
import './inquilinos.css';

function Inquilinos() {
  return (
    <section className="inquilinos-container">
      <h1>Gestión de Inquilinos</h1>
      <FormularioInquilino />
      <ListaInquilinos />
    </section>
  );
}

export default Inquilinos;