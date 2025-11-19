import { Routes, Route } from 'react-router-dom';
import Admin from './Admin';
import Usuarios from './modules/Usuarios/Usuarios';
import Pagos from './modules/Pagos/Pagos';
import Contratos from './modules/Contratos/Contratos';
import Reservas from './modules/Reservas/Reservas';
import Inquilinos from './modules/Inquilinos/Inquilinos';
function AdminRoutes() {
  return (
    <Route path="/admin" element={<Admin />}>
  <Route path="usuarios" element={<Usuarios />} />
  <Route path="pagos" element={<Pagos />} />
  <Route path="contratos" element={<Contratos />} />
  <Route path="reservas" element={<Reservas />} />
  <Route path="inquilinos" element={<Inquilinos />} />
</Route>
  );
}

export default AdminRoutes;