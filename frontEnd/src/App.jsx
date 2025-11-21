// Reemplaza el siguiente código completo en App.jsx

import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin/Admin";
import NotFound from "./pages/NotFound";
import Login from "./components/Login";

// Módulos administrativos
import Usuarios from "./pages/Admin/modules/Usuarios/Usuarios";
import ListaUsuarios from "./pages/Admin/modules/Usuarios/ListaUsuarios";
import Contratos from "./pages/Admin/modules/Contratos/Contratos";
import Reservas from "./pages/Admin/modules/Reservas/Reservas";
import Pagos from "./pages/Admin/modules/Pagos/Pagos";
import Inquilinos from "./pages/Admin/modules/Inquilinos/Inquilinos";
import Espacios from "./pages/Admin/modules/Espacios/Espacios";
import Facturacion from "./pages/Admin/modules/Facturacion/Facturacion";
import Servicios from "./pages/Admin/modules/Servicios/Servicios";
import Alquileres from "./pages/Admin/modules/Alquileres/Alquileres";
import Documentacion from "./pages/Admin/modules/Documentacion/Documentacion";
import Archivo from "./pages/Admin/modules/Archivo/Archivo";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<Admin />}>
        <Route path="usuarios" element={<Usuarios />} />
        <Route path="usuarios/lista" element={<ListaUsuarios />} />
        <Route path="contratos" element={<Contratos />} />
        <Route path="reservas" element={<Reservas />} />
        <Route path="pagos" element={<Pagos />} />
        <Route path="inquilinos" element={<Inquilinos />} />
        <Route path="espacios" element={<Espacios />} />
        <Route path="facturacion" element={<Facturacion />} />
        <Route path="servicios" element={<Servicios />} />
        <Route path="alquileres" element={<Alquileres />} />
        <Route path="documentacion" element={<Documentacion />} />
        <Route path="archivo" element={<Archivo />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;