import FormularioContrato from './FormularioContrato';
import ListaContratos from './ListaContratos';
import './contratos.css';

function Contratos() {
  return (
    <section className="contratos-container">
      <h1>Gestión de Contratos</h1>
      <FormularioContrato />
      <ListaContratos />
    </section>
  );
}

export default Contratos;