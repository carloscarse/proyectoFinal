import FormularioArchivo from './FormularioArchivo';
import ListaArchivos from './ListaArchivos';
import './archivo.css';

function Archivo() {
  return (
    <section className="archivo-container">
      <h1>Gestión de Archivos</h1>
      <FormularioArchivo />
      <ListaArchivos />
    </section>
  );
}

export default Archivo;