import FormularioFactura from './FormularioFactura';
import ListaFacturas from './ListaFacturas';
import './facturacion.css';

function Facturacion() {
  return (
    <section className="facturacion-container">
      <h1>Gestión de Facturación</h1>
      <FormularioFactura />
      <ListaFacturas />
    </section>
  );
}

export default Facturacion;