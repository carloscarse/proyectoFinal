import FormularioDocumentacion from './FormularioDocumentacion';
import ListaDocumentacion from './ListaDocumentacion';
import './documentacion.css';

function Documentacion() {
  return (
    <section className="documentacion-container">
      <h1>Gestión de Documentación</h1>
      <FormularioDocumentacion />
      <ListaDocumentacion />
    </section>
  );
}

export default Documentacion;